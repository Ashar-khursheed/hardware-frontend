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
   const handleProfileClick = (e) => {
      e.preventDefault();
      e.stopPropagation();
      if (isAuthenticated) {
        router.push("/account/dashboard");
      } else {
        setOpenAuthModal(true);
      }
    };

   
    const handleWishlistClick = (e) => {
      e.preventDefault();
      e.stopPropagation();
      if (isAuthenticated) {
        router.push("/wishlist");
      } else {
        setOpenAuthModal(true);
      }
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
                  {/* Wishlist Icon */}
                  <li className="onhover-div">
                    <div 
                      onClick={handleWishlistClick}
                      style={{ cursor: 'pointer', display: 'flex', alignItems: 'center' }}
                    >
                      <RiHeartLine />
                    </div>
                  </li>
                  
                  {/* Cart Icon */}
                  <li className="onhover-div">
                    <HeaderCart />
                  </li>
                  
                  {/* User Icon */}
                  <li className="onhover-div">
                    <div 
                      onClick={handleProfileClick}
                      style={{ cursor: 'pointer', display: 'flex', alignItems: 'center' }}
                    >
                      <RiUserLine />
                    </div>
                  </li>
                </ul>
              </div>
            </div>
  </div>
            {/* <div className="menu-right pull-right">
              <div>
                <div className="icon-nav">
                  <ul>
                    <li className="onhover-div">
                      <Link
                        href={isAuthenticated ? "/wishlist" : Href}
                        onClick={handleWishlistClick}
                        style={{ cursor: 'pointer' }}
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
                        style={{ cursor: 'pointer' }}

                        legacyBehavior
                      >
                        <RiUserLine />
                      </Link>
                    </li>
                  </ul>
                </div>
              </div>
            </div> */}
          </div>
        </Col>
      </Container>

      {/* ✅ SHOP BY CATEGORY + ALL CATEGORIES MEGA MENU */}
      <div className="bottom-part bottom-light">
        <Container>
          <Row>
           
            {/* 
  ========================================
  REPLACE THIS SECTION IN YOUR HeaderSix.jsx
  Find: <Col xl="2" className="position-relative">
  Replace the entire content inside with this code
  ========================================
*/}

     <Col xxl="2" xl="3" lg="3" md="4" sm="4" className="position-relative">

        <div className="category-menu d-none d-xl-block h-100">
          <div className="category-dropdown-wrapper">
            {/* Trigger Button */}
            <div className="category-trigger">
              <RiMenuLine className="trigger-icon" />
              <span className="trigger-text">ALL CATEGORIES</span>
              <svg className="trigger-arrow" width="12" height="12" viewBox="0 0 12 12" fill="currentColor">
                <path d="M2.5 4.5L6 8L9.5 4.5" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round"/>
              </svg>
            </div>

            {/* Mega Menu Dropdown */}
           <div className="mega-menu-dropdown">
              <div className="mega-menu-inner">
                {/* Left Categories Panel */}
                <div className="categories-panel">
                  <ul className="category-list">
                    <li
                      onMouseEnter={() => setActiveCategory("harddrives")}
                      className={`category-item ${activeCategory === "harddrives" ? "active" : ""}`}
                    >
                      <Link href="/category/storage-devices" className="category-link">
                        <svg className="cat-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <rect x="2" y="4" width="20" height="16" rx="2"/>
                          <path d="M6 8h.01M6 12h.01M6 16h.01"/>
                        </svg>
                        <span>Storage Devices</span>
                        <svg className="arrow-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M9 18l6-6-6-6"/>
                        </svg>
                      </Link>
                    </li>

                    <li
                      onMouseEnter={() => setActiveCategory("cpus")}
                      className={`category-item ${activeCategory === "cpus" ? "active" : ""}`}
                    >
                      <Link href="/category/memories" className="category-link">
                        <svg className="cat-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <rect x="4" y="4" width="16" height="16" rx="1"/>
                          <path d="M9 1v3M15 1v3M9 20v3M15 20v3M1 9h3M1 15h3M20 9h3M20 15h3"/>
                        </svg>
                        <span>Memories</span>
                        <svg className="arrow-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M9 18l6-6-6-6"/>
                        </svg>
                      </Link>
                    </li>

                    <li
                      onMouseEnter={() => setActiveCategory("memory")}
                      className={`category-item ${activeCategory === "memory" ? "active" : ""}`}
                    >
                      <Link href="/category/networking-devices" className="category-link">
                        <svg className="cat-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <rect x="9" y="2" width="6" height="6" rx="1"/>
                          <rect x="2" y="16" width="6" height="6" rx="1"/>
                          <rect x="16" y="16" width="6" height="6" rx="1"/>
                          <path d="M12 8v4M5 16v-2a2 2 0 012-2h10a2 2 0 012 2v2"/>
                        </svg>
                        <span>Networking Devices</span>
                        <svg className="arrow-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M9 18l6-6-6-6"/>
                        </svg>
                      </Link>
                    </li>

                    <li
                      onMouseEnter={() => setActiveCategory("ssd")}
                      className={`category-item ${activeCategory === "ssd" ? "active" : ""}`}
                    >
                      <Link href="/category/motherboard" className="category-link">
                        <svg className="cat-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <rect x="2" y="2" width="20" height="20" rx="2"/>
                          <rect x="6" y="6" width="4" height="4"/>
                          <rect x="14" y="6" width="4" height="4"/>
                          <rect x="6" y="14" width="4" height="4"/>
                          <path d="M14 14h4v4"/>
                        </svg>
                        <span>Motherboard</span>
                        <svg className="arrow-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M9 18l6-6-6-6"/>
                        </svg>
                      </Link>
                    </li>

                    <li
                      onMouseEnter={() => setActiveCategory("graphics")}
                      className={`category-item ${activeCategory === "graphics" ? "active" : ""}`}
                    >
                      <Link href="/category/printer-scanners" className="category-link">
                        <svg className="cat-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M6 9V2h12v7"/>
                          <path d="M6 18H4a2 2 0 01-2-2v-5a2 2 0 012-2h16a2 2 0 012 2v5a2 2 0 01-2 2h-2"/>
                          <rect x="6" y="14" width="12" height="8"/>
                        </svg>
                        <span>Printer & Scanners</span>
                        <svg className="arrow-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M9 18l6-6-6-6"/>
                        </svg>
                      </Link>
                    </li>

                    <li
                      onMouseEnter={() => setActiveCategory("motherboards")}
                      className={`category-item ${activeCategory === "motherboards" ? "active" : ""}`}
                    >
                      <Link href="/category/pc-and-servers" className="category-link">
                        <svg className="cat-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <rect x="2" y="2" width="20" height="8" rx="2"/>
                          <rect x="2" y="14" width="20" height="8" rx="2"/>
                          <path d="M6 6h.01M6 18h.01"/>
                        </svg>
                        <span>PC & Servers</span>
                        <svg className="arrow-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M9 18l6-6-6-6"/>
                        </svg>
                      </Link>
                    </li>

                    <li
                      onMouseEnter={() => setActiveCategory("powersupply")}
                      className={`category-item ${activeCategory === "powersupply" ? "active" : ""}`}
                    >
                      <Link href="/category/power-supply" className="category-link">
                        <svg className="cat-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/>
                        </svg>
                        <span>Power Supply & Protection</span>
                        <svg className="arrow-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M9 18l6-6-6-6"/>
                        </svg>
                      </Link>
                    </li>

                    <li
                      onMouseEnter={() => setActiveCategory("cpusprosesors")}
                      className={`category-item ${activeCategory === "cpusprosesors" ? "active" : ""}`}
                    >
                      <Link href="/category/cpus-processors" className="category-link">
                        <svg className="cat-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <rect x="4" y="4" width="16" height="16" rx="2"/>
                          <rect x="9" y="9" width="6" height="6"/>
                          <path d="M9 1v3M15 1v3M9 20v3M15 20v3M1 9h3M1 15h3M20 9h3M20 15h3"/>
                        </svg>
                        <span>CPUs & Processors</span>
                        <svg className="arrow-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M9 18l6-6-6-6"/>
                        </svg>
                      </Link>
                    </li>

                    <li
                      onMouseEnter={() => setActiveCategory("gpus")}
                      className={`category-item ${activeCategory === "gpus" ? "active" : ""}`}
                    >
                      <Link href="/category/gpus" className="category-link">
                        <svg className="cat-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <rect x="2" y="6" width="20" height="12" rx="2"/>
                          <path d="M6 10h4M6 14h4M14 10h4M14 14h4"/>
                        </svg>
                        <span>GPUs</span>
                        <svg className="arrow-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M9 18l6-6-6-6"/>
                        </svg>
                      </Link>
                    </li>

                    <li
                      onMouseEnter={() => setActiveCategory("cables")}
                      className={`category-item ${activeCategory === "cables" ? "active" : ""}`}
                    >
                      <Link href="/category/cables-adapters" className="category-link">
                        <svg className="cat-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M8 2v4M16 2v4M3 10h18M8 14v4M16 14v4M12 6v4"/>
                        </svg>
                        <span>Cables & Adapters</span>
                        <svg className="arrow-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M9 18l6-6-6-6"/>
                        </svg>
                      </Link>
                    </li>

                    <li
                      onMouseEnter={() => setActiveCategory("gaming")}
                      className={`category-item ${activeCategory === "gaming" ? "active" : ""}`}
                    >
                      <Link href="/category/gaming" className="category-link">
                        <svg className="cat-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M6 12h4M8 10v4"/>
                          <circle cx="17" cy="10" r="1"/>
                          <circle cx="15" cy="14" r="1"/>
                          <rect x="2" y="6" width="20" height="12" rx="2"/>
                        </svg>
                        <span>Gaming</span>
                        <svg className="arrow-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M9 18l6-6-6-6"/>
                        </svg>
                      </Link>
                    </li>
                  </ul>
                </div>

                {/* Right Subcategories Panel */}
                <div className="subcategories-panel">
                  {activeCategory === "harddrives" && (
                    <div className="subcategory-content">
                      <div className="subcategory-header">
                        <h4>Storage Devices</h4>
                      </div>
                      <div className="subcategory-grid">
                        <Link href="/category/internal-hard-drives" className="subcategory-item">
                          <span className="dot"></span>Internal Hard Drives
                        </Link>
                        <Link href="/category/external-hard-drives" className="subcategory-item">
                          <span className="dot"></span>External Hard Drives
                        </Link>
                        <Link href="/category/ssds" className="subcategory-item">
                          <span className="dot"></span>SSDs
                        </Link>
                        <Link href="/category/server-hard-drives" className="subcategory-item">
                          <span className="dot"></span>Server Hard Drives
                        </Link>
                        <Link href="/category/desktop-hard-drives" className="subcategory-item">
                          <span className="dot"></span>Desktop Hard Drives
                        </Link>
                        <Link href="/category/laptop-hard-drives" className="subcategory-item">
                          <span className="dot"></span>Laptop Hard Drives
                        </Link>
                        <Link href="/category/Hard-Drives-Enclosures" className="subcategory-item">
                          <span className="dot"></span>Hard Drive Enclosures
                        </Link>
                      </div>

                       <div className="promo-banner-wrapper">
                          <Link href="/category/storage-devices" className="promo-banner">
                            <div className="promo-banner-content">
                              <div className="promo-badge">HOT DEAL</div>
                              <h3 className="promo-title">Up to 10% OFF</h3>
                              <p className="promo-subtitle">On Selected Tech Products</p>
                              <div className="promo-cta">
                                <span>Shop Now</span>
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                  <path d="M5 12h14M12 5l7 7-7 7"/>
                                </svg>
                              </div>
                            </div>
                            <div className="promo-banner-graphic">
                              <svg width="120" height="120" viewBox="0 0 120 120" fill="none">
                                <circle cx="60" cy="60" r="55" stroke="currentColor" strokeWidth="2" opacity="0.2"/>
                                <circle cx="60" cy="60" r="40" stroke="currentColor" strokeWidth="2" opacity="0.3"/>
                                <circle cx="60" cy="60" r="25" stroke="currentColor" strokeWidth="2" opacity="0.4"/>
                                <path d="M60 35V60L75 75" stroke="currentColor" strokeWidth="3" strokeLinecap="round"/>
                              </svg>
                            </div>
                          </Link>
                        </div>
                    </div>
                  )}

                  {activeCategory === "cpus" && (
                    <div className="subcategory-content">
                      <div className="subcategory-header">
                        <h4>Memories</h4>
                      </div>
                      <div className="subcategory-grid">
                        <Link href="/category/desktop-memory" className="subcategory-item">
                          <span className="dot"></span>Desktop Memory
                        </Link>
                        <Link href="/category/server-memory" className="subcategory-item">
                          <span className="dot"></span>Server Memory
                        </Link>
                        <Link href="/category/laptop-memory" className="subcategory-item">
                          <span className="dot"></span>Laptop Memory
                        </Link>
                      </div>
                        <div className="promo-banner-wrapper">
                          <Link href="/category/memories" className="promo-banner">
                            <div className="promo-banner-content">
                              <div className="promo-badge">HOT DEAL</div>
                              <h3 className="promo-title">Up to 10% OFF</h3>
                              <p className="promo-subtitle">On Selected Tech Products</p>
                              <div className="promo-cta">
                                <span>Shop Now</span>
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                  <path d="M5 12h14M12 5l7 7-7 7"/>
                                </svg>
                              </div>
                            </div>
                            <div className="promo-banner-graphic">
                              <svg width="120" height="120" viewBox="0 0 120 120" fill="none">
                                <circle cx="60" cy="60" r="55" stroke="currentColor" strokeWidth="2" opacity="0.2"/>
                                <circle cx="60" cy="60" r="40" stroke="currentColor" strokeWidth="2" opacity="0.3"/>
                                <circle cx="60" cy="60" r="25" stroke="currentColor" strokeWidth="2" opacity="0.4"/>
                                <path d="M60 35V60L75 75" stroke="currentColor" strokeWidth="3" strokeLinecap="round"/>
                              </svg>
                            </div>
                          </Link>
                        </div>
                    </div>
                  )}

                  {activeCategory === "memory" && (
                    <div className="subcategory-content">
                      <div className="subcategory-header">
                        <h4>Networking Devices</h4>
                      </div>
                      <div className="subcategory-grid">
                        <Link href="/category/switches" className="subcategory-item">
                          <span className="dot"></span>Switches
                        </Link>
                        <Link href="/category/routers" className="subcategory-item">
                          <span className="dot"></span>Routers
                        </Link>
                        <Link href="/category/transceivers" className="subcategory-item">
                          <span className="dot"></span>Transceivers
                        </Link>
                        <Link href="/category/network-accessories" className="subcategory-item">
                          <span className="dot"></span>Network & Accessories
                        </Link>
                        <Link href="/category/ip-phones" className="subcategory-item">
                          <span className="dot"></span>IP Phones
                        </Link>
                      </div>
                         <div className="promo-banner-wrapper">
                          <Link href="/category/networking-devices" className="promo-banner">
                            <div className="promo-banner-content">
                              <div className="promo-badge">HOT DEAL</div>
                              <h3 className="promo-title">Up to 10% OFF</h3>
                              <p className="promo-subtitle">On Selected Tech Products</p>
                              <div className="promo-cta">
                                <span>Shop Now</span>
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                  <path d="M5 12h14M12 5l7 7-7 7"/>
                                </svg>
                              </div>
                            </div>
                            <div className="promo-banner-graphic">
                              <svg width="120" height="120" viewBox="0 0 120 120" fill="none">
                                <circle cx="60" cy="60" r="55" stroke="currentColor" strokeWidth="2" opacity="0.2"/>
                                <circle cx="60" cy="60" r="40" stroke="currentColor" strokeWidth="2" opacity="0.3"/>
                                <circle cx="60" cy="60" r="25" stroke="currentColor" strokeWidth="2" opacity="0.4"/>
                                <path d="M60 35V60L75 75" stroke="currentColor" strokeWidth="3" strokeLinecap="round"/>
                              </svg>
                            </div>
                          </Link>
                        </div>
                    </div>
                  )}

                  {activeCategory === "ssd" && (
                    <div className="subcategory-content">
                      <div className="subcategory-header">
                        <h4>Motherboard</h4>
                      </div>
                      <div className="subcategory-grid">
                        <Link href="/category/server-motherboards" className="subcategory-item">
                          <span className="dot"></span>Server Motherboards
                        </Link>
                        <Link href="/category/laptop-motherboards" className="subcategory-item">
                          <span className="dot"></span>Laptop Motherboards
                        </Link>
                        <Link href="/category/desktop-motherboards" className="subcategory-item">
                          <span className="dot"></span>Desktop Motherboards
                        </Link>
                        <Link href="/category/gaming-motherboards" className="subcategory-item">
                          <span className="dot"></span>Gaming Motherboards
                        </Link>
                      </div>
                       <div className="promo-banner-wrapper">
                          <Link href="/category/motherboard" className="promo-banner">
                            <div className="promo-banner-content">
                              <div className="promo-badge">HOT DEAL</div>
                              <h3 className="promo-title">Up to 10% OFF</h3>
                              <p className="promo-subtitle">On Selected Tech Products</p>
                              <div className="promo-cta">
                                <span>Shop Now</span>
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                  <path d="M5 12h14M12 5l7 7-7 7"/>
                                </svg>
                              </div>
                            </div>
                            <div className="promo-banner-graphic">
                              <svg width="120" height="120" viewBox="0 0 120 120" fill="none">
                                <circle cx="60" cy="60" r="55" stroke="currentColor" strokeWidth="2" opacity="0.2"/>
                                <circle cx="60" cy="60" r="40" stroke="currentColor" strokeWidth="2" opacity="0.3"/>
                                <circle cx="60" cy="60" r="25" stroke="currentColor" strokeWidth="2" opacity="0.4"/>
                                <path d="M60 35V60L75 75" stroke="currentColor" strokeWidth="3" strokeLinecap="round"/>
                              </svg>
                            </div>
                          </Link>
                        </div>
                    </div>
                  )}

                  {activeCategory === "graphics" && (
                    <div className="subcategory-content">
                      <div className="subcategory-header">
                        <h4>Printer & Scanners</h4>
                      </div>
                      <div className="subcategory-grid">
                        <Link href="/category/barcode-printers" className="subcategory-item">
                          <span className="dot"></span>Barcode Printers
                        </Link>
                        <Link href="/category/pos-printers" className="subcategory-item">
                          <span className="dot"></span>POS Printers
                        </Link>
                        <Link href="/category/office-printers" className="subcategory-item">
                          <span className="dot"></span>Office Printers
                        </Link>
                        <Link href="/category/Card-printers" className="subcategory-item">
                          <span className="dot"></span>Card Printers
                        </Link>
                        <Link href="/category/barcode-scanners" className="subcategory-item">
                          <span className="dot"></span>Barcode Scanners
                        </Link>
                        <Link href="/category/sensors" className="subcategory-item">
                          <span className="dot"></span>Sensors
                        </Link>
                      </div>

                       <div className="promo-banner-wrapper">
                          <Link href="/category/printer-scanners" className="promo-banner">
                            <div className="promo-banner-content">
                              <div className="promo-badge">HOT DEAL</div>
                              <h3 className="promo-title">Up to 10% OFF</h3>
                              <p className="promo-subtitle">On Selected Tech Products</p>
                              <div className="promo-cta">
                                <span>Shop Now</span>
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                  <path d="M5 12h14M12 5l7 7-7 7"/>
                                </svg>
                              </div>
                            </div>
                            <div className="promo-banner-graphic">
                              <svg width="120" height="120" viewBox="0 0 120 120" fill="none">
                                <circle cx="60" cy="60" r="55" stroke="currentColor" strokeWidth="2" opacity="0.2"/>
                                <circle cx="60" cy="60" r="40" stroke="currentColor" strokeWidth="2" opacity="0.3"/>
                                <circle cx="60" cy="60" r="25" stroke="currentColor" strokeWidth="2" opacity="0.4"/>
                                <path d="M60 35V60L75 75" stroke="currentColor" strokeWidth="3" strokeLinecap="round"/>
                              </svg>
                            </div>
                          </Link>
                        </div>
                    </div>
                  )}

                  {activeCategory === "motherboards" && (
                    <div className="subcategory-content">
                      <div className="subcategory-header">
                        <h4>PC & Servers</h4>
                      </div>
                      <div className="subcategory-grid">
                        <Link href="/category/servers" className="subcategory-item">
                          <span className="dot"></span>Servers
                        </Link>
                        <Link href="/category/workstations" className="subcategory-item">
                          <span className="dot"></span>Workstations
                        </Link>
                        <Link href="/category/desktops" className="subcategory-item">
                          <span className="dot"></span>Desktops
                        </Link>
                        <Link href="/category/tablets" className="subcategory-item">
                          <span className="dot"></span>Tablets
                        </Link>
                        <Link href="/category/laptops" className="subcategory-item">
                          <span className="dot"></span>Laptops
                        </Link>
                      </div>

                       <div className="promo-banner-wrapper">
                          <Link href="/category/pc-and-servers" className="promo-banner">
                            <div className="promo-banner-content">
                              <div className="promo-badge">HOT DEAL</div>
                              <h3 className="promo-title">Up to 10% OFF</h3>
                              <p className="promo-subtitle">On Selected Tech Products</p>
                              <div className="promo-cta">
                                <span>Shop Now</span>
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                  <path d="M5 12h14M12 5l7 7-7 7"/>
                                </svg>
                              </div>
                            </div>
                            <div className="promo-banner-graphic">
                              <svg width="120" height="120" viewBox="0 0 120 120" fill="none">
                                <circle cx="60" cy="60" r="55" stroke="currentColor" strokeWidth="2" opacity="0.2"/>
                                <circle cx="60" cy="60" r="40" stroke="currentColor" strokeWidth="2" opacity="0.3"/>
                                <circle cx="60" cy="60" r="25" stroke="currentColor" strokeWidth="2" opacity="0.4"/>
                                <path d="M60 35V60L75 75" stroke="currentColor" strokeWidth="3" strokeLinecap="round"/>
                              </svg>
                            </div>
                          </Link>
                        </div>
                    </div>
                  )}

                  {activeCategory === "powersupply" && (
                    <div className="subcategory-content">
                      <div className="subcategory-header">
                        <h4>Power Supply & Protection</h4>
                      </div>
                      <div className="subcategory-grid">
                        <Link href="/category/power-supply" className="subcategory-item">
                          <span className="dot"></span>Power Supply
                        </Link>
                        <Link href="/category/power-adapters-chargers" className="subcategory-item">
                          <span className="dot"></span>Power Adapters & Chargers
                        </Link>
                        <Link href="/category/power-distributions" className="subcategory-item">
                          <span className="dot"></span>Power Distributions
                        </Link>
                      </div>

                       <div className="promo-banner-wrapper">
                          <Link href="/category/power-supply" className="promo-banner">
                            <div className="promo-banner-content">
                              <div className="promo-badge">HOT DEAL</div>
                              <h3 className="promo-title">Up to 10% OFF</h3>
                              <p className="promo-subtitle">On Selected Tech Products</p>
                              <div className="promo-cta">
                                <span>Shop Now</span>
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                  <path d="M5 12h14M12 5l7 7-7 7"/>
                                </svg>
                              </div>
                            </div>
                            <div className="promo-banner-graphic">
                              <svg width="120" height="120" viewBox="0 0 120 120" fill="none">
                                <circle cx="60" cy="60" r="55" stroke="currentColor" strokeWidth="2" opacity="0.2"/>
                                <circle cx="60" cy="60" r="40" stroke="currentColor" strokeWidth="2" opacity="0.3"/>
                                <circle cx="60" cy="60" r="25" stroke="currentColor" strokeWidth="2" opacity="0.4"/>
                                <path d="M60 35V60L75 75" stroke="currentColor" strokeWidth="3" strokeLinecap="round"/>
                              </svg>
                            </div>
                          </Link>
                        </div>
                    </div>
                  )}

                  {activeCategory === "cpusprosesors" && (
                    <div className="subcategory-content">
                      <div className="subcategory-header">
                        <h4>CPUs & Processors</h4>
                      </div>
                      <div className="subcategory-grid">
                        <Link href="/category/server-processors" className="subcategory-item">
                          <span className="dot"></span>Server Processors
                        </Link>
                        <Link href="/category/desktop-processors" className="subcategory-item">
                          <span className="dot"></span>Desktop Processors
                        </Link>
                        <Link href="/category/laptop-processors" className="subcategory-item">
                          <span className="dot"></span>Laptop Processors
                        </Link>
                      </div>

                       <div className="promo-banner-wrapper">
                          <Link href="/category/cpus-processors" className="promo-banner">
                            <div className="promo-banner-content">
                              <div className="promo-badge">HOT DEAL</div>
                              <h3 className="promo-title">Up to 10% OFF</h3>
                              <p className="promo-subtitle">On Selected Tech Products</p>
                              <div className="promo-cta">
                                <span>Shop Now</span>
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                  <path d="M5 12h14M12 5l7 7-7 7"/>
                                </svg>
                              </div>
                            </div>
                            <div className="promo-banner-graphic">
                              <svg width="120" height="120" viewBox="0 0 120 120" fill="none">
                                <circle cx="60" cy="60" r="55" stroke="currentColor" strokeWidth="2" opacity="0.2"/>
                                <circle cx="60" cy="60" r="40" stroke="currentColor" strokeWidth="2" opacity="0.3"/>
                                <circle cx="60" cy="60" r="25" stroke="currentColor" strokeWidth="2" opacity="0.4"/>
                                <path d="M60 35V60L75 75" stroke="currentColor" strokeWidth="3" strokeLinecap="round"/>
                              </svg>
                            </div>
                          </Link>
                        </div>
                    </div>
                  )}

                  {activeCategory === "gpus" && (
                    <div className="subcategory-content">
                      <div className="subcategory-header">
                        <h4>GPUs</h4>
                      </div>
                      <div className="subcategory-grid">
                        <Link href="/category/graphics-card" className="subcategory-item">
                          <span className="dot"></span>Graphics Card
                        </Link>
                      </div>

                       <div className="promo-banner-wrapper">
                          <Link href="/category/gpus" className="promo-banner">
                            <div className="promo-banner-content">
                              <div className="promo-badge">HOT DEAL</div>
                              <h3 className="promo-title">Up to 10% OFF</h3>
                              <p className="promo-subtitle">On Selected Tech Products</p>
                              <div className="promo-cta">
                                <span>Shop Now</span>
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                  <path d="M5 12h14M12 5l7 7-7 7"/>
                                </svg>
                              </div>
                            </div>
                            <div className="promo-banner-graphic">
                              <svg width="120" height="120" viewBox="0 0 120 120" fill="none">
                                <circle cx="60" cy="60" r="55" stroke="currentColor" strokeWidth="2" opacity="0.2"/>
                                <circle cx="60" cy="60" r="40" stroke="currentColor" strokeWidth="2" opacity="0.3"/>
                                <circle cx="60" cy="60" r="25" stroke="currentColor" strokeWidth="2" opacity="0.4"/>
                                <path d="M60 35V60L75 75" stroke="currentColor" strokeWidth="3" strokeLinecap="round"/>
                              </svg>
                            </div>
                          </Link>
                        </div>
                    </div>
                  )}

                  {activeCategory === "cables" && (
                    <div className="subcategory-content">
                      <div className="subcategory-header">
                        <h4>Cables & Adapters</h4>
                      </div>
                      <div className="subcategory-grid">
                        <Link href="/category/adapters" className="subcategory-item">
                          <span className="dot"></span>Adapters
                        </Link>
                        <Link href="/category/cables" className="subcategory-item">
                          <span className="dot"></span>Cables
                        </Link>
                      </div>

                       <div className="promo-banner-wrapper">
                          <Link href="/category/cables-adapters" className="promo-banner">
                            <div className="promo-banner-content">
                              <div className="promo-badge">HOT DEAL</div>
                              <h3 className="promo-title">Up to 10% OFF</h3>
                              <p className="promo-subtitle">On Selected Tech Products</p>
                              <div className="promo-cta">
                                <span>Shop Now</span>
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                  <path d="M5 12h14M12 5l7 7-7 7"/>
                                </svg>
                              </div>
                            </div>
                            <div className="promo-banner-graphic">
                              <svg width="120" height="120" viewBox="0 0 120 120" fill="none">
                                <circle cx="60" cy="60" r="55" stroke="currentColor" strokeWidth="2" opacity="0.2"/>
                                <circle cx="60" cy="60" r="40" stroke="currentColor" strokeWidth="2" opacity="0.3"/>
                                <circle cx="60" cy="60" r="25" stroke="currentColor" strokeWidth="2" opacity="0.4"/>
                                <path d="M60 35V60L75 75" stroke="currentColor" strokeWidth="3" strokeLinecap="round"/>
                              </svg>
                            </div>
                          </Link>
                        </div>
                    </div>
                  )}

                  {activeCategory === "gaming" && (
                    <div className="subcategory-content">
                      <div className="subcategory-header">
                        <h4>Gaming</h4>
                      </div>
                      <div className="subcategory-grid">
                        <Link href="/category/gaming-console" className="subcategory-item">
                          <span className="dot"></span>Gaming Console
                        </Link>
                        <Link href="/category/vr-headsets" className="subcategory-item">
                          <span className="dot"></span>VR Headsets
                        </Link>
                        <Link href="/category/gaming-accessories" className="subcategory-item">
                          <span className="dot"></span>Gaming Accessories
                        </Link>
                        <Link href="/category/playstations" className="subcategory-item">
                          <span className="dot"></span>PlayStation
                        </Link>
                        <Link href="/category/xbox" className="subcategory-item">
                          <span className="dot"></span>Xbox
                        </Link>
                      </div>

                       <div className="promo-banner-wrapper">
                          <Link href="/category/gaming" className="promo-banner">
                            <div className="promo-banner-content">
                              <div className="promo-badge">HOT DEAL</div>
                              <h3 className="promo-title">Up to 10% OFF</h3>
                              <p className="promo-subtitle">On Selected Tech Products</p>
                              <div className="promo-cta">
                                <span>Shop Now</span>
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                  <path d="M5 12h14M12 5l7 7-7 7"/>
                                </svg>
                              </div>
                            </div>
                            <div className="promo-banner-graphic">
                              <svg width="120" height="120" viewBox="0 0 120 120" fill="none">
                                <circle cx="60" cy="60" r="55" stroke="currentColor" strokeWidth="2" opacity="0.2"/>
                                <circle cx="60" cy="60" r="40" stroke="currentColor" strokeWidth="2" opacity="0.3"/>
                                <circle cx="60" cy="60" r="25" stroke="currentColor" strokeWidth="2" opacity="0.4"/>
                                <path d="M60 35V60L75 75" stroke="currentColor" strokeWidth="3" strokeLinecap="round"/>
                              </svg>
                            </div>
                          </Link>
                        </div>


                    </div>
                  )}
                </div>

              </div>

              {/* Promo Banner */}
              <div className="mega-menu-footer">
                🔥 Free shipping on orders over $99 — Shop our best deals today!
              </div>
            </div>
          </div>
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
