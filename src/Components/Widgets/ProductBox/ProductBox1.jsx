import SettingContext from "@/Context/SettingContext";
import Link from "next/link";
import React, { useContext } from "react";
import { useTranslation } from "react-i18next";
import { RiStarSFill, RiShoppingCartLine } from "react-icons/ri";
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
  const stock_status = product?.stock_status;
  const isOutOfStock = stock_status === "out_of_stock";

  return (
    <div className={`ag-product-box-premium ${isOutOfStock ? "out-of-stock" : ""}`}>
      <div className="ag-img-wrapper">
        <Link href={`/product/${product?.slug}`}>
          <ImageVariant
            thumbnail={selectedVariation?.variation_image || product?.product_thumbnail}
            gallery_images={product?.product_galleries}
            product={product}
            width={750}
            height={750}
          />
        </Link>

        <div className="ag-rating-badge">
          <RiStarSFill />
          <span>{product?.reviews_count || 0}</span>
        </div>

        <div className="ag-labels">
          {isOutOfStock && <span className="out_of_stock">{t("sold_out")}</span>}
          {product?.is_sale_enable && <span className="sale">{t("sale")}</span>}
          {product?.is_featured && <span className="featured">{t("featured")}</span>}
          {product?.is_trending && <span className="trending">{t("trending")}</span>}
        </div>

        <div className="ag-cart-overlay">
          <CartButton
            classes="ag-add-to-cart-btn"
            productState={productState}
            selectedVariation={selectedVariation}
            text={t("add_to_cart")}
          />
          <ProductHoverButton productstate={product} />
        </div>
      </div>

      <div className="ag-product-info">
        {product?.brand && (
          <Link href={`/brand/${product?.brand.slug}`} className="ag-brand">
            {product?.brand?.name}
          </Link>
        )}

        <Link href={`/product/${product?.slug}`} className="ag-product-name">
          {selectedVariation ? selectedVariation?.name : product?.name}
        </Link>

        <div className="ag-price-box">
          <span className="ag-current-price">
            {selectedVariation
              ? `$${Number(selectedVariation.sale_price).toFixed(2)}`
              : `$${Number(product?.sale_price).toFixed(2)}`}
          </span>

          {(selectedVariation?.price !== selectedVariation?.sale_price ||
            product?.price !== product?.sale_price) && (
              <span className="ag-old-price">
                ${Number(selectedVariation?.price ?? product?.price).toFixed(2)}
              </span>
            )}

          {selectedVariation?.discount && selectedVariation?.discount !== 0 ? (
            <span className="ag-discount-tag">{selectedVariation?.discount}% {t("off")}</span>
          ) : product?.discount && product?.discount !== 0 ? (
            <span className="ag-discount-tag">{product?.discount}% {t("off")}</span>
          ) : null}
        </div>
      </div>

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
