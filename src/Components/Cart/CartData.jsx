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

const CartData = ({ elem }) => {
  const { t } = useTranslation("common");
  const { removeCart } = useContext(CartContext);
  const { convertCurrency } = useContext(SettingContext);
  const { mutate } = useCreate(WishlistAPI, false);

  const removeItem = () => {
    removeCart(elem?.variation_id ? elem?.variation_id : elem.product_id, elem?.id);
  };

  return (
    <tr>
      <CartProductDetail elem={elem} />
      <td>
        <Link href={`/product/${elem?.product?.slug}`} legacyBehavior>
          <a>{elem?.product?.name}</a>
        </Link>

          <div className="cart-mobile-wrapper d-block d-md-none">
            <h6 className="theme-color fw-bold mb-1">
               {convertCurrency(elem?.product?.sale_price)}
            </h6>
             {elem?.product?.discount ? <del className="text-muted small">{convertCurrency(elem?.product?.price)}</del> : null}
             
             <div className="qty-box mt-2">
                 <HandleQuantity productObj={elem?.product} classes={{ customClass: "quantity-price" }} elem={elem} />
             </div>
             
             <button className="btn btn-link text-danger p-0 mt-2" onClick={removeItem}>
                <RiCloseLine /> Remove
             </button>
          </div>
      </td>
      <td className="table-price d-none d-md-table-cell">
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
