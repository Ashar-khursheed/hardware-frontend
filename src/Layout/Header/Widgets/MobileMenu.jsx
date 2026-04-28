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
    <div className="mobile-menu mobile-menu-fix">
      <ul>
        <li className={active === 1 ? "active" : ""}>
          <Link href="/" onClick={() => setActive(1)}>
            <RiHomeLine />
            <span>{t("Home")}</span>
          </Link>
        </li>
        <li className={active === 2 ? "active" : ""}>
          <Link href="/search" onClick={() => setActive(2)}>
            <RiSearchLine />
            <span>{t("Search")}</span>
          </Link>
        </li>
        <li className={active === 3 ? "active" : ""}>
          <Link href="/cart" onClick={() => setActive(3)}>
              <div className="position-relative d-inline-block">
                <RiShoppingCartLine />
                {cartProducts?.length > 0 && <span className="cart_qty_cls">{cartProducts?.length}</span>}
              </div>
              <span>{t("Cart")}</span>
          </Link>
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
