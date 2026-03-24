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
                      <h5 className="mb-0 text-truncate" style={{ maxWidth: '180px', fontSize: '15px' }}>
                        {item?.variation ? item?.variation?.name : item?.product?.name}
                      </h5>
                      <button 
                        type="button" 
                        onClick={() => removeCart(item?.variation?.id || item?.product?.id, item.id)}
                        className="btn-close-custom text-danger" 
                        style={{ background: 'none', border: 'none', padding: '0 5px' }}
                      >
                         <svg width="14" height="14" fill="currentColor" viewBox="0 0 16 16">
                            <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"/>
                            <path fillRule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"/>
                         </svg>
                      </button>
                    </div>
                    <div className="d-flex justify-content-between align-items-center mt-2">
                      <div className="qty-controls d-flex align-items-center bg-light rounded shadow-sm" style={{ padding: '4px 10px', border: '1px solid #eee' }}>
                        <button 
                          type="button" 
                          className="btn btn-sm p-0 px-2 fw-bold" 
                          style={{ fontSize: '18px', color: '#ff5050' }}
                          onClick={() => handleIncDec(-1, item?.product, item.quantity, null, null, item?.variation ? {variation_id: item?.variation_id, selectedVariation: item?.variation} : null)}
                        >-</button>
                        <span className="mx-3 small fw-bold" style={{ fontSize: '15px' }}>{item.quantity}</span>
                        <button 
                          type="button" 
                          className="btn btn-sm p-0 px-2 fw-bold" 
                          style={{ fontSize: '18px', color: '#ff5050' }}
                          onClick={() => handleIncDec(1, item?.product, item.quantity, null, null, item?.variation ? {variation_id: item?.variation_id, selectedVariation: item?.variation} : null)}
                        >+</button>
                      </div>
                      <span className="text-theme fw-bold" style={{ fontSize: '15px', color: '#ff5050' }}>
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
