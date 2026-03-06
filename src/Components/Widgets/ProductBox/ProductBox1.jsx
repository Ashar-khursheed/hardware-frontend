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
import { useState } from "react";
// import { ShoppingCart, Heart, Eye, Star } from "lucide-react";

import { RiShoppingCartLine, RiHeartLine, RiEyeLine, RiStarSFill } from "react-icons/ri";

const style = `
@import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;500;600;700;800&family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500&display=swap');

:root {
  --ag-bg: #0a0a0f;
  --ag-card: #0e0e14;
  --ag-glass-border: rgba(255,255,255,0.08);
  --ag-accent: #c8f04d;
  --ag-accent-glow: rgba(200,240,77,0.35);
  --ag-text: #f0f0ef;
  --ag-muted: #55556a;
  --ag-dim: #8a8a9a;
  --ag-radius: 20px;
  --ag-ease: cubic-bezier(0.34,1.2,0.64,1);
}

* { box-sizing: border-box; margin: 0; padding: 0; }

body {
  background: var(--ag-bg);
  font-family: 'DM Sans', sans-serif;
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 40px 20px;
}

.scene {
  display: grid;
  grid-template-columns: repeat(3, 280px);
  gap: 24px;
  align-items: start;
}

.ag-premium-card {
  position: relative;
  background: var(--ag-card);
  border-radius: var(--ag-radius);
  border: 1px solid var(--ag-glass-border);
  overflow: hidden;
  transition: transform 0.45s var(--ag-ease), box-shadow 0.45s var(--ag-ease), border-color 0.3s ease;
  will-change: transform;
}
.ag-premium-card:hover {
  transform: translateY(-10px) scale(1.015);
  border-color: rgba(200,240,77,0.28);
  box-shadow: 0 40px 80px rgba(0,0,0,0.7), 0 0 0 1px rgba(200,240,77,0.1), 0 0 90px rgba(200,240,77,0.07);
}
.ag-premium-card.is-out { opacity: 0.55; filter: grayscale(0.45); }

/* Bottom accent line */
.ag-premium-card::after {
  content: '';
  position: absolute;
  bottom: 0; left: 18px; right: 18px;
  height: 2px;
  background: linear-gradient(90deg, transparent, var(--ag-accent), transparent);
  opacity: 0;
  transition: opacity 0.4s ease;
  z-index: 9;
  border-radius: 2px;
}
.ag-premium-card:hover::after { opacity: 1; }

/* Media */
.ag-media-wrap {
  position: relative;
  aspect-ratio: 1/1;
  overflow: hidden;
  background: #080810;
}
.ag-media-wrap::after {
  content: '';
  position: absolute;
  bottom: 0; left: 0; right: 0;
  height: 55%;
  background: linear-gradient(to top, var(--ag-card) 0%, transparent 100%);
  z-index: 2;
  pointer-events: none;
}
.ag-media-wrap img {
  width: 100%; height: 100%;
  object-fit: cover;
  transition: transform 0.75s cubic-bezier(0.25,0.46,0.45,0.94), filter 0.4s ease;
  filter: brightness(0.88) saturate(1.1);
}
.ag-premium-card:hover .ag-media-wrap img {
  transform: scale(1.1);
  filter: brightness(1.05) saturate(1.2);
}

/* Badges */
.ag-badge-overlay {
  position: absolute;
  top: 14px; left: 14px; right: 14px;
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  z-index: 4;
  pointer-events: none;
}
.ag-star-rating {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  background: rgba(0,0,0,0.72);
  backdrop-filter: blur(14px);
  border: 1px solid rgba(255,255,255,0.1);
  border-radius: 100px;
  padding: 5px 11px;
  font-size: 12px;
  font-weight: 500;
  color: var(--ag-text);
}
.ag-star-rating svg { color: #fbbf24; width: 13px; height: 13px; filter: drop-shadow(0 0 4px rgba(251,191,36,0.6)); }

.ag-status-tags { display: flex; flex-direction: column; align-items: flex-end; gap: 5px; }
.ag-status-tags span {
  font-family: 'Syne', sans-serif;
  font-size: 9px; font-weight: 700;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  padding: 4px 9px;
  border-radius: 6px;
  backdrop-filter: blur(10px);
}
.tag-sold { background: rgba(255,77,109,0.2); border: 1px solid rgba(255,77,109,0.5); color: #ff6b8a; }
.tag-sale { background: rgba(255,140,66,0.2); border: 1px solid rgba(255,140,66,0.5); color: #ffaa70; }
.tag-feat { background: rgba(124,109,250,0.2); border: 1px solid rgba(124,109,250,0.5); color: #a89cfc; }
.tag-trend { background: rgba(45,212,191,0.15); border: 1px solid rgba(45,212,191,0.4); color: #5eeadb; }

/* Hover Mask */
.ag-card-hover-mask {
  position: absolute; inset: 0; z-index: 5;
  display: flex; align-items: flex-end;
  opacity: 0;
  transition: opacity 0.35s ease;
  background: linear-gradient(to top, rgba(0,0,0,0.88) 0%, rgba(0,0,0,0.38) 50%, transparent 100%);
}
.ag-premium-card:hover .ag-card-hover-mask { opacity: 1; }

.ag-mask-body {
  width: 100%; padding: 16px;
  display: flex; flex-direction: column; gap: 10px;
  transform: translateY(14px);
  transition: transform 0.45s var(--ag-ease);
}
.ag-premium-card:hover .ag-mask-body { transform: translateY(0); }

.ag-cart-btn {
  width: 100%; padding: 13px 20px;
  background: var(--ag-accent);
  color: #0a0a0f;
  font-family: 'Syne', sans-serif;
  font-size: 12px; font-weight: 800;
  letter-spacing: 0.1em; text-transform: uppercase;
  border: none; border-radius: 10px;
  cursor: pointer;
  transition: transform 0.3s var(--ag-ease), box-shadow 0.3s ease;
  box-shadow: 0 0 30px var(--ag-accent-glow);
  display: flex; align-items: center; justify-content: center; gap: 8px;
}
.ag-cart-btn:hover { transform: scale(1.03); box-shadow: 0 0 50px rgba(200,240,77,0.5); }

.ag-secondary-actions { display: flex; justify-content: center; gap: 8px; }
.ag-icon-btn {
  display: inline-flex; align-items: center; justify-content: center;
  width: 38px; height: 38px;
  background: rgba(255,255,255,0.07);
  backdrop-filter: blur(8px);
  border: 1px solid rgba(255,255,255,0.1);
  border-radius: 50%; color: var(--ag-text);
  cursor: pointer;
  transition: all 0.25s ease;
}
.ag-icon-btn:hover { background: rgba(200,240,77,0.18); border-color: var(--ag-accent); color: var(--ag-accent); transform: scale(1.12); }

/* Card Body */
.ag-card-body { padding: 14px 18px 12px; position: relative; z-index: 3; }
.ag-brand-meta {
  font-size: 10px; font-weight: 500; letter-spacing: 0.15em;
  text-transform: uppercase; color: var(--ag-muted);
  margin-bottom: 5px;
}
.ag-product-title {
  font-family: 'Syne', sans-serif;
  font-size: 15px; font-weight: 600; line-height: 1.35;
  color: var(--ag-text);
  display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical;
  overflow: hidden; margin-bottom: 12px;
}

.ag-price-row { display: flex; align-items: center; justify-content: space-between; gap: 8px; }
.ag-price-main { display: flex; align-items: baseline; gap: 7px; }
.ag-val-now {
  font-family: 'Syne', sans-serif;
  font-size: 21px; font-weight: 700; color: var(--ag-text);
  letter-spacing: -0.02em; line-height: 1;
}
.ag-val-old { font-size: 13px; color: var(--ag-muted); text-decoration: line-through; }
.ag-promo-badge {
  font-family: 'Syne', sans-serif;
  font-size: 11px; font-weight: 700;
  color: #0a0a0f; background: var(--ag-accent);
  padding: 3px 9px; border-radius: 6px;
  box-shadow: 0 0 16px rgba(200,240,77,0.2);
}

/* Footer */
.ag-card-footer {
  padding: 10px 18px 16px;
  border-top: 1px solid var(--ag-glass-border);
  z-index: 3; position: relative;
}
.ag-swatches { display: flex; gap: 6px; flex-wrap: wrap; }
.ag-swatch {
  width: 22px; height: 22px;
  border-radius: 50%;
  border: 2px solid transparent;
  cursor: pointer;
  transition: all 0.2s ease;
  position: relative;
}
.ag-swatch.active { border-color: var(--ag-accent); box-shadow: 0 0 0 2px rgba(200,240,77,0.3); }
.ag-swatch:hover { transform: scale(1.2); }

/* Page bg */
.page {
  background: var(--ag-bg);
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 60px 20px;
  background-image: radial-gradient(ellipse 80% 50% at 50% -20%, rgba(200,240,77,0.05), transparent);
}
.label { font-family: 'Syne', sans-serif; font-size: 10px; font-weight: 700; letter-spacing: 0.15em; text-transform: uppercase; color: var(--ag-muted); text-align: center; margin-bottom: 32px; }

@media (max-width: 920px) {
  .scene { grid-template-columns: repeat(2, 280px); }
}
@media (max-width: 620px) {
  .scene { grid-template-columns: 1fr; max-width: 300px; }
}
`;

