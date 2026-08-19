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
  const { cartProducts, setCartProducts, getTotal } = useContext(CartContext);
  const [getOrderNumber, setGetOrderNumber] = useState("");
  const [errorOrder, setErrorOrder] = useState("");
  const [disable, setDisable] = useState(true);
  const [isProcessing, setIsProcessing] = useState(false);
  const [showBoxMessage, setShowBoxMessage] = useState(null);

  const syncWithShipStation = async (orderRes, orderNumber) => {
    try {
      await fetch('/api/shipstation/create-order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          orderNumber: orderNumber || `ORD-${Date.now()}`,
          orderDate: new Date().toISOString(),
          customerName: values["name"] || values["shipping_address"]?.title || 'Valued Customer',
          customerEmail: values["email"] || orderRes?.consumer?.email || orderRes?.email || '',
          phone: values["phone"] || '',
          shippingAddress: values["shipping_address"] || {},
          billingAddress: values["billing_address"] || {},
          items: cartProducts || [],
          total: Number(values["shipping_cost"] || 0) + Number(getTotal(cartProducts || [])),
          shippingCost: Number(values["shipping_cost"] || 0),
          carrierCode: values["carrier_code"] || 'stamps_com',
          serviceCode: values["service_code"] || 'usps_priority_mail',
          serviceName: values["delivery_description"] || 'USPS Priority Mail',
          paymentMethod: values["payment_method"] || 'cod'
        })
      });
      console.log('ShipStation Order Synced Successfully with accounts@convexns.com');
    } catch (e) {
      console.warn('ShipStation Sync Error:', e);
    }
  };

  const { data, mutate, isLoading } = useCreate(
    OrderAPI, // url
    false, // updateId
    false, // path
    true, // message
    async (resDta) => { // extraFunction
      console.log('Order API Response:', resDta);

      if (resDta?.status == 200 || resDta?.status == 201) {
        const orderNumber = resDta?.data?.order_number || resDta?.order_number;
        orderNumber && setGetOrderNumber(orderNumber);

        const isGuest = resDta?.data?.is_guest || resDta?.is_guest;
        const consumerEmail = resDta?.data?.consumer?.email || resDta?.email || resDta?.data?.email;

        // Sync order to ShipStation account
        await syncWithShipStation(resDta?.data || resDta, orderNumber);

        // Handle Cash on Delivery
        if (values["payment_method"] == "cod" || values["payment_method"] == "bank_transfer") {
          if (!isGuest) {
            router.push(`/account/order/details/${orderNumber}`);
            setCartProducts([]);
          } else {
            const queryParams = new URLSearchParams({
              order_number: orderNumber,
              email_or_phone: consumerEmail
            }).toString();
            router.push(`/order/details/?${queryParams}`);
            setCartProducts([]);
          }
        }
        // Handle Stripe Payment
        else if (values["payment_method"] == "stripe") {
          const redirectUrl = resDta?.data?.url || resDta?.url;
          if (redirectUrl) {
            window.open(redirectUrl, "_self");
          }
          else if (values["stripe_instance"]) {
            await handleStripePayment(resDta?.data || resDta);
          }
        }
        // Handle other payment methods
        else {
          const redirectUrl = resDta?.data?.url || resDta?.url;
          if (redirectUrl) {
            window.open(redirectUrl, "_self");
          }
        }
      } else {
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
    setShowBoxMessage, // setShowBoxMessage
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

      const cardNumberElement = elements.getElement("cardNumber");

      if (!cardNumberElement) {
        throw new Error("Card element not found");
      }

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
      const requiredFieldsFilled = Boolean(
        values["name"] &&
        values["email"] &&
        values["phone"] &&
        values["shipping_address"]?.street &&
        values["shipping_address"]?.city &&
        values["shipping_address"]?.pincode &&
        values["shipping_address"]?.country_id &&
        values["shipping_address"]?.state_id &&
        values["payment_method"]
      );

      const hasCriticalErrors = false;
      const isStripeNotComplete = values["payment_method"] === "stripe" && !values["stripe_card_complete"];
      const shouldDisable = !requiredFieldsFilled || hasCriticalErrors || isStripeNotComplete;

      setDisable(shouldDisable);
    } else {
      const hasRequiredFields = values["billing_address_id"] &&
        values["shipping_address_id"] &&
        values["payment_method"];
      const isStripeNotComplete = values["payment_method"] === "stripe" && !values["stripe_card_complete"];
      const shouldDisable = !hasRequiredFields || isStripeNotComplete;

      setDisable(shouldDisable);
    }
  }, [access_token, values, errors]);

  const handleClick = () => {
    console.log('Place Order clicked - values:', values);
    setIsProcessing(true);

    const shipstationOrderData = {
      shipping_cost: values["shipping_cost"] || 0,
      carrier_code: values["carrier_code"] || "",
      service_code: values["service_code"] || "",
      delivery_description: values["delivery_description"] || "standard",
    };

    if (settingData?.activation?.guest_checkout && !access_token) {
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
        create_account: values["create_account"] || false,
        password: values["password"] || "",
        password_confirmation: values["password"] || "",
        ...shipstationOrderData
      };

      console.log('Guest order data (sending to backend):', guestOrderData);

      if (cartProducts?.length > 0) {
        mutate(guestOrderData);
      } else {
        console.error('No products in cart');
        setIsProcessing(false);
      }
    } else {
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
          ...shipstationOrderData
        };

        console.log('Logged in order data (sending to backend):', targetObject);

        if (cartProducts?.length > 0) {
          mutate(targetObject);
        } else {
          console.error('No products in cart');
          setIsProcessing(false);
        }
      }

      if (addToCartData?.is_digital_only && values["billing_address_id"] && values["payment_method"]) {
        const targetObject1 = {
          coupon: values["coupon"] || "",
          billing_address_id: values["billing_address_id"],
          points_amount: values["points_amount"] || 0,
          payment_method: values["payment_method"],
          products: cartProducts,
          wallet_balance: values["wallet_balance"] || 0,
          ...shipstationOrderData
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
