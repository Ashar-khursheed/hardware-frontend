import ThemeOptionContext from "@/Context/ThemeOptionsContext";
import Btn from "@/Elements/Buttons/Btn";
import { SubscribeAPI } from "@/Utils/AxiosUtils/API";
import useCreate from "@/Utils/Hooks/useCreate";
import { YupObject, emailSchema } from "@/Utils/Validation/ValidationSchema";
import { ErrorMessage, Field, Form, Formik } from "formik";
import React, { useContext } from "react";
import { useTranslation } from "react-i18next";
import { Col, Container, FormGroup, Row } from "reactstrap";

const FooterNewsLetter = ({ style }) => {
  const { themeOption } = useContext(ThemeOptionContext);
  const { t } = useTranslation("common");
  const { mutate, isLoading } = useCreate(SubscribeAPI, false, false, "Subscribed Successfully", (resDta) => {
    if (resDta?.status == 200 || resDta?.status == 201) {
      refetch && refetch();
    }
  });
  const emailValidationSchema = YupObject({ email: emailSchema });
  return (
    <>
      {style == "basic" && (
        <div className="light-layout">
          <Container>
            <section className="small-section border-section border-top-0">
              <Row>
                <Col lg="6">
                  <div className="subscribe">
                    <div>
                      <h4>{t("know_all")}</h4>
                      <p>{t("newsletter_text")}.</p>
                    </div>
                  </div>
                </Col>
                <Col lg="6">
                  <Formik initialValues={{ email: "", }}
                    validationSchema={emailValidationSchema}
                    onSubmit={(values) => {
                      mutate(values);
                    }}
                  >
                    {({ errors, touched }) => (
                      <Form className="form-inline subscribe-form auth-form needs-validation">
                        <div className="form-group">
                          <Field type="email" className="form-control" placeholder="Enter Email Address" name="email" />
                          {(errors.email || touched.email) && (
                            <span className="error-text">
                              <ErrorMessage name="email" />
                            </span>
                          )}
                        </div>
                        <Btn loading={isLoading} className="btn-solid" type="submit">
                          {t("subscribe")}
                        </Btn>
                      </Form>
                    )}
                  </Formik>
                </Col>
              </Row>
            </section>
          </Container>
        </div>
      )}
      {style == "simple" && (
        <div className="subscribe-block">
          {/* <h2>{t("newsletter")}</h2> */}
          <Formik
            initialValues={{ email: "" }}
            validationSchema={emailValidationSchema}
            onSubmit={(values) => {
              mutate(values);
            }}
          >
            {({ touched, errors }) => (
              <Form>
                <div className="row g-3 d-flex">
                  <Col md="8">
                    <Field type="email" className="form-control" placeholder={t("enter_email_address")} name="email" />
                    {(errors.email || touched.email) && (
                      <span>
                        <ErrorMessage name="email" />
                      </span>
                    )}
                  </Col>

                  <Col md="3">
                    <Btn loading={isLoading} className="btn" type="submit">
                      {t("subscribe")}
                    </Btn>
                  </Col>
                </div>

              </Form>
            )}
          </Formik>
        </div>
      )}
      {style == "classic" && (
        <Formik
          initialValues={{
            email: "",
          }}
          validationSchema={emailValidationSchema}
          onSubmit={(values) => {
            mutate(values);
          }}
        >
          {({ touched, errors }) => (
            <Form className="form-inline align-items-start">
              <FormGroup className="me-3 mb-sm-2 newsletter-custom-mb">
                <Field type="email" className="form-control" placeholder="Enter Email Address" name="email" />
                {(errors.email || touched.email) && (
                  <span className="error-text">
                    <ErrorMessage name="email" />
                  </span>
                )}
              </FormGroup>
              <Btn loading={isLoading} className="btn-solid mb-sm-2" id="subscribe" type="submit">
                {t("subscribe")}
              </Btn>
            </Form>
          )}
        </Formik>
      )}
    </>
  );
};

export default FooterNewsLetter;