const CARDS = [
  {
    id: 1,
    brand: "Hobart",
    name: "Commercial Tilt Skillet 40-Qt Electric Countertop",
    currentPrice: 4299,
    oldPrice: 5199,
    discount: 17,
    rating: 4.8,
    reviews: 128,
    isFeatured: true,
    isTrending: false,
    isSale: true,
    isOutOfStock: false,
    img: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=600&q=80&auto=format&fit=crop",
    swatches: ["#c0c0c0", "#1a1a1a", "#d4a852"],
  },
  {
    id: 2,
    brand: "Vollrath",
    name: "Stainless Steel Prep Table 72\" Heavy Duty NSF",
    currentPrice: 1899,
    oldPrice: 1899,
    discount: 0,
    rating: 4.6,
    reviews: 74,
    isFeatured: false,
    isTrending: true,
    isSale: false,
    isOutOfStock: false,
    img: "https://images.unsplash.com/photo-1590415007878-c01e6bd9cac0?w=600&q=80&auto=format&fit=crop",
    swatches: ["#c0c0c0", "#e0e0e0"],
  },
  {
    id: 3,
    brand: "Rational",
    name: "SelfCookingCenter 6-Grid Combi Oven Unit",
    currentPrice: 0,
    oldPrice: 12000,
    discount: 0,
    rating: 0,
    reviews: 0,
    isFeatured: true,
    isTrending: false,
    isSale: false,
    isOutOfStock: true,
    img: "https://images.unsplash.com/photo-1585515320310-259814833e62?w=600&q=80&auto=format&fit=crop",
    swatches: ["#1a1a1a", "#888"],
  },
];

