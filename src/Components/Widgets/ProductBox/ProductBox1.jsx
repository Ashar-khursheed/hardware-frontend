// import SettingContext from "@/Context/SettingContext";
// import Link from "next/link";
// import React, { useContext, useMemo } from "react";
// import { useTranslation } from "react-i18next";
// import { RiStarSFill } from "react-icons/ri";
// import CartButton from "./Widgets/CartButton";
// import ImageVariant from "./Widgets/ImageVariant";
// import ProductBoxVariantAttribute from "./Widgets/ProductBoxVariantAttributes";
// import ProductHoverButton from "./Widgets/ProductHoverButton";
// import "./ProductBoxPremium.scss";

// const ProductBox1 = ({ productState, setProductState }) => {
//   const { convertCurrency } = useContext(SettingContext);
//   const { t } = useTranslation("common");

//   const product = productState?.product;
//   const selectedVariation = productState?.selectedVariation;

//   // Robust data extraction with fallbacks
//   const isOutOfStock = useMemo(() => (product?.stock_status === "out_of_stock") || (product?.quantity <= 0), [product]);
//   const displayBrand = useMemo(() => product?.brand?.name || "Hardware", [product]);
//   const displayName = useMemo(() => selectedVariation?.name || product?.name || "Product", [selectedVariation, product]);

//   const currentPrice = useMemo(() => {
//     const p = selectedVariation ? selectedVariation.sale_price : product?.sale_price;
//     return Number(p || 0);
//   }, [selectedVariation, product]);

//   const oldPrice = useMemo(() => {
//     const p = selectedVariation ? selectedVariation.price : product?.price;
//     return Number(p || 0);
//   }, [selectedVariation, product]);

//   const discount = useMemo(() => {
//     const d = selectedVariation?.discount || product?.discount;
//     return Number(d || 0);
//   }, [selectedVariation, product]);

//   const reviewsCount = useMemo(() => Number(product?.reviews_count || 0), [product]);

//   return (
//     <div className={`ag-premium-card ${isOutOfStock ? "is-out" : ""}`}>
//       {/* Media Section */}
//       <div className="ag-media-wrap">
//         <Link href={`/product/${product?.slug}`} className="ag-main-link">
//           <ImageVariant
//             thumbnail={selectedVariation?.variation_image || product?.product_thumbnail}
//             gallery_images={product?.product_galleries}
//             product={product}
//             width={700}
//             height={700}
//           />
//         </Link>

//         {/* Top Badges */}
//         <div className="ag-badge-overlay">
//           {reviewsCount > 0 && (
//             <div className="ag-star-rating">
//               <RiStarSFill />
//               <span>{reviewsCount}</span>
//             </div>
//           )}

//           <div className="ag-status-tags">
//             {isOutOfStock && <span className="tag-sold">Sold Out</span>}
//             {!!product?.is_sale_enable && discount > 0 && <span className="tag-sale">Sale</span>}
//             {!!product?.is_featured && <span className="tag-feat">Featured</span>}
//             {!!product?.is_trending && <span className="tag-trend">Trending</span>}
//           </div>
//         </div>

//         {/* Hover Action Zone */}
//         <div className="ag-card-hover-mask">
//           <div className="ag-mask-body">
//             <CartButton
//               classes="ag-primary-cart-btn"
//               productState={productState}
//               selectedVariation={selectedVariation}
//               text="Add to Cart" // Hardcoded to fix ADD_TO_CART string issue
//             />
//             <div className="ag-secondary-actions">
//               <ProductHoverButton productstate={product} />
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Product Information */}
//       <div className="ag-card-body">
//         <div className="ag-brand-meta">
//           <Link href={`/brand/${product?.brand?.slug || "#"}`}>
//             {displayBrand}
//           </Link>
//         </div>

//         <Link href={`/product/${product?.slug}`} className="ag-product-title" title={displayName}>
//           {displayName}
//         </Link>

//         <div className="ag-price-row">
//           <div className="ag-price-main">
//             <span className="ag-val-now">
//               {convertCurrency(currentPrice)}
//             </span>
//             {currentPrice < oldPrice && (
//               <span className="ag-val-old">
//                 {convertCurrency(oldPrice)}
//               </span>
//             )}
//           </div>

