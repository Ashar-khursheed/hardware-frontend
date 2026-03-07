// import CartContext from "@/Context/CartContext";
// import SettingContext from "@/Context/SettingContext";
// import { WishlistAPI } from "@/Utils/AxiosUtils/API";
// import { Href } from "@/Utils/Constants";
// import useCreate from "@/Utils/Hooks/useCreate";
// import Link from "next/link";
// import { useContext } from "react";
// import { useTranslation } from "react-i18next";
// import { RiCloseLine } from "react-icons/ri";
// import { Col, Row } from "reactstrap";
// import CartProductDetail from "./CartProductDetail";
// import HandleQuantity from "./HandleQuantity";

// const CartData = ({ elem }) => {
//   const { t } = useTranslation("common");
//   const { removeCart } = useContext(CartContext);
//   const { convertCurrency } = useContext(SettingContext);
//   const { mutate } = useCreate(WishlistAPI, false);

//   const removeItem = () => {
//     removeCart(elem?.variation_id ? elem?.variation_id : elem.product_id, elem?.id);
//   };

//   return (
//     <tr>
//       <CartProductDetail elem={elem} />
//       <td>
//         <Link href={`/product/${elem?.product?.slug}`} legacyBehavior>
//           <a>{elem?.product?.name}</a>
//         </Link>

//           <div className="cart-mobile-wrapper d-block d-md-none">
//             <h6 className="theme-color fw-bold mb-1">
//                {convertCurrency(elem?.product?.sale_price)}
//             </h6>
//              {elem?.product?.discount ? <del className="text-muted small">{convertCurrency(elem?.product?.price)}</del> : null}

//              <div className="qty-box mt-2">
//                  <HandleQuantity productObj={elem?.product} classes={{ customClass: "quantity-price" }} elem={elem} />
//              </div>

//              <button className="btn btn-link text-danger p-0 mt-2" onClick={removeItem}>
//                 <RiCloseLine /> Remove
//              </button>
//           </div>
//       </td>
//       <td className="table-price d-none d-md-table-cell">
//         <h5 className="theme-color fw-bold">
//           {convertCurrency(elem?.product?.sale_price)}
//         </h5>
//          {elem?.product?.discount ? <del className="text-muted small">{convertCurrency(elem?.product?.price)}</del> : null}
//          {elem?.product?.price - elem?.product?.sale_price > 0 && (
//           <p className="text-success small mb-0">
//             {t("you_save")}: {convertCurrency(Math.abs(elem?.product?.price - elem?.product?.sale_price).toFixed(2))}
//           </p>
//         )}
//       </td>
//       <td>
//         <div className="qty-box">
//           <HandleQuantity productObj={elem?.product} classes={{ customClass: "quantity-price" }} elem={elem} />
//         </div>
//       </td>
//       <td className="subtotal">
//         <h2 className="td-color">{convertCurrency(elem?.sub_total)}</h2>
//       </td>
//       <td>
//         <a href={Href} className="icon remove-btn" onClick={removeItem}>
//           <RiCloseLine />
//         </a>
//       </td>
//     </tr>
//   );
// };

// export default CartData;
import CartContext from "@/Context/CartContext";
import SettingContext from "@/Context/SettingContext";
import Link from "next/link";
import React, { useContext } from "react";
import { useTranslation } from "react-i18next";
import { RiDeleteBin6Line } from "react-icons/ri";
import Avatar from "../Widgets/Avatar";
import { placeHolderImage } from "../Widgets/Placeholder";

// NOTE: Import your existing quantity component here
// e.g. import QtyBox from "../Widgets/QtyBox";
// or   import QuantityControl from "../Widgets/QuantityControl";
// Check your src/Components/Widgets/ folder for the correct file name

const CartData = ({ elem }) => {
  const { t } = useTranslation("common");
  const { convertCurrency } = useContext(SettingContext);
  const { deleteCart, updateCartQty } = useContext(CartContext);

  const price = Number(elem?.variation?.sale_price ?? elem?.product?.sale_price ?? 0);
  const oldPrice = Number(elem?.variation?.price ?? elem?.product?.price ?? 0);
  const qty = Number(elem?.quantity ?? 1);
  const total = price * qty;

  return (
    <tr>
      {/* Image */}
      <td>
        <Link href={`/product/${elem?.product?.slug}`} className="agct__img-link">
          <Avatar
            customeClass="agct__img-link"
            customImageClass="img-fluid"
            data={elem?.variation?.variation_image ?? elem?.product?.product_thumbnail}
            placeHolder={placeHolderImage}
            name={elem?.product?.name}
          />
        </Link>
      </td>

      {/* Name */}
      <td>
        <Link href={`/product/${elem?.product?.slug}`} className="agct__name">
          {elem?.product?.name}
        </Link>
        {elem?.variation?.name && (
          <span className="agct__variant">{elem.variation.name}</span>
        )}
      </td>

      {/* Unit Price */}
      <td className="d-none d-md-table-cell">
        <span className="agct__price-now">{convertCurrency(price)}</span>
        {price < oldPrice && (
          <span className="agct__price-old">{convertCurrency(oldPrice)}</span>
        )}
      </td>

      {/* Quantity — paste your existing qty component here */}
      <td>
        <div className="agct__qty">
          {/* REPLACE THIS with your existing qty box component */}
          {/* e.g. <QtyBox cartData={elem} /> */}
          <button
            className="agct__qty-btn"
            onClick={() => updateCartQty && updateCartQty(elem?.id, Math.max(1, qty - 1))}
          >−</button>
          <input
            className="agct__qty-input"
            type="number"
            value={qty}
            readOnly
          />
          <button
            className="agct__qty-btn"
            onClick={() => updateCartQty && updateCartQty(elem?.id, qty + 1)}
          >+</button>
        </div>
      </td>

      {/* Row Total */}
      <td className="d-none d-md-table-cell">
        <span className="agct__price-now">{convertCurrency(total.toFixed(2))}</span>
      </td>

      {/* Delete */}
      <td>
        <button
          className="agct__delete-btn"
          onClick={() => deleteCart(elem?.id)}
          title={t("remove")}
        >
          <RiDeleteBin6Line />
        </button>
      </td>
    </tr>
  );
};

export default CartData;