import CartContext from "@/Context/CartContext";
import SettingContext from "@/Context/SettingContext";
import { WishlistAPI } from "@/Utils/AxiosUtils/API";
import { Href } from "@/Utils/Constants";
import useCreate from "@/Utils/Hooks/useCreate";
import Link from "next/link";
import { useContext } from "react";
import { useTranslation } from "react-i18next";
import { RiCloseLine } from "react-icons/ri";
import { Col, Row } from "reactstrap";
import CartProductDetail from "./CartProductDetail";
import HandleQuantity from "./HandleQuantity";

const CartData = ({ elem, mobileView }) => {
  const { t } = useTranslation("common");
  const { removeCart } = useContext(CartContext);
  const { convertCurrency } = useContext(SettingContext);
  const { mutate } = useCreate(WishlistAPI, false);

  const removeItem = () => {
    removeCart(elem?.variation_id ? elem?.variation_id : elem.product_id, elem?.id);
  };

  if (mobileView) {
    return (
      <div className="cart-card-inner">
        <div className="cart-card-image">
          <CartProductDetail elem={elem} />
        </div>
        <div className="cart-card-details">
          <div className="name-remove">
            <Link href={`/product/${elem?.product?.slug}`}>
              <span className="product-name">{elem?.product?.name}</span>
            </Link>
            <button className="remove-btn-small" onClick={removeItem}>
              <RiCloseLine />
            </button>
          </div>

          <div className="price-qty-row">
            <div className="price-info">
              <span className="current-price">{convertCurrency(elem?.product?.sale_price)}</span>
              {elem?.product?.discount ? <del className="old-price">{convertCurrency(elem?.product?.price)}</del> : null}
            </div>
            <div className="quantity-selector">
              <HandleQuantity productObj={elem?.product} elem={elem} />
            </div>
          </div>

          <div className="subtotal-row">
            <span className="label">Subtotal:</span>
            <span className="value">{convertCurrency(elem?.sub_total)}</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <tr>
      <CartProductDetail elem={elem} />
      <td>
        <Link href={`/product/${elem?.product?.slug}`} legacyBehavior>
          <a className="hbx-line-clamp-2 fw-bold text-dark">{elem?.product?.name}</a>
        </Link>
      </td>
      <td className="table-price">
        <h5 className="theme-color fw-bold">
          {convertCurrency(elem?.product?.sale_price)}
        </h5>
        {elem?.product?.discount ? <del className="text-muted small">{convertCurrency(elem?.product?.price)}</del> : null}
        {elem?.product?.price - elem?.product?.sale_price > 0 && (
          <p className="text-success small mb-0">
            {t("you_save")}: {convertCurrency(Math.abs(elem?.product?.price - elem?.product?.sale_price).toFixed(2))}
          </p>
        )}
      </td>
      <td>
        <div className="qty-box">
          <HandleQuantity productObj={elem?.product} classes={{ customClass: "quantity-price" }} elem={elem} />
        </div>
      </td>
      <td className="subtotal">
        <h2 className="td-color">{convertCurrency(elem?.sub_total)}</h2>
      </td>
      <td>
        <a href={Href} className="icon remove-btn" onClick={removeItem}>
          <RiCloseLine />
        </a>
      </td>
    </tr>
  );
};

export default CartData;
