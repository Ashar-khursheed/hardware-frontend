import ThemeOptionContext from "@/Context/ThemeOptionsContext";
import React, { useContext, useState } from "react";
import { useTranslation } from "react-i18next";
import { Col, Container, Row } from "reactstrap";
import FooterAbout from "../Widgets/FooterAbout";
import FooterCategories from "../Widgets/FooterCategories";
import FooterHelpCenter from "../Widgets/FooterHelpCenter";
import FooterLogo from "../Widgets/FooterLogo";
import FooterNewsLetter from "../Widgets/FooterNewsLetter";
import FooterSocial from "../Widgets/FooterSocial";
import FooterStoreInformation from "../Widgets/FooterStoreInformation";
import FooterUsefulLinks from "../Widgets/FooterUsefulLinks";
import SubFooter from "../Widgets/SubFooter";

const FooterThree = () => {
  const { themeOption } = useContext(ThemeOptionContext);
  const { t } = useTranslation("common");
  const [openClose, setOpenClose] = useState({
    helpCenter: false,
    categories: false,
    useFulLinks: false,
    storeInfo: false,
  });
  const toggle = (toggleKey) => {
    setOpenClose((prevState) => ({
      ...prevState,
      [toggleKey]: !prevState[toggleKey],
    }));
  };

  return (
    <footer className="footer-style-1" style={{ backgroundColor: themeOption?.footer?.bg_color }}>
      <div className="top-column feature-icons-bar py-4 border-bottom">
        <Container>
          <Row className="justify-content-between shippingrow text-white text-center row-cols-2 row-cols-sm-3 row-cols-lg-5 g-4">
            {[
              {
                icon: "/assets/images/Icon.png",
                title: "Free Shipping",
                subtitle: "Orders $50 or more",
              },
              {
                icon: "/assets/images/Icon1.png",
                title: "Save Money",
                subtitle: "At lowest price",
              },
              {
                icon: "/assets/images/Icon2.png",
                title: "100% Return Policy",
                subtitle: "Any Time Return Product",
              },
              {
                icon: "/assets/images/Icon3.png",
                title: "Best Deal Offer",
                subtitle: "Grab Your Gear and Go",
              },
              {
                icon: "/assets/images/Icon4.png",
                title: "Support 24/7",
                subtitle: "Contact us 24 hours a day",
              },
            ].map((item, i) => (
              <Col key={i}>
                <div className="d-flex flex-column align-items-center gap-2">
                  <img src={item.icon} alt={item.title} width={40} height={40} />
                  <div>
                    <h6 className="mb-0 text-white fw-semibold">{item.title}</h6>
                    <p className="mb-0 text-light small">{item.subtitle}</p>
                  </div>
                </div>
              </Col>
            ))}
          </Row>
        </Container>
      </div>

      {/* 2nd */}
      <div className="dark-layout newsletter-bar">
        <Container>
          <Row className="align-items-center newsletter py-4 border-bottom">
            <Col md="6" className="d-flex align-items-center gap-3">
              <img src="/assets/images/newsletter.png" alt="Newsletter Icon" />
              <div>
                <h4 className="mb-1 text-white">Learn first about discounts</h4>
                <p className="mb-0 text-light small">As well as news, special offers and promotions</p>
              </div>
            </Col>
            {/* <Col md="4">
                    <input type="email" className="form-control" placeholder="Enter your email address" />
                  </Col>
                  <Col md="2">
                    <button className="btn btn-primary w-100">Subscribe</button>
                  </Col> */}

            <Col md="6" className="subscribe-wrapper">
              <FooterNewsLetter style="simple" />
            </Col>
          </Row>
        </Container>
      </div>



      {/* 3rd */}
   <div className="dark-layout links-grid">
  <Container>
    <Row className="py-5 text-white g-4">

      {/* Column 1 - Storage Devices */}
      <Col xs={12} md={6} lg={3}>
        <h4 className="fw-bold text-white mb-3 text-uppercase">
          <a href="/category/storage-devices" className="text-white text-decoration-none">Storage Devices</a>
        </h4>

        <p className="small text-white mb-1">
          <a href="/category/internal-hard-drives" className="text-white text-decoration-none">Internal Hard Drives</a>
        </p>
        <p className="small text-white mb-1">
          <a href="/category/external-hard-drives" className="text-white text-decoration-none">External Hard Drives</a>
        </p>
        <p className="small text-white mb-1">
          <a href="/category/ssds" className="text-white text-decoration-none">SSDs</a>
        </p>
        <p className="small text-white mb-1">
          <a href="/category/server-hard-drives" className="text-white text-decoration-none">Server Hard Drives</a>
        </p>

        <p className="small text-white mb-1">
          <a href="/category/storage-devices" className="text-white text-decoration-none">See More</a>
        </p>
      </Col>

      {/* Column 2 - Memories */}
      <Col xs={12} md={6} lg={3}>
        <h4 className="fw-bold text-white mb-3 text-uppercase">
          <a href="/category/memories" className="text-white text-decoration-none">Memories</a>
        </h4>
        <p className="small text-white mb-1">
          <a href="/category/desktop-memory" className="text-white text-decoration-none">Desktop Memory</a>
        </p>
        <p className="small text-white mb-1">
          <a href="/category/server-memory" className="text-white text-decoration-none">Server Memory</a>
        </p>
        <p className="small text-white mb-1">
          <a href="/category/laptop-memory" className="text-white text-decoration-none">Laptop Memory</a>
        </p>
        <p className="small text-white mb-1">
          <a href="/category/memories" className="text-white text-decoration-none">See More</a>
        </p>
      </Col>

      {/* Column 3 - Networking Devices */}
      <Col xs={12} md={6} lg={3}>
        <h4 className="fw-bold text-white mb-3 text-uppercase">
          <a href="/category/networking-devices" className="text-white text-decoration-none">Networking Devices</a>
        </h4>
        <p className="small text-white mb-1">
          <a href="/category/switches" className="text-white text-decoration-none">Switches</a>
        </p>
        <p className="small text-white mb-1">
          <a href="/category/routers" className="text-white text-decoration-none">Routers</a>
        </p>
        <p className="small text-white mb-1">
          <a href="/category/transceivers" className="text-white text-decoration-none">Transceivers</a>
        </p>
        <p className="small text-white mb-1">
          <a href="/category/network-accessories" className="text-white text-decoration-none">Network & Accessories</a>
        </p>
        <p className="small text-white mb-1">
          <a href="/category/networking-devices" className="text-white text-decoration-none">See More</a>
        </p>
      </Col>

      {/* Column 4 - Motherboards */}
      <Col xs={12} md={6} lg={3}>
        <h4 className="fw-bold text-white mb-3 text-uppercase">
          <a href="/category/motherboard" className="text-white text-decoration-none">Motherboards</a>
        </h4>
        <p className="small text-white mb-1">
          <a href="/category/server-motherboards" className="text-white text-decoration-none">Server Motherboards</a>
        </p>
        <p className="small text-white mb-1">
          <a href="/category/laptop-motherboards" className="text-white text-decoration-none">Laptop Motherboards</a>
        </p>
        <p className="small text-white mb-1">
          <a href="/category/desktop-motherboards" className="text-white text-decoration-none">Desktop Motherboards</a>
        </p>
        <p className="small text-white mb-1">
          <a href="/category/gaming-motherboards" className="text-white text-decoration-none">Gaming Motherboards</a>
        </p>
        <p className="small text-white mb-1">
          <a href="/category/motherboard" className="text-white text-decoration-none">See More</a>
        </p>
      </Col>

      {/* Column 5 - Printer & Scanners */}
      <Col xs={12} md={6} lg={3}>
        <h4 className="fw-bold text-white mb-3 text-uppercase">
          <a href="/category/printer-scanners" className="text-white text-decoration-none">Printer & Scanners</a>
        </h4>
        <p className="small text-white mb-1">
          <a href="/category/barcode-printers" className="text-white text-decoration-none">Barcode Printers</a>
        </p>
        <p className="small text-white mb-1">
          <a href="/category/pos-printers" className="text-white text-decoration-none">POS Printers</a>
        </p>
        <p className="small text-white mb-1">
          <a href="/category/office-printers" className="text-white text-decoration-none">Office Printers</a>
        </p>
        <p className="small text-white mb-1">
          <a href="/category/sensors" className="text-white text-decoration-none">Sensors</a>
        </p>
        <p className="small text-white mb-1">
          <a href="/category/printer-scanners" className="text-white text-decoration-none">See More</a>
        </p>
      </Col>

      {/* Column 6 - PC & Servers */}
      <Col xs={12} md={6} lg={3}>
        <h4 className="fw-bold text-white mb-3 text-uppercase">
          <a href="/category/pc-and-servers" className="text-white text-decoration-none">PC & Servers</a>
        </h4>
        <p className="small text-white mb-1">
          <a href="/category/servers" className="text-white text-decoration-none">Servers</a>
        </p>
        <p className="small text-white mb-1">
          <a href="/category/workstations" className="text-white text-decoration-none">Workstations</a>
        </p>
        <p className="small text-white mb-1">
          <a href="/category/desktops" className="text-white text-decoration-none">Desktops</a>
        </p>
        <p className="small text-white mb-1">
          <a href="/category/tablets" className="text-white text-decoration-none">Tablets</a>
        </p>
        <p className="small text-white mb-1">
          <a href="/category/pc-and-servers" className="text-white text-decoration-none">See More</a>
        </p>
      </Col>

      {/* Column 7 - Power Supply & Protection */}
      <Col xs={12} md={6} lg={3}>
        <h4 className="fw-bold text-white mb-3 text-uppercase">
          <a href="/category/power-supply" className="text-white text-decoration-none">Power Supply & Protection</a>
        </h4>
        <p className="small text-white mb-1">
          <a href="/category/power-supply" className="text-white text-decoration-none">Power Supply</a>
        </p>
        <p className="small text-white mb-1">
          <a href="/category/power-adapters-chargers" className="text-white text-decoration-none">Power Adapters & Chargers</a>
        </p>
        <p className="small text-white mb-1">
          <a href="/category/power-distributions" className="text-white text-decoration-none">Power Distributions</a>
        </p>
        <p className="small text-white mb-1">
          <a href="/category/power-supply" className="text-white text-decoration-none">See More</a>
        </p>
      </Col>

      {/* Column 8 - CPUs & Processors */}
      <Col xs={12} md={6} lg={3}>
        <h4 className="fw-bold text-white mb-3 text-uppercase">
          <a href="/category/cpus-processors" className="text-white text-decoration-none">CPUs & Processors</a>
        </h4>
        <p className="small text-white mb-1">
          <a href="/category/server-processors" className="text-white text-decoration-none">Server Processors</a>
        </p>
        <p className="small text-white mb-1">
          <a href="/category/desktop-processors" className="text-white text-decoration-none">Desktop Processors</a>
        </p>
        <p className="small text-white mb-1">
          <a href="/category/laptop-processors" className="text-white text-decoration-none">Laptop Processors</a>
        </p>
        <p className="small text-white mb-1">
          <a href="/category/cpus-processors" className="text-white text-decoration-none">See More</a>
        </p>
      </Col>

      {/* Column 9 - GPUs */}
      <Col xs={12} md={6} lg={3}>
        <h4 className="fw-bold text-white mb-3 text-uppercase">
          <a href="/category/gpus" className="text-white text-decoration-none">GPUs</a>
        </h4>
        <p className="small text-white mb-1">
          <a href="/category/graphics-card" className="text-white text-decoration-none">Graphics Card</a>
        </p>
        <p className="small text-white mb-1">
          <a href="/category/gpus" className="text-white text-decoration-none">See More</a>
        </p>
      </Col>

      {/* Column 10 - Gaming */}
      <Col xs={12} md={6} lg={3}>
        <h4 className="fw-bold text-white mb-3 text-uppercase">
          <a href="/category/gaming" className="text-white text-decoration-none">Gaming</a>
        </h4>
        <p className="small text-white mb-1">
          <a href="/category/gaming-console" className="text-white text-decoration-none">Gaming Console</a>
        </p>
        <p className="small text-white mb-1">
          <a href="/category/vr-headsets" className="text-white text-decoration-none">VR Headsets</a>
        </p>
        <p className="small text-white mb-1">
          <a href="/category/gaming-accessories" className="text-white text-decoration-none">Gaming Accessories</a>
        </p>
        <p className="small text-white mb-1">
          <a href="/category/gaming" className="text-white text-decoration-none">See More</a>
        </p>
      </Col>

      {/* Column 11 - Company Info */}
      <Col xs={12} md={6} lg={3}>
        <h4 className="fw-bold text-white mb-3 text-uppercase">
          Company Info
        </h4>
        <p className="small text-white mb-1">
          <a href="/about-us" className="text-white text-decoration-none">About Us</a>
        </p>
        <p className="small text-white mb-1">
          <a href="/terms-conditions" className="text-white text-decoration-none">Terms & Conditions</a>
        </p>
        <p className="small text-white mb-1">
          <a href="/privacy-policy" className="text-white text-decoration-none">Privacy Policy</a>
        </p>
        <p className="small text-white mb-1">
          <a href="/warranty" className="text-white text-decoration-none">Warranty</a>
        </p>
        <p className="small text-white mb-1">
          <a href="/contact-us" className="text-white text-decoration-none">Contact Us</a>
        </p>
        <p className="small text-white mb-1">
          <a href="/blog" className="text-white text-decoration-none">Blog</a>
        </p>
        <p className="small text-white mb-1">
          <a href="/sitemap" className="text-white text-decoration-none">Sitemap</a>
        </p>
      </Col>

      {/* Column 12 - Contact Information */}
      <Col xs={12} md={6} lg={3}>
        <h4 className="fw-bold text-white mb-3 text-uppercase">
          Contact Us
        </h4>
        
        <div className="d-flex align-items-start mb-3">
          <i className="bi bi-telephone-fill text-white me-3 fs-5"></i>
          <a href="tel:+18328835303" className="text-white text-decoration-none small">
            (+1) 832 8835303
          </a>
        </div>

        <div className="d-flex align-items-start mb-3">
          <i className="bi bi-geo-alt-fill text-white me-3 fs-5"></i>
          <a 
            href="https://maps.google.com/?q=5900+Balcones+Drive+22288+Austin+TX+78731" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-white text-decoration-none small"
          >
            5900 Balcones Drive # 22288<br />
            Austin, TX 78731
          </a>
        </div>

        <div className="d-flex align-items-start">
          <i className="bi bi-envelope-fill text-white me-3 fs-5"></i>
          <a href="mailto:hello@hardwarebox.com" className="text-white text-decoration-none small">
            hello@hardwarebox.com
          </a>
        </div>
      </Col>

    </Row>
  </Container>
</div>






      {/* 4th */}

      <div className="dark-layout copyright-bar py-3">
        <Container>
          <Row className="align-items-center text-white">
            <Col md="4" className="text-center text-md-start text-sm-start">
              <p className="mb-0 text-white small">© 2025, <strong>The Hardware Box</strong> All rights reserved</p>
            </Col>
            <Col md="4" className="text-center">
              <div className="d-flex flex-column flex-md-row justify-content-center gap-3">
                {/* <i className="fa fa-phone me-2"></i> */}
                <img src="/assets/images/phonefooter.png" className="img-fluid phoneimg" alt="Phone-no" />
                <div className="text-start">
                  <strong>
                    <a className="text-white" href="tel:+ +18328835303">(+1) 832 8835303</a>
                  </strong><br />

                  <span className="small">5900 Balcones Drive # 22288 Austin, TX 78731</span>
                </div>

                {/* <div>
                        <i className="fa fa-headphones me-2"></i>
                        <strong>1900 - 8888</strong><br />
                        <span className="small">24/7 Support Center</span>
                      </div> */}
              </div>
            </Col>
            <Col md="4" className="text-start payment-col  text-md-end">
              <p className="mb-1 text-white fw-bold small">Secured Payment Gateways</p>
              <img src="/assets/images/payment.png" className="img-fluid" alt="Payment Gateways" />
            </Col>
          </Row>
        </Container>
      </div>
    </footer>
  );
};

export default FooterThree;
