import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { Col, Container, Row } from "reactstrap";
import FooterAbout from "../Widgets/FooterAbout";
import FooterCategories from "../Widgets/FooterCategories";
import FooterHelpCenter from "../Widgets/FooterHelpCenter";
import FooterLogo from "../Widgets/FooterLogo";
import FooterNewsLetter from "../Widgets/FooterNewsLetter";
import FooterStoreInformation from "../Widgets/FooterStoreInformation";
import FooterUsefulLinks from "../Widgets/FooterUsefulLinks";
import SubFooter from "../Widgets/SubFooter";

const FooterTwo = () => {
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
    <footer>
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
            {[
              "Categories",
              "Network Devices",
              "Storage",
              "Motherboards",
            ].map((title, idx) => (
              <Col key={idx} xs={12} md={6} lg={3}>
                <h6 className="fw-bold text-white mb-3 text-uppercase">{title}</h6>
                {Array.from({ length: 8 }).map((_, i) => (
                  <p key={i} className="small text-white mb-1">
                    {`${title} Placed Here`}
                  </p>
                ))}
              </Col>
            ))}
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
                    <a className="text-white" href="tel:+18328835303">(+1) 832 88353036</a>
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

export default FooterTwo;
