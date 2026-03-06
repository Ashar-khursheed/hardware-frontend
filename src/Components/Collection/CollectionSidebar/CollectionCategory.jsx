import NoDataFound from "@/Components/Widgets/NoDataFound";
import CategoryContext from "@/Context/CategoryContext";
import { useCustomSearchParams } from "@/Utils/Hooks/useCustomSearchParams";
import { usePathname, useRouter } from "next/navigation";
import { useContext, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { AccordionBody, Input, Label } from "reactstrap";

const CollectionCategory = ({ filter, setFilter }) => {
  const [brand, attribute, price, rating, sortBy, field, layout] = useCustomSearchParams(["brand", "attribute", "price", "rating", "sortBy", "field", "layout"]);
  const { filterCategory } = useContext(CategoryContext);
  const [showList, setShowList] = useState(filterCategory("product"));
  const [state, setState] = useState(false);
  const { t } = useTranslation("common");

  const router = useRouter();
  const pathname = usePathname();
  const hasValue = (item, term) => {
    let valueToReturn = false;
    if (item && item["name"] && item["name"].toLowerCase().includes(term?.toLowerCase())) {
      valueToReturn = true;
    }
    item["subcategories"]?.length &&
      item["subcategories"].forEach((child) => {
        if (hasValue(child, term)) {
          valueToReturn = true;
        }
      });
    return valueToReturn;
  };

  const filterCategories = (item, term) => {
    const matchingSubcategories = item.subcategories?.map((subcat) => filterCategories(subcat, term)).filter((subcat) => subcat);

    if (item.name.toLowerCase().includes(term.toLowerCase()) || matchingSubcategories?.length) {
      return {
        ...item,
        subcategories: matchingSubcategories,
      };
    }
    return null;
  };

  const handleChange = (event) => {
    setState(!state);
    const keyword = event.target.value.toLowerCase();
    if (keyword !== "") {
      const updatedData = filterCategory("product")
        ?.map((item) => filterCategories(item, keyword))
        .filter((item) => item);
      setShowList(updatedData);
    } else {
      setShowList(filterCategory("product"));
    }
  };
  const redirectToCollection = (event, slug) => {
    let temp = [...filter?.category];

    if (!temp.includes(slug)) {
      temp.push(slug);
    } else {
      temp = temp.filter((elem) => elem !== slug);
    }
    setFilter((prev) => {
      return {
        ...prev,
        category: temp,
      };
    });
    if (temp.length > 0) {
      const queryParams = new URLSearchParams({ ...brand, ...attribute, ...price, ...sortBy, ...field, ...rating, ...layout, category: temp }).toString();
      router.push(`${pathname}?${queryParams}`);
    } else {
      const queryParams = new URLSearchParams({ ...brand, ...attribute, ...price, ...sortBy, ...field, ...rating, ...layout }).toString();
      router.push(`${pathname}?${queryParams}`);
    }
  };
  return (
    <div className="ag-filter-content open">
      <div className="ag-filter-inner-padding">
        {filterCategory("product").length > 5 && (
          <div className="ag-search-wrapper">
            <input placeholder={t("search")} onChange={handleChange} />
          </div>
        )}
        {showList?.length > 0 ? (
          <div className="custom-sidebar-height">
            <RecursiveCategory redirectToCollection={redirectToCollection} categories={showList} filter={filter} />
          </div>
        ) : (
          <NoDataFound customClass="search-not-found-box" title="no_category" />
        )}
      </div>
    </div>
  );
};

export default CollectionCategory;

const RecursiveCategory = ({ redirectToCollection, categories, filter }) => (
  <ul className="ag-filter-list">
    {categories.map((elem, i) => (
      <li key={i}>
        <div
          className={`ag-checkbox-wrapper ${filter?.category?.includes(elem?.slug) ? 'active' : ''}`}
          onClick={(e) => redirectToCollection(e, elem?.slug)}
        >
          <div className="ag-checkbox-box"></div>
          <span className="ag-label-text">{elem?.name}</span>
        </div>
        {elem.subcategories.length > 0 ? (
          <div className="ag-sub-category-wrapper" style={{ paddingLeft: '1.5rem' }}>
            <RecursiveCategory redirectToCollection={redirectToCollection} categories={elem?.subcategories} filter={filter} />
          </div>
        ) : null}
      </li>
    ))}
  </ul>
);
