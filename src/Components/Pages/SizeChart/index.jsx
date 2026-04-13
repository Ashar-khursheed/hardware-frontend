"use client";
import React, { useContext } from "react";
import { Container, Row, Col, Card, CardBody } from "reactstrap";
import { useTranslation } from "react-i18next";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { useQuery } from "@tanstack/react-query";

import Breadcrumbs from "@/Utils/CommonComponents/Breadcrumb";
import Btn from "@/Elements/Buttons/Btn";
import Loader from "@/Layout/Loader";
import request from "@/Utils/AxiosUtils";
import { ProductAPI } from "@/Utils/AxiosUtils/API";

const SizeChartContent = ({ params }) => {
  const { t } = useTranslation("common");
  const router = useRouter();

  const { data: ProductData, isLoading: productLoading } = useQuery(
    [params],
    () => request({ url: `${ProductAPI}/slug/${params}` }, router),
    {
      enabled: !!params,
      refetchOnWindowFocus: false,
      select: (res) => res?.data,
    }
  );

  if (productLoading) return <Loader />;

  return (
    <>
      <Breadcrumbs
        subNavigation={[
          { name: "Product", link: `/product/${params}` },
          { name: t("size_chart"), link: null },
        ]}
      />
      <section className="section-b-space size-chart-section">
        <Container>
          <Row>
            <Col lg="10" className="mx-auto">
              <Card className="policy-card">
                <CardBody className="p-sm-5 p-4 text-center">
                  <div className="title-box mb-4 pb-3 border-bottom d-flex justify-content-between align-items-center text-start">
                    <h2 className="mb-0">{t("size_chart")}</h2>
                    <Btn 
                      title="Back to Product" 
                      className="btn-outline btn-sm" 
                      onClick={() => router.push(`/product/${params}`)} 
                    />
                  </div>
                  
                  {ProductData?.size_chart_image?.original_url ? (
                    <div className="size-chart-img-wrapper">
                      <Image 
                        src={ProductData.size_chart_image.original_url} 
                        className="img-fluid rounded" 
                        alt="size_chart_image" 
                        height={600} 
                        width={1000} 
                        style={{ objectFit: "contain", height: "auto" }}
                      />
                    </div>
                  ) : (
                    <p>No size chart available for this product.</p>
                  )}
                </CardBody>
              </Card>
            </Col>
          </Row>
        </Container>
      </section>
      <style jsx>{`
        .size-chart-section {
          background-color: #f9f9f9;
          min-height: 60vh;
        }
        .policy-card {
          border: none;
          border-radius: 15px;
          box-shadow: 0 5px 20px rgba(0,0,0,0.05);
        }
        .size-chart-img-wrapper {
          display: inline-block;
          padding: 20px;
          background: #fff;
          border: 1px solid #eee;
          border-radius: 10px;
        }
      `}</style>
    </>
  );
};

export default SizeChartContent;
