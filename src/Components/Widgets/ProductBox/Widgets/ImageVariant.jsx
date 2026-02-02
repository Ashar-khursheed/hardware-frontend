// // import { ImagePath } from "@/Utils/Constants";
// // import Image from "next/image";
// // import Link from "next/link";
// // import React from "react";

// // const ImageVariant = ({ item, variant = "image_zoom", thumbnail, gallery_images, product, width, height }) => {
// //   return (
// //     <>
// //       {variant === "image_slider" ? (
// //         <Slider {...customOptions} onMouseLeave={stopAutoplay} onMouseEnter={startAutoplay}>
// //           {product.product_galleries?.map((image, index) => (
// //             <Image src={thumbnail?.original_url ? thumbnail?.original_url : `${ImagePath}/placeholder.png`} 
// //             className="img-fluid bg-img" alt={product.name} />
// //           ))}
// //         </Slider>
// //       ) : variant === "image_flip" ? (
// //         <div className="flip">
// //           {flipImage?.slice(0, 2)?.map((image, index) => (
// //             <div key={index} className={i == 0 ? "front" : "back"}>
// //               <Link href={`/product/${product.slug}`}>
// //                 <Image src={thumbnail?.original_url ? thumbnail?.original_url : `${ImagePath}/placeholder.png`} className="img-fluid bg-img" alt={product.name} />
// //               </Link>
// //             </div>
// //           ))}
// //         </div>
// //       ) : variant === "image_zoom" ? (
// //         <div className="zoom">
// //           <Link href={`/product/${product?.slug}`}>
// //             <Image src={thumbnail?.original_url ? thumbnail?.original_url : `${ImagePath}/placeholder.png`} className="img-fluid bg-img" alt={product?.name} width={width} height={height} />
// //           </Link>
// //         </div>
// //       ) : (
// //         <Link href={`/product/${product.slug}`}>
// //           <Image src={thumbnail?.original_url ? thumbnail?.original_url : `${ImagePath}/placeholder.png`} className="img-fluid bg-img" alt={product?.name} />
// //         </Link>
// //       )}
// //     </>
// //   );
// // };

// // export default ImageVariant;
// import { ImagePath } from "@/Utils/Constants";
// import Image from "next/image";
// import Link from "next/link";
// import React from "react";

// // const getThumbnailUrl = (thumbnail) => {
// //   return typeof thumbnail === "string"
// //     ? thumbnail
// //     : thumbnail?.original_url || `${ImagePath}/placeholder.png`;
// // };
// const getThumbnailUrl = (thumbnail) => {
//   let rawUrl = typeof thumbnail === "string"
//     ? thumbnail
//     : thumbnail?.original_url || `${ImagePath}/placeholder.png`;

//   if (rawUrl && rawUrl.startsWith("/storage")) {
//     rawUrl = `https://hardwareapi.in-sourceit.com${rawUrl}`;
//   }

//   const finalUrl = rawUrl.replace(/([^:]\/)\/+/g, "$1");
//   console.log("Final image URL:", finalUrl); // 👈 Debug log
//   return finalUrl;
// };



// const ImageVariant = ({ item, variant = "image_zoom", thumbnail, gallery_images, product, width, height }) => {
//   return (
//     <>
//       {variant === "image_slider" ? (
//         <Slider {...customOptions} onMouseLeave={stopAutoplay} onMouseEnter={startAutoplay}>
//           {product.product_galleries?.map((image, index) => (
//             <Image
//               key={index}
//               src={getThumbnailUrl(thumbnail)}
//               className="img-fluid bg-img"
//               alt={product.name}
//               width={width}
//               height={height}
//             />
//           ))}
//         </Slider>
//       ) : variant === "image_flip" ? (
//         <div className="flip">
//           {flipImage?.slice(0, 2)?.map((image, index) => (
//             <div key={index} className={index === 0 ? "front" : "back"}>
//               <Link href={`/product/${product.slug}`}>
//                 <Image
//                   src={getThumbnailUrl(thumbnail)}
//                   className="img-fluid bg-img"
//                   alt={product.name}
//                   width={width}
//                   height={height}
//                 />
//               </Link>
//             </div>
//           ))}
//         </div>
//       ) : variant === "image_zoom" ? (
//         <div className="zoom">
//           <Link href={`/product/${product?.slug}`}>
//             <Image
//               src={getThumbnailUrl(thumbnail)}
//               className="img-fluid bg-img"
//               alt={product?.name}
//               width={width}
//               height={height}
//             />
//           </Link>
//         </div>
//       ) : (
//         <Link href={`/product/${product.slug}`}>
//           <Image
//             src={getThumbnailUrl(thumbnail)}
//             className="img-fluid bg-img"
//             alt={product?.name}
//             width={width}
//             height={height}
//           />
//         </Link>
//       )}
//     </>
//   );
// };

// export default ImageVariant;
// ImageVariant.jsx
import { ImagePath } from "@/Utils/Constants";
import Link from "next/link";
import React from "react";

const getThumbnailUrl = (thumbnail) => {
  let rawUrl =
    typeof thumbnail === "string"
      ? thumbnail
      : thumbnail?.original_url || `${ImagePath}/placeholder.png`;

  if (rawUrl && rawUrl.startsWith("/storage")) {
    rawUrl = `https://hardwareapi.in-sourceit.com${rawUrl}`;
  }

  const finalUrl = rawUrl.replace(/([^:]\/)\/+/g, "$1");
  return finalUrl;
};

const ImageVariant = ({
  item,
  variant = "image_zoom",
  thumbnail,
  gallery_images,
  product,
  width = 670,
  height = 670,
}) => {
  const imageUrl = getThumbnailUrl(thumbnail);

  return (
    <>
      {variant === "image_slider" ? (
        <div className="slider-wrapper">
          {/* Replace with your actual slider logic */}
          {product.product_galleries?.map((image, index) => (
            <img
              key={index}
              src={getThumbnailUrl(image)}
              alt={product?.name}
              className="img-fluid bg-img"
              width={width}
              height={height}
              loading="lazy"
            />
          ))}
        </div>
      ) : variant === "image_flip" ? (
        <div className="flip">
          {gallery_images?.slice(0, 2)?.map((image, index) => (
            <div key={index} className={index === 0 ? "front" : "back"}>
              <Link href={`/product/${product?.slug}`}>
                <img
                  src={getThumbnailUrl(image)}
                  alt={product?.name}
                  className="img-fluid bg-img"
                  width={width}
                  height={height}
                  loading="lazy"
                />
              </Link>
            </div>
          ))}
        </div>
      ) : variant === "image_zoom" ? (
        <div className="zoom">
          <Link href={`/product/${product?.slug}`}>
            <img
              id="imageZoom"
              src={imageUrl}
              alt={product?.name || "Product Image"}
              width={width}
              height={height}
              className="img-fluid bg-img"
              loading="lazy"
              style={{ opacity: 1 }}
            />
          </Link>
        </div>
      ) : (
        <Link href={`/product/${product?.slug}`}>
          <img
            src={imageUrl}
            alt={product?.name || "Product Image"}
            width={width}
            height={height}
            className="img-fluid bg-img"
            loading="lazy"
            style={{ opacity: 1 }}
          />
        </Link>
      )}
    </>
  );
};

export default ImageVariant;
