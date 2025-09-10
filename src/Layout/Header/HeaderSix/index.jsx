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
            <Col xl="3" className="position-relative">
              <div className="category-menu d-none d-xl-block h-100">
                {/* <div
                  id="toggle-sidebar"
                  className="toggle-sidebar"
                  onClick={() => setOpenDropdown(!openDropdown)}
                >
                  <RiMenuLine className="sidebar-bar" />
                  <h5 className="mb-0">{t("shop_by_category")}</h5>
                </div> */}
                <div className="container">
                  <div className="navbar">
                    <div className="container">
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
                                Hard Drives
                              </li>
                              <li
                                onMouseEnter={() => setActiveCategory("cpus")}
                                className={activeCategory === "cpus" ? "active" : ""}
                              >
                                CPUs & Processors
                              </li>
                              <li
                                onMouseEnter={() => setActiveCategory("memory")}
                                className={activeCategory === "memory" ? "active" : ""}
                              >
                                Memory
                              </li>
                              <li
                                onMouseEnter={() => setActiveCategory("ssd")}
                                className={activeCategory === "ssd" ? "active" : ""}
                              >
                                Solid State Drive (SSD)
                              </li>
                              <li
                                onMouseEnter={() => setActiveCategory("graphics")}
                                className={activeCategory === "graphics" ? "active" : ""}
                              >
                                Graphics Cards
                              </li>
                              <li
                                onMouseEnter={() => setActiveCategory("motherboards")}
                                className={activeCategory === "motherboards" ? "active" : ""}
                              >
                                Motherboards
                              </li>
                            </ul>
                          </div>

                          {/* RIGHT PANEL */}
                          <div className="menu-right rightpannel border-right flex-1  ">
                            {activeCategory === "harddrives" && (
                              <div className="container gap-4">
                                <div className="row">
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
                                    <h6 className="subcategories">Hard Drives By Interface</h6>
                                    <ul className="hovermenu" >
                                      <li>Seagate</li>
                                      <li>WD</li>
                                      <li>Toshiba</li>
                                      <li>Samsung</li>
                                    </ul>
                                  </div>
                                  <div className="col-md-4">
                                    <h6 className="subcategories">Hard Drives By Spindle
                                    </h6>
                                    <ul className="hovermenu">
                                      <li>Seagate</li>
                                      <li>WD</li>
                                      <li>Toshiba</li>
                                      <li>Samsung</li>
                                    </ul>
                                  </div>
                                </div>

                                <div className="row border-top pt-3 mt-3">
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

                                </div>
                              </div>

                            )}
                            {activeCategory === "cpus" && (
                              <div className="container gap-4">
                                <div className="row">
                                  <div className="col-md-4">
                                    <h6 className="subcategories">CPUs & Processors By Brands
                                    </h6>
                                    <ul className="hovermenu">
                                      <li>Seagate</li>
                                      <li>WD</li>
                                      <li>Toshiba</li>
                                      <li>Samsung</li>
                                    </ul>
                                  </div>
                                  <div className="col-md-4">
                                    <h6 className="subcategories">Hard Drives By Interface</h6>
                                    <ul className="hovermenu" >
                                      <li>Seagate</li>
                                      <li>WD</li>
                                      <li>Toshiba</li>
                                      <li>Samsung</li>
                                    </ul>
                                  </div>
                                  <div className="col-md-4">
                                    <h6 className="subcategories">Hard Drives By Spindle
                                    </h6>
                                    <ul className="hovermenu">
                                      <li>Seagate</li>
                                      <li>WD</li>
                                      <li>Toshiba</li>
                                      <li>Samsung</li>
                                    </ul>
                                  </div>
                                </div>

                                <div className="row border-top pt-3 mt-3">
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

                                </div>
                              </div>
                            )}
                            {activeCategory === "memory" && (
                              <div className="container gap-4">
                                <div className="row">
                                  <div className="col-md-4">
                                    <h6 className="subcategories">Memory
                                    </h6>
                                    <ul className="hovermenu">
                                      <li>memory</li>
                                      <li>WD</li>
                                      <li>Toshiba</li>
                                      <li>Samsung</li>
                                    </ul>
                                  </div>
                                  <div className="col-md-4">
                                    <h6 className="subcategories">Hard Drives By Interface</h6>
                                    <ul className="hovermenu" >
                                      <li>Seagate</li>
                                      <li>WD</li>
                                      <li>Toshiba</li>
                                      <li>Samsung</li>
                                    </ul>
                                  </div>
                                  <div className="col-md-4">
                                    <h6 className="subcategories">Hard Drives By Spindle
                                    </h6>
                                    <ul className="hovermenu">
                                      <li>Seagate</li>
                                      <li>WD</li>
                                      <li>Toshiba</li>
                                      <li>Samsung</li>
                                    </ul>
                                  </div>
                                </div>

                                <div className="row border-top pt-3 mt-3">
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

                                </div>
                              </div>
                            )}
                            {activeCategory === "ssd" && (
                              <div className="container gap-4">
                                <div className="row">
                                  <div className="col-md-4">
                                    <h6 className="subcategories">Solid State Drive
                                    </h6>
                                    <ul className="hovermenu">
                                      <li>memory</li>
                                      <li>WD</li>
                                      <li>Toshiba</li>
                                      <li>Samsung</li>
                                    </ul>
                                  </div>
                                  <div className="col-md-4">
                                    <h6 className="subcategories">Hard Drives By Interface</h6>
                                    <ul className="hovermenu" >
                                      <li>Seagate</li>
                                      <li>WD</li>
                                      <li>Toshiba</li>
                                      <li>Samsung</li>
                                    </ul>
                                  </div>
                                  <div className="col-md-4">
                                    <h6 className="subcategories">Hard Drives By Spindle
                                    </h6>
                                    <ul className="hovermenu">
                                      <li>Seagate</li>
                                      <li>WD</li>
                                      <li>Toshiba</li>
                                      <li>Samsung</li>
                                    </ul>
                                  </div>
                                </div>

                                <div className="row border-top pt-3 mt-3">
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

                                </div>
                              </div>
                            )}
                            {activeCategory === "graphics" && (
                              <div className="container gap-4">
                                <div className="row">
                                  <div className="col-md-4">
                                    <h6 className="subcategories">Graphic Cards
                                    </h6>
                                    <ul className="hovermenu">
                                      <li>memory</li>
                                      <li>WD</li>
                                      <li>Toshiba</li>
                                      <li>Samsung</li>
                                    </ul>
                                  </div>
                                  <div className="col-md-4">
                                    <h6 className="subcategories">Hard Drives By Interface</h6>
                                    <ul className="hovermenu" >
                                      <li>Seagate</li>
                                      <li>WD</li>
                                      <li>Toshiba</li>
                                      <li>Samsung</li>
                                    </ul>
                                  </div>
                                  <div className="col-md-4">
                                    <h6 className="subcategories">Hard Drives By Spindle
                                    </h6>
                                    <ul className="hovermenu">
                                      <li>Seagate</li>
                                      <li>WD</li>
                                      <li>Toshiba</li>
                                      <li>Samsung</li>
                                    </ul>
                                  </div>
                                </div>

                                <div className="row border-top pt-3 mt-3">
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

                                </div>
                              </div>
                            )}
                            {activeCategory === "motherboards" && (
                              <div className="container gap-4">
                                <div className="row">
                                  <div className="col-md-4">
                                    <h6 className="subcategories">Motherboards
                                    </h6>
                                    <ul className="hovermenu">
                                      <li>memory</li>
                                      <li>WD</li>
                                      <li>Toshiba</li>
                                      <li>Samsung</li>
                                    </ul>
                                  </div>
                                  <div className="col-md-4">
                                    <h6 className="subcategories">Hard Drives By Interface</h6>
                                    <ul className="hovermenu" >
                                      <li>Seagate</li>
                                      <li>WD</li>
                                      <li>Toshiba</li>
                                      <li>Samsung</li>
                                    </ul>
                                  </div>
                                  <div className="col-md-4">
                                    <h6 className="subcategories">Hard Drives By Spindle
                                    </h6>
                                    <ul className="hovermenu">
                                      <li>Seagate</li>
                                      <li>WD</li>
                                      <li>Toshiba</li>
                                      <li>Samsung</li>
                                    </ul>
                                  </div>
                                </div>

                                <div className="row border-top pt-3 mt-3">
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
