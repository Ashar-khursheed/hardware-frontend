import AccountContext from "@/Context/AccountContext";
import CompareContext from "@/Context/CompareContext";
import ThemeOptionContext from "@/Context/ThemeOptionsContext";
import { useMutation } from "@tanstack/react-query";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import { useContext } from "react";
import request from "../AxiosUtils";
import { CompareAPI, LoginAPI, SyncCart } from "../AxiosUtils/API";
import { YupObject, emailSchema, passwordSchema, recaptchaSchema } from "../Validation/ValidationSchema";
import CartContext from "@/Context/CartContext";
import useCreate from "./useCreate";
import WishlistContext from "@/Context/WishlistContext";

export const LogInSchema = YupObject({
  email: emailSchema,
  password: passwordSchema,
  recaptcha: recaptchaSchema,
});

const transformLocalStorageData = (localStorageData) => {
  const transformedData = localStorageData?.map((item) => ({
    product_id: item?.product_id,
    variation_id: item?.variation_id || "",
    quantity: item?.quantity,
  }));

  return transformedData;
};
// const LoginHandle = (responseData, router, refetch, compareRefetch, setOpenAuthModal, setShowBoxMessage) => {
//   if (responseData.status === 200 || responseData.status === 201) {
//     Cookies.set("uat_multikart", responseData.data?.access_token, { path: "/", expires: new Date(Date.now() + 24 * 60 * 6000) });
//     const ISSERVER = typeof window === "undefined";
//     if (typeof window !== "undefined") {
//       Cookies.set("account_multikart", JSON.stringify(responseData.data));
//       localStorage.setItem("account_multikart", JSON.stringify(responseData.data));
//     }
//     refetch();
//     compareRefetch();
//     setOpenAuthModal(false);
//   } else {
//     setShowBoxMessage(responseData?.response.data.message);
//   }
// };

const LoginHandle = (responseData, router, refetch, compareRefetch, CallBackUrl, mutate, cartRefetch, setShowBoxMessage, addToWishlist, compareCartMutate, setOpenAuthModal) => {
  if (responseData.status === 200 || responseData.status === 201) {
    Cookies.set("uat_multikart", responseData.data?.access_token, { path: "/", expires: new Date(Date.now() + 24 * 60 * 6000) });
    const ISSERVER = typeof window === "undefined";
    if (typeof window !== "undefined") {
      Cookies.set("account_multikart", JSON.stringify(responseData.data));
      localStorage.setItem("account_multikart", JSON.stringify(responseData.data));
    }
    router.push(`${CallBackUrl}`);

    const oldCartValue = JSON.parse(localStorage.getItem("cart"))?.items;
    oldCartValue?.length > 0 && mutate(transformLocalStorageData(oldCartValue));
    refetch();
    compareRefetch();
    setOpenAuthModal(false);
    cartRefetch();
    const wishListID = Cookies.get("wishListID");
    const CompareId = Cookies.get("compareId");
    CompareId ? compareCartMutate({ product_id: CompareId }) : null;
    const productObj = { id: wishListID };
    wishListID ? addToWishlist(productObj) : null;
    Cookies.remove("wishListID");
    Cookies.remove("compareId");
    localStorage.removeItem("cart");
  } else {
    setShowBoxMessage(responseData.response.data.message);
  }
};

// const useHandleLogin = (setShowBoxMessage) => {
//   const { refetch } = useContext(AccountContext);
//   const { setOpenAuthModal } = useContext(ThemeOptionContext);
//   const { refetch: compareRefetch } = useContext(CompareContext);
//   const router = useRouter();
//   return useMutation(
//     (data) =>
//       request({
//         url: LoginAPI,
//         method: "post",
//         data,
//       }),
//     {
//       onSuccess: (responseData) => LoginHandle(responseData, router, refetch, compareRefetch, setOpenAuthModal, setShowBoxMessage),
//     }
//   );
// };

// export default useHandleLogin;

const useHandleLogin = (setShowBoxMessage) => {
  const { setOpenAuthModal } = useContext(ThemeOptionContext);
  const { mutate } = useCreate(SyncCart, false, false, "No");
  const { addToWishlist } = useContext(WishlistContext);
  const { mutate: compareCartMutate } = useCreate(CompareAPI, false, false, "Added to Compare List");
  const CallBackUrl = Cookies.get("CallBackUrl") ? Cookies.get("CallBackUrl") : "/account/dashboard";
  const { refetch } = useContext(AccountContext);
  const { refetch: cartRefetch } = useContext(CartContext);
  const { refetch: compareRefetch } = useContext(CompareContext);
  const router = useRouter();
  return useMutation((data) => request({ url: LoginAPI, method: "post", data }), {
    onSuccess: (responseData) => LoginHandle(responseData, router, refetch, compareRefetch, CallBackUrl, mutate, cartRefetch, setShowBoxMessage, addToWishlist, compareCartMutate, setOpenAuthModal),
  });
};

export default useHandleLogin;
