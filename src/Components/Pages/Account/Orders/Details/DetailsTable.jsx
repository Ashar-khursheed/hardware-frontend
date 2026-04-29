import Avatar from "@/Components/Widgets/Avatar";
import { placeHolderImage } from "@/Components/Widgets/Placeholder";
import SettingContext from "@/Context/SettingContext";
import { useContext, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { Card, CardBody, Table, Tooltip } from "reactstrap";
import RefundModal from "./RefundModal";
import { Href } from "@/Utils/Constants";
import Btn from "@/Elements/Buttons/Btn";
import { CapitalizeMultiple } from "@/Utils/CustomFunctions/Capitalize";

const DetailsTable = ({ data }) => {
  const { t } = useTranslation("common");
  const { convertCurrency } = useContext(SettingContext);
  const [modal, setModal] = useState("");
  const [storeData, setStoreData] = useState("");
  const onModalOpen = (product) => {
    setStoreData(product);
    setModal(product?.id);
  };
  const [tooltipOpen, setTooltipOpen] = useState(false);
  const toggle = (index) =>
    setTooltipOpen((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));

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
    
    // Common keys where products/items are stored
    const keys = ['products', 'order_products', 'order_items', 'items', 'order_details', 'sub_orders'];
    
    for (const key of keys) {
      if (key === 'sub_orders' && Array.isArray(obj[key])) {
        const subProducts = obj[key].flatMap(sub => extractProducts(sub.products || sub.order_items || sub.items));
        if (subProducts.length > 0) return subProducts;
      }
      const found = extractProducts(obj[key]);
      if (found.length > 0) return found;
    }
    
    // If not found, check if the object itself is a wrapper (like { data: { ... } } or { order: { ... } })
    if (obj.data && typeof obj.data === 'object') return searchForProducts(obj.data);
    if (obj.order && typeof obj.order === 'object') return searchForProducts(obj.order);
    
    return [];
  };

  const allProducts = searchForProducts(data);


  const ref = useRef(null);
  return (
    <>
      <Card className="dashboard-table">
        <CardBody className="p-0">
          <div className="wallet-table">
            <div className="tracking-wrapper table-responsive">
              <Table className="product-table order-table">
                <thead>
                  <tr>
                    <th scope="col">{t("image")}</th>
                    <th scope="col">{t("short_name")}</th>
                    <th scope="col">{t("price")}</th>
                    <th scope="col">{t("quantity")}</th>
                    <th scope="col">{t("subtotal")}</th>
                    <th scope="col">{t("refund_status")}</th>
                  </tr>
                </thead>
                <tbody>
                  {allProducts?.length > 0
                    ? allProducts?.map((item, i) => {
                        const product = item?.product || item;
                        const pivot = item?.pivot || item;
                        
                        // Extract price from various possible locations
                        const price = pivot?.single_price || pivot?.price || product?.price || product?.unit_price || item?.price || item?.unit_price || 0;
                        
                        // Extract quantity
                        const quantity = pivot?.quantity || product?.quantity || item?.quantity || item?.qty || 1;
                        
                        // Extract subtotal
                        const subtotal = pivot?.subtotal || (price * quantity) || item?.subtotal || 0;

                        return (
                          <tr key={i}>
                            <td className="product-image">
                              <Avatar 
                                data={
                                  pivot?.variation?.variation_image || 
                                  product?.product_thumbnail || 
                                  product?.product_galleries?.[0] || 
                                  placeHolderImage
                                } 
                                name={pivot?.variation?.name || product?.name} 
                                customImageClass="img-fluid" 
                              />
                            </td>
                            <td>
                              <h6>{pivot?.variation ? pivot?.variation?.name : product?.name}</h6>
                            </td>
                            <td>
                              <h6>{convertCurrency(price)}</h6>
                            </td>
                            <td>
                              <h6>{quantity}</h6>
                            </td>
                            <td>
                              <h6>{convertCurrency(subtotal)}</h6>
                            </td>
                            <td>
                              {data.payment_status && product?.is_return === 1 && data.payment_status && data.payment_status === "COMPLETED" && data.order_status && data.order_status.slug == "delivered" && !pivot?.refund_status ? (
                                <a className="btn btn-solid" href={Href} onClick={() => onModalOpen(product)}>
                                  {t("refund")}
                                </a>
                              ) : product.is_return === 0 ? (
                                <span>{t("non_refundable")}</span>
                              ) : pivot?.refund_status ? (
                                <div className={`status-${pivot?.refund_status?.toLowerCase()}`}>
                                  <span>{CapitalizeMultiple(pivot?.refund_status)}</span>
                                </div>
                              ) : (
                                <>
                                <div className="black-tooltip" id={"refunded" + i}>
                                  {!pivot?.refund_status && <Btn className="btn-solid disabled"> {t("refund")}</Btn>}
                                </div>
                                  <Tooltip isOpen={tooltipOpen[i]} target={"refunded" + i} toggle={() => toggle(i)}>
                                  {t("EnableAfterDelivery")}
                                </Tooltip>
                                </>
                              )}
                            </td>
                          </tr>
                        );
                      })
                    : null}
                </tbody>


              </Table>
            </div>
          </div>
        </CardBody>
      </Card>
      <RefundModal modal={modal} setModal={setModal} storeData={storeData} />
    </>
  );
};

export default DetailsTable;
