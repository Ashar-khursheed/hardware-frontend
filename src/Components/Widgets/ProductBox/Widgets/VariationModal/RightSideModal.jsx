import ProductRating from "@/Components/Widgets/ProductRating";
import SettingContext from "@/Context/SettingContext";
import { Href } from "@/Utils/Constants";
import TextLimit from "@/Utils/CustomFunctions/TextLimit";
import { useContext } from "react";
import { useTranslation } from "react-i18next";

const RightVariationModal = ({ cloneVariation }) => {
  const { convertCurrency } = useContext(SettingContext);
  const { t } = useTranslation("common");

  const discount = Number(cloneVariation?.selectedVariation?.discount || cloneVariation?.product?.discount || 0);

  return (
    <>
      <h2 className="main-title">{cloneVariation?.selectedVariation ? cloneVariation?.selectedVariation?.name : cloneVariation?.product?.name}</h2>
      <div className="product-rating">
        <ProductRating totalRating={cloneVariation?.product?.rating_count || 0} />
        <span className="divider">|</span>
        <a href={Href} onClick={(e) => e.preventDefault()}>
          {cloneVariation?.product?.reviews_count || 0} {t("Reviews") || "Reviews"}
        </a>
      </div>
      <div className="price-text">
        <h3>
          <span className="text-dark fw-normal">MRP:</span>
          {cloneVariation?.selectedVariation ? convertCurrency(cloneVariation?.selectedVariation?.sale_price) : convertCurrency(cloneVariation?.product?.sale_price)}
          {(cloneVariation?.selectedVariation?.price > cloneVariation?.selectedVariation?.sale_price || cloneVariation?.product?.price > cloneVariation?.product?.sale_price) && (
            <del className="ms-2">
              {cloneVariation?.selectedVariation ? convertCurrency(cloneVariation?.selectedVariation?.price) : convertCurrency(cloneVariation?.product?.price)}
            </del>
          )}
          {discount > 0 && (
            <span className="discounted-price ms-2">
              {discount}% {t("off") || "OFF"}
            </span>
          )}
        </h3>
        <span className="tax-info">Inclusive of all taxes</span>
      </div>
      <TextLimit classes="description-text" value={cloneVariation?.product?.short_description} maxLength={200} tag={"p"} />
    </>
  );
};

export default RightVariationModal;