function formatPrice(n) {
  return "$" + n.toLocaleString("en-US");
}

function ProductCard({ card }) {
  const [activeSwatch, setActiveSwatch] = useState(0);

  return (
    <div className={`ag-premium-card${card.isOutOfStock ? " is-out" : ""}`}>
      <div className="ag-media-wrap">
        <img src={card.img} alt={card.name} />

        <div className="ag-badge-overlay">
          {card.reviews > 0 && (
            <div className="ag-star-rating">
              <RiStarSFill fill="#fbbf24" strokeWidth={0} />
              <span>{card.rating}</span>
            </div>
          )}
          <div className="ag-status-tags">
            {card.isOutOfStock && <span className="tag-sold">Sold Out</span>}
            {card.isSale && card.discount > 0 && <span className="tag-sale">Sale</span>}
            {card.isFeatured && <span className="tag-feat">Featured</span>}
            {card.isTrending && <span className="tag-trend">Trending</span>}
          </div>
        </div>

        <div className="ag-card-hover-mask">
          <div className="ag-mask-body">
            <button className="ag-cart-btn">
              <RiShoppingCartLine />
              Add to Cart
            </button>
            <div className="ag-secondary-actions">
              <button className="ag-icon-btn"><RiHeartLine /></button>
              <button className="ag-icon-btn"><RiEyeLine /></button>
            </div>
          </div>
        </div>
      </div>

      <div className="ag-card-body">
        <div className="ag-brand-meta">{card.brand}</div>
        <div className="ag-product-title">{card.name}</div>
        <div className="ag-price-row">
          <div className="ag-price-main">
            <span className="ag-val-now">
              {card.isOutOfStock ? "—" : formatPrice(card.currentPrice)}
            </span>
            {card.currentPrice < card.oldPrice && !card.isOutOfStock && (
              <span className="ag-val-old">{formatPrice(card.oldPrice)}</span>
            )}
          </div>
          {card.discount > 0 && (
            <div className="ag-promo-badge">-{card.discount}% OFF</div>
          )}
        </div>
      </div>

      {card.swatches?.length > 0 && (
        <div className="ag-card-footer">
          <div className="ag-swatches">
            {card.swatches.map((color, i) => (
              <div
                key={i}
                className={`ag-swatch${activeSwatch === i ? " active" : ""}`}
                style={{ background: color }}
                onClick={() => setActiveSwatch(i)}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default function App() {
  return (
    <div className="page">
      <style>{style}</style>
      <div>
        <p className="label">AG Premium Card — Dark Luxury</p>
        <div className="scene">
          {CARDS.map((c) => <ProductCard key={c.id} card={c} />)}
        </div>
      </div>
    </div>
  );
}