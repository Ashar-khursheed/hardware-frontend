import { Field } from "formik";
import { Input, Label } from "reactstrap";

const ShippingAddressSection = ({ setFieldValue, errors, data, values }) => {
  return (
    <div className="checkout-section">
      <div className="checkout-section-header">
        <span className="step-number">1</span>
        <h4>Shipping Address</h4>
      </div>
      <div className="checkout-section-body">
        {/* Email */}
        <div className="form-group">
          <Label>Email Address *</Label>
          <Field name="email">
            {({ field }) => (
              <Input 
                {...field} 
                type="email" 
                placeholder="Enter email address"
                className={errors.email ? 'is-invalid' : ''}
              />
            )}
          </Field>
          {errors.email && <div className="invalid-feedback d-block">{errors.email}</div>}
          <small className="form-text text-muted">You can create an account after checkout.</small>
        </div>

        {/* First Name */}
        <div className="form-group">
          <Label>First Name *</Label>
          <Field name="name">
            {({ field }) => (
              <Input 
                {...field} 
                type="text" 
                placeholder="Enter first name"
                className={errors.name ? 'is-invalid' : ''}
              />
            )}
          </Field>
          {errors.name && <div className="invalid-feedback d-block">{errors.name}</div>}
        </div>

        {/* Last Name */}
        <div className="form-group">
          <Label>Last Name *</Label>
          <Field name="shipping_address.title">
            {({ field }) => (
              <Input 
                {...field} 
                type="text" 
                placeholder="Enter last name"
                className={errors.shipping_address?.title ? 'is-invalid' : ''}
              />
            )}
          </Field>
        </div>

        {/* Company */}
        <div className="form-group">
          <Label>Company</Label>
          <Field name="company">
            {({ field }) => (
              <Input {...field} type="text" placeholder="Enter company name" />
            )}
          </Field>
        </div>

        {/* Street Address Line 1 */}
        <div className="form-group">
          <Label>Street Address: Line 1 *</Label>
          <Field name="shipping_address.street">
            {({ field }) => (
              <Input 
                {...field} 
                type="text" 
                placeholder="Enter street address"
                className={errors.shipping_address?.street ? 'is-invalid' : ''}
              />
            )}
          </Field>
        </div>

        {/* Street Address Line 2 */}
        <div className="form-group">
          <Label>Street Address: Line 2</Label>
          <Field name="shipping_address.address_line_2">
            {({ field }) => (
              <Input {...field} type="text" placeholder="Apartment, suite, etc." />
            )}
          </Field>
        </div>

        {/* Street Address Line 3 */}
        <div className="form-group">
          <Label>Street Address: Line 3</Label>
          <Field name="shipping_address.address_line_3">
            {({ field }) => (
              <Input {...field} type="text" />
            )}
          </Field>
        </div>

        {/* Country */}
        <div className="form-group">
          <Label>Country *</Label>
          <Field name="shipping_address.country_id">
            {({ field }) => (
              <Input 
                {...field} 
                type="select"
                onChange={(e) => {
                  setFieldValue('shipping_address.country_id', e.target.value);
                  setFieldValue('shipping_address.state_id', '');
                }}
                className={errors.shipping_address?.country_id ? 'is-invalid' : ''}
              >
                <option value="">Select Country</option>
                {data?.map((country) => (
                  <option key={country.id} value={country.id}>
                    {country.name}
                  </option>
                ))}
              </Input>
            )}
          </Field>
        </div>

        {/* State */}
        <div className="form-group">
          <Label>State *</Label>
          <Field name="shipping_address.state_id">
            {({ field }) => (
              <Input 
                {...field} 
                type="select"
                className={errors.shipping_address?.state_id ? 'is-invalid' : ''}
                disabled={!values.shipping_address?.country_id}
              >
                <option value="">Select State</option>
                {data?.find(c => c.id == values.shipping_address?.country_id)?.state?.map((state) => (
                  <option key={state.id} value={state.id}>
                    {state.name}
                  </option>
                ))}
              </Input>
            )}
          </Field>
        </div>

        {/* City */}
        <div className="form-group">
          <Label>City *</Label>
          <Field name="shipping_address.city">
            {({ field }) => (
              <Input 
                {...field} 
                type="text" 
                placeholder="Enter city"
                className={errors.shipping_address?.city ? 'is-invalid' : ''}
              />
            )}
          </Field>
        </div>

        {/* ZIP Code */}
        <div className="form-group">
          <Label>ZIP Code *</Label>
          <Field name="shipping_address.pincode">
            {({ field }) => (
              <Input 
                {...field} 
                type="text" 
                placeholder="Enter ZIP code"
                className={errors.shipping_address?.pincode ? 'is-invalid' : ''}
              />
            )}
          </Field>
        </div>

        {/* Phone */}
        <div className="form-group">
          <Label>Phone *</Label>
          <Field name="phone">
            {({ field }) => (
              <Input 
                {...field} 
                type="tel" 
                placeholder="Enter phone number"
                className={errors.phone ? 'is-invalid' : ''}
              />
            )}
          </Field>
        </div>

        {/* Billing Same as Shipping */}
        <div className="form-group">
          <div className="custom-control custom-checkbox">
            <Field name="billing_address.same_shipping">
              {({ field }) => (
                <>
                  <Input 
                    {...field} 
                    type="checkbox" 
                    id="same_shipping"
                    checked={field.value}
                  />
                  <Label htmlFor="same_shipping">
                    My billing and shipping address are the same
                  </Label>
                </>
              )}
            </Field>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShippingAddressSection;