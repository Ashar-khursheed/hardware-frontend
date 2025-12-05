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

  // Submitting data on Checkout for calculation
  useEffect(() => {
    if (!cartProducts || cartProducts.length === 0) return;

    // Guest checkout flow
    if (settingData?.activation?.guest_checkout && !access_token) {
      // Only call API if we have all required guest checkout fields
      const hasRequiredGuestFields = 
        values["name"] && 
        values["email"] && 
        values["phone"] &&
        values["shipping_address"]?.street &&
        values["shipping_address"]?.city &&
        values["shipping_address"]?.pincode &&
        values["shipping_address"]?.country_id &&
        values["shipping_address"]?.state_id &&
        values["payment_method"];
      
      if (hasRequiredGuestFields && cartProducts.length > 0) {
        const guestCheckoutData = {
          name: values["name"],
          email: values["email"],
          phone: values["phone"],
          country_code: values["country_code"],
          shipping_address: values["shipping_address"],
          billing_address: values["billing_address"]?.same_shipping 
            ? values["shipping_address"] 
            : values["billing_address"],
          delivery_description: "standard",
          delivery_interval: values["delivery_interval"] || "",
          payment_method: values["payment_method"],
          products: cartProducts,
          coupon: values["coupon"] || "",
          points_amount: values["points_amount"] || 0,
          wallet_balance: values["wallet_balance"] || 0
        };
        mutate(guestCheckoutData);
      }
    } 
    // Digital only products (logged in user)
    else if (access_token && addToCartData?.is_digital_only) {
      if (values["billing_address_id"] && cartProducts.length > 0) {
        const targetObject = {
          coupon: values["coupon"] || "",
          billing_address_id: values["billing_address_id"],
          points_amount: values["points_amount"] || 0,
          payment_method: values["payment_method"] || "cod", // Default for calculation
          products: cartProducts,
          wallet_balance: values["wallet_balance"] || 0,
        };
        
        console.log('Digital-only - calling /api/checkout:', targetObject);
        mutate(targetObject);
      }
    }
    // Regular checkout with shipping (logged in user)
    else if (access_token && cartProducts.length > 0) {
      const hasRequiredFields = 
        values["billing_address_id"] && 
        values["shipping_address_id"]; // Remove payment_method requirement for API call
      
      if (hasRequiredFields) {
        const targetObject = {
          coupon: values["coupon"] || "",
          billing_address_id: values["billing_address_id"],
          shipping_address_id: values["shipping_address_id"],
          delivery_description: values["delivery_description"] || "standard",
          delivery_interval: values["delivery_interval"] || "",
          points_amount: values["points_amount"] || 0,
          payment_method: values["payment_method"] || "cod", // Default to cod for calculation
          products: cartProducts,
          wallet_balance: values["wallet_balance"] || 0,
        };
        
        console.log('Logged-in user - calling /api/checkout:', targetObject);
        mutate(targetObject);
      }
    }
  }, [
    cartProducts,
    cartTotal,
    values["name"],
    values["email"],
    values["phone"],
    values["shipping_address"],
    values["billing_address"],
    values["billing_address_id"], 
    values["shipping_address_id"],
    values["payment_method"],
    values["points_amount"],
    values["wallet_balance"],
    values["coupon"],
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