//           {discount > 0 && (
//             <div className="ag-promo-badge">-{discount}% OFF</div>
//           )}
//         </div>
//       </div>

//       {/* Bottom Attributes */}
//       {product?.attributes?.length > 0 && (
//         <div className="ag-card-footer">
//           <ProductBoxVariantAttribute
//             setProductState={setProductState}
//             productState={productState}
//             showVariableType={["color", "rectangle", "circle", "radio", "dropdown", "image"]}
//           />
//         </div>
//       )}
//     </div>
//   );
// };

// export default ProductBox1;
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

  const isOutOfStock = useMemo(() =>
    (product?.stock_status === "out_of_stock") || (product?.quantity <= 0),
    [product]
  );
  const displayBrand = useMemo(() => product?.brand?.name || "Hardware", [product]);
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
    <div className={`agpc__card ${isOutOfStock ? "agpc__card--out" : ""}`}>

      {/* ── Image (self-contained, nothing overlaps it) ── */}
      <div className="agpc__media">
        <Link href={`/product/${product?.slug}`} className="agpc__media-link">
          <ImageVariant
            thumbnail={selectedVariation?.variation_image || product?.product_thumbnail}
            gallery_images={product?.product_galleries}
            product={product}
            width={700}
            height={700}
          />
        </Link>

        {/* Badges stay inside image area */}
        <div className="agpc__badges">
          {reviewsCount > 0 && (
            <div className="agpc__rating">
              <RiStarSFill />
              <span>{reviewsCount}</span>
            </div>
          )}
          <div className="agpc__tags">
            {isOutOfStock && <span className="agpc__tag--sold">Sold Out</span>}
            {!!product?.is_sale_enable && discount > 0 && <span className="agpc__tag--sale">Sale</span>}
            {!!product?.is_featured && <span className="agpc__tag--feat">Featured</span>}
            {!!product?.is_trending && <span className="agpc__tag--trend">Trending</span>}
          </div>
        </div>

        {/* ── Action Bar — Reverted to Media Overlay for Hover Logic ── */}
        {!isOutOfStock && (
          <div className="agpc__action-bar d-none d-lg-flex">
            <CartButton
              classes="agpc__btn-cart"
              productState={productState}
              selectedVariation={selectedVariation}
              text="Add to Cart"
            />
            <div className="agpc__actions">
              <ProductHoverButton productstate={product} />
            </div>
          </div>
        )}
      </div>

      {/* ── Product Info ── */}
      <div className="agpc__body">
        <div className="agpc__brand">
          <Link href={`/brand/${product?.brand?.slug || "#"}`}>
            {displayBrand}
          </Link>
        </div>

        <Link href={`/product/${product?.slug}`} className="agpc__title" title={displayName}>
          {displayName}
        </Link>

        <div className="agpc__price-row">
          <div className="agpc__price-wrap">
            <span className="agpc__price-now">
              {isOutOfStock ? "Out of Stock" : convertCurrency(currentPrice)}
            </span>
            {!isOutOfStock && currentPrice < oldPrice && (
              <span className="agpc__price-old">
                {convertCurrency(oldPrice)}
              </span>
            )}
          </div>
          {!isOutOfStock && discount > 0 && (
            <span className="agpc__discount">-{discount}%</span>
          )}
        </div>

        {/* ── Mobile Action Bar — Below price, always visible ── */}
        {!isOutOfStock && (
          <div className="agpc__action-bar--mobile d-flex d-lg-none">
            <CartButton
              classes="agpc__btn-cart"
              productState={productState}
              selectedVariation={selectedVariation}
              text="Add to Cart"
            />
          </div>
        )}
      </div>

      {/* ── Variant Attributes ── */}
      {product?.attributes?.length > 0 && (
        <div className="agpc__footer">
          <ProductBoxVariantAttribute
            setProductState={setProductState}
            productState={productState}
            showVariableType={["color", "rectangle", "circle", "radio", "dropdown", "image"]}
          />
        </div>
      )}

    </div>
  );
};

export default ProductBox1;