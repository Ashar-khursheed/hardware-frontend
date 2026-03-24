import CartContext from "@/Context/CartContext";
import SettingContext from "@/Context/SettingContext";
import { getImageUrl } from "@/Utils/CustomFunctions/GetImageUrl";
import Image from "next/image";
import React, { useContext } from "react";
import { useTranslation } from "react-i18next";
import { RiCloseLine } from "react-icons/ri";

const SidebarProduct = ({ values }) => {
  const { t } = useTranslation("common");
  const { cartProducts, handleIncDec, removeCart } = useContext(CartContext);
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
            <li key={i} className="mb-4 hbx-cart-card">
              {item && (
                <div className="hbx-cart-item-wrap">
                  {/* Top Section: Image & Close Button */}
                  <div className="d-flex position-relative">
                    <div className="hbx-cart-image">
                       <Image
                        src={getImageUrl(item?.variation?.variation_image || item?.product?.product_thumbnail || item?.product?.product_galleries?.[0])}
                        className="img-fluid object-fit-contain rounded"
                        alt={item?.product?.name || "product"}
                        fill
                        sizes="80px"
                      />
                    </div>
                    
                    <div className="hbx-cart-info">
                      <h5 className="hbx-product-title">
                        {item?.variation ? item?.variation?.name : item?.product?.name}
                      </h5>
                      <div className="hbx-price-qty-row">
                         <span className="hbx-unit-price">
                           {convertCurrency(item?.variation ? item?.variation.sale_price : item?.product?.sale_price)}
                         </span>
                         
                         <div className="hbx-qty-selector">
                            <button type="button" onClick={() => handleIncDec(-1, item?.product, item.quantity, null, null, item?.variation ? {variation_id: item?.variation_id, selectedVariation: item?.variation} : null)}>-</button>
                            <span>{item.quantity}</span>
                            <button type="button" onClick={() => handleIncDec(1, item?.product, item.quantity, null, null, item?.variation ? {variation_id: item?.variation_id, selectedVariation: item?.variation} : null)}>+</button>
                         </div>
                      </div>
                    </div>

                    <button 
                      type="button" 
                      onClick={() => removeCart(item?.variation?.id || item?.product?.id, item.id)}
                      className="hbx-cart-remove"
                    >
                      <RiCloseLine />
                    </button>
                  </div>

                  <div className="hbx-cart-divider"></div>

                  {/* Bottom Section: Subtotal */}
                  <div className="hbx-cart-subtotal-row row align-items-center">
                    <div className="col-6">
                      <span className="hbx-label">SUBTOTAL:</span>
                    </div>
                    <div className="col-6 text-end">
                      <span className="hbx-total">
                        {convertCurrency((item?.variation ? item?.variation.sale_price : item?.product?.sale_price) * item.quantity)}
                      </span>
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
