import CartContext from "@/Context/CartContext";
import SettingContext from "@/Context/SettingContext";
import { getImageUrl } from "@/Utils/CustomFunctions/GetImageUrl";
import Image from "next/image";
import React, { useContext } from "react";
import { useTranslation } from "react-i18next";

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
            <li key={i} className="mb-3 border-bottom pb-3">
              {item && (
                <div className="d-flex align-items-center">
                  <div className="cart-image flex-shrink-0 me-3" style={{ width: 70, height: 70, position: 'relative' }}>
                    <Image
                      src={getImageUrl(item?.variation?.variation_image || item?.product?.product_thumbnail || item?.product?.product_galleries?.[0])}
                      className="img-fluid object-fit-contain rounded"
                      alt={item?.product?.name || "product"}
                      fill
                      sizes="70px"
                    />
                  </div>
                  <div className="cart-content flex-grow-1">
                    <div className="d-flex justify-content-between align-items-start mb-1">
                      <h5 className="mb-0 text-truncate" style={{ maxWidth: '160px', fontSize: '14px' }}>{item?.variation ? item?.variation?.name : item?.product?.name}</h5>
                      <button 
                        type="button" 
                        onClick={() => removeCart(item?.variation?.id || item?.product?.id, item.id)}
                        className="btn-close text-muted" 
                        style={{ fontSize: '10px' }}
                      ></button>
                    </div>
                    <div className="d-flex justify-content-between align-items-center">
                      <div className="qty-controls d-flex align-items-center bg-light rounded" style={{ padding: '2px' }}>
                        <button 
                          type="button" 
                          className="btn btn-sm p-0 px-2" 
                          onClick={() => handleIncDec(-1, item?.product, item.quantity, null, null, item?.variation ? {variation_id: item?.variation_id, selectedVariation: item?.variation} : null)}
                        >-</button>
                        <span className="mx-2 small fw-bold">{item.quantity}</span>
                        <button 
                          type="button" 
                          className="btn btn-sm p-0 px-2" 
                          onClick={() => handleIncDec(1, item?.product, item.quantity, null, null, item?.variation ? {variation_id: item?.variation_id, selectedVariation: item?.variation} : null)}
                        >+</button>
                      </div>
                      <span className="text-theme fw-bold" style={{ fontSize: '14px' }}>
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
