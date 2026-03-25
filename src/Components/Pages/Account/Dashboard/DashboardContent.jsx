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
        <div className="counter-section hbx-dash-v2">
            {/* ── MOBILE PREMIUM UI (d-md-none) ── */}
            <div className="d-block d-md-none">
                {/* 1. GREEN WELCOME CARD */}
                <div className="hbx-dash-mob-welcome-card">
                    <div className="hbx-dash-mob-profile-header">
                        <div className="hbx-dash-mob-avatar">{initial}</div>
                        <div className="hbx-dash-mob-name-box">
                            <h2>Welcome back, {accountData?.name?.split(' ')[0]}! 👋</h2>
                            {accountData?.business_name && <p>Business Name: {accountData?.business_name}</p>}
                        </div>
                    </div>

                    <div className="hbx-dash-mob-info-boxes">
                        <div className="hbx-dash-mob-info-pill">
                            <RiMailLine />
                            <div className="inner">
                                <span>Email</span>
                                <h6>{accountData?.email}</h6>
                            </div>
                        </div>
                        {accountData?.trn && (
                            <div className="hbx-dash-mob-info-pill trn-pill">
                                <RiFileList3Line />
                                <div className="inner">
                                    <span>TRN</span>
                                    <h6>{accountData?.trn || 'N/A'}</h6>
                                </div>
                            </div>
                        )}
                    </div>

                    <div className="hbx-dash-mob-divider" />

                    <div className="hbx-dash-mob-details-list">
                        <div className="hbx-dash-mob-detail-item">
                            <RiShieldUserLine />
                            <span>Account Type: <strong>{accountData?.role?.name || "Customer"}</strong></span>
                        </div>
                        <div className="hbx-dash-mob-detail-item">
                            <RiCalendarLine />
                            <span>Member Since: <strong>{accountData?.created_at ? new Date(accountData?.created_at).toLocaleDateString() : 'N/A'}</strong></span>
                        </div>
                        <div className="hbx-dash-mob-detail-item">
                            <RiPhoneLine />
                            <span>Phone No.: <strong>+{accountData?.country_code} {accountData?.phone}</strong></span>
                        </div>
                    </div>
                </div>

                {/* 2. NAVIGATION CARDS GRID */}
                <div className="hbx-dash-mob-nav-grid">
                    <div className="hbx-dash-mob-nav-card">
                        <div className="hbx-dash-mob-nav-icon orders"><RiShoppingCartLine /></div>
                        <div className="hbx-dash-mob-nav-content">
                            <h3>My Orders</h3>
                            <p>Track, manage, or reorder past purchases. View delivery status and history.</p>
                            <a href="/account/order">View Orders &rsaquo;</a>
                        </div>
                        <div className="hbx-dash-mob-nav-arrow">&rsaquo;</div>
                    </div>

                    <div className="hbx-dash-mob-nav-card">
                        <div className="hbx-dash-mob-nav-icon wallet"><RiStarLine /></div>
                        <div className="hbx-dash-mob-nav-content">
                            <h3>My Wallet & Points</h3>
                            <p>Check your balance, rewards, and transaction history.</p>
                            <a href="/account/wallet">View Wallet &rsaquo;</a>
                        </div>
                        <div className="hbx-dash-mob-nav-arrow">&rsaquo;</div>
                    </div>
                </div>
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
