import { FilterPrice } from "@/Data/CustomData";
import { useCustomSearchParams } from "@/Utils/Hooks/useCustomSearchParams";
import { usePathname, useRouter } from "next/navigation";
import { useTranslation } from "react-i18next";
import { RiArrowDownSLine } from "react-icons/ri";
import { Collapse } from "reactstrap";

const CollectionPrice = ({ filter, setFilter, attributeAPIData, isOffCanvas, open, toggle }) => {
  const router = useRouter();
  const [category, attribute, sortBy, field, rating, layout] = useCustomSearchParams(["category", "attribute", "sortBy", "field", "rating", "layout"]);
  const { t } = useTranslation("common");
  const pathname = usePathname();

  const checkPrice = (value) => {
    return filter?.price?.includes(value);
  };

  const applyPrice = (event, value) => {
    const isChecked = !filter?.price?.includes(value);
    let temp = [...filter?.price];
    if (isChecked) {
      temp.push(value);
    } else {
      temp = temp.filter(item => item !== value);
    }
    setFilter((prev) => {
      return {
        ...prev,
        price: temp,
      };
    });
    if (temp.length > 0) {
      const queryParams = new URLSearchParams({ ...category, ...attribute, ...sortBy, ...field, ...rating, ...layout, price: temp }).toString();
      router.push(`${pathname}?${queryParams}`);
    } else {
      const queryParams = new URLSearchParams({ ...category, ...attribute, ...sortBy, ...field, ...rating, ...layout }).toString();
      router.push(`${pathname}?${queryParams}`);
    }
  };

  const targetId = (attributeAPIData?.length + 3).toString();

  return (
    <div className={`ag-filter-container ${isOffCanvas ? "col-lg-3" : ""}`}>
      <div
        className={`ag-filter-header ${open.includes(targetId) ? "open" : ""}`}
        onClick={() => toggle(targetId)}
      >
        <h3>{t("price")}</h3>
        <RiArrowDownSLine className="ag-chevron" />
      </div>
      <Collapse isOpen={open.includes(targetId)}>
        <div className="ag-filter-content open">
          <div className="ag-filter-inner-padding">
            <div className="custom-sidebar-height">
              <ul className="ag-filter-list">
                {FilterPrice.map((price, i) => (
                  <li key={i}>
                    <div
                      className={`ag-checkbox-wrapper ${checkPrice(price?.value) ? 'active' : ''}`}
                      onClick={(e) => applyPrice(e, price?.value)}
                    >
                      <div className="ag-checkbox-box"></div>
                      <span className="ag-label-text">
                        {price?.price ? (
                          `${price.text} $${price.price}`
                        ) : (
                          `$${price.minPrice} - $${price.maxPrice}`
                        )}
                      </span>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </Collapse>
    </div>
  );
};

export default CollectionPrice;
