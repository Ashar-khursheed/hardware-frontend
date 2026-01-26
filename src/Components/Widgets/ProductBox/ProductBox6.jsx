import SettingContext from "@/Context/SettingContext";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useContext } from "react";
import { useTranslation } from "react-i18next";
import CartButton from "./Widgets/CartButton";
import ProductHoverButton from "./Widgets/ProductHoverButton";
import ProductRatingBox from "./Widgets/ProductRatingBox";
import OfferTimer from "@/Components/ProductDetails/Common/OfferTimer";

const ProductBox6 = ({ productState }) => {
  const { convertCurrency } = useContext(SettingContext);
  const router = useRouter();
  const { t } = useTranslation("common");
  
  // Calculate discount percentage
  const discount = productState?.product?.discount || 
    (productState?.product?.sale_price && productState?.product?.price 
      ? Math.round(((productState.product.price - productState.product.sale_price) / productState.product.price) * 100)
      : 0);

  return (
    <div className="product-card-modern border rounded-3 overflow-hidden position-relative bg-white h-100 transition-all hover-shadow-lg">
      <div className="product-image-wrapper position-relative overflow-hidden bg-light" style={{ aspectRatio: '1/1' }}>
        {/* Badges */}
        <div className="position-absolute top-0 start-0 p-2 z-2 d-flex flex-column gap-1">
            {discount > 0 && (
                <span className="badge bg-danger rounded-pill px-2 py-1 shadow-sm">
                    -{discount}%
                </span>
            )}
            {productState?.product?.is_featured && <span className="badge bg-warning text-dark rounded-pill px-2 py-1 shadow-sm">Featured</span>}
        </div>

        {/* Timer */}
        {productState?.product?.sale_starts_at && productState?.product?.sale_expired_at && (
             <div className="position-absolute bottom-0 start-0 w-100 p-2 bg-dark bg-opacity-75 text-white z-2">
                <OfferTimer productState={productState} noHeading />
             </div>
        )}

        <Link href={`/product/${productState?.product?.slug}`} legacyBehavior>
          <a className="d-block w-100 h-100">
            <div className="position-relative w-100 h-100 p-3">
                <Image 
                    src={productState?.selectedVariation ? productState?.selectedVariation.variation_image.original_url : productState?.product?.product_thumbnail?.original_url} 
                    className="img-fluid object-fit-contain transition-transform hover-scale" 
                    alt={productState?.product?.name} 
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
            </div>
          </a>
        </Link>
        
        {/* Quick Actions Overlay */}
        <div className="product-actions position-absolute top-50 end-0 translate-middle-y me-2 d-flex flex-column gap-2 opacity-0 hover-opacity-100 transition-opacity z-3">
           <CartButton productState={productState} selectedVariation={productState.selectedVariation} classes="btn btn-light rounded-circle shadow-sm p-2 d-flex align-items-center justify-content-center" />
           <ProductHoverButton productstate={productState.product} />
        </div>
      </div>

      <div className="product-content p-3">
        <div className="mb-2">
             {productState?.product?.brand && (
              <Link href={`/brand/${productState?.product?.brand.slug}`} legacyBehavior>
                <a className="text-muted small text-uppercase fw-bold text-decoration-none hover-primary">
                    {productState?.product?.brand.name}
                </a>
              </Link>
            )}
        </div>
        
        <h5 className="product-title mb-2 text-truncate">
            <Link href={`/product/${productState?.product?.slug}`} legacyBehavior>
                <a className="text-dark text-decoration-none fw-semibold product-name-link" title={productState?.product?.name}>
                    {productState?.product?.name}
                </a>
            </Link>
        </h5>

        <div className="d-flex align-items-center justify-content-between mt-auto">
            <div className="product-price">
                 <span className="h5 fw-bold text-primary mb-0">
                    {productState?.selectedVariation ? convertCurrency(productState?.selectedVariation?.sale_price) : convertCurrency(productState?.product?.sale_price)}
                 </span>
                 {(productState?.selectedVariation?.price > productState?.selectedVariation?.sale_price || productState?.product?.price > productState?.product?.sale_price) && (
                    <span className="text-muted text-decoration-line-through ms-2 small">
                        {productState?.selectedVariation ? convertCurrency(productState?.selectedVariation?.price) : convertCurrency(productState?.product?.price)}
                    </span>
                 )}
            </div>
            <div className="product-rating">
                 <ProductRatingBox ratingCount={productState?.rating_count} />
                 <span className="text-muted ms-1 small">({productState?.product?.reviews_count})</span>
            </div>
        </div>
      </div>
    </div>
  );
};

export default ProductBox6;
