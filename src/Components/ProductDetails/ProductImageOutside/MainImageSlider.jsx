// import React, { useEffect, useState } from "react";
// import { useTranslation } from "react-i18next";
// import Slider from "react-slick";
// import { Col, Row } from "reactstrap";

// const MainImageSlider = ({ productState, nav2, sliderRef1, setNav1 }) => {
//   const { t } = useTranslation("common");
//   const videType = ["video/mp4", "video/webm", "video/ogg"];
//   const audioType = ["audio/mpeg", "audio/wav", "audio/ogg"];
  
//   const currentVariation = productState?.selectedVariation?.variation_galleries?.length 
//     ? productState?.selectedVariation?.variation_galleries 
//     : productState?.product?.product_galleries;

//   useEffect(() => {
//     if (sliderRef1) {
//       setNav1(sliderRef1);
//     }
//   }, [sliderRef1, setNav1]);

//   // Safety check
//   if (!currentVariation || currentVariation.length === 0) {
//     return <div>No images available</div>;
//   }

//   const sliderSettings = {
//     adaptiveHeight: true,
//     asNavFor: nav2,
//     afterChange: () => window.dispatchEvent(new Event('resize')),
//     arrows: true,
//     dots: false,
//     infinite: true,
//     speed: 500,
//     slidesToShow: 1,
//     slidesToScroll: 1,
//   };

//   return (
//     <div className="sticky-top-custom">
//       <div className="thumbnail-image-slider">
//         <Row className="g-sm-4 g-3">
//           <Col xs="12">
//             <div className="product-slick position-relative">
//               {(productState?.product?.is_sale_enable || 
//                 productState?.product?.is_trending || 
//                 productState?.product?.is_featured) && (
//                 <ul className="product-detail-label">
//                   {productState?.product?.is_sale_enable && (
//                     <li className="soldout">{t("sale")}</li>
//                   )}
//                   {productState?.product?.is_trending && (
//                     <li className="trending">{t("trending")}</li>
//                   )}
//                   {productState?.product?.is_featured && (
//                     <li className="featured">{t("featured")}</li>
//                   )}
//                 </ul>
//               )}

//               <Slider 
//                 {...sliderSettings}
//                 ref={(slider) => (sliderRef1 = slider)}
//               >
//                 {currentVariation.map((image, i) => (
//                   <div key={i}>
//                     <div className="slider-image">
//                       {videType.includes(image?.mime_type) ? (
//                         <video className="w-100" controls>
//                           <source src={image?.original_url || ""} type={image?.mime_type} />
//                         </video>
//                       ) : audioType.includes(image?.mime_type) ? (
//                         <div className="slider-main-img">
//                           <audio controls>
//                             <source src={image?.original_url || ""} type={image?.mime_type} />
//                           </audio>
//                         </div>
//                       ) : (
//                         <img 
//                           src={image?.original_url || ""} 
//                           alt={image?.name || `Product image ${i + 1}`} 
//                           className="img-fluid" 
//                           style={{ height: 670, width: 670, objectFit: 'contain' }}
//                         />
//                       )}
//                     </div>
//                   </div>
//                 ))}
//               </Slider>
//             </div>
//           </Col>
//         </Row>
//       </div>
//     </div>
//   );
// };

// export default MainImageSlider;

import React, { useEffect } from "react";
import { useTranslation } from "react-i18next";
import Slider from "react-slick";
import { Col, Row } from "reactstrap";

const MainImageSlider = ({ productState, nav2, sliderRef1, setNav1 }) => {
  const { t } = useTranslation("common");
  const videType = ["video/mp4", "video/webm", "video/ogg"];
  const audioType = ["audio/mpeg", "audio/wav", "audio/ogg"];
  
  const currentVariation = productState?.selectedVariation?.variation_galleries?.length 
    ? productState?.selectedVariation?.variation_galleries 
    : productState?.product?.product_galleries;

  useEffect(() => {
    if (sliderRef1) {
      setNav1(sliderRef1);
    }
  }, [sliderRef1, setNav1]);

  // Safety check
  if (!currentVariation || currentVariation.length === 0) {
    return null;
  }

  const sliderSettings = {
    adaptiveHeight: true,
    asNavFor: nav2,
    afterChange: () => window.dispatchEvent(new Event('resize')),
    arrows: true,
    dots: false,
    infinite: currentVariation.length > 1,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  const renderMedia = (image, i) => {
    if (videType.includes(image?.mime_type)) {
      return (
        <video className="w-100" controls>
          <source src={image?.original_url || ""} type={image?.mime_type} />
        </video>
      );
    } else if (audioType.includes(image?.mime_type)) {
      return (
        <div className="slider-main-img">
          <audio controls>
            <source src={image?.original_url || ""} type={image?.mime_type} />
          </audio>
        </div>
      );
    } else {
      return (
        <img 
          src={image?.original_url || ""} 
          alt={image?.name || `Product image ${i + 1}`} 
          className="img-fluid" 
        />
      );
    }
  };

  return (
    <div className="sticky-top-custom">
      <div className="thumbnail-image-slider">
        <Row className="g-sm-4 g-3">
          <Col xs="12">
            <div className="product-slick position-relative">
              {(productState?.product?.is_sale_enable || 
                productState?.product?.is_trending || 
                productState?.product?.is_featured) ? (
                <ul className="product-detail-label">
                  {productState?.product?.is_sale_enable ? (
                    <li className="soldout">{t("sale")}</li>
                  ) : null}
                  {productState?.product?.is_trending ? (
                    <li className="trending">{t("trending")}</li>
                  ) : null}
                  {productState?.product?.is_featured ? (
                    <li className="featured">{t("featured")}</li>
                  ) : null}
                </ul>
              ) : null}

              {currentVariation.length === 1 ? (
                <div className="single-product-image">
                  <div className="slider-image">
                    {renderMedia(currentVariation[0], 0)}
                  </div>
                </div>
              ) : (
                <Slider 
                  {...sliderSettings}
                  ref={(slider) => (sliderRef1 = slider)}
                >
                  {currentVariation.map((image, i) => (
                    <div key={i}>
                      <div className="slider-image">
                        {renderMedia(image, i)}
                      </div>
                    </div>
                  ))}
                </Slider>
              )}
            </div>
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default MainImageSlider;