import ThemeOptionContext from "@/Context/ThemeOptionsContext";
import WishlistContext from "@/Context/WishlistContext";
import Btn from "@/Elements/Buttons/Btn";
import { audioFile, Href } from "@/Utils/Constants";
import { useCustomSearchParams } from "@/Utils/Hooks/useCustomSearchParams";
import Cookies from "js-cookie";
import { usePathname, useRouter } from "next/navigation";
import { useContext, useState } from "react";
import { RiHeartFill, RiHeartLine } from "react-icons/ri";

const WishlistButton = ({ productstate, customClass, hideAction, customAnchor }) => {
  const [isLoginModalOpen, setLoginModalOpen] = useState(false);
  const { addToWishlist, removeWishlist } = useContext(WishlistContext);
  const [productWishlist, setProductWishlist] = useState(productstate?.is_wishlist);
  const [addToWishlistAudio, setAddToWishlistAudio] = useState(new Audio(audioFile));
  const [category, brand, attribute, price, rating, sortBy, field, layout, theme] = useCustomSearchParams(["category", "brand", "attribute", "price", "rating", "sortBy", "field", "layout", "theme"]);
  const pathname = usePathname();
  const router = useRouter();
  const { setOpenAuthModal } = useContext(ThemeOptionContext);

  const handelWishlist = (productstate) => {
    if (Cookies.get("uat_multikart")) {
      if (!productWishlist) {
        addToWishlist(productstate);
        addToWishlistAudio.play();
        setProductWishlist((prev) => !prev);
      } else {
        removeWishlist(productstate?.product_id, productstate?.id);
        setProductWishlist((prev) => !prev);
      }
    } else {
      setOpenAuthModal(true);
    }
  };

  const handleCloseModal = () => {
    setLoginModalOpen(false);
  };
  return (
    <>
      {customClass ? (
        <Btn className={customClass ? customClass : ""} onClick={() => handelWishlist(productstate)}>
          {productWishlist ? <RiHeartFill className="theme-color" /> : <RiHeartLine />}
        </Btn>
      ) : customAnchor ? (
        <a href={Href} title="Add to Wishlist" className={`wishlist-icon ${productWishlist ? "theme-color" : ""}`} onClick={() => handelWishlist(productstate)}>
          <i className={`ri-heart-${productWishlist ? "fill" : "line"}`}></i>
        </a>
      ) : (
        !hideAction?.includes("wishlist") && (
          <li title="Wishlist" onClick={() => handelWishlist(productstate)} className="wishlist-icon">
            <a className={"heart-icon"}>{productWishlist ? <RiHeartFill className="theme-color" /> : <RiHeartLine />}</a>
          </li>
        )
      )}
    </>
  );
};

export default WishlistButton;
