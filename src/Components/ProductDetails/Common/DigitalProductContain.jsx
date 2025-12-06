import { RiShoppingCartLine } from "react-icons/ri";

const DigitalProductContain = ({ productState }) => {
  const product = productState?.product || {};
  
  return (
    <>
      <div className="product-title">
        <h2 className="name">{String(product?.name || '')}</h2>
        <ul className="title-content-list">
          {product?.orders_count && (
            <h6 className="content">
              <RiShoppingCartLine />
              {product.orders_count} Sales
            </h6>
          )}
        </ul>
        <p>{String(product?.short_description || '')}</p>
      </div>
    </>
  );
};

export default DigitalProductContain;
