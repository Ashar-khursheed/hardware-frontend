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
import { ImagePath } from "@/Utils/Constants";

const CheckoutSidebar = ({ values, setFieldValue, errors, addToCartData }) => {
  const [storeCoupon, setStoreCoupon] = useState("");
  const { cartProducts, isLoading: CartLoading, getCartLoading, cartTotal } = useContext(CartContext);
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
      // setErrorCoupon(resDta?.response?.data?.message);
      setStoreCoupon('')
      setAppliedCoupon(null);
      setFieldValue("coupon", "");
      values["coupon"] = "";
    }
  );

  // Submitting data on Checkout
  useEffect(() => {
    if (settingData?.activation?.guest_checkout && !access_token) {
      if (values["delivery_description"] && values["payment_method"]) {
        values["products"] = cartProducts;
        !Object.keys(errors).length > 0 && values["products"]?.length > 0 && mutate(values);
      }
    } else {
      if (access_token && values["billing_address_id"] && values["shipping_address_id"] && values["delivery_description"] && values["payment_method"]) {
        const targetObject = {
          coupon: values["coupon"],
          billing_address_id: values["billing_address_id"],
          shipping_address_id: values["shipping_address_id"],
          delivery_description: values["delivery_description"],
          delivery_interval: values["delivery_interval"],
          points_amount: values["points_amount"],
          payment_method: values["payment_method"],
          products: (values["products"] = cartProducts),
          wallet_balance: values["wallet_balance"],
        };
        values["products"]?.length > 0 && mutate(targetObject);
        if (isLoading) {
          setStoreCoupon("");
        }
      }
      if (addToCartData?.is_digital_only && values["billing_address_id"] && values["payment_method"]) {
        const targetObject1 = {
          coupon: values["coupon"],
          billing_address_id: values["billing_address_id"],
          points_amount: values["points_amount"],
          payment_method: values["payment_method"],
          products: (values["products"] = cartProducts),
          wallet_balance: values["wallet_balance"],
        };
        values["products"]?.length > 0 && mutate(targetObject1);
        if (isLoading) {
          setStoreCoupon("");
        }
      }
    }
  }, [CartLoading, cartTotal, errors, values["points_amount"], values["wallet_balance"], values["billing_address_id"], values["delivery_description"], values["payment_method"], values["shipping_address_id"], values["delivery_interval"]]);

  return (
    <>
      <Col lg="12">
        {cartProducts?.length > 0 ? (
          <div className="checkout-right-box">
            <SidebarProduct values={values} setFieldValue={setFieldValue} />
            <BillingSummary values={values} errors={errors} setFieldValue={setFieldValue} data={resData} errorCoupon={errorCoupon} appliedCoupon={appliedCoupon} setAppliedCoupon={setAppliedCoupon} storeCoupon={storeCoupon} setStoreCoupon={setStoreCoupon} isLoading={isLoading} mutate={mutate} addToCartData={addToCartData} />
          </div>
        ) : (
          <NoDataFound customClass="no-data-added" height={156} width={180} imageUrl={`/assets/svg/empty-items.svg`} title="no_cart_item_desc" />
        )}
      </Col>
    </>
  );
};

export default CheckoutSidebar;
