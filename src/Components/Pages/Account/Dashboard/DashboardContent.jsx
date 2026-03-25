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
            {/* ── MOBILE PREMIUM UI V3 (d-md-none) ── */}
            <div className="d-md-none hbx-premium-app-wrapper">
                {/* 1. GLASSMORPHIC HERO SECTION */}
                <div className="hbx-app-hero">
                    <div className="hbx-app-profile-row">
                        <div className="hbx-app-avatar">{initial}</div>
                        <div className="hbx-app-greeting">
                            <span className="hbx-app-welcome">Welcome back,</span>
                            <h2>{accountData?.name}</h2>
                        </div>
                        <button className="hbx-app-notify-btn" onClick={() => window.location.href = '/account/notification'}>
                            <RiMailLine />
                            <span className="dot"></span>
                        </button>
                    </div>

                    {/* QUICK STATS WIDGETS */}
                    <div className="hbx-app-stats-row">
                        <div className="hbx-stat-card wallet">
                            <div className="icon"><RiStarLine /></div>
                            <div className="info">
                                <span>Wallet</span>
                                <h6>{accountData?.wallet ? convertCurrency(accountData?.wallet?.balance) : convertCurrency(0)}</h6>
                            </div>
                        </div>
                        <div className="hbx-stat-card points">
                            <div className="icon"><RiOrderPlayLine /></div>
                            <div className="info">
                                <span>Points</span>
                                <h6>{Number(accountData?.point?.balance || 0)}</h6>
                            </div>
                        </div>
                    </div>
                </div>

                {/* 2. QUICK ACTIONS SECTION */}
                <div className="hbx-app-menu-section">
                    <h4 className="hbx-section-title">Quick Actions</h4>
                    <div className="hbx-app-grid">
                        <div className="hbx-grid-item" onClick={() => window.location.href = '/account/order'}>
                            <div className="grid-icon orders"><RiShoppingCartLine /></div>
                            <span>My Orders</span>
                        </div>
                        <div className="hbx-grid-item" onClick={() => window.location.href = '/account/addresses'}>
                            <div className="grid-icon address"><RiMapPinLine /></div>
                            <span>Addresses</span>
                        </div>
                        <div className="hbx-grid-item" onClick={() => window.location.href = '/account/profile'}>
                            <div className="grid-icon profile"><RiUserLine /></div>
                            <span>Profile</span>
                        </div>
                        <div className="hbx-grid-item" onClick={() => window.location.href = '/account/wallet'}>
                            <div className="grid-icon notifications"><RiStarLine /></div>
                            <span>Wallet</span>
                        </div>
                    </div>
                </div>

                {/* 3. INFORMATION CARDS */}
                <div className="hbx-app-info-section">
                    <h4 className="hbx-section-title">Account Details</h4>
                    <div className="hbx-info-stack">
                        <div className="hbx-info-card">
                            <div className="inner">
                                <label>Email Address</label>
                                <p>{accountData?.email}</p>
                            </div>
                            <RiMailLine className="bg-icon" />
                        </div>
                        <div className="hbx-info-card phone">
                            <div className="inner">
                                <label>Phone Number</label>
                                <p>+{accountData?.country_code} {accountData?.phone}</p>
                            </div>
                            <RiPhoneLine className="bg-icon" />
                        </div>
                        <div className="hbx-info-card type">
                            <div className="inner">
                                <label>Account Category</label>
                                <p>{accountData?.role?.name || "Premium Consumer"}</p>
                            </div>
                            <RiShieldUserLine className="bg-icon" />
                        </div>
                    </div>
                </div>

                {/* FOOTER PUSH (For Mobile Menu Spacing) */}
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
