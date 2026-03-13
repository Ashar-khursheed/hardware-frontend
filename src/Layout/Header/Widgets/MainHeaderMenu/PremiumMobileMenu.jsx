"use client";
import React, { useContext, useState } from "react";
import Link from "next/link";
import { useTranslation } from "react-i18next";
import { RiArrowDownSLine } from "react-icons/ri";
import ThemeOptionContext from "@/Context/ThemeOptionsContext";

const MobileMenuItem = ({ menu, activeMenu, toggleMenu, closeSidebar, t, level = 0 }) => {
    const hasChildren = menu.child && menu.child.length > 0;
    const isOpen = activeMenu === menu.title;

    return (
        <li className="hbx-menu-item">
            {hasChildren ? (
                <>
                    <div
                        className={`hbx-menu-link ${isOpen ? "active" : ""}`}
                        style={{ paddingLeft: `${24 + level * 16}px` }}
                        onClick={() => toggleMenu(menu.title)}
                    >
                        <span>{t(menu.title)}</span>
                        <RiArrowDownSLine />
                    </div>
                    <ul className={`hbx-submenu ${isOpen ? "open" : ""}`}>
                        {menu.child.map((child, j) => (
                            <MobileMenuItem
                                key={j}
                                menu={child}
                                activeMenu={null} // Simplified: only track active at current level for now
                                toggleMenu={() => { }}
                                closeSidebar={closeSidebar}
                                t={t}
                                level={level + 1}
                            />
                        ))}
                    </ul>
                </>
            ) : (
                <Link
                    href={menu.path ? (menu.path.startsWith("/") ? menu.path : `/${menu.path}`) : "#"}
                    className="hbx-submenu-link"
                    style={{ paddingLeft: `${24 + level * 24}px`, display: 'block', padding: '12px 24px' }}
                    onClick={closeSidebar}
                >
                    <span>{t(menu.title)}</span>
                </Link>
            )}
        </li>
    );
};

const PremiumMobileMenu = ({ menuData }) => {
    const { t } = useTranslation("common");
    const { setMobileSideBar } = useContext(ThemeOptionContext);
    const [activeMenu, setActiveMenu] = useState(null);

    const toggleMenu = (title) => {
        setActiveMenu(activeMenu === title ? null : title);
    };

    const closeSidebar = () => setMobileSideBar(false);

    return (
        <div className="hbx-mobile-menu-wrapper">
            <ul className="hbx-mobile-menu-list">
                {menuData?.map((menu, i) => (
                    <MobileMenuItem
                        key={i}
                        menu={menu}
                        activeMenu={activeMenu}
                        toggleMenu={toggleMenu}
                        closeSidebar={closeSidebar}
                        t={t}
                    />
                ))}
            </ul>
        </div>
    );
};

export default PremiumMobileMenu;
