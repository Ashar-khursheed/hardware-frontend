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

  const hasAddress = Boolean(postalCode || stateVal || cityVal || values.shipping_address_id);
  const totalItemQty = cartProducts?.reduce((acc, curr) => acc + (curr.quantity || 1), 0) || 1;
  const cartTotal = getTotal(cartProducts || []);

  const fetchShipStationRates = async () => {
    setLoading(true);
    setErrorMsg('');
    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL 
        ? `${process.env.NEXT_PUBLIC_API_URL}/shipstation/rates`
        : '/api/shipstation/rates';

      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          toPostalCode: postalCode || '90210',
          toState: stateVal || 'CA',
          toCity: cityVal || 'Los Angeles',
          toCountry: countryVal || 'US',
          weight: totalItemQty * 1.5,
          cartTotal: cartTotal,
          products: cartProducts
        })
      });

      const resData = await response.json();
      if (resData.success && Array.isArray(resData.rates)) {
        setRates(resData.rates);
        
        // Find existing rate or select default
        const currentRateId = selectedRateId || values.shipping_rate_id;
        const matchingRate = resData.rates.find(r => r.id === currentRateId) 
          || resData.rates.find(r => r.serviceCode === values.service_code)
          || resData.rates[0];

        if (matchingRate) {
          applyRateSelection(matchingRate);
        }
      } else {
        setErrorMsg('Could not fetch rates from ShipStation. Dynamic standard rate applied.');
      }
    } catch (err) {
      console.error('ShipStation rates fetch error:', err);
      setErrorMsg('Shipping calculation offline. Standard rate applied.');
    } finally {
      setLoading(false);
    }
  };

  // Re-fetch rates automatically whenever shipping address OR item quantity / cart total changes
  useEffect(() => {
    fetchShipStationRates();
  }, [postalCode, stateVal, cityVal, countryVal, values.shipping_address_id, totalItemQty, cartTotal]);

  const applyRateSelection = (rate) => {
    if (!rate) return;
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
      case 'Economy': return 'secondary';
      default: return 'primary';
    }
  };

  return (
    <div className="checkout-section shadow-sm rounded border bg-white mb-4 p-3 p-md-4">
      {/* Responsive Header */}
      <div className="d-flex flex-wrap align-items-center justify-content-between gap-2 mb-3 pb-2 border-bottom">
        <div className="d-flex align-items-center gap-2">
          <span className="step-number me-1" style={{ minWidth: '28px', width: '28px', height: '28px', display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }}>
            2
          </span>
          <h4 className="m-0 fw-bold fs-5 text-dark" style={{ lineHeight: '1.2' }}>
            Shipping Method & Live Rates
          </h4>
        </div>

        <div className="d-flex align-items-center gap-2 flex-wrap ms-auto">
          <span className="badge bg-light text-secondary border px-2 py-1" style={{ fontSize: '11px', whiteSpace: 'nowrap' }}>
            <i className="ri-ship-fill text-primary me-1"></i> ShipStation
          </span>
          <button 
            type="button" 
            className="btn btn-sm btn-outline-primary rounded-pill px-3 py-1"
            onClick={fetchShipStationRates}
            disabled={loading}
            style={{ fontSize: '11px', whiteSpace: 'nowrap' }}
          >
            {loading ? <Spinner size="sm" /> : <i className="ri-refresh-line me-1"></i>} Refresh Rates
          </button>
        </div>
      </div>

      <div className="checkout-section-body">
        {/* Address status notice */}
        {!hasAddress ? (
          <div className="alert alert-info py-2 px-3 mb-3 small d-flex align-items-center gap-2 rounded-3" style={{ fontSize: '12px' }}>
            <i className="ri-map-pin-line fs-6 text-info"></i>
            <span>
              <strong>Estimated rates shown.</strong> Enter your Shipping Address above to get exact live ShipStation rates for your location.
            </span>
          </div>
        ) : (
          <div className="text-muted small mb-3 d-flex align-items-center gap-1" style={{ fontSize: '12px' }}>
            <i className="ri-checkbox-circle-fill text-success"></i>
            <span>Live rates for destination: <strong>{cityVal ? `${cityVal}, ` : ''}{stateVal} {postalCode}</strong></span>
          </div>
        )}

        {loading ? (
          <div className="text-center py-4 bg-light rounded-3">
            <Spinner color="primary" className="mb-2" />
            <p className="m-0 text-dark fw-semibold" style={{ fontSize: '14px' }}>Calculating live ShipStation rates...</p>
            <small className="text-muted">Package Weight: {(totalItemQty * 1.5).toFixed(1)} lbs ({totalItemQty} items)</small>
          </div>
        ) : (
          <>
            {errorMsg && (
              <div className="alert alert-warning py-2 px-3 small mb-3 rounded-3" style={{ fontSize: '12px' }}>
                <i className="ri-alert-line me-1"></i> {errorMsg}
              </div>
            )}

            <div className="shipping-rates-grid d-flex flex-column gap-2">
              {rates.map((rate) => {
                const isSelected = selectedRateId === rate.id || values.shipping_rate_id === rate.id;
                return (
                  <div
                    key={rate.id}
                    className={`shipping-rate-card border rounded-3 p-3 transition-all ${
                      isSelected ? 'border-primary shadow-sm' : 'border-light-subtle'
                    }`}
                    style={{
                      cursor: 'pointer',
                      borderColor: isSelected ? '#0d6efd' : '#e0e0e0',
                      backgroundColor: isSelected ? '#f4f7ff' : '#ffffff',
                      borderWidth: isSelected ? '2px' : '1px',
                      transition: 'all 0.15s ease-in-out'
                    }}
                    onClick={() => applyRateSelection(rate)}
                  >
                    <div className="d-flex align-items-start gap-3">
                      {/* Radio input */}
                      <div className="pt-1">
                        <input
                          type="radio"
                          className="form-check-input cursor-pointer"
                          name="shipstation_rate_option"
                          id={rate.id}
                          checked={isSelected}
                          onChange={() => applyRateSelection(rate)}
                          style={{ width: '18px', height: '18px', cursor: 'pointer' }}
                        />
                      </div>

                      {/* Carrier Icon */}
                      <div className="carrier-icon-box fs-3 leading-none text-center pt-1" style={{ width: '32px', minWidth: '32px' }}>
                        <i className={getCarrierIcon(rate.carrierCode)}></i>
                      </div>

                      {/* Details */}
                      <div className="flex-grow-1 min-w-0">
                        <div className="d-flex align-items-center gap-2 flex-wrap mb-1">
                          <h6 className="m-0 fw-bold text-dark fs-6" style={{ wordBreak: 'normal', whiteSpace: 'normal', lineHeight: '1.3' }}>
                            {rate.serviceName}
                          </h6>
                          {rate.badge && (
                            <Badge color={getBadgeColor(rate.badge)} pill className="px-2 py-1" style={{ fontSize: '10px', whiteSpace: 'nowrap' }}>
                              {rate.badge}
                            </Badge>
                          )}
                        </div>
                        <div className="text-muted small d-flex align-items-center gap-2 flex-wrap" style={{ fontSize: '12px' }}>
                          <span><i className="ri-time-line me-1"></i>Delivery: <strong>{rate.estimatedDays}</strong></span>
                          <span className="text-secondary">•</span>
                          <span>Carrier: <strong>{rate.carrierName}</strong></span>
                        </div>
                      </div>

                      {/* Price */}
                      <div className="text-end ms-auto flex-shrink-0">
                        <div className="fs-5 fw-bold text-primary" style={{ whiteSpace: 'nowrap' }}>
                          {rate.totalCost === 0 ? 'FREE' : convertCurrency(rate.totalCost.toFixed(2))}
                        </div>
                        {rate.totalCost === 0 && (
                          <div className="text-success small fw-semibold" style={{ fontSize: '11px', whiteSpace: 'nowrap' }}>
                            Free Shipping
                          </div>
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