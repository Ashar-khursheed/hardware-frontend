import SettingContext from "@/Context/SettingContext";
import Link from "next/link";
import React, { useContext, useMemo } from "react";
import { useTranslation } from "react-i18next";
import { RiStarSFill } from "react-icons/ri";
import CartButton from "./Widgets/CartButton";
import ImageVariant from "./Widgets/ImageVariant";
import ProductBoxVariantAttribute from "./Widgets/ProductBoxVariantAttributes";
import ProductHoverButton from "./Widgets/ProductHoverButton";
import "./ProductBoxPremium.scss";

const ProductBox1 = ({ productState, setProductState }) => {
  const { convertCurrency } = useContext(SettingContext);
  const { t } = useTranslation("common");

  const product = productState?.product;
  const selectedVariation = productState?.selectedVariation;
  const isOutOfStock = product?.stock_status === "out_of_stock";

  // Cache display values to avoid re-renders and handle fallbacks properly
  const displayBrand = useMemo(() => product?.brand?.name || "", [product]);
  const displayName = useMemo(() => selectedVariation?.name || product?.name || "Product", [selectedVariation, product]);

  const currentPrice = useMemo(() => {
    return selectedVariation ? Number(selectedVariation.sale_price) : Number(product?.sale_price || 0);
  }, [selectedVariation, product]);

  const oldPrice = useMemo(() => {
    return selectedVariation ? Number(selectedVariation.price) : Number(product?.price || 0);
  }, [selectedVariation, product]);

  const discount = useMemo(() => {
    return selectedVariation?.discount || product?.discount || 0;
  }, [selectedVariation, product]);

  const rating = useMemo(() => product?.reviews_count || 0, [product]);

  return (
    <div className={`ag-product-box-premium ${isOutOfStock ? "out-of-stock" : ""}`}>
      {/* Media Section: Keeps aspect ratio 1:1 using SCSS */}
      <div className="ag-img-wrapper">
        <Link href={`/product/${product?.slug}`} className="ag-image-link">
          <ImageVariant
            thumbnail={selectedVariation?.variation_image || product?.product_thumbnail}
            gallery_images={productState?.product?.product_galleries}
            product={product}
            width={500}
            height={500}
          />
        </Link>

        {/* Status Badges Overlay */}
        <div className="ag-rating-badge">
          <RiStarSFill />
          <span>{rating}</span>
        </div>

        <div className="ag-labels">
          {isOutOfStock && <span className="label-out-of-stock">{t("sold_out")}</span>}
          {product?.is_sale_enable && product?.discount > 0 && <span className="label-sale">{t("sale")}</span>}
          {product?.is_featured && <span className="label-featured">{t("featured")}</span>}
          {product?.is_trending && <span className="label-trending">{t("trending")}</span>}
        </div>

        {/* Hover Actions: Hidden by default in SCSS, shows on hover */}
        <div className="ag-hover-overlay">
          <div className="ag-overlay-content">
            <CartButton
              classes="ag-btn-primary"
              productState={productState}
              selectedVariation={selectedVariation}
              text={t("add_to_cart")}
              iconClass={false}
            />
            <div className="ag-quick-actions">
              <ProductHoverButton productstate={product} />
            </div>
          </div>
        </div>
      </div>

      {/* Content Section */}
      <div className="ag-product-info">
        {displayBrand && (
          <Link href={`/brand/${product?.brand.slug}`} className="ag-brand">
            {displayBrand}
          </Link>
        )}

        <Link href={`/product/${product?.slug}`} className="ag-product-name" title={displayName}>
          {displayName}
        </Link>

        <div className="ag-price-box">
          <span className="ag-current-price">
            ${currentPrice.toFixed(2)}
          </span>

          {currentPrice < oldPrice && (
            <span className="ag-old-price">
              ${oldPrice.toFixed(2)}
            </span>
          )}

          {discount > 0 && (
            <span className="ag-discount-tag">-{discount}% {t("off")}</span>
          )}
        </div>
      </div>

      {/* Variation Selection */}
      <div className="ag-variant-picker">
        <ProductBoxVariantAttribute
          setProductState={setProductState}
          productState={productState}
          showVariableType={["color", "rectangle", "circle", "radio", "dropdown", "image"]}
        />
      </div>
    </div>
  );
};

export default ProductBox1;
