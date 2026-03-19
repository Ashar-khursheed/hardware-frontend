"use client";
import React, { useState, useContext } from "react";
import Link from "next/link";
import { RiArrowDownSLine } from "react-icons/ri";
import ThemeOptionContext from "@/Context/ThemeOptionsContext";

const staticCategories = [
    {
        id: "storage",
        title: "Storage Devices",
        path: "/category/storage-devices",
        child: [
            { title: "Internal Hard Drives", path: "/category/internal-hard-drives" },
            { title: "External Hard Drives", path: "/category/external-hard-drives" },
            { title: "SSDs", path: "/category/ssds" },
            { title: "Server Hard Drives", path: "/category/server-hard-drives" },
            { title: "Desktop Hard Drives", path: "/category/desktop-hard-drives" },
            { title: "Laptop Hard Drives", path: "/category/laptop-hard-drives" },
            { title: "Hard Drive Enclosures", path: "/category/Hard-Drives-Enclosures" },
        ],
    },
    {
        id: "memories",
        title: "Memories",
        path: "/category/memories",
        child: [
            { title: "Desktop Memory", path: "/category/desktop-memory" },
            { title: "Server Memory", path: "/category/server-memory" },
            { title: "Laptop Memory", path: "/category/laptop-memory" },
        ],
    },
    {
        id: "networking",
        title: "Networking Devices",
        path: "/category/networking-devices",
        child: [
            { title: "Switches", path: "/category/switches" },
            { title: "Routers", path: "/category/routers" },
            { title: "Transceivers", path: "/category/transceivers" },
            { title: "Network & Accessories", path: "/category/network-accessories" },
            { title: "IP Phones", path: "/category/ip-phones" },
        ],
    },
    {
        id: "motherboard",
        title: "Motherboard",
        path: " /category/motherboards",
        child: [
            { title: "Server Motherboards", path: "/category/server-motherboards" },
            { title: "Laptop Motherboards", path: "/category/laptop-motherboards" },
            { title: "Desktop Motherboards", path: "/category/desktop-motherboards" },
            { title: "Gaming Motherboards", path: "/category/gaming-motherboards" },
        ],
    },
    {
        id: "printers",
        title: "Printer & Scanners",
        path: "/category/printer-scanners",
        child: [
            { title: "Barcode Printers", path: "/category/barcode-printers" },
            { title: "POS Printers", path: "/category/pos-printers" },
            { title: "Office Printers", path: "/category/office-printers" },
            { title: "Card Printers", path: "/category/Card-printers" },
            { title: "Barcode Scanners", path: "/category/barcode-scanners" },
            { title: "Sensors", path: "/category/sensors" },
        ],
    },
    {
        id: "pcs",
        title: "PC & Servers",
        path: "/category/pc-and-servers",
        child: [
            { title: "Servers", path: "/category/servers" },
            { title: "Workstations", path: "/category/workstations" },
            { title: "Desktops", path: "/category/desktops" },
            { title: "Tablets", path: "/category/tablets" },
            { title: "Laptops", path: "/category/laptops" },
        ],
    },
    {
        id: "powersupply",
        title: "Power Supply & Protection",
        path: "/category/power-supply",
        child: [
            { title: "Power Supply", path: "/category/power-supply" },
            { title: "Power Adapters & Chargers", path: "/category/power-adapters-chargers" },
            { title: "Power Distributions", path: "/category/power-distributions" },
        ],
    },
    {
        id: "cpus",
        title: "CPUs & Processors",
        path: "/category/cpus-processors",
        child: [
            { title: "Server Processors", path: "/category/server-processors" },
            { title: "Desktop Processors", path: "/category/desktop-processors" },
            { title: "Laptop Processors", path: "/category/laptop-processors" },
        ],
    },
    {
        id: "gpus",
        title: "GPUs",
        path: "/category/gpus",
        child: [
            { title: "Graphics Card", path: "/category/graphics-card" },
        ],
    },
    {
        id: "cables",
        title: "Cables & Adapters",
        path: "/category/cables-adapters",
        child: [
            { title: "Adapters", path: "/category/adapters" },
            { title: "Cables", path: "/category/cables" },
        ],
    },
    {
        id: "gaming",
        title: "Gaming",
        path: "/category/gaming",
        child: [
            { title: "Gaming Console", path: "/category/gaming-console" },
            { title: "VR Headsets", path: "/category/vr-headsets" },
            { title: "Gaming Accessories", path: "/category/gaming-accessories" },
            { title: "PlayStation", path: "/category/playstations" },
            { title: "Xbox", path: "/category/xbox" },
        ],
    },
];

const StaticMobileMenu = () => {
    const { setMobileSideBar } = useContext(ThemeOptionContext);
    const [activeId, setActiveId] = useState(null);

    const toggleAccordion = (id) => {
        setActiveId(activeId === id ? null : id);
    };

    const handleLinkClick = () => {
        setMobileSideBar(false);
    };

    return (
        <div className="hbx-static-mobile-menu">
            <ul className="hbx-category-list">
                {staticCategories.map((cat) => (
                    <li key={cat.id} className="hbx-category-item">
                        <div
                            className={`hbx-category-header ${activeId === cat.id ? "active" : ""}`}
                            onClick={() => toggleAccordion(cat.id)}
                        >
                            <span>{cat.title}</span>
                            <RiArrowDownSLine className="hbx-icon-arrow" />
                        </div>
                        <ul className={`hbx-subcategory-list ${activeId === cat.id ? "open" : ""}`}>
                            {/* Main Category Link for better UX */}
                            <li className="hbx-subcategory-item main-link">
                                <Link href={cat.path} onClick={handleLinkClick}>
                                    View All {cat.title}
                                </Link>
                            </li>
                            {cat.child.map((sub, idx) => (
                                <li key={idx} className="hbx-subcategory-item">
                                    <Link href={sub.path} onClick={handleLinkClick}>
                                        {sub.title}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default StaticMobileMenu;
