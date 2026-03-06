import { useCustomSearchParams } from "@/Utils/Hooks/useCustomSearchParams";
import { usePathname, useRouter } from "next/navigation";
import { useTranslation } from "react-i18next";
import { RiArrowDownSLine } from "react-icons/ri";
import { Collapse } from "reactstrap";

const CollectionAttributes = ({ attributeAPIData, filter, setFilter, isOffCanvas, open, toggle }) => {
  const router = useRouter();
  const [category, price, rating, sortBy, field, layout] = useCustomSearchParams(["category", "price", "rating", "sortBy", "field", "layout"]);
  const pathname = usePathname();
  const includedData = ["brand", "colour"];
  const { t } = useTranslation("common");

  const checkAttribute = (slug) => {
    if (filter?.attribute?.indexOf(slug) != -1) {
      return true;
    } else return false;
  };
  const applyAttribute = (event, slug) => {
    const isChecked = !filter?.attribute?.includes(slug);
    let temp = [...filter?.attribute];
    if (isChecked) {
      temp.push(slug);
    } else {
      temp = temp.filter(item => item !== slug);
    }
    setFilter((prev) => {
      return {
        ...prev,
        attribute: temp,
      };
    });
    if (temp.length > 0) {
      const queryParams = new URLSearchParams({ ...category, ...price, ...rating, ...sortBy, ...field, ...layout, attribute: temp }).toString();
      router.push(`${pathname}?${queryParams}`);
    } else {
      const queryParams = new URLSearchParams({ ...category, ...price, ...rating, ...sortBy, ...field, ...layout }).toString();
      router.push(`${pathname}?${queryParams}`);
    }
  };
  return (
    <>
      {attributeAPIData?.length > 0 &&
        attributeAPIData
          ?.filter((item, i) => includedData.includes(item.name.toLowerCase()))
          .map((attribute, i) => {
            const targetId = (i + 3).toString();
            return (
              <div className="ag-filter-container" key={i}>
                <div
                  className={`ag-filter-header ${open.includes(targetId) ? "open" : ""}`}
                  onClick={() => toggle(targetId)}
                >
                  <h3>{t(attribute?.name)}</h3>
                  <RiArrowDownSLine className="ag-chevron" />
                </div>
                <Collapse isOpen={open.includes(targetId)}>
                  <div className="ag-filter-content open">
                    <div className="ag-filter-inner-padding">
                      <div className="custom-sidebar-height">
                        <ul className="ag-filter-list">
                          {attribute?.attribute_values?.length > 0 &&
                            attribute?.attribute_values.map((value, index) => (
                              <li key={index}>
                                <div
                                  className={`ag-checkbox-wrapper ${filter?.attribute?.includes(value?.slug) ? 'active' : ''}`}
                                  onClick={(e) => applyAttribute(e, value?.slug)}
                                >
                                  <div className="ag-checkbox-box"></div>
                                  <div className="ag-label-content" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                    {attribute?.style === "color" && (
                                      <div
                                        className="ag-color-indicator"
                                        style={{
                                          width: '14px',
                                          height: '14px',
                                          borderRadius: '50%',
                                          backgroundColor: value?.hex_color,
                                          border: '1px solid #ddd'
                                        }}
                                      ></div>
                                    )}
                                    <span className="ag-label-text">{t(value?.value)}</span>
                                  </div>
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
          })}
    </>
  );
};

export default CollectionAttributes;
