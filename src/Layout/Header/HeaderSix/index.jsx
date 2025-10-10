import CategoryContext from "@/Context/CategoryContext";
import ThemeOptionContext from "@/Context/ThemeOptionsContext";
import { Href } from "@/Utils/Constants";
import { useHeaderScroll } from "@/Utils/Hooks/HeaderScroll";
import Cookies from "js-cookie";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useContext, useState } from "react";
import { useTranslation } from "react-i18next";
import { RiHeartLine, RiMenuLine, RiUserLine } from "react-icons/ri";
import { Button, Col, Container, Row } from "reactstrap";
import HeaderCart from "../Widgets/HeaderCart";
import HeaderLogo from "../Widgets/HeaderLogo";
import HeaderSearchbar from "../Widgets/HeaderSearchbar";
import MainHeaderMenu from "../Widgets/MainHeaderMenu";
import TopBar from "../Widgets/TopBar";

const HeaderSix = () => {
  const { themeOption, setOpenAuthModal, mobileSideBar, setMobileSideBar } =
    useContext(ThemeOptionContext);
  const router = useRouter();
  const isAuthenticated = Cookies.get("uat_multikart");
  const handleProfileClick = (path) => {
    isAuthenticated ? router.push(path) : setOpenAuthModal(true);
  };
  const handleWishlistClick = () => {
    isAuthenticated ? router.push("/wishlist") : setOpenAuthModal(true);
  };
  const { t } = useTranslation("common");
  const [activeCategory, setActiveCategory] = useState("harddrives");
  const [openDropdown, setOpenDropdown] = useState(false);
  const UpScroll = useHeaderScroll(false);

  const { filterCategory } = useContext(CategoryContext);
  const categoryData = filterCategory("product");

  const filterCategoryData = (categoryData, categoryIds) => {
    if (!categoryData || !categoryIds) {
      return [];
    }
    const filteredCategories = [];
    const filteredSubCategoryIds = new Set(categoryIds);
    const filterCategory = (category) => {
      if (filteredSubCategoryIds.has(category.id)) {
        filteredCategories.push(category);
        return;
      }
      if (category.subcategories) {
        category.subcategories.forEach((subcategory) => {
          filterCategory(subcategory);
        });
      }
    };
    categoryData.forEach(filterCategory);
    return filteredCategories;
  };

  const categories = filterCategoryData(
    categoryData,
    themeOption?.header?.category_ids
  );

  return (
    <header
      className={`header-style-5 ${themeOption?.header?.sticky_header_enable && UpScroll
        ? "sticky fixed"
        : ""
        }`}
    >
      <div className="mobile-fix-option"></div>
      {themeOption?.header?.page_top_bar_enable && <TopBar />}
      <Container>
        <Col sm="12">
          <div className="main-menu">
            <div className="menu-left">
              <div
                className="toggle-nav"
                onClick={() => setMobileSideBar(!mobileSideBar)}
              >
                <RiMenuLine className="sidebar-bar" />
              </div>
              <div className="brand-logo">
                <HeaderLogo />
              </div>
            </div>
            <div>
              <HeaderSearchbar fullSearch={true} />
            </div>
            <div className="menu-right pull-right">
              <div>
                <div className="icon-nav">
                  <ul>
                    <li className="onhover-div">
                      <Link
                        href={isAuthenticated ? "/wishlist" : Href}
                        onClick={handleWishlistClick}
                        legacyBehavior
                      >
                        <RiHeartLine />
                      </Link>
                    </li>
                    <li className="onhover-div">
                      <HeaderCart />
                    </li>
                    <li className="onhover-div">
                      <Link
                        href={
                          isAuthenticated ? "/account/dashboard" : Href
                        }
                        onClick={handleProfileClick}
                        legacyBehavior
                      >
                        <RiUserLine />
                      </Link>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </Col>
      </Container>

      {/* ✅ SHOP BY CATEGORY + ALL CATEGORIES MEGA MENU */}
      <div className="bottom-part bottom-light">
        <Container>
          <Row>
            <Col xl="2" className="position-relative">
              <div className="category-menu d-none d-xl-block h-100">
                {/* <div
                  id="toggle-sidebar"
                  className="toggle-sidebar"
                  onClick={() => setOpenDropdown(!openDropdown)}
                >
                  <RiMenuLine className="sidebar-bar" />
                  <h5 className="mb-0">{t("shop_by_category")}</h5>
                </div> */}
                <div className="container p-0">
                  <div className="navbar">
                    <div className="container p-0">
                      <div className="menu-item">
                        <span className="menu-label subcat">ALL CATEGORIES</span>
                        <div className="mega-menu">
                          {/* LEFT MENU */}
                          <div className="menu-left">
                            <ul>
                              <li
                                onMouseEnter={() => setActiveCategory("harddrives")}
                                className={activeCategory === "harddrives" ? "active" : ""}
                              >
                                <a href="/category/storage-devices" className="category-link">Storage Devices</a>
                              </li>

                              <li
                                onMouseEnter={() => setActiveCategory("cpus")}
                                className={activeCategory === "cpus" ? "active" : ""}
                              >
                                <a href="/category/memories" className="category-link">Memories</a>
                              </li>

                              <li
                                onMouseEnter={() => setActiveCategory("memory")}
                                className={activeCategory === "memory" ? "active" : ""}
                              >
                                <a href="/category/networking-devices" className="category-link">Networking Devices</a>
                              </li>

                              <li
                                onMouseEnter={() => setActiveCategory("ssd")}
                                className={activeCategory === "ssd" ? "active" : ""}
                              >
                                <a href="/category/motherboard" className="category-link">Motherboard</a>
                              </li>

                              <li
                                onMouseEnter={() => setActiveCategory("graphics")}
                                className={activeCategory === "graphics" ? "active" : ""}
                              >
                                <a href="/category/printer-scanners" className="category-link">Printer & Scanners</a>
                              </li>

                              <li
                                onMouseEnter={() => setActiveCategory("motherboards")}
                                className={activeCategory === "motherboards" ? "active" : ""}
                              >
                                <a href="/category/pc-and-servers" className="category-link">PC & Servers</a>
                              </li>


                              <li
                                onMouseEnter={() => setActiveCategory("powersupply")}
                                className={activeCategory === "powersupply" ? "active" : ""}
                              >
                                <a href="/category/power-supply" className="category-link">Power Supply & Power Protection</a>
                              </li>

                              <li
                                onMouseEnter={() => setActiveCategory("cpusprosesors")}
                                className={activeCategory === "cpusprosesors" ? "active" : ""}
                              >
                                <a href="/category/cpus-processors" className="category-link">CPUs & Processors</a>
                              </li>


                              <li
                                onMouseEnter={() => setActiveCategory("cables")}
                                className={activeCategory === "cables" ? "active" : ""}
                              >
                                <a href="/category/cables-adapters" className="category-link">Cables & Adapters</a>
                              </li>

                              <li
                                onMouseEnter={() => setActiveCategory("gaming")}
                                className={activeCategory === "cables" ? "active" : ""}
                              >
                                <a href="/category/gaming" className="category-link">Gaming</a>
                              </li>
                            </ul>
                          </div>

                          {/* RIGHT PANEL */}
                          <div className="menu-right rightpannel border-right flex-1  ">

                            {activeCategory === "harddrives" && (
                              <div className="container gap-4">
                                <div className="row">
                                  <div className="col-md-4">
                                    {/* <h6 className="subcategories">Internal Hard Drives</h6> */}
                                    <ul className="hovermenu">
                                      <li><a href="/category/internal-hard-drives">Internal Hard Drives</a></li>
                                      <li><a href="/category/external-hard-drives">External Hard Drives</a></li>


                                    </ul>
                                  </div>
                                  <div className="col-md-4">
                                    {/* <h6 className="subcategories">External Hard Drives</h6> */}
                                    <ul className="hovermenu" >
                                      <li><a href="/category/ssds">SSDS</a></li>
                                      <li><a href="/category/storage-tapes">Storage Tapes</a></li>
                                    </ul>
                                  </div>
                                  <div className="col-md-4">
                                    {/* <h6 className="subcategories">SSDS
                                    </h6> */}
                                    <ul className="hovermenu">
                                      <li><a href="/category/Network-Storage-Devices">Network Storage Device</a></li>
                                      <li><a href="/category/Hard-Drives-Enclosures">Hard Drives Enclosures</a></li>

                                    </ul>
                                  </div>
                                </div>

                                <div className="row border-top pt-3 mt-3">
                                  <div className="col-md-6">
                                    {/* <h6 className="subcategories">Hard Drives By Brands</h6> */}
                                    <ul className="hovermenu">
                                      <li><a href="/category/Controllers">Controllers</a></li>
                                      <li><a href="/category/Disc-Drives">Disc Drives</a></li>
                                      {/* <li>Toshiba</li>
                                      <li>Samsung</li> */}
                                    </ul>
                                  </div>
                                  {/* <div className="col-md-6">
                                    <h6 className="subcategories">Hard Drives By Brands</h6>
                                    <ul className="hovermenu" >
                                      <li>Controllers</li>
                                      <li>Disc Drives</li>
                                      <li>Toshiba</li>
                                      <li>Samsung</li>
                                    </ul>
                                  </div> */}
                                  {/* <div className="col-md-4">
                                    <h6 className="subcategories">Hard Drives By Brands</h6>
                                    <ul className="hovermenu">
                                      <li>Seagate</li>
                                      <li>WD</li>
                                      <li>Toshiba</li>
                                      <li>Samsung</li>
                                    </ul>
                                  </div> */}

                                </div>
                              </div>

                            )}
                            {activeCategory === "cpus" && (
                              <div className="container gap-4">
                                <div className="row">
                                  <div className="col-md-4">
                                    {/* <h6 className="subcategories">memories
                                    </h6> */}
                                    <ul className="hovermenu">
                                      <li><a href="/category/Dekstop-Memory">Dekstop Memory</a></li>
                                      <li><a href="/category/server-memory">Server Memory</a></li>
                                    </ul>
                                  </div>
                                  <div className="col-md-4">
                                    {/* <h6 className="subcategories">Hard Drives By Interface</h6> */}
                                    <ul className="hovermenu" >
                                      <li><a href="/category/laptop-memory">Laptop Memory</a></li>
                                      <li><a href="/category/gaming-memory">Gaming Memory</a></li>
                                    </ul>
                                  </div>
                                  <div className="col-md-4">
                                    {/* <h6 className="subcategories">Hard Drives By Spindle
                                    </h6> */}
                                    <ul className="hovermenu">
                                      <li><a href="/category/flash-memory">Flash Memory</a></li>
                                      <li><a href="/category/cache-memory">Cache Memory</a></li>
                                    </ul>
                                  </div>
                                </div>

                                <div className="row border-top pt-3 mt-3">
                                  <div className="col-md-4">
                                    {/* <h6 className="subcategories">Hard Drives By Brands</h6> */}
                                    <ul className="hovermenu">
                                      <li><a href="/category/vrm">VRM</a></li>
                                    </ul>
                                  </div>
                                  {/* <div className="col-md-4">
                                    <h6 className="subcategories">Hard Drives By Brands</h6>
                                    <ul className="hovermenu" >
                                      <li>Seagate</li>
                                      <li>WD</li>
                                      <li>Toshiba</li>
                                      <li>Samsung</li>
                                    </ul>
                                  </div> */}
                                  {/* <div className="col-md-4">
                                    <h6 className="subcategories">Hard Drives By Brands</h6>
                                    <ul className="hovermenu">
                                      <li>Seagate</li>
                                      <li>WD</li>
                                      <li>Toshiba</li>
                                      <li>Samsung</li>
                                    </ul>
                                  </div> */}

                                </div>
                              </div>
                            )}
                            {activeCategory === "memory" && (
                              <div className="container gap-4">
                                <div className="row">
                                  <div className="col-md-4">
                                    {/* <h6 className="subcategories">Memory
                                    </h6> */}
                                    <ul className="hovermenu">
                                      <li><a href="/category/switches">Switches</a></li>
                                    </ul>
                                  </div>
                                  <div className="col-md-4">
                                    {/* <h6 className="subcategories">Hard Drives By Interface</h6> */}
                                    <ul className="hovermenu" >
                                      <li><a href="/category/network-accessories">Network & Accessories</a></li>

                                    </ul>
                                  </div>
                                  <div className="col-md-4">
                                    {/* <h6 className="subcategories">Hard Drives By Spindle
                                    </h6> */}
                                    <ul className="hovermenu">
                                      <li><a href="/category/ip-phones">IP Phones</a></li>

                                    </ul>
                                  </div>
                                </div>

                                {/* <div className="row border-top pt-3 mt-3">
                                  <div className="col-md-4">
                                    <h6 className="subcategories">Hard Drives By Brands</h6>
                                    <ul className="hovermenu">
                                      <li>Seagate</li>
                                      <li>WD</li>
                                      <li>Toshiba</li>
                                      <li>Samsung</li>
                                    </ul>
                                  </div>
                                  <div className="col-md-4">
                                    <h6 className="subcategories">Hard Drives By Brands</h6>
                                    <ul className="hovermenu" >
                                      <li>Seagate</li>
                                      <li>WD</li>
                                      <li>Toshiba</li>
                                      <li>Samsung</li>
                                    </ul>
                                  </div>
                                  <div className="col-md-4">
                                    <h6 className="subcategories">Hard Drives By Brands</h6>
                                    <ul className="hovermenu">
                                      <li>Seagate</li>
                                      <li>WD</li>
                                      <li>Toshiba</li>
                                      <li>Samsung</li>
                                    </ul>
                                  </div>

                                </div> */}
                              </div>
                            )}
                            {activeCategory === "ssd" && (
                              <div className="container gap-4">
                                <div className="row">
                                  <div className="col-md-4">
                                    {/* <h6 className="subcategories">motherboard
                                    </h6> */}
                                    <ul className="hovermenu">
                                      <li><a href="/category/server-motherboards">Server Motherboards</a></li>

                                    </ul>
                                  </div>
                                  <div className="col-md-4">
                                    {/* <h6 className="subcategories">Hard Drives By Interface</h6> */}
                                    <ul className="hovermenu" >
                                      <li><a href="/category/laptop motherboards">Laptop Motherboards</a></li>

                                    </ul>
                                  </div>
                                  <div className="col-md-4">
                                    {/* <h6 className="subcategories">Hard Drives By Spindle
                                    </h6> */}
                                    <ul className="hovermenu">
                                      <li><a href="/category/dekstop-motherboards">Dekstop Motherboards</a></li>

                                    </ul>
                                  </div>
                                </div>

                                <div className="row border-top pt-3 mt-3">
                                  <div className="col-md-4">
                                    {/* <h6 className="subcategories">Hard Drives By Brands</h6> */}
                                    <ul className="hovermenu">
                                      <li><a href="/category/gaming-motherboards">Gaming Motherboards</a></li>

                                    </ul>
                                  </div>
                                  {/* <div className="col-md-4">
                                    <h6 className="subcategories">Hard Drives By Brands</h6>
                                    <ul className="hovermenu" >
                                      <li>Seagate</li>
                                      <li>WD</li>
                                      <li>Toshiba</li>
                                      <li>Samsung</li>
                                    </ul>
                                  </div>
                                  <div className="col-md-4">
                                    <h6 className="subcategories">Hard Drives By Brands</h6>
                                    <ul className="hovermenu">
                                      <li>Seagate</li>
                                      <li>WD</li>
                                      <li>Toshiba</li>
                                      <li>Samsung</li>
                                    </ul>
                                  </div> */}

                                </div>
                              </div>
                            )}
                            {activeCategory === "graphics" && (
                              <div className="container gap-4">
                                <div className="row">
                                  <div className="col-md-4">
                                    {/* <h6 className="subcategories">Gaming Devices
                                    </h6> */}
                                    <ul className="hovermenu">
                                      <li><a href="/category/barcode-printers">Barcode Printers</a></li>


                                    </ul>
                                  </div>
                                  <div className="col-md-4">
                                    {/* <h6 className="subcategories">Hard Drives By Interface</h6> */}
                                    <ul className="hovermenu" >
                                      <li><a href="/category/pos-printers">POS Printers</a></li>

                                    </ul>
                                  </div>
                                  <div className="col-md-4">
                                    {/* <h6 className="subcategories">Hard Drives By Spindle
                                    </h6> */}
                                    <ul className="hovermenu">
                                      <li><a href="/category/office-printers">Office Printers</a></li>

                                    </ul>
                                  </div>
                                </div>

                                <div className="row border-top pt-3 mt-3">
                                  <div className="col-md-4">
                                    {/* <h6 className="subcategories">Hard Drives By Brands</h6> */}
                                    <ul className="hovermenu">
                                      <li><a href="/category/Card-printers">Card Printers</a></li>

                                    </ul>
                                  </div>
                                  <div className="col-md-4">
                                    {/* <h6 className="subcategories">Hard Drives By Brands</h6> */}
                                    <ul className="hovermenu" >
                                      <li><a href="/category/barcode-scanners">Barcode Scanners</a></li>

                                    </ul>
                                  </div>
                                  <div className="col-md-4">
                                    {/* <h6 className="subcategories">Hard Drives By Brands</h6> */}
                                    <ul className="hovermenu">
                                      <li><a href="/category/sensors">Sensors</a></li>

                                    </ul>
                                  </div>

                                </div>
                              </div>
                            )}
                            {activeCategory === "motherboards" && (
                              <div className="container gap-4">
                                <div className="row">
                                  <div className="col-md-4">
                                    {/* <h6 className="subcategories"> PC & Servers
                                    </h6> */}
                                    <ul className="hovermenu">
                                      <li><a href="/category/servers">Servers</a></li>

                                    </ul>
                                  </div>
                                  <div className="col-md-4">
                                    {/* <h6 className="subcategories">Hard Drives By Interface</h6> */}
                                    <ul className="hovermenu" >
                                      <li><a href="/category/workstations">Workstations</a></li>

                                    </ul>
                                  </div>
                                  <div className="col-md-4">
                                    {/* <h6 className="subcategories">Hard Drives By Spindle
                                    </h6> */}
                                    <ul className="hovermenu">
                                      <li><a href="/category/dekstops">Dekstops</a></li>

                                    </ul>
                                  </div>
                                </div>

                                <div className="row border-top pt-3 mt-3">
                                  <div className="col-md-4">
                                    {/* <h6 className="subcategories">Hard Drives By Brands</h6> */}
                                    <ul className="hovermenu">
                                      <li><a href="/category/tablets">Tablets</a></li>

                                    </ul>
                                  </div>
                                  <div className="col-md-4">
                                    {/* <h6 className="subcategories">Hard Drives By Brands</h6> */}
                                    <ul className="hovermenu" >
                                      <li><a href="/category/laptops">laptops</a></li>

                                    </ul>
                                  </div>
                                  {/* <div className="col-md-4">
                                    <h6 className="subcategories">Hard Drives By Brands</h6>
                                    <ul className="hovermenu">
                                      <li>Seagate</li>
                                      <li>WD</li>
                                      <li>Toshiba</li>
                                      <li>Samsung</li>
                                    </ul>
                                  </div> */}

                                </div>
                              </div>
                            )}

                            {activeCategory === "powersupply" && (
                              <div className="container gap-4">
                                <div className="row">
                                  <div className="col-md-4">
                                    {/* <h6 className="subcategories"> PC & Servers
                                    </h6> */}
                                    <ul className="hovermenu">
                                      <li><a href="/category/power-supply">Power Supply</a></li>

                                    </ul>
                                  </div>
                                  <div className="col-md-4">
                                    {/* <h6 className="subcategories">Hard Drives By Interface</h6> */}
                                    <ul className="hovermenu" >
                                      <li><a href="/category/ups-accessories">UPS Accessories</a></li>

                                    </ul>
                                  </div>
                                  <div className="col-md-4">
                                    {/* <h6 className="subcategories">Hard Drives By Spindle
                                    </h6> */}
                                    <ul className="hovermenu">
                                      <li><a href="/category/ups-batteries">UPS Batteries</a></li>

                                    </ul>
                                  </div>
                                </div>

                                <div className="row border-top pt-3 mt-3">
                                  <div className="col-md-4">
                                    {/* <h6 className="subcategories">Hard Drives By Brands</h6> */}
                                    <ul className="hovermenu">
                                      <li><a href="/category/power-distributions">Power Distributions</a></li>

                                    </ul>
                                  </div>
                                  {/* <div className="col-md-4">
                                    <h6 className="subcategories">Hard Drives By Brands</h6>
                                    <ul className="hovermenu" >
                                      <li><a href="/category/laptops">laptops</a></li>

                                    </ul>
                                  </div> */}
                                  {/* <div className="col-md-4">
                                    <h6 className="subcategories">Hard Drives By Brands</h6>
                                    <ul className="hovermenu">
                                      <li>Seagate</li>
                                      <li>WD</li>
                                      <li>Toshiba</li>
                                      <li>Samsung</li>
                                    </ul>
                                  </div> */}

                                </div>
                              </div>
                            )}

                            {activeCategory === "cpusprosesors" && (
                              <div className="container gap-4">
                                <div className="row">
                                  <div className="col-md-4">
                                    {/* <h6 className="subcategories"> PC & Servers
                                    </h6> */}
                                    <ul className="hovermenu">
                                      <li><a href="/category/internal-processors">Internal Processors</a></li>

                                    </ul>
                                  </div>
                                  <div className="col-md-4">
                                    {/* <h6 className="subcategories">Hard Drives By Interface</h6> */}
                                    <ul className="hovermenu" >
                                      <li><a href="/category/amd-processors">AMD Processors</a></li>

                                    </ul>
                                  </div>
                                  <div className="col-md-4">
                                    {/* <h6 className="subcategories">Hard Drives By Spindle
                                    </h6> */}
                                    <ul className="hovermenu">
                                      <li><a href="/category/processors-board">Processors Board</a></li>

                                    </ul>
                                  </div>
                                </div>

                                <div className="row border-top pt-3 mt-3">
                                  {/* <div className="col-md-4">
                                    <ul className="hovermenu">
                                      <li><a href="/category/power-distributions">Power Distributions</a></li>

                                    </ul>
                                  </div> */}
                                  {/* <div className="col-md-4">
                                    <h6 className="subcategories">Hard Drives By Brands</h6>
                                    <ul className="hovermenu" >
                                      <li><a href="/category/laptops">laptops</a></li>

                                    </ul>
                                  </div> */}
                                  {/* <div className="col-md-4">
                                    <h6 className="subcategories">Hard Drives By Brands</h6>
                                    <ul className="hovermenu">
                                      <li>Seagate</li>
                                      <li>WD</li>
                                      <li>Toshiba</li>
                                      <li>Samsung</li>
                                    </ul>
                                  </div> */}

                                </div>
                              </div>
                            )}

                            {activeCategory === "cables" && (
                              <div className="container gap-4">
                                <div className="row">
                                  <div className="col-md-4">
                                    {/* <h6 className="subcategories"> PC & Servers
                                    </h6> */}
                                    <ul className="hovermenu">
                                      <li><a href="/category/adapters">Adapters</a></li>
                                      <li><a href="/category/cables">Cables</a></li>


                                    </ul>
                                  </div>
                                  {/* <div className="col-md-4">
                                    <ul className="hovermenu" >
                                      <li><a href="/category/cables">Cables</a></li>

                                    </ul>
                                  </div> */}
                                  {/* <div className="col-md-4">
                                    <ul className="hovermenu">
                                      <li><a href="/category/processors-board">Processors Board</a></li>

                                    </ul>
                                  </div> */}
                                </div>

                                <div className="row border-top pt-3 mt-3">
                                  {/* <div className="col-md-4">
                                    <ul className="hovermenu">
                                      <li><a href="/category/power-distributions">Power Distributions</a></li>

                                    </ul>
                                  </div> */}
                                  {/* <div className="col-md-4">
                                    <h6 className="subcategories">Hard Drives By Brands</h6>
                                    <ul className="hovermenu" >
                                      <li><a href="/category/laptops">laptops</a></li>

                                    </ul>
                                  </div> */}
                                  {/* <div className="col-md-4">
                                    <h6 className="subcategories">Hard Drives By Brands</h6>
                                    <ul className="hovermenu">
                                      <li>Seagate</li>
                                      <li>WD</li>
                                      <li>Toshiba</li>
                                      <li>Samsung</li>
                                    </ul>
                                  </div> */}

                                </div>
                              </div>
                            )}

                            {activeCategory === "gaming" && (
                              <div className="container gap-4">
                                <div className="row">
                                  <div className="col-md-4">
                                    {/* <h6 className="subcategories"> PC & Servers
                                    </h6> */}
                                    <ul className="hovermenu">
                                      <li><a href="/category/gaming-console">Gaming Console</a></li>


                                    </ul>
                                  </div>
                                  <div className="col-md-4">
                                    <ul className="hovermenu" >
                                      <li><a href="/category/vr-headsets">VR Headsets</a></li>

                                    </ul>
                                  </div>
                                  <div className="col-md-4">
                                    <ul className="hovermenu">
                                      <li><a href="/category/gaming-accessories">Gaming Accessories</a></li>

                                    </ul>
                                  </div>

                                  
                                </div>

                                <div className="row border-top pt-3 mt-3">
                                  <div className="col-md-4">
                                    <ul className="hovermenu">
                                      <li><a href="/category/playstations">Playstations</a></li>

                                    </ul>
                                  </div>
                                  <div className="col-md-4">
                                    {/* <h6 className="subcategories">Hard Drives By Brands</h6> */}
                                    <ul className="hovermenu" >
                                      <li><a href="/category/xbox">Xbox</a></li>

                                    </ul>
                                  </div>
                                  {/* <div className="col-md-4">
                                    <h6 className="subcategories">Hard Drives By Brands</h6>
                                    <ul className="hovermenu">
                                      <li>Seagate</li>
                                      <li>WD</li>
                                      <li>Toshiba</li>
                                      <li>Samsung</li>
                                    </ul>
                                  </div> */}

                                </div>
                              </div>
                            )}

                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div
                className="sidenav fixed-sidebar marketplace-sidebar svg-icon-menu"
                style={{ display: openDropdown ? "block" : "none" }}
              >
                <nav>
                  <ul>
                    {categories?.map((item, i) => (
                      <li key={i} onClick={() => setActiveCategory(item?.name)}>
                        <Link href={`/category/${item?.slug}`} legacyBehavior>
                          <a>{item?.name}</a>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </nav>
              </div>
            </Col>

            <Col xxl="6" xl="9" className=" position-unset">
              <div className="main-nav-center main-navbar text-start">
                <div id="mainnav">
                  <div className="header-nav-middle">
                    <div className="main-nav navbar navbar-expand-xl navbar-light navbar-sticky">
                      <div
                        className={`offcanvas offcanvas-collapse order-xl-2 ${mobileSideBar ? "show" : ""
                          } `}
                      >
                        <div className="offcanvas-header navbar-shadow">
                          <h5>{t("menu")}</h5>
                          <Button
                            close
                            className="lead"
                            id="toggle_menu_btn"
                            type="button"
                            onClick={() => setMobileSideBar(false)}
                          >
                            <div>
                              <i className="ri-close-fill"></i>
                            </div>
                          </Button>
                        </div>
                        <div className="offcanvas-body">
                          <MainHeaderMenu />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Col>
          </Row>
        </Container>

        {/* ✅ ALL CATEGORIES DROPDOWN */}

      </div>
    </header >
  );
};

export default HeaderSix;
