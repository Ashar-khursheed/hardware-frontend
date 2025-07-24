// import ProductIdsContext from "@/Context/ProductIdsContext";
// import RatioImage from "@/Utils/RatioImage";
// import Link from "next/link";
// import { useContext } from "react";

// const OfferBanner = ({ classes = {}, imgUrl, ratioImage, customRatioClass = "", elem }) => {
//   const { filteredProduct } = useContext(ProductIdsContext);
//   const redirectToProduct = (productId) => {
//     const product = filteredProduct.find((elem) => elem?.id == productId);
//     return "product/" + product?.slug;
//   };
//   return (
//     <div className={`${classes?.customClass ? classes?.customClass : ""}`}>
//       {elem?.redirect_link?.link_type === "external_url" ? (
// <Link href={elem?.redirect_link?.link || "/"} legacyBehavior>
//           <div className={`${classes?.customHoverClass ? classes?.customHoverClass : "home-contain hover-effect"}`}>{ratioImage ? <RatioImage src={imgUrl} className={`bg-img ${customRatioClass}`} alt="banner" /> : <img src={imgUrl} className={`img-fluid ${customRatioClass}`} alt="banner" />}</div>
//         </Link>
//       ) : elem?.redirect_link?.link_type === "collection" ? (
//         <Link
//           href={`/collections?category=${elem?.redirect_link?.link}` || "/"}
//           legacyBehavior>
//           <div className={`${classes?.customHoverClass ? classes?.customHoverClass : "home-contain hover-effect"}`}>{ratioImage ? <RatioImage src={imgUrl} className={`bg-img ${customRatioClass}`} alt="banner" /> : <img src={imgUrl} className={`img-fluid ${customRatioClass}`} alt="banner" />}</div>
//         </Link>
//       ) : elem?.redirect_link?.link_type === "product" ? (
//         <Link
//           href={`/${redirectToProduct(elem?.redirect_link?.link)}` || "/"}
//           legacyBehavior>
//           <div className={`${classes?.customHoverClass ? classes?.customHoverClass : "home-contain hover-effect"}`}>{ratioImage ? <RatioImage src={imgUrl} className={`bg-img ${customRatioClass}`} alt="banner" /> : <img src={imgUrl} className={`img-fluid ${customRatioClass}`} alt="banner" />}</div>
//         </Link>
//       ) : (
//         <div className={`${classes?.customHoverClass ? classes?.customHoverClass : "home-contain hover-effect"}`}>{ratioImage ? <RatioImage src={imgUrl} className={`bg-img ${customRatioClass}`} alt="banner" /> : <img src={imgUrl} className={`img-fluid ${customRatioClass}`} alt="banner" />}</div>
//       )}
//     </div>
//   );
// };

// export default OfferBanner;
import ProductIdsContext from "@/Context/ProductIdsContext";
import RatioImage from "@/Utils/RatioImage";
import Link from "next/link";
import { useContext } from "react";

const OfferBanner = ({ classes = {}, imgUrl, ratioImage, customRatioClass = "", elem }) => {
  const { filteredProduct } = useContext(ProductIdsContext);

  const redirectToProduct = (productId) => {
    const product = filteredProduct.find((elem) => elem?.id == productId);
    return "product/" + product?.slug;
  };

  const bannerContent = (
    <>
      {ratioImage ? (
        <RatioImage
          src={imgUrl}
          className={`bg-img ${customRatioClass}`}
          alt="banner"
        />
      ) : (
        <img
          src={imgUrl}
          className={`img-fluid ${customRatioClass}`}
          alt="banner"
        />
      )}
    </>
  );

  const hoverClass = classes?.customHoverClass ?? "home-contain hover-effect";
  const customClass = classes?.customClass ?? "";

  let link = "/";
  if (elem?.redirect_link?.link_type === "external_url") {
    link = elem?.redirect_link?.link || "/";
  } else if (elem?.redirect_link?.link_type === "collection") {
    link = `/collections?category=${elem?.redirect_link?.link}` || "/";
  } else if (elem?.redirect_link?.link_type === "product") {
    link = `/${redirectToProduct(elem?.redirect_link?.link)}` || "/";
  }

  return (
    <div className={customClass}>
      {elem?.redirect_link?.link_type ? (
        <Link href={link} legacyBehavior>
          <a className={hoverClass}>{bannerContent}</a>
        </Link>
      ) : (
        <div className={hoverClass}>{bannerContent}</div>
      )}
    </div>
  );
};

export default OfferBanner;
