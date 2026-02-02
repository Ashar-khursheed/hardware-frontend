import { placeHolderImage } from "@/Components/Widgets/Placeholder";
import CartContext from "@/Context/CartContext";
import SettingContext from "@/Context/SettingContext";
import Image from "next/image";
import React, { useContext } from "react";
import { useTranslation } from "react-i18next";

const SidebarProduct = ({ values }) => {
  const { t } = useTranslation("common");
  const { cartProducts } = useContext(CartContext);
  const { convertCurrency } = useContext(SettingContext);
  return (
    <div className="checkout-details">
      <div className="checkout-section">
        {/* <div className="title-box">
          <span className="step-number">3</span>
          <h4>{t("summary_order")}</h4>
          <p>{t("verify_shipping_option_desc")}</p>
        </div> */}
         <div className="checkout-section-header">
        <span className="step-number">3</span>
        <h4>{t("summary_order")}</h4>
      </div>
        <ul className="qty list-unstyled">
          {cartProducts?.map((item, i) => (
            <li key={i} className="mb-3 border-bottom pb-3">
              {item && (
                <div className="d-flex align-items-center">
                  <div className="cart-image flex-shrink-0 me-3" style={{ width: 70, height: 70, position: 'relative' }}>
                    <Image 
                        src={(
                          item?.variation?.variation_image?.original_url || 
                          item?.product?.product_thumbnail?.original_url || 
                          placeHolderImage
                        )?.replace(/([^:]\/)\/+/g, "$1")} 
                        className="img-fluid object-fit-contain rounded" 
                        alt={item?.product?.name || "product"} 
                        fill
                        sizes="70px"
                    />
                  </div>
                  <div className="cart-content flex-grow-1">
                    <h5 className="mb-1 text-truncate" style={{ maxWidth: '200px' }}>{item?.variation ? item?.variation?.name : item?.product?.name}</h5>
                    <div className="d-flex justify-content-between align-items-center">
                         <h6 className="text-theme mb-0">
                            {item?.variation ? convertCurrency(item?.variation.sale_price) : convertCurrency(item?.product?.sale_price)} <span className="text-muted">x {item.quantity}</span>
                        </h6>
                        <span className="text-theme fw-bold">{convertCurrency((item?.variation ? item?.variation.sale_price : item?.product?.sale_price) * item.quantity)}</span>
                    </div>
                  </div>
                </div>
              )}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default SidebarProduct;
