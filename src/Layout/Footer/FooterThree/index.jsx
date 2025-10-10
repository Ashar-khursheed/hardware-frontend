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

            {/* Column 1 - Processors */}
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
                <a href="/category/storage-tapes" className="text-white text-decoration-none">Storage Tapes</a>
              </p>

              <p className="small text-white mb-1">
                <a href="/category/storage-devices" className="text-white text-decoration-none">See More</a>
              </p>


            </Col>

            {/* Column 2 - Network Devices */}
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
                <a href="/category/gaming-memory" className="text-white text-decoration-none">Gaming Memory</a>
              </p>
              <p className="small text-white mb-1">
                <a href="/category/memories" className="text-white text-decoration-none">See More</a>
              </p>

            </Col>

            {/* Column 3 - Power Supplies */}
            <Col xs={12} md={6} lg={3}>
              <h4 className="fw-bold text-white mb-3 text-uppercase">
                <a href="/category/networking-devices" className="text-white text-decoration-none">Networking Devices</a>
              </h4>
              <p className="small text-white mb-1">
                <a href="/category/switches" className="text-white text-decoration-none">Switches</a>
              </p>
              <p className="small text-white mb-1">
                <a href="/category/network-accessories" className="text-white text-decoration-none">Network & Accessories</a>
              </p>
              <p className="small text-white mb-1">
                <a href="/category/ip-phones" className="text-white text-decoration-none">IP Phones</a>
              </p>
              <p className="small text-white mb-1">
                <a href="/category/networking-devices" className="text-white text-decoration-none">See More</a>
              </p>


            </Col>

            {/* Column 4 - Storage Devices */}
            <Col xs={12} md={6} lg={3}>
              <h4 className="fw-bold text-white mb-3 text-uppercase">
                <a href="/category/motherboards" className="text-white text-decoration-none">Motherboards</a>
              </h4>
              <p className="small text-white mb-1">
                <a href="/category/server-motherboards" className="text-white text-decoration-none">Server Motherboards</a>
              </p>
              <p className="small text-white mb-1">
                <a href="/category/laptop-motherboards" className="text-white text-decoration-none">Laptop Motherboards</a>
              </p>
              <p className="small text-white mb-1">
                <a href="/category/dekstop-motherboards" className="text-white text-decoration-none">Desktop Motherboards</a>
              </p>
              <p className="small text-white mb-1">
                <a href="/category/gaming-motherboards" className="text-white text-decoration-none">Gaming Motherboards</a>
              </p>
              <p className="small text-white mb-1">
                <a href="/category/motherboards" className="text-white text-decoration-none">See More</a>
              </p>


            </Col>
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
                <a href="/category/Sensors" className="text-white text-decoration-none">Sensors</a>
              </p>
              <p className="small text-white mb-1">
                <a href="/category/gaming-devices" className="text-white text-decoration-none">See More</a>
              </p>

            </Col>

            {/* Column 2 - Network Devices */}
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
                <a href="/category/dekstops" className="text-white text-decoration-none">Dekstops</a>
              </p>
              <p className="small text-white mb-1">
                <a href="/category/pc-and-servers" className="text-white text-decoration-none">See More</a>
              </p>


            </Col>

            {/* Column 3 - Power Supplies */}
            <Col xs={12} md={6} lg={3}>
              <h4 className="fw-bold text-white mb-3 text-uppercase">
                <a href="/category/power-supply" className="text-white text-decoration-none">Power Supplies</a>
              </h4>
              <p className="small text-white mb-1">
                <a href="/category/power-supply" className="text-white text-decoration-none">Power Supply</a>
              </p>
              <p className="small text-white mb-1">
                <a href="/category/ups-accessories" className="text-white text-decoration-none">UPS Accessories</a>
              </p>
              <p className="small text-white mb-1">
                <a href="/category/ups-batteries" className="text-white text-decoration-none">UPS Batteries</a>
              </p>
              <p className="small text-white mb-1">
                <a href="/category/power-distributions" className="text-white text-decoration-none">Power Distributions</a>
              </p>
              <p className="small text-white mb-1">
                <a href="/category/power-supply" className="text-white text-decoration-none">See More</a>
              </p>

            </Col>

            {/* Column 4 - Storage Devices */}
            <Col xs={12} md={6} lg={3}>
              <h4 className="fw-bold text-white mb-3 text-uppercase">
                <a href="/category/cpus-processors" className="text-white text-decoration-none">CPUs & Processors</a>
              </h4>              <p className="small text-white mb-1">
                <a href="/category/internal-processors" className="text-white text-decoration-none">Internal Processors</a>
              </p>
              <p className="small text-white mb-1">
                <a href="/category/amd-processors" className="text-white text-decoration-none">AMD Processors</a>
              </p>
              <p className="small text-white mb-1">
                <a href="/category/processors-board" className="text-white text-decoration-none">Processors Board</a>
              </p>
              <p className="small text-white mb-1">
                <a href="/category/processors" className="text-white text-decoration-none">See More</a>
              </p>


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
                    <a className="text-white" href="tel:+191630466066">(+1) 916 304 66066</a>
                  </strong><br />

                  <span className="small">Working 8:00 - 22:00</span>
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
