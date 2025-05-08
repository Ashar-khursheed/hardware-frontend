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

  const { data, mutate, isLoading } = useCreate(OrderAPI, false, false, true, (resDta) => {
    if (resDta?.status == 200 || resDta?.status == 201) {
      resDta?.data?.order_number && setGetOrderNumber(resDta?.data?.order_number);
      if ((values["payment_method"] == "cod" || values["payment_method"] == "bank_transfer") && !resDta?.data?.is_guest) {
        router.push(`/account/order/details/${resDta?.data?.order_number}`);
        setCartProducts([]);
      } else if ((values["payment_method"] == "cod" || values["payment_method"] == "bank_transfer") && resDta?.data?.is_guest) {
        const queryParams = new URLSearchParams({ order_number: resDta?.data?.order_number, email_or_phone: resDta?.data?.consumer?.email }).toString();
        router.push(`/order/details/?${queryParams}`);
        setCartProducts([]);
      } else {
        window.open(resDta?.data?.url, "_self");
      }
    } else {
      setErrorOrder(resDta?.data?.message);
    }
  });

  useEffect(() => {
    if (!access_token) {
      setDisable(Object.keys(errors).length > 0);
    } else {
      setDisable(!(values["billing_address_id"] && values["payment_method"]));
    }
  }, [access_token, values, errors]);

  const handleClick = () => {
    if (settingData?.activation?.guest_checkout && !access_token) {
      values["products"] = cartProducts;
      values["products"]?.length > 0 && mutate(values);
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
  };
  return (
    <div className="text-end">
      {addToCartData?.is_digital_only ? (
        <Btn className="order-btn" loading={Number(isLoading)} onClick={handleClick} disabled={values["billing_address_id"] && values["payment_method"] ? false : true}>
          {t("place_order")}
        </Btn>
      ) : (
        <Btn className="order-btn" loading={Number(isLoading)} onClick={handleClick} disabled={disable}>
          {t("place_order")}
        </Btn>
      )}
    </div>
  );
};

export default PlaceOrder;
