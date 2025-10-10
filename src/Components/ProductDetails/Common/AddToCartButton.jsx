import Btn from "@/Elements/Buttons/Btn";
import { useTranslation } from "react-i18next";
import { RiShoppingCartLine } from "react-icons/ri";

const AddToCartButton = ({ productState, addToCart, isLoading, buyNow, extraOption }) => {
  const { t } = useTranslation("common");
  const externalProductLink = (link) => {
    if (link) {
      window.open(link, "_blank");
    }
  };
  return (
    <div className="product-buy-btn-group">
      {!productState?.product?.is_external ? (
        <>
          {productState?.product?.type == "simple" ? (
            <Btn color="transparent" className={`btn-animation  buy-button ${productState?.product?.status === 0 || productState?.product?.stock_status == "out_of_stock" || productState?.product?.quantity < productState?.productQty ? "btn-md scroll-button" : "bg-theme btn-md scroll-button"}`} onClick={addToCart} disabled={productState?.product?.status === 0 || productState?.product?.stock_status == "out_of_stock" || productState?.product?.quantity < productState?.productQty}>
              {productState?.product?.stock_status == "out_of_stock" || productState?.product?.quantity < productState?.productQty ? null : (
                <div className="d-inline-block ring-animation">
                  <RiShoppingCartLine className="me-2" />
                </div>
              )}
              {productState?.product?.stock_status == "out_of_stock" || productState?.product?.quantity < productState?.productQty ? t("out_of_stock") : t("add_to_cart")}
            </Btn>
          ) : (
            <Btn color="transparent" className={`btn-animation buy-button ${productState?.selectedVariation ? (productState?.product?.status === 0 || productState?.product?.variations.every((data) => data.status === 0) || productState?.selectedVariation?.stock_status == "out_of_stock" || productState?.selectedVariation?.quantity < productState?.productQty ? "btn-md scroll-button" : "bg-theme btn-md scroll-button") : "bg-theme btn-md scroll-button"}`} disabled={productState?.selectedVariation ? productState?.product?.status === 0 || productState?.product?.variations.every((data) => data.status === 0) || productState?.selectedVariation?.stock_status == "out_of_stock" || productState?.selectedVariation?.quantity < productState?.productQty : true} onClick={addToCart}>
              {productState?.product?.status === 0 || productState?.product?.variations?.every((data) => data.status === 0) || productState?.selectedVariation?.stock_status == "out_of_stock" || productState?.selectedVariation?.quantity < productState?.productQty ? null : (
                <div className="d-inline-block ring-animation">
                  <RiShoppingCartLine className="me-2" />
                </div>
              )}
              {productState?.selectedVariation ? (productState?.selectedVariation?.stock_status == "out_of_stock" || productState?.selectedVariation?.quantity < productState?.productQty ? t("OutOfStock") : t("add_to_cart")) : productState?.product?.stock_status == "out_of_stock" ? t("out_of_stock") : t("add_to_cart")}
            </Btn>
          )}
          {extraOption !== false ? (
            productState?.product?.type == "simple" ? (
              <Btn className=" buy-button" onClick={buyNow} disabled={productState?.product?.status === 0 || productState?.product?.stock_status == "out_of_stock" || productState?.product?.quantity < productState?.productQty ? true : false}>
                {t("buy_now")}
              </Btn>
            ) : (
              <>
                <Btn className=" buy-button" onClick={buyNow} disabled={productState?.product?.status === 0 || productState?.product?.variations?.every((data) => data.status === 0) || productState?.selectedVariation?.stock_status == "out_of_stock" || productState?.product?.stock_status == "out_of_stock" ? true : false}>
                  {t("buy_now")}
                </Btn>
              </>
            )
          ) : null}
        </>
      ) : (
        <Btn className="btn-md bg-theme scroll-button" onClick={externalProductLink(productState.product.external_url)}>
          {productState?.product?.external_button_text ? productState?.product?.external_button_text : t("buy_now")}
        </Btn>
      )}
    </div>
  );
};

export default AddToCartButton;
