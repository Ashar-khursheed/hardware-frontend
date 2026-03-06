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

  // Robust data extraction with fallbacks
  const isOutOfStock = useMemo(() => (product?.stock_status === "out_of_stock") || (product?.quantity <= 0), [product]);
  const displayBrand = useMemo(() => product?.brand?.name || "", [product]);
  const displayName = useMemo(() => selectedVariation?.name || product?.name || "Product", [selectedVariation, product]);

  const currentPrice = useMemo(() => {
    const p = selectedVariation ? selectedVariation.sale_price : product?.sale_price;
    return Number(p || 0);
  }, [selectedVariation, product]);

  const oldPrice = useMemo(() => {
    const p = selectedVariation ? selectedVariation.price : product?.price;
    return Number(p || 0);
  }, [selectedVariation, product]);

  const discount = useMemo(() => {
    const d = selectedVariation?.discount || product?.discount;
    return Number(d || 0);
  }, [selectedVariation, product]);

  const reviewsCount = useMemo(() => Number(product?.reviews_count || 0), [product]);

  return (
    <div className={`ag-product-box-premium ${isOutOfStock ? "is-sold-out" : ""}`}>
      {/* Media Section */}
      <div className="ag-img-wrapper">
        <Link href={`/product/${product?.slug}`} className="ag-image-link">
          <ImageVariant
            thumbnail={selectedVariation?.variation_image || product?.product_thumbnail}
            gallery_images={product?.product_galleries}
            product={product}
            width={750}
            height={750}
          />
        </Link>

        {/* Indicators */}
        <div className="ag-top-overlay">
          <div className="ag-rating-badge">
            <RiStarSFill />
            <span>{reviewsCount}</span>
          </div>

          <div className="ag-labels">
            {isOutOfStock && <span className="label-out-of-stock">{t("sold_out") || "Sold Out"}</span>}
            {product?.is_sale_enable && discount > 0 && <span className="label-sale">{t("sale") || "Sale"}</span>}
            {product?.is_featured && <span className="label-featured">{t("featured") || "Featured"}</span>}
            {product?.is_trending && <span className="label-trending">{t("trending") || "Trending"}</span>}
          </div>
        </div>

        {/* Actions Overlay */}
        <div className="ag-hover-overlay">
          <div className="ag-overlay-inner">
            <CartButton
              classes="ag-cart-btn-premium"
              productState={productState}
              selectedVariation={selectedVariation}
              text={t("add_to_cart") || "Add to Cart"}
            />
            <div className="ag-quick-btns">
              <ProductHoverButton productstate={product} />
            </div>
          </div>
        </div>
      </div>

      {/* Info Section */}
      <div className="ag-product-details">
        {displayBrand && (
          <Link href={`/brand/${product?.brand?.slug}`} className="ag-brand-link">
            {displayBrand}
          </Link>
        )}

        <Link href={`/product/${product?.slug}`} className="ag-title-link" title={displayName}>
          {displayName}
        </Link>

        <div className="ag-price-container">
          <span className="ag-price-now">
            {convertCurrency(currentPrice)}
          </span>

          {currentPrice < oldPrice && (
            <span className="ag-price-old">
              {convertCurrency(oldPrice)}
            </span>
          )}

          {discount > 0 && (
            <span className="ag-discount-badge">{discount}% {t("off") || "OFF"}</span>
          )}
        </div>
      </div>

      {/* Variants Picker */}
      <div className="ag-variants-section">
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
