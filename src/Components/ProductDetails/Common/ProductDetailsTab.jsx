import NavTabTitles from "@/Components/Widgets/NavTabs";
import NoDataFound from "@/Components/Widgets/NoDataFound";
import TextLimit from "@/Utils/CustomFunctions/TextLimit";
import { useState } from "react";
import { Col, Row, TabContent, TabPane } from "reactstrap";
import CustomerReview from "./CustomerReview";
import QnATab from "./QnATab";
import { RiArrowDownSLine } from "react-icons/ri";
import Btn from "@/Elements/Buttons/Btn";

const ProductDetailsTab = ({ productState }) => {
  let [showMore, setShowMore] = useState(false);
  const [activeTab, setActiveTab] = useState(1);
  const ProductDetailsTabTitle = [
    { id: 1, name: "Description" },
    // { id: 2, name: "Review" },
    // { id: 3, name: "QA" },
  ];

  const seeMore = () => {
    setShowMore(!showMore);
  };
  return (
    <Col sm={12} lg={12}>
      <NavTabTitles classes={{ navClass: "nav nav-tabs nav-material" }} titleList={ProductDetailsTabTitle} activeTab={activeTab} setActiveTab={setActiveTab} />
      <TabContent className="nav-material" activeTab={activeTab}>
        <TabPane className={activeTab == 1 ? "show active" : ""}>
          <div className={`product-description more-less-box ${showMore ? "more" : ""}`}>
            {productState?.product?.description?.length > 1500 ? showMore ? <TextLimit classes={'more-text'} value={productState?.product?.description} /> : <TextLimit classes={'more-text'} value={productState?.product?.description?.substring(0, productState?.product?.description?.length / 2)} /> : <TextLimit classes={'more-text'} value={productState?.product?.description} />}
            {productState?.product?.description?.length > 1500 && <Btn className="btn-solid hover-solid bg-theme btn-md scroll-button btn-sm mt-3 more-lest-btn" onClick={seeMore}>
              {showMore ? "Show Less" : "Show more"}
              <RiArrowDownSLine />
            </Btn>}
          </div>
        </TabPane>

        <TabPane className={activeTab == 2 ? "show active" : ""}>
          <div className="single-product-tables ">
            <Row>
              {productState?.product?.can_review || productState?.product?.reviews_count ? (
                <CustomerReview productState={productState} />
              ) : (
                <Col xl={12}>
                  <NoDataFound customClass="no-data-added" title="no_review" description="no_review_desc" />
                </Col>
              )}
            </Row>
          </div>
        </TabPane>
        <TabPane className={activeTab == 3 ? "show active" : ""}>
          <QnATab productState={productState} activeTab={activeTab} />
        </TabPane>
      </TabContent>
    </Col>
  );
};

export default ProductDetailsTab;
