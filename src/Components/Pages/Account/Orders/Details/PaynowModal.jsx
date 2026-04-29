import CustomModal from "@/Components/Widgets/CustomModal";
import SettingContext from "@/Context/SettingContext";
import Btn from "@/Elements/Buttons/Btn";
import { RePaymentAPI } from "@/Utils/AxiosUtils/API";
import { ModifyString } from "@/Utils/CustomFunctions/ModifyString";
import useCreate from "@/Utils/Hooks/useCreate";
import { handleModifier } from "@/Utils/Validation/ModifiedErrorMessage";
import { YupObject, nameSchema } from "@/Utils/Validation/ValidationSchema";
import { ErrorMessage, Form, Formik } from "formik";
import { useContext } from "react";
import { useTranslation } from "react-i18next";
import { useRouter } from "next/navigation";

import { Col, Input, Label, ModalBody, ModalHeader, Row } from "reactstrap";

const PaynowModal = ({ modal, setModal, params, orderData }) => {
  const { t } = useTranslation("common");
  const router = useRouter();

  const { settingData, convertCurrency } = useContext(SettingContext);
  const { mutate, isLoading } = useCreate(RePaymentAPI, false, false, "No", (resDta) => {
    if (resDta?.status == 200 || resDta?.status == 201) {
      if (resDta?.data?.["payment_method"] == "cod") {
        router.push(`/account/order/${resDta?.data?.order_number}`);
      } else {
        window.open(resDta?.data?.url, "_self");
      }
    }
  });

  const paymentMethods = settingData?.payment_methods?.filter(payment => payment.name.toLowerCase() === 'stripe') || [];

  const extractProducts = (prodData) => {
    if (Array.isArray(prodData)) return prodData;
    if (prodData?.data && Array.isArray(prodData.data)) return prodData.data;
    if (typeof prodData === 'object' && prodData !== null) {
      const values = Object.values(prodData);
      if (values.length > 0 && values.every(v => typeof v === 'object' && v !== null)) return values;
    }
    return [];
  };

  const searchForProducts = (obj) => {
    if (!obj || typeof obj !== 'object') return [];
    const keys = ['products', 'order_products', 'order_items', 'items', 'order_details', 'sub_orders'];
    for (const key of keys) {
      if (key === 'sub_orders' && Array.isArray(obj[key])) {
        const subProducts = obj[key].flatMap(sub => extractProducts(sub.products || sub.order_items || sub.items));
        if (subProducts.length > 0) return subProducts;
      }
      const found = extractProducts(obj[key]);
      if (found.length > 0) return found;
    }
    if (obj.data && typeof obj.data === 'object') return searchForProducts(obj.data);
    if (obj.order && typeof obj.order === 'object') return searchForProducts(obj.order);
    return [];
  };

  const allProducts = searchForProducts(orderData);

  return (
    <CustomModal modal={modal} setModal={setModal} classes={{ modalClass: 'pay-modal theme-modal-2', customChildren: true }}>
      <ModalHeader className="modal-header">
        Pay Now
        <Btn color="transparent" className="btn-close" onClick={() => setModal(false)}>
          <div>
            <i className="ri-close-line"></i>
          </div>
        </Btn>
      </ModalHeader>
      <ModalBody>
        {orderData && (
          <div className="order-pay-info mb-4 p-3 bg-light rounded">
            <Row className="mb-3 border-bottom pb-2">
              <Col sm={6}>
                <p className="mb-1 text-muted">{t("order_number")}</p>
                <h5 className="mb-0">#{orderData.order_number}</h5>
              </Col>
              <Col sm={6} className="text-sm-end mt-2 mt-sm-0">
                <p className="mb-1 text-muted">{t("total_amount")}</p>
                <h5 className="mb-0 text-primary">{convertCurrency(orderData.total)}</h5>
              </Col>
            </Row>
            {allProducts.length > 0 && (
              <div className="order-items-preview mb-3">
                <p className="text-muted mb-2 small">{t("items")}:</p>
                <ul className="list-unstyled">
                  {allProducts.map((item, i) => {
                    const product = item?.product || item;
                    const pivot = item?.pivot || item;
                    const price = pivot?.single_price || pivot?.price || product?.price || product?.unit_price || item?.price || item?.unit_price || 0;
                    const quantity = pivot?.quantity || product?.quantity || item?.quantity || item?.qty || 1;
                    const subtotal = pivot?.subtotal || (price * quantity) || item?.subtotal || 0;

                    return (
                      <li key={i} className="d-flex justify-content-between align-items-center mb-1 small">
                        <span className="text-truncate" style={{ maxWidth: '70%' }}>
                          {pivot?.variation ? pivot?.variation?.name : product?.name} x {quantity}
                        </span>
                        <span className="fw-bold">{convertCurrency(subtotal)}</span>
                      </li>
                    );
                  })}
                </ul>
              </div>
            )}
          </div>
        )}


        <Formik
          initialValues={{ payment_method: "stripe" }}
          validationSchema={YupObject({
            payment_method: nameSchema,
          })}
          onSubmit={(values) => {
            values["return_url"] = `${process.env.PAYMENT_RETURN_URL}/account/order/details`;
            values["cancel_url"] = process.env.PAYMENT_CANCEL_URL;
            values["order_number"] = params;
            mutate(values);
          }}
        >
          {({ values, setFieldValue }) => (
            <Form>
              <div className="checkout-box">
                <div className="checkout-detail">
                  <Row className="g-3">
                    {paymentMethods.length > 0 ? (
                      paymentMethods.map((payment, i) => (
                        <Col md={12} key={i}>
                          <div className="payment-option">
                            <div className="payment-category w-100">
                              <div className="form-check">
                                <Input
                                  className="form-check-input"
                                  type="radio"
                                  name="payment_method"
                                  value={payment.name}
                                  id={payment.name}
                                  checked={values.payment_method === payment.name}
                                  onChange={() => setFieldValue("payment_method", payment.name)}
                                />
                                <Label className="form-check-label d-flex align-items-center justify-content-between" htmlFor={payment.name}>
                                  {ModifyString(payment.name, "upper")}
                                  <img src="/assets/images/payment/stripe.png" alt="Stripe" style={{ height: '20px' }} onError={(e) => e.target.style.display='none'} />
                                </Label>
                              </div>
                            </div>
                          </div>
                        </Col>
                      ))
                    ) : (
                      <Col md={12}>
                        <p className="text-danger">{t("no_payment_method_available")}</p>
                      </Col>
                    )}
                  </Row>
                </div>
              </div>
              <ErrorMessage name={"payment_method"} render={(msg) => <div className="invalid-feedback d-block">{handleModifier(msg)}</div>} />
              <div className="modal-footer pay-now-action-buttons mt-4">
                <Btn className=" btn-outline " onClick={() => setModal(false)}>
                  {t("cancel")}
                </Btn>
                <Btn type="submit" className="btn-solid" loading={Number(isLoading)} disabled={!values.payment_method}>
                  {t("submit")}
                </Btn>
              </div>
            </Form>
          )}
        </Formik>
      </ModalBody>
    </CustomModal>
  );
};


export default PaynowModal;
