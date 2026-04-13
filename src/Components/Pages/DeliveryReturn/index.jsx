"use client";
import React, { useContext } from "react";
import { Container, Row, Col, Card, CardBody } from "reactstrap";
import { useTranslation } from "react-i18next";
import { useRouter } from "next/navigation";

import Breadcrumbs from "@/Utils/CommonComponents/Breadcrumb";
import ThemeOptionContext from "@/Context/ThemeOptionsContext";
import Btn from "@/Elements/Buttons/Btn";
import Loader from "@/Layout/Loader";

const DeliveryReturnContent = ({ params }) => {
  const { t } = useTranslation("common");
  const router = useRouter();
  const { themeOption } = useContext(ThemeOptionContext);

  if (!themeOption) return <Loader />;

  return (
    <>
      <Breadcrumbs
        subNavigation={[
          { name: "Product", link: `/product/${params}` },
          { name: t("delivery_return"), link: null },
        ]}
      />
      <section className="section-b-space delivery-return-section">
        <Container>
          <Row>
            <Col lg="10" className="mx-auto">
              <Card className="policy-card">
                <CardBody className="p-sm-5 p-4">
                  <div className="title-box mb-4 pb-3 border-bottom d-flex justify-content-between align-items-center">
                    <h2 className="mb-0">{t("delivery_and_return")}</h2>
                    <Btn 
                      title="Back to Product" 
                      className="btn-outline btn-sm" 
                      onClick={() => router.push(`/product/${params}`)} 
                    />
                  </div>
                  
                  <div className="policy-content" dangerouslySetInnerHTML={{ __html: themeOption?.product?.shipping_and_return }} />
                </CardBody>
              </Card>
            </Col>
          </Row>
        </Container>
      </section>
      <style jsx global>{`
        .delivery-return-section {
          background-color: #f9f9f9;
          min-height: 60vh;
        }
        .policy-card {
          border: none;
          border-radius: 15px;
          box-shadow: 0 5px 20px rgba(0,0,0,0.05);
        }
        .policy-content {
          line-height: 1.8;
          color: #444;
          font-size: 16px;
        }
        .policy-content h3, .policy-content h4 {
          margin-top: 2rem;
          margin-bottom: 1rem;
          color: #222;
          font-weight: 700;
        }
        .policy-content ul {
          padding-left: 20px;
          list-style-type: disc;
          margin-bottom: 1.5rem;
        }
        .policy-content li {
          margin-bottom: 0.5rem;
        }
      `}</style>
    </>
  );
};

export default DeliveryReturnContent;
