import ProductRating from "@/Components/Widgets/ProductRating";
import Btn from "@/Elements/Buttons/Btn";
import request from "@/Utils/AxiosUtils";
import { ReviewAPI } from "@/Utils/AxiosUtils/API";
import { useQuery } from "@tanstack/react-query";
import Cookies from "js-cookie";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { RiStarFill } from "react-icons/ri";
import { Col, Progress, Row } from "reactstrap";
import ReviewModal from "./AllModal/ReviewModal";
import CustomerQA from "./CustomerQ&A";

const CustomerReview = ({ productState }) => {
  const { t } = useTranslation("common");
  const [modal, setModal] = useState("");
  const isLogin = Cookies.get("uat_multikart");
  const { data, isLoading, refetch } = useQuery([ReviewAPI], () => request({ url: ReviewAPI, params: { product_id: productState?.product?.id } }), {
    enabled: isLogin ? (productState?.product?.id ? true : false) : false,
    refetchOnWindowFocus: false,
    select: (res) => res?.data?.data,
  });
  return (
    <>
      <Col xl={5}>
        <div className="product-rating-box">
          <Row>
            {productState?.product?.reviews_count ? (
              <Col xl={12}>
                <div className="product-main-rating">
                  <div className="d-flex gap-3">
                    <h2>{productState?.product?.rating_count.toFixed(2)}</h2>
                    <div className="rating-box">
                      <div className="product-rating">
                        <ProductRating totalRating={productState?.product?.rating_count} />
                      </div>
                      <h4>
                        {productState?.product?.reviews_count} {t("Ratings")}
                      </h4>
                    </div>
                  </div>
                </div>
              </Col>
            ) : null}
            <Col xl={12}>
              {productState?.product?.reviews_count ? (
                <ul className="product-rating-list">
                  {productState?.product?.review_ratings
                    ?.slice()
                    ?.reverse()
                    .map((rate, i) => (
                      <li key={i}>
                        <div className="rating-product">
                          <h5>
                            {productState?.product?.review_ratings?.length - 1 - i + 1}
                            <RiStarFill />
                          </h5>
                          <Progress multi>
                            <Progress value={((rate / productState?.product?.reviews_count) * 100).toFixed(0)} />
                          </Progress>
                          <h5 className="total">{rate}</h5>
                        </div>
                      </li>
                    ))}
                </ul>
              ) : null}
              {productState?.product?.can_review ? (
                <div className="review-title-2">
                  <h4 className="fw-bold">{t("review_this_product")}</h4>
                  <p>{t("let_other_customers_know_what_you_think")}.</p>
                  <Btn onClick={() => setModal(productState?.product?.id)} title={productState?.product?.user_review ? t("edit_review") : t("write_a_review")} />
                </div>
              ) : null}
            </Col>
          </Row>
        </div>
      </Col>
      <ReviewModal modal={modal} setModal={setModal} productState={productState} refetch={refetch} />
      {(productState?.product?.can_review || productState?.product?.reviews_count) && <CustomerQA data={data} />}
    </>
  );
};

export default CustomerReview;
