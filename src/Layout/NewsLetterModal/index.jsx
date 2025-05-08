import ThemeOptionContext from "@/Context/ThemeOptionsContext";
import Btn from "@/Elements/Buttons/Btn";
import { SubscribeAPI } from "@/Utils/AxiosUtils/API";
import { ImagePath, storageURL } from "@/Utils/Constants";
import useCreate from "@/Utils/Hooks/useCreate";
import { emailSchema, YupObject } from "@/Utils/Validation/ValidationSchema";
import { ErrorMessage, Field, Form, Formik } from "formik";
import Cookies from "js-cookie";
import Image from "next/image";
import React, { useContext, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Col, Container, Modal, ModalBody, Row } from "reactstrap";

const NewsLetterModal = ({ setMakeExitActive }) => {
  const { t } = useTranslation("common");
  const [isOpen, setIsOpen] = useState(false);
  const { themeOption } = useContext(ThemeOptionContext);

  const { mutate, isLoading } = useCreate(SubscribeAPI, false, false, "Subscribed Successfully", (resDta) => {
    if (resDta?.status == 200 || resDta?.status == 201) {
      refetch && refetch();
      setIsOpen(false);
    }
  });

  useEffect(() => {
    const newsletterCookie = Cookies.get("newsletter");
    if (!newsletterCookie) {
      Cookies.set("newsletter", true);
      setTimeout(() => {
        setIsOpen(true);
      }, 3000);
    }
  }, [Cookies.get("newsletter")]);

  return (
    <Modal
      centered
      isOpen={isOpen}
      toggle={() => {
        setIsOpen(false);
        setMakeExitActive(true);
      }}
      size="xl"
      className="d-block  theme-modal-2 auth-modal fade show"
    >
      <div className="modal-dialog modal-dialog-centered open">
        <ModalBody className="">
          <div className="d-flex">
            <div className="right-content w-lg-50 w-100">
              <div>
                <div className="auth-title">
                  <h2>{themeOption?.popup?.news_letter.title}</h2>
                  <p>{themeOption?.popup?.news_letter?.description}</p>
                </div>
                <Formik
                  initialValues={{
                    email: "",
                  }}
                  validationSchema={YupObject({ email: emailSchema })}
                  onSubmit={(values) => {
                    mutate(values);
                    setIsOpen(false);
                  }}
                >
                  {({ errors, touched }) => (
                    <Form className="auth-form">
                      <div className="form-group text-center mb-0">
                        <Field type="email" className="form-control mb-3 input-padding" placeholder={t("enter_your_email")} name="email" />
                        {errors?.email && touched?.email && <ErrorMessage name="email" render={(msg) => <div className="invalid-feedback d-block">{errors?.email}</div>} />}
                        <Btn loading={isLoading} className="btn-solid" type="submit">
                          <span className="d-sm-inline-block d-none">{t("subscribe")}</span>
                        </Btn>
                      </div>
                    </Form>
                  )}
                </Formik>
              </div>
            </div>
            <div className="left-img w-lg-50 d-lg-block d-none">
              <Image src={themeOption?.popup?.news_letter?.image_url ? storageURL + themeOption?.popup?.news_letter?.image_url : `${ImagePath}/Offer-banner.png`} alt="" className="img-fluid" height={120} width={676} />
            </div>
          </div>
        </ModalBody>
      </div>
    </Modal>
  );
};

export default NewsLetterModal;
