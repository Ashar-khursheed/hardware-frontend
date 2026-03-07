import ThemeOptionContext from "@/Context/ThemeOptionsContext";
import Image from "next/image";
import { useContext } from "react";
import { getImageUrl } from "@/Utils/CustomFunctions/GetImageUrl";
import { useTranslation } from "react-i18next";

const PaymentOptions = ({ productState }) => {
  const { themeOption } = useContext(ThemeOptionContext);

  const { t } = useTranslation("common");
  return (
    <>
      {themeOption?.product?.safe_checkout && productState?.product?.safe_checkout ? (
        <div className="paymnet-option">
          <div className="dashed-border-box">
            <h4 className="sub-title">{t("guaranteed_safe_checkout")}</h4>
            {themeOption?.product?.safe_checkout_image && <img src={getImageUrl(themeOption?.product?.safe_checkout_image)} alt="Safe Checkout" className="img-fluid payment-img" style={{ width: "100%", maxWidth: 150, height: "auto" }} />}
          </div>
        </div>
      ) : null}
      {themeOption?.product?.secure_checkout && productState?.product?.secure_checkout ? (
        <div className="dashed-border-box">
          <h4 className="sub-title">{t("secure_checkout")}</h4>
          {themeOption?.product?.secure_checkout_image && <img src={getImageUrl(themeOption?.product?.secure_checkout_image)} alt="Secure Checkout" className="img-fluid security-img mt-1 " style={{ width: "100% !important", maxWidth: "376px !important", height: "auto" }} />}
        </div>
      ) : null}
    </>
  );
};

export default PaymentOptions;
