import ThemeOptionContext from "@/Context/ThemeOptionsContext";
import { Href } from "@/Utils/Constants";
import { t } from "i18next";
import Cookies from "js-cookie";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useContext, useState } from "react";
import { RiHeartLine, RiHome2Line, RiSearch2Line, RiShoppingBagLine, RiUserLine } from "react-icons/ri";

const MobileMenu = () => {
  const { setOpenAuthModal, setCartCanvas } = useContext(ThemeOptionContext);

  const isAuthenticated = Cookies.get("uat_multikart");
  const router = useRouter();
  const handleProfileClick = (path) => {
    isAuthenticated ? router.push("/account/dashboard") : setOpenAuthModal(true);
    handleActive(5);
  };
  const handleWishlist = () => {
    isAuthenticated ? router.push("/wishlist") : setOpenAuthModal(true);
    handleActive(4);
  };
  const [active, setActive] = useState(1);
  const handleActive = (num) => {
    setActive(num);
  };
  return (
    <div className="mobile-menu d-md-none d-block mobile-cart">
      <ul>
        <li className={active == "1" ? "active" : ""} onClick={() => handleActive(1)}>
          <Link href="/" className="your-class">
            <span className="flex items-center gap-1">
              <RiHome2Line />
              <span>{t("home")}</span>
            </span>
          </Link>
        </li>
        <li className={active == "2" ? "active" : ""}>
          <Link href="/search" legacyBehavior><span>
<a onClick={() => handleActive(2)}>
              <RiSearch2Line />
              <span>{t("search")}</span>
            </a>
</span></Link>

        </li>
        <li className={active == "3" ? "active" : ""}>
          <a href={Href} onClick={() => setCartCanvas(true)}>
            <RiShoppingBagLine />
            <span>{t("cart")}</span>
          </a>
        </li>
        <li className={active == "4" ? "active" : ""}>
          <a href={Href} onClick={() => handleWishlist()}>
            <RiHeartLine />
            <span>{t("wishlist")}</span>
          </a>
        </li>
        <li className={active == "5" ? "active" : ""} onClick={() => handleProfileClick()}>
          <a href={Href}>
            <RiUserLine />
            <span>{t("user")}</span>
          </a>
        </li>
      </ul>
    </div>
  );
};

export default MobileMenu;
