"use client";
import React, { useContext, useEffect, useState } from "react";
import { Form, Formik } from "formik";
import { Container, Row, Col, Card, CardBody } from "reactstrap";
import Image from "next/image";
import { useTranslation } from "react-i18next";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import { useQuery } from "@tanstack/react-query";

import Breadcrumbs from "@/Utils/CommonComponents/Breadcrumb";
import SimpleInputField from "@/Components/Widgets/InputFields/SimpleInputField";
import Btn from "@/Elements/Buttons/Btn";
import { placeHolderImage } from "@/Components/Widgets/Placeholder";
import SettingContext from "@/Context/SettingContext";
import ThemeOptionContext from "@/Context/ThemeOptionsContext";
import { QuestionAnswerAPI, ProductAPI } from "@/Utils/AxiosUtils/API";
import useCreate from "@/Utils/Hooks/useCreate";
import request from "@/Utils/AxiosUtils";
import { getImageUrl } from "@/Utils/CustomFunctions/GetImageUrl";
import Loader from "@/Layout/Loader";

const AskQuestionContent = ({ params }) => {
  const { t } = useTranslation("common");
  const router = useRouter();
  const { convertCurrency } = useContext(SettingContext);
  const { setOpenAuthModal } = useContext(ThemeOptionContext);
  const [message, setShowBoxMessage] = useState();
  const isAuth = Cookies.get("uat_multikart");

  // Fetch product data
  const { data: ProductData, isLoading: productLoading } = useQuery(
    [params],
    () => request({ url: `${ProductAPI}/slug/${params}` }, router),
    {
      enabled: !!params,
      refetchOnWindowFocus: false,
      select: (res) => res?.data,
    }
  );

  const { mutate, isLoading, error } = useCreate(
    QuestionAnswerAPI,
    false,
    false,
    "No",
    (resDta) => {
      if (resDta?.status == 200 || resDta?.status == 201) {
        router.push(`/product/${params}`);
      } else if (!isAuth) {
        setOpenAuthModal(true);
      }
    },
    false,
    false,
    false,
    setShowBoxMessage
  );

  useEffect(() => {
    if (message == "Unauthenticated" && !isAuth) {
      setOpenAuthModal(true);
    }
    return () => setShowBoxMessage();
  }, [message, isAuth]);

  if (productLoading) return <Loader />;

  return (
    <>
      <Breadcrumbs
        subNavigation={[
          { name: "Product", link: `/product/${params}` },
          { name: t("ask_a_question"), link: null },
        ]}
      />
      <section className="section-b-space ask-question-section">
        <Container>
          <Row>
            <Col lg="8" className="mx-auto">
              <Card className="ask-question-card hbx-hover-glow">
                <CardBody className="p-sm-5 p-4">
                  <div className="title-box mb-4">
                    <h2 className="mb-2">{t("ask_a_question")}</h2>
                    <p className="text-muted">Have a query about this product? Ask us anything.</p>
                  </div>

                  {ProductData && (
                    <div className="product-info-box mb-5 p-3 rounded bg-light d-flex align-items-center gap-3">
                      <div className="product-image" style={{ width: "100px", height: "100px", position: "relative", flexShrink: 0 }}>
                        <Image
                          src={getImageUrl(ProductData?.product_thumbnail) || placeHolderImage}
                          alt={ProductData?.name}
                          fill
                          className="img-fluid rounded"
                          style={{ objectFit: "contain" }}
                        />
                      </div>
                      <div className="product-details">
                        <h4 className="mb-1">{ProductData?.name}</h4>
                        <h5 className="theme-color fw-bold">{convertCurrency(ProductData?.sale_price)}</h5>
                      </div>
                    </div>
                  )}

                  <Formik
                    initialValues={{
                      question: "",
                      product_id: ProductData?.id,
                    }}
                    onSubmit={(values) => {
                      if (!isAuth) {
                        setOpenAuthModal(true);
                        return;
                      }
                      mutate(values);
                    }}
                  >
                    {() => (
                      <Form className="custom-form">
                        <div className="review-box form-box mb-4">
                          <SimpleInputField
                            nameList={[
                              {
                                name: "question",
                                type: "textarea",
                                placeholder: t("your_questions"),
                                rows: "5",
                                toplabel: "Your Questions",
                                require: "true",
                                colprops: { xs: 12 },
                              },
                            ]}
                          />
                        </div>
                        <div className="button-group d-flex gap-3">
                          <Btn
                            title="Submit Question"
                            className="btn-solid btn-md"
                            type="submit"
                            loading={Number(isLoading)}
                          />
                          <Btn
                            title="Back to Product"
                            className="btn-outline btn-md"
                            type="button"
                            onClick={() => router.push(`/product/${params}`)}
                          />
                        </div>
                      </Form>
                    )}
                  </Formik>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </Container>
      </section>
      <style jsx>{`
        .ask-question-section {
          background-color: #f9f9f9;
        }
        .ask-question-card {
          border: none;
          border-radius: 15px;
          overflow: hidden;
          box-shadow: 0 5px 20px rgba(0,0,0,0.05);
        }
        .product-info-box {
          border: 1px solid #eee;
        }
        .theme-color {
          color: #ff5050;
        }
      `}</style>
    </>
  );
};

export default AskQuestionContent;
