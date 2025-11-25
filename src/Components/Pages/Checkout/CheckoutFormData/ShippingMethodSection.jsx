import { Field } from "formik";
import { Input, Label } from "reactstrap";

const ShippingMethodSection = ({ values, setFieldValue }) => {
  return (
    <div className="checkout-section">
      <div className="checkout-section-header">
        <span className="step-number">2</span>
        <h4>Shipping Method</h4>
      </div>
      <div className="checkout-section-body">
        <div className="shipping-option">
          <Field name="delivery_description">
            {({ field }) => (
              <>
                <Input 
                  {...field} 
                  type="radio" 
                  id="free_shipping"
                  value="free_ground_shipping"
                  checked={field.value === 'free_ground_shipping'}
                />
                <Label htmlFor="free_shipping" className="shipping-label">
                  <span className="shipping-price">$0.00</span>
                  <span className="shipping-name">Free Ground Shipping</span>
                </Label>
              </>
            )}
          </Field>
        </div>
      </div>
    </div>
  );
};

export default ShippingMethodSection;