import NoDataFound from "@/Components/Widgets/NoDataFound";
import BrandContext from "@/Context/BrandContext";
import { useCustomSearchParams } from "@/Utils/Hooks/useCustomSearchParams";
import { usePathname, useRouter } from "next/navigation";
import { useContext, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { AccordionBody, Input, Label } from "reactstrap";

const CollectionBrand = ({ filter, setFilter }) => {
  const [category, attribute, price, rating, sortBy, field, layout] = useCustomSearchParams(["category", "attribute", "price", "rating", "sortBy", "field", "layout"]);
  const { brandState, isLoading, refetch } = useContext(BrandContext);
  const [showList, setShowList] = useState();
  const { t } = useTranslation("common");

  useEffect(() => {
    refetch();
  }, []);

  useEffect(() => {
    !isLoading && setShowList(brandState);
  }, [brandState, isLoading]);

  const router = useRouter();
  const pathname = usePathname();
  const hasValue = (item, term) => {
    let valueToReturn = false;
    if (item && item["name"] && item["name"].toLowerCase().includes(term?.toLowerCase())) {
      valueToReturn = true;
    }
    return valueToReturn;
  };
  const handleChange = (event) => {
    const keyword = event.target.value;
    if (keyword !== "") {
      const updatedData = [];
      brandState?.forEach((item) => {
        hasValue(item, keyword) && updatedData.push(item);
      });
      setShowList(updatedData);
    } else {
      setShowList(brandState);
    }
  };
  const redirectToCollection = (event, slug) => {
    event.preventDefault();
    let temp = [...filter?.brand];

    if (!temp.includes(slug)) {
      temp.push(slug);
    } else {
      temp = temp.filter((elem) => elem !== slug);
    }
    setFilter((prev) => {
      return {
        ...prev,
        brand: temp,
      };
    });
    if (temp.length > 0) {
      const queryParams = new URLSearchParams({ ...category, ...attribute, ...price, ...sortBy, ...field, ...rating, ...layout, brand: temp }).toString();
      router.push(`${pathname}?${queryParams}`);
    } else {
      const queryParams = new URLSearchParams({ ...category, ...attribute, ...price, ...sortBy, ...field, ...rating, ...layout }).toString();
      router.push(`${pathname}?${queryParams}`);
    }
  };
  return (
    <div className="ag-filter-content open">
      <div className="ag-filter-inner-padding">
        {brandState.length > 5 && (
          <div className="ag-search-wrapper">
            <input type="search" placeholder={t("search")} onChange={handleChange} />
          </div>
        )}
        <div className="custom-sidebar-height">
          {showList?.length > 0 ? (
            <ul className="ag-filter-list">
              {showList?.map((elem, i) => (
                <li key={i}>
                  <div
                    className={`ag-checkbox-wrapper ${filter?.brand?.includes(elem?.slug) ? 'active' : ''}`}
                    onClick={(e) => redirectToCollection(e, elem?.slug)}
                  >
                    <div className="ag-checkbox-box"></div>
                    <span className="ag-label-text">{elem?.name}</span>
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <NoDataFound customClass="search-not-found-box" title="no_brand" />
          )}
        </div>
      </div>
    </div>
  );
};

export default CollectionBrand;
