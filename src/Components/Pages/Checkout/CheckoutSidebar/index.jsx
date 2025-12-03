// import NoDataFound from "@/Components/Widgets/NoDataFound";
// import CartContext from "@/Context/CartContext";
// import SettingContext from "@/Context/SettingContext";
// import { CheckoutAPI } from "@/Utils/AxiosUtils/API";
// import useCreate from "@/Utils/Hooks/useCreate";
// import Cookies from "js-cookie";
// import React, { useContext, useEffect, useState } from "react";
// import { useTranslation } from "react-i18next";
// import { Col } from "reactstrap";
// import BillingSummary from "./BillingSummary";
// import SidebarProduct from "./SidebarProduct";
// import { ImagePath } from "@/Utils/Constants";

// const CheckoutSidebar = ({ values, setFieldValue, errors, addToCartData }) => {
//   const [storeCoupon, setStoreCoupon] = useState("");
//   const { cartProducts, isLoading: CartLoading, getCartLoading, cartTotal } = useContext(CartContext);
//   const { t } = useTranslation("common");
//   const [errorCoupon, setErrorCoupon] = useState("");
//   const [appliedCoupon, setAppliedCoupon] = useState(null);
//   const { settingData } = useContext(SettingContext);
//   const access_token = Cookies.get("uat_multikart");
//   const [resData, setResData] = useState({});

//   const { data, mutate, isLoading } = useCreate(
//     CheckoutAPI,
//     false,
//     false,
//     true,
//     (resDta) => {
//       if (resDta?.status == 200 || resDta?.status == 201) {
//         setResData(resDta);
//         setErrorCoupon("");
//         storeCoupon !== "" && setAppliedCoupon("applied");
//       } else {
//         setErrorCoupon(resDta?.response?.data?.message);
//       }
//     },
//     false,
//     setErrorCoupon,
//     false,
//     false,
//     false,
//     (resDta) => {
//       // setErrorCoupon(resDta?.response?.data?.message);
//       setStoreCoupon('')
//       setAppliedCoupon(null);
//       setFieldValue("coupon", "");
//       values["coupon"] = "";
//     }
//   );

//   // Submitting data on Checkout
//   useEffect(() => {
//     if (settingData?.activation?.guest_checkout && !access_token) {
//       if (values["delivery_description"] && values["payment_method"]) {
//         values["products"] = cartProducts;
//         !Object.keys(errors).length > 0 && values["products"]?.length > 0 && mutate(values);
//       }
//     } else {
//       if (access_token && values["billing_address_id"] && values["shipping_address_id"] && values["delivery_description"] && values["payment_method"]) {
//         const targetObject = {
//           coupon: values["coupon"],
//           billing_address_id: values["billing_address_id"],
//           shipping_address_id: values["shipping_address_id"],
//           delivery_description: values["delivery_description"],
//           delivery_interval: values["delivery_interval"],
//           points_amount: values["points_amount"],
//           payment_method: values["payment_method"],
//           products: (values["products"] = cartProducts),
//           wallet_balance: values["wallet_balance"],
//         };
//         values["products"]?.length > 0 && mutate(targetObject);
//         if (isLoading) {
//           setStoreCoupon("");
//         }
//       }
//       if (addToCartData?.is_digital_only && values["billing_address_id"] && values["payment_method"]) {
//         const targetObject1 = {
//           coupon: values["coupon"],
//           billing_address_id: values["billing_address_id"],
//           points_amount: values["points_amount"],
//           payment_method: values["payment_method"],
//           products: (values["products"] = cartProducts),
//           wallet_balance: values["wallet_balance"],
//         };
//         values["products"]?.length > 0 && mutate(targetObject1);
//         if (isLoading) {
//           setStoreCoupon("");
//         }
//       }
//     }
//           } , [CartLoading, cartTotal, errors, values["points_amount"], values["wallet_balance"], values["billing_address_id"], values["delivery_description"], values["payment_method"], values["shipping_address_id"], values["delivery_interval"]]);

//    return (
//     <>
//       <Col lg="12">
//         {cartProducts?.length > 0 ? (
//           <div className="checkout-right-box">
//             <SidebarProduct values={values} setFieldValue={setFieldValue} />
//             <BillingSummary values={values} errors={errors} setFieldValue={setFieldValue} data={resData} errorCoupon={errorCoupon} appliedCoupon={appliedCoupon} setAppliedCoupon={setAppliedCoupon} storeCoupon={storeCoupon} setStoreCoupon={setStoreCoupon} isLoading={isLoading} mutate={mutate} addToCartData={addToCartData} />
//           </div>
//         ) : (
//           <NoDataFound customClass="no-data-added" height={156} width={180} imageUrl={`/assets/svg/empty-items.svg`} title="no_cart_item_desc" />
//         )}
//       </Col>
//     </>
//   );
// };

