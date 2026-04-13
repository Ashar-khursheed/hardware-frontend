import CustomModal from "@/Components/Widgets/CustomModal";
import SimpleInputField from "@/Components/Widgets/InputFields/SimpleInputField";
import { placeHolderImage } from "@/Components/Widgets/Placeholder";
import SettingContext from "@/Context/SettingContext";
import ThemeOptionContext from "@/Context/ThemeOptionsContext";
import Btn from "@/Elements/Buttons/Btn";
import { QuestionAnswerAPI } from "@/Utils/AxiosUtils/API";
import useCreate from "@/Utils/Hooks/useCreate";
import { Form, Formik } from "formik";
import Cookies from "js-cookie";
import { getImageUrl } from "@/Utils/CustomFunctions/GetImageUrl";
import Image from "next/image";
import { useContext, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { RiCloseLine } from "react-icons/ri";
import { ModalBody, ModalFooter, ModalHeader } from "reactstrap";

const QuestionAnswerModal = ({ modal, setModal, productState, update, refetch }) => {
  const { t } = useTranslation("common");
  const [message, setShowBoxMessage] = useState();
  const { convertCurrency } = useContext(SettingContext);
  const { setOpenAuthModal } = useContext(ThemeOptionContext);
  const isAuth = Cookies.get("uat_multikart");
  const toggle = () => {
    setModal((prev) => prev !== prev);
  };
  const { mutate, isLoading, error } = useCreate(
    QuestionAnswerAPI,
    false,
    false,
    "No",
    (resDta) => {
      if (resDta?.status == 200 || resDta?.status == 201) {
        refetch && refetch();
        setModal("");
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
      setModal(false);
    }
    return () => setShowBoxMessage();
  }, [message, isAuth]);

  const productImage = productState?.selectedVariation?.variation_image || productState?.product?.product_thumbnail || productState?.selectedVariation?.variation_galleries?.[0] || productState?.product?.product_galleries?.[0];

  return (
    <CustomModal modal={modal ? true : false} setModal={setModal} classes={{ modalClass: "theme-modal-2 question-answer-modal", modalHeaderClass: "p-0", customChildren: true }}>
      <style dangerouslySetInnerHTML={{ __html: `
        .question-answer-modal { z-index: 100001 !important; }
        .modal-backdrop { z-index: 100000 !important; }
      ` }} />
      <ModalHeader className="border-color" toggle={toggle}>
        {t("ask_a_question")}
        <Btn className="btn-close" onClick={() => setModal(false)}>
          <RiCloseLine />
        </Btn>
      </ModalHeader>
      <ModalBody>
        <Formik
          initialValues={{
            question: update?.editData && update?.editData !== "Add" ? update?.editData?.question : "",
            product_id: productState?.product?.id,
          }}
          onSubmit={(values) => {
            if (update && update?.editData !== "Add") {
              update?.updateQnA(values);
            } else mutate(values);
          }}
        >
          {() => (
            <Form>
              <div className="product-review-form">
                <div className="product-wrapper">
                  <div className="product-image">
                    <Image 
                      src={getImageUrl(productImage) || placeHolderImage} 
                      className="img-fluid" 
                      height={80} 
                      width={80} 
                      alt={productState?.product?.name || "Product"} 
                    />
                  </div>
                  <div className="product-content">
                    <h5 className="name">{productState?.product?.name}</h5>
                    <div className="product-review-rating">
                      <div className="product-rating">
                        <h6 className="price-number">{convertCurrency(productState?.product?.sale_price)}</h6>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="review-box form-box">
                  <SimpleInputField nameList={[{ name: "question", type: "textarea", placeholder: t("your_questions"), rows: "3", toplabel: "YourQuestions", require: "true", colprops: { xs: 12 } }]} />
                </div>
              </div>
              <ModalFooter className="p-0">
                <Btn title="cancel" type="button" className="btn btn-outline" onClick={() => setModal(false)} />
                <Btn title="submit" className="btn-solid" type="submit" loading={Number(update?.updateLoader || isLoading)} />
              </ModalFooter>
            </Form>
          )}
        </Formik>
      </ModalBody>
    </CustomModal>
  );
};

export default QuestionAnswerModal;
