import AccountContext from "@/Context/AccountContext";
import SettingContext from "@/Context/SettingContext";
import { ImagePath } from "@/Utils/Constants";
import { useContext, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { RiCalendarLine, RiFileList3Line, RiMailLine, RiMapPinLine, RiOrderPlayLine, RiPhoneLine, RiShieldUserLine, RiShoppingCartLine, RiStarLine, RiUserLine } from "react-icons/ri";
import { Col, Row } from "reactstrap";
import ProfileInformation from "./ProfileInformation";
import Image from "next/image";

const DashboardContent = () => {
    const { t } = useTranslation("common");
    const { accountData, setMobileSideBar } = useContext(AccountContext);
    const { convertCurrency } = useContext(SettingContext);

    // Force close sidebar on mount for mobile
    useEffect(() => {
        if (setMobileSideBar) {
            setMobileSideBar(false);
        }
    }, [setMobileSideBar]);

    // Helper to get initial
    const initial = accountData?.name?.charAt(0)?.toUpperCase() || "U";

    return (
        <div className="counter-section hbx-premium-dash-v3">
            {/* ── MOBILE INDUSTRIAL PRO UI V4 (d-md-none) ── */}
            <div className="d-md-none hbx-industrial-mob-wrapper">
                {/* 1. FULL-BLEED DARK HERO */}
                <div className="hbx-ind-hero">
                    <div className="hbx-ind-profile">
                        <div className="hbx-ind-avatar">{initial}</div>
                        <div className="hbx-ind-welcome">
                            <span className="hbx-ind-label">Pro Account</span>
                            <h2>{accountData?.name}</h2>
                            <p className="hbx-ind-sub">{accountData?.email}</p>
                        </div>
                    </div>

                    {/* COMPACT STATS BAR */}
                    <div className="hbx-ind-stats-bar">
                        <div className="hbx-ind-stat">
                            <label>Wallet</label>
                            <span className="val">{accountData?.wallet ? convertCurrency(accountData?.wallet?.balance) : convertCurrency(0)}</span>
                        </div>
                        <div className="hbx-ind-divider"></div>
                        <div className="hbx-ind-stat">
                            <label>Points</label>
                            <span className="val">{Number(accountData?.point?.balance || 0)}</span>
                        </div>
                    </div>
                </div>

                {/* 2. GRID ACTIONS (High Contrast) */}
                <div className="hbx-ind-menu-grid">
                    <div className="hbx-ind-action-card" onClick={() => window.location.href = '/account/order'}>
                        <div className="icon"><RiShoppingCartLine /></div>
                        <div className="text">
                            <h3>My Orders</h3>
                            <span>History & Tracking</span>
                        </div>
                        <div className="arrow">&rsaquo;</div>
                    </div>
                    
                    <div className="hbx-ind-action-card" onClick={() => window.location.href = '/account/addresses'}>
                        <div className="icon"><RiMapPinLine /></div>
                        <div className="text">
                            <h3>Addresses</h3>
                            <span>Manage Shipping</span>
                        </div>
                        <div className="arrow">&rsaquo;</div>
                    </div>

                    <div className="hbx-ind-action-card" onClick={() => window.location.href = '/account/profile'}>
                        <div className="icon"><RiUserLine /></div>
                        <div className="text">
                            <h3>Profile Details</h3>
                            <span>Settings & Security</span>
                        </div>
                        <div className="arrow">&rsaquo;</div>
                    </div>

                    <div className="hbx-ind-action-card" onClick={() => window.location.href = '/account/notification'}>
                        <div className="icon"><RiMailLine /></div>
                        <div className="text">
                            <h3>Notifications</h3>
                            <span>Updates & Alerts</span>
                        </div>
                        <div className="arrow">&rsaquo;</div>
                    </div>
                </div>

                {/* 3. QUICK INFO STRIP */}
                <div className="hbx-ind-info-strip">
                    <div className="item">
                        <RiShieldUserLine />
                        <span>Type: <strong>{accountData?.role?.name || "Customer"}</strong></span>
                    </div>
                    <div className="item">
                        <RiCalendarLine />
                        <span>Joined: <strong>{accountData?.created_at ? new Date(accountData?.created_at).toLocaleDateString() : 'N/A'}</strong></span>
                    </div>
                </div>

                <div className="hbx-app-footer-spacer"></div>
            </div>

            {/* ── DESKTOP DEFAULT UI (d-none d-md-block) ── */}
            <div className="d-none d-md-block">
                <div className="welcome-msg">
                    <h4>
                        {t("hello")}, {accountData?.name ?? t("user")} !
                    </h4>
                    <p>{t("welcome_text")}</p>
                </div>

                <div className="total-box">
                    <Row>
                        <Col md={4}>
                            <div className="counter-box">
                                <Image src={`${ImagePath}/icon/dashboard/account1.png`} alt="wallerSvg" height={50} width={50} className="img-fluid" />
                                <div>
                                    <h3>{accountData?.wallet ? convertCurrency(accountData?.wallet?.balance) : 0?.toFixed(2)}</h3>
                                    <h5>{t("balance")}</h5>
                                </div>
                            </div>
                        </Col>
                        <Col md={4}>
                            <div className="counter-box">
                                <Image src={`${ImagePath}/icon/dashboard/account2.png`} className="img-fluid" alt="coinSvg" height={50} width={50} />
                                <div>
                                    <h3>{Number(accountData?.point ? accountData?.point?.balance : 0)}</h3>
                                    <h5>{t("total_points")}</h5>
                                </div>
                            </div>
                        </Col>
                        <Col md={4}>
                            <div className="counter-box">
                                <Image src={`${ImagePath}/icon/dashboard/account3.png`} className="img-fluid" alt="orderSvg" height={50} width={50} />
                                <div>
                                    <h3>{Number(accountData?.orders_count)}</h3>
                                    <h5>{t("total_orders")}</h5>
                                </div>
                            </div>
                        </Col>
                        <ProfileInformation />
                    </Row>
                </div>
            </div>
        </div>
    );
};

export default DashboardContent;