// export default CheckoutSidebar;
// import NoDataFound from "@/Components/Widgets/NoDataFound";
// import CartContext from "@/Context/CartContext";
// import SettingContext from "@/Context/SettingContext";
// import { CheckoutAPI } from "@/Utils/AxiosUtils/API";
// import useCreate from "@/Utils/Hooks/useCreate";
// import Cookies from "js-cookie";
// import React, { useContext, useEffect, useState } from "react";
// import { useTranslation } from "react-i18next";
// import { Col } from "reactstrap";
// import BillingSummary from "./BillingSummary";
// import SidebarProduct from "./SidebarProduct";
// import { ImagePath } from "@/Utils/Constants";

// const CheckoutSidebar = ({ values, setFieldValue, errors, addToCartData }) => {
//   const [storeCoupon, setStoreCoupon] = useState("");
//   const { cartProducts, isLoading: CartLoading, getCartLoading, cartTotal, getTotal } = useContext(CartContext);
//   const { t } = useTranslation("common");
//   const [errorCoupon, setErrorCoupon] = useState("");
//   const [appliedCoupon, setAppliedCoupon] = useState(null);
//   const { settingData } = useContext(SettingContext);
//   const access_token = Cookies.get("uat_multikart");
//   const [resData, setResData] = useState({});

//   const { data, mutate, isLoading } = useCreate(
//     CheckoutAPI,
//     false,
//     false,
//     true,
//     (resDta) => {
//       if (resDta?.status == 200 || resDta?.status == 201) {
//         setResData(resDta);
//         setErrorCoupon("");
//         storeCoupon !== "" && setAppliedCoupon("applied");
//       } else {
//         setErrorCoupon(resDta?.response?.data?.message);
//       }
//     },
//     false,
//     setErrorCoupon,
//     false,
//     false,
//     false,
//     (resDta) => {
//       setStoreCoupon('');
//       setAppliedCoupon(null);
//       setFieldValue("coupon", "");
//       values["coupon"] = "";
//     }
//   );

//   // Submitting data on Checkout
//   useEffect(() => {
//     if (!cartProducts || cartProducts.length === 0) return;

//     // Guest checkout flow
//     if (settingData?.activation?.guest_checkout && !access_token) {
//       // Check if we have the basic required fields to make API call
//       const hasBasicInfo = values["name"] && values["email"];
      
//       // Check if shipping address has minimum required fields
//       const hasShippingAddress = 
//         values["shipping_address"]?.street && 
//         values["shipping_address"]?.city && 
//         values["shipping_address"]?.country_id && 
//         values["shipping_address"]?.state_id &&
//         values["shipping_address"]?.pincode;
      
//       // Check if billing address is filled or same as shipping
//       const hasBillingAddress = 
//         values["billing_address"]?.same_shipping || 
//         (values["billing_address"]?.street && 
//          values["billing_address"]?.city && 
//          values["billing_address"]?.country_id && 
//          values["billing_address"]?.state_id &&
//          values["billing_address"]?.pincode);

//       const hasDeliveryAndPayment = 
//         values["delivery_description"] && 
//         values["payment_method"];
      
//       // Call API if we have all required data
//       if (hasBasicInfo && hasShippingAddress && hasBillingAddress && hasDeliveryAndPayment) {
//         const guestCheckoutData = {
//           ...values,
//           products: cartProducts
//         };
//         mutate(guestCheckoutData);
//       }
//     } 
//     // Digital only products (logged in user)
//     else if (access_token && addToCartData?.is_digital_only) {
//       if (values["billing_address_id"] && values["payment_method"]) {
//         const targetObject = {
//           coupon: values["coupon"],
//           billing_address_id: values["billing_address_id"],
//           points_amount: values["points_amount"],
//           payment_method: values["payment_method"],
//           products: cartProducts,
//           wallet_balance: values["wallet_balance"],
//         };
//         mutate(targetObject);
//       }
//     }
//     // Regular checkout with shipping (logged in user)
//     else if (access_token) {
//       const hasRequiredFields = 
//         values["billing_address_id"] && 
//         values["shipping_address_id"] && 
//         values["delivery_description"] && 
//         values["payment_method"];
      
