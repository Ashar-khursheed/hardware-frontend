import { Field } from "formik";
import { Input, Label } from "reactstrap";
import { useState } from "react";

const AddressSelection = ({ values, setFieldValue, accountData, errors }) => {
  const [showNewAddress, setShowNewAddress] = useState(false);
  
  const addresses = accountData?.address || [];
  
  const handleAddressSelect = (type, addressId) => {
    setFieldValue(`${type}_address_id`, addressId);
    
    // Find the selected address
    const selectedAddress = addresses.find(addr => addr.id == addressId);
    
    // Also populate the address fields if showing new address form
    if (selectedAddress && type === 'shipping') {
      setFieldValue('shipping_address', {
        title: selectedAddress.title || '',
        street: selectedAddress.street || '',
        city: selectedAddress.city || '',
        country_code: selectedAddress.country_code || '',
        phone: selectedAddress.phone || '',
        pincode: selectedAddress.pincode || '',
        country_id: selectedAddress.country_id || '',
        state_id: selectedAddress.state_id || '',
        address_line_2: selectedAddress.address_line_2 || '',
      });
    }
    
    if (selectedAddress && type === 'billing') {
      setFieldValue('billing_address', {
        title: selectedAddress.title || '',
        street: selectedAddress.street || '',
        city: selectedAddress.city || '',
        country_code: selectedAddress.country_code || '',
        phone: selectedAddress.phone || '',
        pincode: selectedAddress.pincode || '',
        country_id: selectedAddress.country_id || '',
        state_id: selectedAddress.state_id || '',
        address_line_2: selectedAddress.address_line_2 || '',
      });
    }
  };
  
  const handleSameAsShipping = (checked) => {
    if (checked) {
      setFieldValue('billing_address_id', values.shipping_address_id);
      setFieldValue('billing_address', values.shipping_address);
    } else {
      setFieldValue('billing_address_id', '');
      setFieldValue('billing_address', {
        title: '',
        street: '',
        city: '',
        country_code: '',
        phone: '',
        pincode: '',
        country_id: '',
        state_id: '',
        address_line_2: '',
      });
    }
  };
  
  return (
    <div className="checkout-section">
      <div className="checkout-section-header">
        <span className="step-number">1</span>
        <h4>Select Address</h4>
      </div>
      <div className="checkout-section-body">
        
        {/* Shipping Address Selection */}
        <div className="form-group mb-4">
          <Label className="fw-bold">Shipping Address *</Label>
          
          {addresses.length > 0 ? (
            <div className="address-selection">
              <Field name="shipping_address_id">
                {({ field }) => (
                  <Input
                    {...field}
                    type="select"
                    onChange={(e) => handleAddressSelect('shipping', e.target.value)}
                    className={errors.shipping_address_id ? 'is-invalid' : ''}
                  >
                    <option value="">Select shipping address</option>
                    {addresses.map((address) => (
                      <option key={address.id} value={address.id}>
                        {address.title} - {address.street}, {address.city}, {address.state?.name || ''}, {address.pincode}
                      </option>
                    ))}
                  </Input>
                )}
              </Field>
              {errors.shipping_address_id && (
                <div className="invalid-feedback d-block">{errors.shipping_address_id}</div>
              )}
            </div>
          ) : (
            <p className="text-muted">No saved addresses. Please add an address.</p>
          )}
        </div>
        
        {/* Billing Address Selection */}
        <div className="form-group mb-3">
          <Label className="fw-bold">Billing Address *</Label>
          
          {/* Same as Shipping Checkbox */}
          <div className="form-check mb-3">
            <Input
              type="checkbox"
              className="form-check-input"
              id="sameAsShipping"
              onChange={(e) => handleSameAsShipping(e.target.checked)}
            />
            <Label className="form-check-label" htmlFor="sameAsShipping">
              Same as shipping address
            </Label>
          </div>
          
          {addresses.length > 0 && (
            <div className="address-selection">
              <Field name="billing_address_id">
                {({ field }) => (
                  <Input
                    {...field}
                    type="select"
                    onChange={(e) => handleAddressSelect('billing', e.target.value)}
                    className={errors.billing_address_id ? 'is-invalid' : ''}
                  >
                    <option value="">Select billing address</option>
                    {addresses.map((address) => (
                      <option key={address.id} value={address.id}>
                        {address.title} - {address.street}, {address.city}, {address.state?.name || ''}, {address.pincode}
                      </option>
                    ))}
                  </Input>
                )}
              </Field>
              {errors.billing_address_id && (
                <div className="invalid-feedback d-block">{errors.billing_address_id}</div>
              )}
            </div>
          )}
        </div>
        
        {/* Add New Address Button */}
        {addresses.length === 0 && (
          <div className="alert alert-info">
            <p className="mb-0">
              You don't have any saved addresses. Please go to{' '}
              <a href="/account/addresses" className="alert-link">
                My Addresses
              </a>{' '}
              to add an address first.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AddressSelection;
