import { Field } from "formik";
import { Input, Label } from "reactstrap";
import { loadStripe } from "@stripe/stripe-js";
import { Elements, CardNumberElement, CardExpiryElement, CardCvcElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { useEffect, useState } from "react";
import "remixicon/fonts/remixicon.css";

// Load Stripe with your publishable key
// Replace with your actual Stripe publishable key
const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY || 'pk_test_YOUR_KEY_HERE');

const CARD_ELEMENT_OPTIONS = {
  style: {
    base: {
      fontSize: '16px',
      color: '#32325d',
      fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
      fontSmoothing: 'antialiased',
      '::placeholder': {
        color: '#aab7c4',
      },
    },
    invalid: {
      color: '#fa755a',
      iconColor: '#fa755a',
    },
  },
};

const StripeCardForm = ({ values, setFieldValue }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [cardError, setCardError] = useState(null);
  const [isCardComplete, setIsCardComplete] = useState({
    cardNumber: false,
    cardExpiry: false,
    cardCvc: false,
  });

  useEffect(() => {
    // Set payment method to stripe by default
    setFieldValue("payment_method", "stripe");
  }, [setFieldValue]);

  useEffect(() => {
    // Store stripe and elements instance for later use in checkout
    if (stripe && elements) {
      setFieldValue("stripe_instance", { stripe, elements });
    }
  }, [stripe, elements, setFieldValue]);

  const handleCardChange = (elementType) => (event) => {
    if (event.error) {
      setCardError(event.error.message);
    } else {
      setCardError(null);
    }
    
    const newIsCardComplete = {
      ...isCardComplete,
      [elementType]: event.complete,
    };
    
    setIsCardComplete(newIsCardComplete);
    
    // Update formik field to track card completion
    const allComplete = newIsCardComplete.cardNumber && 
                        newIsCardComplete.cardExpiry && 
                        newIsCardComplete.cardCvc;
    
    setFieldValue("stripe_card_complete", allComplete);
  };

  return (
    <div className="stripe-card-form mt-4">
      <div className="form-group mb-3">
        <Label className="form-label">Card number</Label>
        <div className="stripe-element-wrapper">
          <CardNumberElement
            options={CARD_ELEMENT_OPTIONS}
            onChange={handleCardChange('cardNumber')}
          />
        </div>
      </div>

      <div className="row">
        <div className="col-md-6">
          <div className="form-group mb-3">
            <Label className="form-label">Expiration date</Label>
            <div className="stripe-element-wrapper">
              <CardExpiryElement
                options={CARD_ELEMENT_OPTIONS}
                onChange={handleCardChange('cardExpiry')}
              />
            </div>
          </div>
        </div>
        <div className="col-md-6">
          <div className="form-group mb-3">
            <Label className="form-label">CVC</Label>
            <div className="stripe-element-wrapper">
              <CardCvcElement
                options={CARD_ELEMENT_OPTIONS}
                onChange={handleCardChange('cardCvc')}
              />
            </div>
          </div>
        </div>
      </div>

      {cardError && (
        <div className="alert alert-danger mt-2" role="alert">
          <i className="ri-error-warning-line me-2"></i>
          {cardError}
        </div>
      )}

      <div className="secure-payment-badge mt-3">
        <i className="ri-lock-line me-2"></i>
        <span>Your payment information is secure and encrypted</span>
      </div>
    </div>
  );
};

const PaymentMethodSection = ({ values, setFieldValue }) => {
  const [selectedPaymentTab, setSelectedPaymentTab] = useState('stripe');

  // Initialize stripe_card_complete on mount based on payment method
  useEffect(() => {
    if (values["payment_method"] === "cod" || values["payment_method"] === "bank_transfer") {
      setFieldValue("stripe_card_complete", true);
    } else if (values["payment_method"] === "stripe") {
      setFieldValue("stripe_card_complete", false);
    }
  }, []); // Run only on mount

  return (
    <div className="checkout-section">
      <div className="checkout-section-header">
        <span className="step-number">2</span>
        <h4>Payment Method</h4>
      </div>
      <div className="checkout-section-body">
        <div className="payment-method-options">
          {/* Payment Method Tabs */}
          <div className="payment-tabs mb-4">
            <button 
              type="button" 
              className={`payment-tab ${selectedPaymentTab === 'stripe' ? 'active' : ''}`}
              onClick={() => {
                setSelectedPaymentTab('stripe');
                setFieldValue("payment_method", "stripe");
                setFieldValue("stripe_card_complete", false); // Reset validation for Stripe
              }}
            >
              <i className="ri-bank-card-line me-2"></i> 
              Credit/Debit Card
            </button>
            
            {/* <button 
              type="button" 
              className={`payment-tab ${selectedPaymentTab === 'cod' ? 'active' : ''}`}
              onClick={() => {
                setSelectedPaymentTab('cod');
                setFieldValue("payment_method", "cod");
                setFieldValue("stripe_card_complete", true); // COD doesn't need card validation
              }}
            >
              <i className="ri-money-dollar-circle-line me-2"></i> 
              Cash on Delivery
            </button> */}
          </div>

          {/* Stripe Card Payment Form */}
          {selectedPaymentTab === 'stripe' && (
            <div className="payment-method-content">
              <div className="payment-method-description mb-3">
                <p className="text-muted">
                  <i className="ri-information-line me-2"></i>
                  Pay securely using your credit or debit card. Your payment information is encrypted and secure.
                </p>
              </div>
              
              <Elements stripe={stripePromise}>
                <StripeCardForm values={values} setFieldValue={setFieldValue} />
              </Elements>
            </div>
          )}

          {/* Cash on Delivery */}
          {/* {selectedPaymentTab === 'cod' && (
            <div className="payment-method-content">
              <div className="alert alert-info">
                <i className="ri-information-line me-2"></i>
                Pay cash when you receive your order at your doorstep.
              </div>
              <ul className="cod-terms mt-3">
                <li><i className="ri-check-line text-success me-2"></i>Cash payment to delivery person</li>
                <li><i className="ri-check-line text-success me-2"></i>No advance payment required</li>
                <li><i className="ri-check-line text-success me-2"></i>Available in selected areas</li>
              </ul>
            </div>
          )} */}
        </div>
      </div>
    </div>
  );
};

export default PaymentMethodSection;
