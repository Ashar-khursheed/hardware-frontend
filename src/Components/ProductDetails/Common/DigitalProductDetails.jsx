import { Col } from "reactstrap";
import AddProductDetail from "./AddProductDetail";
import ProductBundle from "./ProductBundle";
import ProductDetailAction from "./ProductDetailAction";
import DigitalProductContain from "./DigitalProductContain";
import ProductInformation from "./ProductInformation";
import ProductDeliveryInformation from "./ProductDeliveryInformation";
import PaymentOtions from "./PaymentOtions";

const DigitalProductDetails = ({ productState, setProductState }) => {
  return (
    <>
      <Col xl={4} lg={5} className="vendor-right-box">
        <div className="right-box-contain">
          <div className="main-right-box-contain"></div>
          <DigitalProductContain productState={productState} />
          <ProductDetailAction productState={productState} setProductState={setProductState} />
          <AddProductDetail productState={productState} />
          <ProductInformation productState={productState} />
          {productState?.product?.estimated_delivery_text || (productState?.product?.return_policy_text && productState?.product?.is_return) ? <ProductDeliveryInformation productState={productState} /> : null}
          <PaymentOtions productState={productState} />
        </div>
      </Col>
      {productState?.product?.cross_sell_products?.length > 0 && (
        <Col xs={12} className="related-product-2">
          <ProductBundle productState={productState} setProductState={setProductState} />
        </Col>
      )}
    </>
  );
};

export default DigitalProductDetails;
