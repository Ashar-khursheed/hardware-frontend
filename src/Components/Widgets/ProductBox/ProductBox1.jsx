import SettingContext from "@/Context/SettingContext";
import Link from "next/link";
import React, { useContext } from "react";
import { useTranslation } from "react-i18next";
import { RiStarSFill } from "react-icons/ri";
import CartButton from "./Widgets/CartButton";
import ImageVariant from "./Widgets/ImageVariant";
import ProductBoxVariantAttribute from "./Widgets/ProductBoxVariantAttributes";
import ProductHoverButton from "./Widgets/ProductHoverButton";


const ProductBox1 = ({ productState, setProductState }) => {
  const { convertCurrency } = useContext(SettingContext);
  const { t } = useTranslation("common");

  // hello

  return (
    <div
      className={`basic-product ${productState?.product?.stock_status === "out_of_stock" ? "sold-out" : ""
        }`}
    >
      <div className="img-wrapper">
        <ImageVariant
          thumbnail={
            productState?.selectedVariation?.variation_image
              ? productState?.selectedVariation?.variation_image
              : productState?.product?.product_thumbnail
          }
          gallery_images={productState?.product?.product_galleries}
          product={productState?.product}
          width={750}
          height={750}
        />

        <div className="rating-label">
          <RiStarSFill />
          <span>{productState?.product?.reviews_count}</span>
        </div>

        {/* new commentttt */}

        <div className="cart-info">
          <CartButton
            classes={"addto-cart-bottom"}
            productState={productState}
            selectedVariation={productState?.selectedVariation}
            text="Add to Cart"
          />
          <ProductHoverButton productstate={productState?.product} />
        </div>

        <ul className="trending-label">
          {productState?.product?.stock_status === "out_of_stock" ? (
            <li className="out_of_stock">{t("sold_out")}</li>
          ) : null}
          {productState?.product?.is_sale_enable ? <li>{t("sale")}</li> : null}
          {productState?.product?.is_featured ? <li>{t("featured")}</li> : null}
          {productState?.product?.is_trending ? <li>{t("trending")}</li> : null}
        </ul>
      </div>
      <div className="product-detail">
        {productState?.product?.brand && (
          <Link
            className="product-title"
            href={`/brand/${productState?.product?.brand.slug}`}
            legacyBehavior>
            <a> {productState?.product?.brand?.name}</a> 
          </Link>
        )}

        <Link href={`/product/${productState?.product?.slug}`} legacyBehavior>
          <h6>
            {productState?.selectedVariation
              ? productState?.selectedVariation?.name
              : productState?.product?.name}
          </h6>
        </Link>

        <h4 className="price">
          {productState?.selectedVariation
            ? `$${Number(productState?.selectedVariation.sale_price).toFixed(2)}`
            : `$${Number(productState?.product?.sale_price).toFixed(2)}`}

          {productState?.selectedVariation ? (
            <>
              {(productState?.selectedVariation?.price !== productState?.selectedVariation?.sale_price ||
                productState?.product?.price !== productState?.product?.sale_price) && (
                  <del>
                    ${Number(productState?.selectedVariation?.price ?? productState?.product?.price).toFixed(2)}
                  </del>
                )}

              {productState?.selectedVariation?.discount &&
                productState?.selectedVariation?.discount !== 0 && (
                  <span className="discounted-price">
                    {productState?.selectedVariation?.discount}% {t("off")}
                  </span>
                )}
            </>
          ) : (
            <>
              {(productState?.product?.price !== productState?.product?.sale_price) && (
                <del>${Number(productState?.product?.price).toFixed(2)}</del>
              )}

              {productState?.product?.discount && productState?.product?.discount !== 0 && (
                <span className="discounted-price">
                  {productState?.product?.discount}% {t("off")}
                </span>
              )}
            </>
          )}
        </h4>


        <ProductBoxVariantAttribute
          setProductState={setProductState}
          productState={productState}
          showVariableType={[
            "color",
            "rectangle",
            "circle",
            "radio",
            "dropdown",
            "image",
          ]}
        />
      </div>
    </div>
  );
};

export default ProductBox1;