//       if (hasRequiredFields) {
//         const targetObject = {
//           coupon: values["coupon"],
//           billing_address_id: values["billing_address_id"],
//           shipping_address_id: values["shipping_address_id"],
//           delivery_description: values["delivery_description"],
//           delivery_interval: values["delivery_interval"],
//           points_amount: values["points_amount"],
//           payment_method: values["payment_method"],
//           products: cartProducts,
//           wallet_balance: values["wallet_balance"],
//         };
//         mutate(targetObject);
//       }
//     }
//   }, [
//     cartProducts,
//     cartTotal,
//     values["name"],
//     values["email"],
//     values["shipping_address"]?.street,
//     values["shipping_address"]?.city,
//     values["shipping_address"]?.country_id,
//     values["shipping_address"]?.state_id,
//     values["shipping_address"]?.pincode,
//     values["billing_address"]?.same_shipping,
//     values["billing_address"]?.street,
//     values["billing_address"]?.city,
//     values["billing_address"]?.country_id,
//     values["billing_address"]?.state_id,
//     values["billing_address"]?.pincode,
//     values["billing_address_id"], 
//     values["shipping_address_id"],
//     values["delivery_description"],
//     values["delivery_interval"],
//     values["payment_method"],
//     values["points_amount"],
//     values["wallet_balance"],
//     values["coupon"],
//     access_token,
//     settingData?.activation?.guest_checkout
//   ]);

//   return (
//     <>
//       <Col lg="12">
//         {cartProducts?.length > 0 ? (
//           <div className="checkout-right-box">
//             <SidebarProduct values={values} setFieldValue={setFieldValue} />
//             <BillingSummary 
//               values={values} 
//               errors={errors} 
//               setFieldValue={setFieldValue} 
//               data={resData} 
//               errorCoupon={errorCoupon} 
//               appliedCoupon={appliedCoupon} 
//               setAppliedCoupon={setAppliedCoupon} 
//               storeCoupon={storeCoupon} 
//               setStoreCoupon={setStoreCoupon} 
//               isLoading={isLoading} 
//               mutate={mutate} 
//               addToCartData={addToCartData}
//               cartTotal={getTotal(cartProducts)}
//             />
//           </div>
//         ) : (
//           <NoDataFound 
//             customClass="no-data-added" 
//             height={156} 
//             width={180} 
//             imageUrl={`/assets/svg/empty-items.svg`} 
//             title="no_cart_item_desc" 
//           />
//         )}
//       </Col>
//     </>
//   );
// };

// export default CheckoutSidebar;

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

  // Submitting data on Checkout
  useEffect(() => {
    if (!cartProducts || cartProducts.length === 0) return;

    // Guest checkout flow
    if (settingData?.activation?.guest_checkout && !access_token) {
      // Just need delivery method and payment method to get initial calculation
      const hasDeliveryAndPayment = values["delivery_description"] && values["payment_method"];
      
      if (hasDeliveryAndPayment && cartProducts.length > 0) {
        const guestCheckoutData = {
          ...values,
          products: cartProducts
        };
        mutate(guestCheckoutData);
      }
    } 
    // Digital only products (logged in user)
    else if (access_token && addToCartData?.is_digital_only) {
      if (values["billing_address_id"] && values["payment_method"] && cartProducts.length > 0) {
        const targetObject = {
          coupon: values["coupon"],
          billing_address_id: values["billing_address_id"],
          points_amount: values["points_amount"],
          payment_method: values["payment_method"],
          products: cartProducts,
          wallet_balance: values["wallet_balance"],
        };
        mutate(targetObject);
      }
    }
    // Regular checkout with shipping (logged in user)
    else if (access_token && cartProducts.length > 0) {
      const hasRequiredFields = 
        values["billing_address_id"] && 
        values["shipping_address_id"] && 
        values["delivery_description"] && 
        values["payment_method"];
      
      if (hasRequiredFields) {
        const targetObject = {
          coupon: values["coupon"],
          billing_address_id: values["billing_address_id"],
          shipping_address_id: values["shipping_address_id"],
          delivery_description: values["delivery_description"],
          delivery_interval: values["delivery_interval"],
          points_amount: values["points_amount"],
          payment_method: values["payment_method"],
          products: cartProducts,
          wallet_balance: values["wallet_balance"],
        };
        mutate(targetObject);
      }
    }
  }, [
    cartProducts,
    cartTotal,
    values["billing_address_id"], 
    values["shipping_address_id"],
    values["delivery_description"],
    values["delivery_interval"],
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