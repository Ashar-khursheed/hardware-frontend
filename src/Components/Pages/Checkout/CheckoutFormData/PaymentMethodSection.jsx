import { Field } from "formik";
import { Input, Label } from "reactstrap";
import "remixicon/fonts/remixicon.css";

const PaymentMethodSection = ({ values, setFieldValue }) => {
  return (
    <div className="checkout-section">
      <div className="checkout-section-header">
        <span className="step-number">3</span>
        <h4>Payment Method</h4>
      </div>
      <div className="checkout-section-body">
        {/* PayPal Option */}
        {/* <div className="payment-option mb-3">
          <Field name="payment_method">
            {({ field }) => (
              <>
                <Input 
                  {...field} 
                  type="radio" 
                  id="paypal"
                  value="paypal"
                  checked={field.value === 'paypal'}
                />
                <Label htmlFor="paypal" className="payment-label">
                  <img src="/images/paypal-logo.png" alt="PayPal" className="payment-logo" />
                  <span>Pay with PayPal</span>
                </Label>
              </>
            )}
          </Field>
        </div> */}

        {/* Card Option */}
        {/* <div className="payment-option">
          <Field name="payment_method">
            {({ field }) => (
              <>
                <Input 
                  {...field} 
                  type="radio" 
                  id="card"
                  value="card"
                  checked={field.value === 'card'}
                />
                <Label htmlFor="card" className="payment-label">
                  <img src="/images/card-icon.png" alt="Card" className="payment-logo" />
                  <span>Pay with Card</span>
                </Label>
              </>
            )}
          </Field>
        </div> */}

          <div className="card-payment-form mt-4">
            <div className="payment-tabs">
              <button type="button" className="payment-tab active">
                <i className="ri-bank-card-line"></i> Card
              </button>
              {/* <button type="button" className="payment-tab">
                <i className="ri-btc-line"></i> Crypto
              </button> */}
            </div>

            <div className="form-group">
              <Label>Card number</Label>
              <Field name="card_number">
                {({ field }) => (
                  <div className="card-number-input">
                    <Input 
                      {...field} 
                      type="text" 
                      placeholder="1234 1234 1234 1234"
                      maxLength="19"
                    />
                    {/* <div className="card-brands">
                      <img src="/images/mastercard.png" alt="Mastercard" />
                      <img src="/images/visa.png" alt="Visa" />
                      <img src="/images/amex.png" alt="Amex" />
                      <img src="/images/unionpay.png" alt="UnionPay" />
                    </div> */}
                  </div>
                )}
              </Field>
            </div>

            <div className="row">
              <div className="col-md-6">
                <div className="form-group">
                  <Label>Expiration date</Label>
                  <Field name="card_expiry">
                    {({ field }) => (
                      <Input 
                        {...field} 
                        type="text" 
                        placeholder="MM / YY"
                        maxLength="7"
                      />
                    )}
                  </Field>
                </div>
              </div>
              <div className="col-md-6">
                <div className="form-group">
                  <Label>Security code</Label>
                  <Field name="card_cvc">
                    {({ field }) => (
                      <div className="cvc-input">
                        <Input 
                          {...field} 
                          type="text" 
                          placeholder="CVC"
                          maxLength="4"
                        />
                        <i className="ri-question-line" title="3-digit code on back of card"></i>
                      </div>
                    )}
                  </Field>
                </div>
              </div>
            </div>

            <div className="form-group">
              <Label>ZIP code</Label>
              <Field name="card_zip">
                {({ field }) => (
                  <Input 
                    {...field} 
                    type="text" 
                    placeholder="12345"
                    maxLength="10"
                  />
                )}
              </Field>
            </div>
          </div>
   
      </div>
    </div>
  );
};

export default PaymentMethodSection;