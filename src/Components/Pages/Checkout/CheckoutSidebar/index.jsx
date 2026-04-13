import NoDataFound from "@/Components/Widgets/NoDataFound";
import CartContext from "@/Context/CartContext";
import SettingContext from "@/Context/SettingContext";
import { CheckoutAPI } from "@/Utils/AxiosUtils/API";
import useCreate from "@/Utils/Hooks/useCreate";
import Cookies from "js-cookie";
import React, { useContext, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Col } from "reactstrap";
import BillingSummary from "./BillingSummary";
import SidebarProduct from "./SidebarProduct";

const CheckoutSidebar = ({ values, setFieldValue, errors, addToCartData }) => {
  const [storeCoupon, setStoreCoupon] = useState("");
  const { cartProducts, isLoading: CartLoading, getCartLoading, cartTotal, getTotal } = useContext(CartContext);
  const { t } = useTranslation("common");
  const [errorCoupon, setErrorCoupon] = useState("");
  const [appliedCoupon, setAppliedCoupon] = useState(null);
  const { settingData } = useContext(SettingContext);
  const access_token = Cookies.get("uat_multikart");
  const [resData, setResData] = useState({});

  const { data, mutate, isLoading } = useCreate(
    CheckoutAPI,
    false,
    false,
    true,
    (resDta) => {
      if (resDta?.status == 200 || resDta?.status == 201) {
        setResData(resDta);
        setErrorCoupon("");
        storeCoupon !== "" && setAppliedCoupon("applied");
      } else {
        setErrorCoupon(resDta?.response?.data?.message);
      }
    },
    false,
    setErrorCoupon,
    false,
    false,
    false,
    (resDta) => {
      setStoreCoupon('');
      setAppliedCoupon(null);
      setFieldValue("coupon", "");
      values["coupon"] = "";
    }
  );

  const [debouncedValues, setDebouncedValues] = useState(values);

  // Debouncing the typing-heavy values to avoid excessive API calls
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValues(values);
    }, 5000); // Wait for 5 seconds as requested

    return () => clearTimeout(handler);
  }, [
    values["name"],
    values["email"],
    values["phone"],
    values["shipping_address"],
    values["billing_address"],
    values["coupon"],
  ]);

  // Handle immediate changes for non-typing fields
  useEffect(() => {
    const typingFields = ["name", "email", "phone", "shipping_address", "billing_address", "coupon"];
    let changed = false;
    
    // If any non-typing field changed, update debouncedValues immediately
    Object.keys(values).forEach(key => {
      if (!typingFields.includes(key) && values[key] !== debouncedValues[key]) {
        changed = true;
      }
    });

    if (changed) {
      setDebouncedValues(values);
    }
  }, [
    values["billing_address_id"],
    values["shipping_address_id"],
    values["payment_method"],
    values["points_amount"],
    values["wallet_balance"],
    values["delivery_description"],
    values["delivery_interval"]
  ]);

  // Submitting data on Checkout for calculation
  useEffect(() => {
    if (!cartProducts || cartProducts.length === 0) return;

    // Guest checkout flow
    if (settingData?.activation?.guest_checkout && !access_token) {
      // Only call API if we have all required guest checkout fields
      const hasRequiredGuestFields = 
        debouncedValues["name"] && 
        debouncedValues["email"] && 
        debouncedValues["phone"] &&
        debouncedValues["shipping_address"]?.street &&
        debouncedValues["shipping_address"]?.city &&
        debouncedValues["shipping_address"]?.pincode &&
        debouncedValues["shipping_address"]?.country_id &&
        debouncedValues["shipping_address"]?.state_id &&
        debouncedValues["payment_method"];
      
      if (hasRequiredGuestFields && cartProducts.length > 0) {
        const guestCheckoutData = {
          name: debouncedValues["name"],
          email: debouncedValues["email"],
          phone: debouncedValues["phone"],
          country_code: debouncedValues["country_code"],
          shipping_address: debouncedValues["shipping_address"],
          billing_address: debouncedValues["billing_address"]?.same_shipping 
            ? debouncedValues["shipping_address"] 
            : debouncedValues["billing_address"],
          delivery_description: "standard",
          delivery_interval: debouncedValues["delivery_interval"] || "",
          payment_method: debouncedValues["payment_method"],
          products: cartProducts,
          coupon: debouncedValues["coupon"] || "",
          points_amount: debouncedValues["points_amount"] || 0,
          wallet_balance: debouncedValues["wallet_balance"] || 0
        };
        mutate(guestCheckoutData);
      }
    } 
    // Digital only products (logged in user)
    else if (access_token && addToCartData?.is_digital_only) {
      if (debouncedValues["billing_address_id"] && cartProducts.length > 0) {
        const targetObject = {
          coupon: debouncedValues["coupon"] || "",
          billing_address_id: debouncedValues["billing_address_id"],
          points_amount: debouncedValues["points_amount"] || 0,
          payment_method: debouncedValues["payment_method"] || "cod", // Default for calculation
          products: cartProducts,
          wallet_balance: debouncedValues["wallet_balance"] || 0,
        };
        
        console.log('Digital-only - calling /api/checkout:', targetObject);
        mutate(targetObject);
      }
    }
    // Regular checkout with shipping (logged in user)
    else if (access_token && cartProducts.length > 0) {
      const hasRequiredFields = 
        debouncedValues["billing_address_id"] && 
        debouncedValues["shipping_address_id"]; // Remove payment_method requirement for API call
      
      if (hasRequiredFields) {
        const targetObject = {
          coupon: debouncedValues["coupon"] || "",
          billing_address_id: debouncedValues["billing_address_id"],
          shipping_address_id: debouncedValues["shipping_address_id"],
          delivery_description: debouncedValues["delivery_description"] || "standard",
          delivery_interval: debouncedValues["delivery_interval"] || "",
          points_amount: debouncedValues["points_amount"] || 0,
          payment_method: debouncedValues["payment_method"] || "cod", // Default to cod for calculation
          products: cartProducts,
          wallet_balance: debouncedValues["wallet_balance"] || 0,
        };
        
        console.log('Logged-in user - calling /api/checkout:', targetObject);
        mutate(targetObject);
      }
    }
  }, [
    cartProducts,
    cartTotal,
    debouncedValues,
    access_token,
    settingData?.activation?.guest_checkout
  ]);

  return (
    <>
      <Col lg="12">
        {cartProducts?.length > 0 ? (
          <div className="checkout-right-box">
            <SidebarProduct values={values} setFieldValue={setFieldValue} />
            <BillingSummary 
              values={values} 
              errors={errors} 
              setFieldValue={setFieldValue} 
              data={resData} 
              errorCoupon={errorCoupon} 
              appliedCoupon={appliedCoupon} 
              setAppliedCoupon={setAppliedCoupon} 
              storeCoupon={storeCoupon} 
              setStoreCoupon={setStoreCoupon} 
              isLoading={isLoading} 
              mutate={mutate} 
              addToCartData={addToCartData}
              cartTotal={getTotal(cartProducts)}
            />
          </div>
        ) : (
          <NoDataFound 
            customClass="no-data-added" 
            height={156} 
            width={180} 
            imageUrl={`/assets/svg/empty-items.svg`} 
            title="no_cart_item_desc" 
          />
        )}
      </Col>
    </>
  );
};

export default CheckoutSidebar;
