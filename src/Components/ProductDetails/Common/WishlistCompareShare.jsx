import ThemeOptionContext from "@/Context/ThemeOptionsContext";
import WishlistContext from "@/Context/WishlistContext";
import { CompareAPI } from "@/Utils/AxiosUtils/API";
import { Href, audioFile } from "@/Utils/Constants";
import useCreate from "@/Utils/Hooks/useCreate";
import Cookies from "js-cookie";
import React, { useContext, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { RiHeartFill, RiHeartLine, RiRefreshLine, RiShareLine } from "react-icons/ri";
import ShareModal from "./ShareModal";
import CompareContext from "@/Context/CompareContext";

const WishlistCompareShare = ({ productState }) => {
  const { addToWishlist, removeWishlist } = useContext(WishlistContext);
  const [productWishlist, setProductWishlist] = useState("");
  const [addToWishlistAudio, setAddToWishlistAudio] = useState(new Audio(audioFile));
  const { t } = useTranslation("common");
  const { setOpenAuthModal } = useContext(ThemeOptionContext);
  const [modal, setModal] = useState(false);
  const { setOpenCompareSidebar, refetch } = useContext(CompareContext);

  const handelWishlist = () => {
    if (Cookies.get("uat_multikart")) {
      if (!productWishlist) {
        addToWishlist(productState?.product);
        addToWishlistAudio.play();
        setProductWishlist((prev) => !prev);
      } else {
        removeWishlist(productState?.product?.product_id, productState?.product?.id);
        setProductWishlist((prev) => !prev);
      }
    } else {
      setOpenAuthModal(true);
    }
  };

  useEffect(() => {
    setProductWishlist(productState?.product?.is_wishlist);
  }, [productState]);

  const { mutate, refetch: compareFetch } = useCreate(CompareAPI, false, false, "Added to Compare List", () => {
    refetch();
  });

  const addToCompare = () => {
    if (!Cookies.get("uat_multikart")) {
      setOpenAuthModal(true);
    } else {
      mutate({ product_id: productState?.product?.id });
    }
  };

  return (
    <>
      <div className="buy-box compare-box">
        <a onClick={handelWishlist}>
          {productWishlist ? <RiHeartFill /> : <RiHeartLine />}
          <span>{t("add_to_wishlist")}</span>
        </a>
        {/* <a onClick={addToCompare}>
          <RiRefreshLine />
          <span>{t("add_to_compare")}</span>
        </a> */}
        {productState?.product?.social_share ? (
          <a onClick={() => setModal(true)}>
            <RiShareLine />
            <span>{t("Share")}</span>
          </a>
        ) : null}
      </div>
      <ShareModal productState={productState} modal={modal} setModal={setModal} />
    </>
  );
};

export default WishlistCompareShare;
