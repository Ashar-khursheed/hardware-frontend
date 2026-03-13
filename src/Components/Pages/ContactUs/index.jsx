"use client";
import WrapperComponent from "@/Components/Widgets/WrapperComponent";
import ThemeOptionContext from "@/Context/ThemeOptionsContext";
import Loader from "@/Layout/Loader";
import Breadcrumbs from "@/Utils/CommonComponents/Breadcrumb";
import { useContext } from "react";
import { Col } from "reactstrap";
import ContactDetails from "./ContactDeatails";
import ContactLeftSideBox from "./ContactLeftSideBox";
import ContactUsForm from "./ContactUsForm";
import MapSection from "./MapSection";
import "./ContactUs.css";

const ContactUsContent = () => {
  const { isLoading } = useContext(ThemeOptionContext);

  if (isLoading) return <Loader />;
  return (
    <>
      <Breadcrumbs title={"ContactUs"} subNavigation={[{ name: "ContactUs" }]} />
      <div className="contact-page-wrapper">
        <WrapperComponent classes={{ sectionClass: "contact-page pt-0", row: "g-4", fluidClass: "container" }} customCol={true}>
          <Col lg="5" className="mb-4 mb-lg-0">
            <div className="premium-contact-card h-100">
              <ContactDetails />
              <ContactLeftSideBox />
            </div>
          </Col>
          <Col lg="7">
            <div className="premium-contact-card h-100 premium-form-container">
              <ContactUsForm />
            </div>
          </Col>
          <Col xs="12">
            {/* <MapSection /> */}
          </Col>
        </WrapperComponent>
      </div>
    </>
  );
};

export default ContactUsContent;
