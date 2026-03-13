import CartContext from "@/Context/CartContext";
import ThemeOptionContext from "@/Context/ThemeOptionsContext";
import Cookies from "js-cookie";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useContext, useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { RiHeartLine, RiHomeLine, RiSearchLine, RiShoppingCartLine, RiUserLine } from "react-icons/ri";

const MobileMenu = () => {
  const { t } = useTranslation("common");
  const { cartCanvas, setCartCanvas, setOpenAuthModal } = useContext(ThemeOptionContext);
  const { cartProducts } = useContext(CartContext);
  const [active, setActive] = useState(1);
  const router = useRouter();
  const isAuthenticated = Cookies.get("uat_multikart");

  const [isMounted, setIsMounted] = useState(false);
  useEffect(() => {
    setIsMounted(true);
  }, []);

  const handleWishlist = (e) => {
    e.preventDefault();
    if (isAuthenticated) {
      router.push("/wishlist");
      setActive(4);
    } else {
      setOpenAuthModal(true);
    }
  };

  const handleUser = (e) => {
    e.preventDefault();
    if (isAuthenticated) {
      router.push("/account/dashboard");
      setActive(5);
    } else {
      setOpenAuthModal(true);
    }
  };

  if (!isMounted) return null;

  return (
    <div className="mobile-menu">
      <ul>
        <li className={active === 1 ? "active" : ""}>
          <Link href="/">
            <div onClick={() => setActive(1)}>
              <RiHomeLine />
              <span>{t("Home")}</span>
            </div>
          </Link>
        </li>
        <li className={active === 2 ? "active" : ""}>
          <Link href="/search">
            <div onClick={() => setActive(2)}>
              <RiSearchLine />
              <span>{t("Search")}</span>
            </div>
          </Link>
        </li>
        <li className={active === 3 ? "active" : ""}>
          <a href="#" onClick={(e) => { e.preventDefault(); setCartCanvas(!cartCanvas); setActive(3); }}>
            <RiShoppingCartLine />
            {cartProducts?.length > 0 && <span className="cart_qty_cls">{cartProducts?.length}</span>}
            <span>{t("Cart")}</span>
          </a>
        </li>
        <li className={active === 4 ? "active" : ""}>
          <a href="#" onClick={handleWishlist}>
            <RiHeartLine />
            <span>{t("Wishlist")}</span>
          </a>
        </li>
        <li className={active === 5 ? "active" : ""}>
          <a href="#" onClick={handleUser}>
            <RiUserLine />
            <span>{t("Account")}</span>
          </a>
        </li>
      </ul>
    </div>
  );
};

export default MobileMenu;
