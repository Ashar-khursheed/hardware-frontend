import React, { useState, useEffect, useContext } from 'react';
import { Field } from "formik";
import { Input, Label, Spinner, Badge } from "reactstrap";
import SettingContext from "@/Context/SettingContext";
import CartContext from "@/Context/CartContext";

const ShippingMethodSection = ({ values, setFieldValue, errors }) => {
  const { convertCurrency } = useContext(SettingContext);
  const { cartProducts, getTotal } = useContext(CartContext);
  const [rates, setRates] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedRateId, setSelectedRateId] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  const shippingAddr = values.shipping_address || {};
  const postalCode = shippingAddr.pincode || shippingAddr.postal_code || '';
  const stateVal = shippingAddr.state_name || shippingAddr.state_id || '';
  const cityVal = shippingAddr.city || '';
  const countryVal = shippingAddr.country_code || 'US';

  const cartTotal = getTotal(cartProducts || []);

  const fetchShipStationRates = async () => {
    setLoading(true);
    setErrorMsg('');
    try {
      const response = await fetch('/api/shipstation/rates', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          toPostalCode: postalCode || '90210',
          toState: stateVal || 'CA',
          toCity: cityVal || 'Beverly Hills',
          toCountry: countryVal || 'US',
          weight: cartProducts?.reduce((acc, curr) => acc + (curr.quantity || 1), 0) * 1.5 || 3,
          cartTotal: cartTotal
        })
      });

      const resData = await response.json();
      if (resData.success && Array.isArray(resData.rates)) {
        setRates(resData.rates);
        // Default to first rate if not selected or current selection is invalid
        const currentRateId = values.shipping_rate_id;
        const exists = resData.rates.find(r => r.id === currentRateId);
        if (!exists && resData.rates.length > 0) {
          const defaultRate = resData.rates[0];
          setSelectedRateId(defaultRate.id);
          applyRateSelection(defaultRate);
        }
      } else {
        setErrorMsg('Could not fetch rates from ShipStation. Standard shipping applied.');
      }
    } catch (err) {
      console.error('ShipStation rates fetch error:', err);
      setErrorMsg('Shipping calculation temporarily offline. Standard ground rate applied.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchShipStationRates();
  }, [postalCode, stateVal, cityVal, countryVal]);

  const applyRateSelection = (rate) => {
    setSelectedRateId(rate.id);
    setFieldValue('shipping_rate_id', rate.id);
    setFieldValue('shipping_cost', rate.totalCost);
    setFieldValue('delivery_description', `${rate.serviceName} (${rate.estimatedDays})`);
    setFieldValue('carrier_code', rate.carrierCode);
    setFieldValue('service_code', rate.serviceCode);
  };

  const getCarrierIcon = (carrierCode) => {
    const code = (carrierCode || '').toLowerCase();
    if (code.includes('fedex')) return 'ri-truck-fill text-primary';
    if (code.includes('ups')) return 'ri-space-ship-line text-warning';
    if (code.includes('stamps') || code.includes('usps')) return 'ri-mail-send-fill text-danger';
    return 'ri-ship-line text-info';
  };

  const getBadgeColor = (badge) => {
    switch (badge) {
      case 'Fastest': return 'danger';
      case 'Best Value': return 'success';
      case 'Free Shipping': return 'info';
      default: return 'secondary';
    }
  };

  return (
    <div className="checkout-section shadow-sm rounded border bg-white mb-4 p-4">
      <div className="checkout-section-header d-flex justify-content-between align-items-center mb-3">
        <div className="d-flex align-items-center gap-2">
          <span className="step-number bg-primary text-white rounded-circle d-inline-flex justify-content-center align-items-center fw-bold" style={{ width: '28px', height: '28px', fontSize: '14px' }}>
            2
          </span>
          <h4 className="m-0 fw-bold">Shipping Method & Real-Time Rates</h4>
        </div>
        <div className="d-flex align-items-center gap-2">
          <span className="badge bg-light text-dark border me-2">
            <i className="ri-ship-fill text-primary me-1"></i> Powered by ShipStation
          </span>
          <button 
            type="button" 
            className="btn btn-outline-secondary btn-sm rounded-pill px-3 py-1"
            onClick={fetchShipStationRates}
            disabled={loading}
            style={{ fontSize: '12px' }}
          >
            {loading ? <Spinner size="sm" /> : <i className="ri-refresh-line me-1"></i>} Recalculate
          </button>
        </div>
      </div>

      <div className="checkout-section-body">
        {loading ? (
          <div className="text-center py-4 bg-light rounded">
            <Spinner color="primary" className="mb-2" />
            <p className="m-0 text-muted fw-semibold">Calculating real-time rates via ShipStation API...</p>
            <small className="text-muted">Destination: {postalCode ? `${cityVal || 'City'}, ${stateVal || ''} ${postalCode}` : 'Default Warehouse Zone'}</small>
          </div>
        ) : (
          <>
            {errorMsg && (
              <div className="alert alert-warning py-2 px-3 small mb-3">
                <i className="ri-alert-line me-1"></i> {errorMsg}
              </div>
            )}

            <div className="shipping-rates-grid d-flex flex-column gap-3">
              {rates.map((rate) => {
                const isSelected = selectedRateId === rate.id || values.shipping_rate_id === rate.id;
                return (
                  <div
                    key={rate.id}
                    className={`shipping-rate-card border rounded p-3 cursor-pointer transition-all ${
                      isSelected ? 'border-primary bg-light-primary shadow-sm' : 'border-light hover-shadow'
                    }`}
                    style={{
                      cursor: 'pointer',
                      borderWidth: isSelected ? '2px' : '1px',
                      backgroundColor: isSelected ? '#f8f9ff' : '#ffffff',
                      transition: 'all 0.2s ease-in-out'
                    }}
                    onClick={() => applyRateSelection(rate)}
                  >
                    <div className="d-flex align-items-center justify-content-between">
                      <div className="d-flex align-items-center gap-3">
                        <div className="form-check m-0">
                          <input
                            type="radio"
                            className="form-check-input"
                            name="shipstation_rate_option"
                            id={rate.id}
                            checked={isSelected}
                            onChange={() => applyRateSelection(rate)}
                          />
                        </div>
                        <div className="carrier-icon-box fs-3 me-1">
                          <i className={getCarrierIcon(rate.carrierCode)}></i>
                        </div>
                        <div>
                          <div className="d-flex align-items-center gap-2">
                            <h6 className="m-0 fw-bold text-dark">{rate.serviceName}</h6>
                            {rate.badge && (
                              <Badge color={getBadgeColor(rate.badge)} pill className="px-2 py-1" style={{ fontSize: '10px' }}>
                                {rate.badge}
                              </Badge>
                            )}
                          </div>
                          <div className="text-muted small mt-1">
                            <i className="ri-time-line me-1"></i>
                            <span>Estimated Delivery: <strong>{rate.estimatedDays}</strong></span>
                            <span className="mx-2">•</span>
                            <span>Carrier: <strong>{rate.carrierName}</strong></span>
                          </div>
                        </div>
                      </div>

                      <div className="text-end">
                        <span className="fs-5 fw-bold text-primary">
                          {rate.totalCost === 0 ? 'FREE' : convertCurrency(rate.totalCost.toFixed(2))}
                        </span>
                        {rate.totalCost === 0 && (
                          <div className="text-success small fw-semibold">Qualified for Free Shipping</div>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default ShippingMethodSection;