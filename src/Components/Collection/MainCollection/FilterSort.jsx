// import { FilterSortData } from "@/Data/CustomData";
// import { useCustomSearchParams } from "@/Utils/Hooks/useCustomSearchParams";
// import { usePathname, useRouter } from "next/navigation";
// import React, { useState } from "react";
// import { useTranslation } from "react-i18next";
// import { Dropdown, DropdownItem, DropdownMenu, DropdownToggle } from "reactstrap";

// const FilterSort = ({ filter, setFilter }) => {
//   const [dropdownOpen, setDropdownOpen] = useState(false);
//   const toggle = () => setDropdownOpen((prevState) => !prevState);
//   const [attribute, price, category, layout] = useCustomSearchParams(["attribute", "price", "category", "layout"]);
//   const { t } = useTranslation("common");
//   const router = useRouter();
//   const pathname = usePathname();
//   const handleSort = (data) => {
//     // setFilter((prev) => {
//     //   return {
//     //     ...prev,
//     //     sortBy: data.value,
//     //     field: data && (data.value == "asc" || data.value == "desc") ? "created_at" : null,
//     //   };
//     // });

//     let queryParams = new URLSearchParams({ ...attribute, ...price, ...category, ...layout, sortBy: data.value }).toString();
//     if (data && (data.value == "asc" || data.value == "desc")) {
//       const fieldQuery = new URLSearchParams();
//       fieldQuery.append("field", "created_at");
//       queryParams += "&" + fieldQuery.toString();
//     }
//     router.push(`${pathname}?${queryParams}`);
//   };
//   return (
//     <div className="product-page-per-view">
//       <Dropdown isOpen={dropdownOpen} toggle={toggle}>
//         <DropdownToggle caret>{t(FilterSortData.find((elem) => elem.value == filter.sortBy)?.label || t("sort"))}</DropdownToggle>
//         <DropdownMenu>
//           <div>
//             {FilterSortData.map((elem, i) => (
//               <DropdownItem key={i} onClick={() => handleSort(elem)}>
//                 {t(elem.label)}
//               </DropdownItem>
//             ))}
//           </div>
//         </DropdownMenu>
//       </Dropdown>
//     </div>
//   );
// };

// export default FilterSort;
import { FilterSortData } from "@/Data/CustomData";
import { useCustomSearchParams } from "@/Utils/Hooks/useCustomSearchParams";
import { usePathname, useRouter } from "next/navigation";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { Dropdown, DropdownItem, DropdownMenu, DropdownToggle } from "reactstrap";

const FilterSort = ({ filter, setFilter }) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const toggle = () => setDropdownOpen((prevState) => !prevState);
  const [attribute, price, category, layout, paginate] = useCustomSearchParams(["attribute", "price", "category", "layout", "paginate"]);
  const { t } = useTranslation("common");
  const router = useRouter();
  const pathname = usePathname();

  // Map sort values to field and sortBy
  const getSortParams = (value) => {
    const sortMap = {
      "asc": { field: "created_at", sortBy: "asc" },
      "desc": { field: "created_at", sortBy: "desc" },
      "low-high": { field: "sale_price", sortBy: "asc" },
      "high-low": { field: "sale_price", sortBy: "desc" },
      "a-z": { field: "name", sortBy: "asc" },
      "z-a": { field: "name", sortBy: "desc" },
      "discount-high-low": { field: "discount_percentage", sortBy: "desc" },
    };
    return sortMap[value] || { field: "created_at", sortBy: "desc" };
  };

  const handleSort = (data) => {
    const { field, sortBy } = getSortParams(data.value);

    // Update filter state
    setFilter((prev) => ({
      ...prev,
      sortBy: sortBy,
      field: field,
    }));

    // Build query params
    let queryParams = new URLSearchParams({ 
      ...attribute, 
      ...price, 
      ...category, 
      ...layout,
      ...paginate,
      sortBy: sortBy,
      field: field
    }).toString();
    
    router.push(`${pathname}?${queryParams}`);
  };

  return (
    <div className="product-page-per-view">
      <Dropdown isOpen={dropdownOpen} toggle={toggle}>
        <DropdownToggle caret>
          {t(FilterSortData.find((elem) => elem.value == filter.sortBy || 
            (getSortParams(elem.value).field === filter.field && getSortParams(elem.value).sortBy === filter.sortBy))?.label || t("sort"))}
        </DropdownToggle>
        <DropdownMenu>
          <div>
            {FilterSortData.map((elem, i) => (
              <DropdownItem key={i} onClick={() => handleSort(elem)}>
                {t(elem.label)}
              </DropdownItem>
            ))}
          </div>
        </DropdownMenu>
      </Dropdown>
    </div>
  );
};

export default FilterSort;