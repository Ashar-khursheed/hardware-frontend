import CartContext from "@/Context/CartContext";
import SettingContext from "@/Context/SettingContext";
import Btn from "@/Elements/Buttons/Btn";
import { OrderAPI } from "@/Utils/AxiosUtils/API";
import useCreate from "@/Utils/Hooks/useCreate";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import React, { useContext, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

const PlaceOrder = ({ values, addToCartData, errors }) => {
  const { t } = useTranslation("common");
  const router = useRouter();
  const { settingData } = useContext(SettingContext);
  const access_token = Cookies.get("uat_multikart");
  const { cartProducts, setCartProducts } = useContext(CartContext);
  const [getOrderNumber, setGetOrderNumber] = useState("");
  const [errorOrder, setErrorOrder] = useState("");
  const [disable, setDisable] = useState(true);
  const [isProcessing, setIsProcessing] = useState(false);
  const [showBoxMessage, setShowBoxMessage] = useState(null); // Add this for useCreate

  const { data, mutate, isLoading } = useCreate(
    OrderAPI, // url
    false, // updateId
    false, // path
    true, // message
    async (resDta) => { // extraFunction
    console.log('Order API Response:', resDta);
    
    if (resDta?.status == 200 || resDta?.status == 201) {
      resDta?.data?.order_number && setGetOrderNumber(resDta?.data?.order_number);
      
      // Handle Cash on Delivery
      if (values["payment_method"] == "cod" || values["payment_method"] == "bank_transfer") {
        if (!resDta?.data?.is_guest) {
          router.push(`/account/order/details/${resDta?.data?.order_number}`);
          setCartProducts([]);
        } else {
          const queryParams = new URLSearchParams({ 
            order_number: resDta?.data?.order_number, 
            email_or_phone: resDta?.data?.consumer?.email 
          }).toString();
          router.push(`/order/details/?${queryParams}`);
          setCartProducts([]);
        }
      } 
      // Handle Stripe Payment
      else if (values["payment_method"] == "stripe") {
        // If backend returns a payment URL (for Stripe Checkout)
        if (resDta?.data?.url) {
          window.open(resDta?.data?.url, "_self");
        } 
        // If using Stripe Elements (direct payment)
        else if (values["stripe_instance"]) {
          await handleStripePayment(resDta?.data);
        }
      } 
      // Handle other payment methods
      else {
        window.open(resDta?.data?.url, "_self");
      }
    } else {
      // Log the full error for debugging
      console.error('Order API Error:', {
        status: resDta?.status,
        message: resDta?.data?.message || resDta?.message,
        response: resDta?.response?.data,
        fullResponse: resDta
      });
      
      const errorMessage = resDta?.response?.data?.message || 
                          resDta?.data?.message || 
                          resDta?.message ||
                          'Something went wrong, check API integration';
      
      setErrorOrder(errorMessage);
      setIsProcessing(false);
    }
  },
  false, // notHandler
  null, // setCouponError
  null, // refetch
  setShowBoxMessage, // setShowBoxMessage (9th parameter)
  null, // responseType
  (err) => { // errFunction
    console.error('Order API Error Handler:', err);
    setIsProcessing(false);
  });

  // Handle Stripe payment with Elements
  const handleStripePayment = async (orderData) => {
    try {
      setIsProcessing(true);
      
      const { stripe, elements } = values["stripe_instance"];
      
      if (!stripe || !elements) {
        throw new Error("Stripe hasn't loaded yet");
      }

      // Get card element
      const cardNumberElement = elements.getElement("cardNumber");
      
      if (!cardNumberElement) {
        throw new Error("Card element not found");
      }

      // Create payment method
      const { error, paymentMethod } = await stripe.createPaymentMethod({
        type: 'card',
        card: cardNumberElement,
        billing_details: {
          name: values.name || '',
          email: values.email || '',
          address: {
            line1: values.shipping_address?.street || '',
            city: values.shipping_address?.city || '',
            postal_code: values.shipping_address?.pincode || '',
          }
        }
      });

      if (error) {
        console.error('Stripe error:', error);
        setErrorOrder(error.message);
        setIsProcessing(false);
        return;
      }

      // If backend requires payment intent confirmation
      if (orderData?.client_secret) {
        const { error: confirmError, paymentIntent } = await stripe.confirmCardPayment(
          orderData.client_secret,
          {
            payment_method: paymentMethod.id
          }
        );

        if (confirmError) {
          console.error('Payment confirmation error:', confirmError);
          setErrorOrder(confirmError.message);
          setIsProcessing(false);
          return;
        }

        if (paymentIntent.status === 'succeeded') {
          // Payment successful
          if (!orderData?.is_guest) {
            router.push(`/account/order/details/${orderData.order_number}`);
          } else {
            const queryParams = new URLSearchParams({ 
              order_number: orderData.order_number, 
              email_or_phone: orderData.consumer?.email 
            }).toString();
            router.push(`/order/details/?${queryParams}`);
          }
          setCartProducts([]);
        }
      } else {
        // Just send payment method ID to backend
        console.log('Payment method created:', paymentMethod.id);
        // Backend will handle the rest
        if (!orderData?.is_guest) {
          router.push(`/account/order/details/${orderData.order_number}`);
        } else {
          const queryParams = new URLSearchParams({ 
            order_number: orderData.order_number, 
            email_or_phone: orderData.consumer?.email 
          }).toString();
          router.push(`/order/details/?${queryParams}`);
        }
        setCartProducts([]);
      }
      
      setIsProcessing(false);
    } catch (err) {
      console.error('Stripe payment error:', err);
      setErrorOrder(err.message || 'An error occurred processing your payment');
      setIsProcessing(false);
    }
  };

  useEffect(() => {
    if (!access_token) {
      // Guest checkout validation - check if required fields are filled
      const requiredFieldsFilled = Boolean(
        values["name"] && 
        values["email"] && 
        values["phone"] && 
        values["shipping_address"]?.street &&
        values["shipping_address"]?.city &&
        values["shipping_address"]?.pincode &&
        values["shipping_address"]?.country_id &&
        values["shipping_address"]?.state_id && // State is required for shipping calculation
        values["payment_method"]
      );
      
      // TEMPORARILY IGNORE ERRORS - just check required fields
      // const criticalErrors = Object.keys(errors).filter(key => 
      //   key !== 'password' && key !== 'create_account'
      // );
      // const hasCriticalErrors = criticalErrors.length > 0;
      const hasCriticalErrors = false; // Disable error checking temporarily
      
      const isStripeNotComplete = values["payment_method"] === "stripe" && !values["stripe_card_complete"];
      
      const shouldDisable = !requiredFieldsFilled || hasCriticalErrors || isStripeNotComplete;
      
      console.log('Guest Checkout Button State:', {
        requiredFieldsFilled,
        hasCriticalErrors,
        allErrors: errors, // Show all errors
        isStripeNotComplete,
        paymentMethod: values["payment_method"],
        stripeCardComplete: values["stripe_card_complete"],
        shouldDisable,
        // Show which fields are filled
        fieldStatus: {
          name: !!values["name"],
          email: !!values["email"],
          phone: !!values["phone"],
          street: !!values["shipping_address"]?.street,
          city: !!values["shipping_address"]?.city,
          pincode: !!values["shipping_address"]?.pincode,
          country_id: !!values["shipping_address"]?.country_id,
          state_id: !!values["shipping_address"]?.state_id
        }
      });
      
      // Disable if: required fields not filled OR stripe not complete
      setDisable(shouldDisable);
    } else {
      // Logged in user validation
      const hasRequiredFields = values["billing_address_id"] && 
                                values["shipping_address_id"] && // Add shipping address check
                                values["payment_method"];
      const isStripeNotComplete = values["payment_method"] === "stripe" && !values["stripe_card_complete"];
      
      const shouldDisable = !hasRequiredFields || isStripeNotComplete;
      
      console.log('Logged In Button State:', {
        hasRequiredFields,
        billing_address_id: values["billing_address_id"],
        shipping_address_id: values["shipping_address_id"],
        payment_method: values["payment_method"],
        isStripeNotComplete,
        stripeCardComplete: values["stripe_card_complete"],
        shouldDisable
      });
      
      setDisable(shouldDisable);
    }
  }, [access_token, values, errors]);

  const handleClick = () => {
    console.log('Place Order clicked - values:', values);
    setIsProcessing(true);
    
    if (settingData?.activation?.guest_checkout && !access_token) {
      // Guest checkout - prepare proper data structure
      const guestOrderData = {
        name: values["name"],
        email: values["email"],
        phone: values["phone"],
        country_code: values["country_code"],
        shipping_address: values["shipping_address"],
        billing_address: values["billing_address"]?.same_shipping 
          ? values["shipping_address"] 
          : values["billing_address"],
        delivery_description: values["delivery_description"] || "standard",
        delivery_interval: values["delivery_interval"] || "",
        payment_method: values["payment_method"],
        products: cartProducts,
        coupon: values["coupon"] || "",
        points_amount: values["points_amount"] || 0,
        wallet_balance: values["wallet_balance"] || 0,
        create_account: values["create_account"] || false, // Required for Laravel guest checkout
        password: values["password"] || "", // Include password if creating account
        password_confirmation: values["password"] || "", // Laravel requires this to match password
        // DON'T send stripe_instance to backend - only use it in frontend
      };
      
      console.log('Guest order data (sending to backend):', guestOrderData);
      
      if (cartProducts?.length > 0) {
        mutate(guestOrderData);
      } else {
        console.error('No products in cart');
        setIsProcessing(false);
      }
    } else {
      // Logged-in user checkout
      if (access_token && values["billing_address_id"] && values["shipping_address_id"] && values["payment_method"]) {
        const targetObject = {
          coupon: values["coupon"] || "",
          billing_address_id: values["billing_address_id"],
          shipping_address_id: values["shipping_address_id"],
          delivery_description: values["delivery_description"] || "standard",
          delivery_interval: values["delivery_interval"] || "",
          points_amount: values["points_amount"] || 0,
          payment_method: values["payment_method"],
          products: cartProducts,
          wallet_balance: values["wallet_balance"] || 0,
          // DON'T send stripe_instance to backend
        };
        
        console.log('Logged in order data (sending to backend):', targetObject);
        
        if (cartProducts?.length > 0) {
          mutate(targetObject);
        } else {
          console.error('No products in cart');
          setIsProcessing(false);
        }
      }
      
      // Digital-only products (logged in user)
      if (addToCartData?.is_digital_only && values["billing_address_id"] && values["payment_method"]) {
        const targetObject1 = {
          coupon: values["coupon"] || "",
          billing_address_id: values["billing_address_id"],
          points_amount: values["points_amount"] || 0,
          payment_method: values["payment_method"],
          products: cartProducts,
          wallet_balance: values["wallet_balance"] || 0,
          // DON'T send stripe_instance to backend
        };
        
        console.log('Digital only order data (sending to backend):', targetObject1);
        
        if (cartProducts?.length > 0) {
          mutate(targetObject1);
        } else {
          console.error('No products in cart');
          setIsProcessing(false);
        }
      }
    }
  };

  return (
    <>
      <div className="text-end">
        {errorOrder && (
          <div className="alert alert-danger mb-3" role="alert">
            <i className="ri-error-warning-line me-2"></i>
            {errorOrder}
          </div>
        )}
        
        {addToCartData?.is_digital_only ? (
          <Btn 
            className="btn btn-solid-default btn-block mt-3 place-order-btn" 
            loading={Number(isLoading || isProcessing)} 
            onClick={handleClick} 
            disabled={values["billing_address_id"] && values["payment_method"] ? false : true}
          >
            {isProcessing ? "Processing..." : t("place_order")}
          </Btn>
        ) : (
          <Btn 
            className="btn btn-solid-default btn-block mt-3 place-order-btn" 
            loading={Number(isLoading || isProcessing)} 
            onClick={handleClick} 
            disabled={disable}
          >
            {isProcessing ? "Processing..." : t("place_order")}
          </Btn>
        )}
      </div>
    </>
  );
};

export default PlaceOrder;
