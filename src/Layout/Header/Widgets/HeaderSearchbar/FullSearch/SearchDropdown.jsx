import Image from "next/image";
import Link from "next/link";
import React, { Fragment } from "react";
import { useTranslation } from "react-i18next";
import { storageURL } from "@/Utils/Constants";

const RecursiveCategory = ({ categories }) => (
  <>
    {categories.map((category) => (
      <Fragment key={category.id}>
        <Link
          href={{
            pathname: `/collections`,
            query: { category: category?.slug },
          }}
          legacyBehavior
        >
          <a className="category-suggestion-item badge bg-light text-dark me-2 mb-2 p-2 border fw-normal text-decoration-none">{category.name}</a>
        </Link>
      </Fragment>
    ))}
  </>
);

const SearchDropDown = React.forwardRef((props, ref) => {
  const { searchValue, categoryLoading, categoryData, searchArr, selectedItemIndex, closeSearch } = props;
  
  // Limit results to maximal 5 items - increased to 12 based on API but if UI limits to 5 let's keep it or increase if designed to handle more. 
  // User asked for 12 earlier but maybe UI is scrollable? For now let's respect 5 or increase if layout allows.
  // The API fetches 12. Let's show up to 12 if height allows, or scroll. 
  // For now, let's keep slicing logic consistent with design or remove slice if we want all. 
  // Let's remove slice to show all 12 fetched results as per user request for consistency.
  const limitedSearchArr = searchArr; // Removed slice
  const limitedCategoryData = categoryData?.slice(0, 5);

  const { t } = useTranslation("common");
  const skeleton = Array.from({ length: 3 }, (_, index) => index);
  const queryParams = searchValue ? { search: searchValue } : null;

  return (
    <div className="search-suggestion-box shadow-lg rounded border mt-1" ref={ref} style={{ overflow: 'hidden' }}>
      <div className="p-3 bg-white">
          {(categoryLoading) ? (
            <div className="filter-row filter-skeleton mb-3">
              {skeleton.map((number) => (
                <div className="skeleton__p mb-2" key={number} style={{ height: '30px', backgroundColor: '#f0f0f0' }}></div>
              ))}
            </div>
          ) : (
            <>
              {limitedCategoryData?.length > 0 && (
                <div className="mb-3">
                  <h6 className="text-muted small fw-bold text-uppercase mb-2">{t("related_categories")}</h6>
                  <div className="d-flex flex-wrap">
                    <RecursiveCategory categories={limitedCategoryData} />
                  </div>
                </div>
              )}
            </>
          )}

        {limitedSearchArr?.length === 0 && !categoryLoading ? (
          <div className="text-center py-4">
            <p className="text-muted mb-0">
               No results found for "<span className="fw-bold text-dark">{searchValue}</span>"
            </p>
          </div>
        ) : (
          <div>
              {limitedSearchArr?.length > 0 && <h6 className="text-muted small fw-bold text-uppercase mb-2">Products</h6>}
              <ul className="list-unstyled mb-0">
                {limitedSearchArr?.map((data, index) => (
                  <li
                    id={`searchItem_${index}`}
                    className={`p-2 rounded d-flex align-items-center cursor-pointer ${selectedItemIndex === index ? "bg-light" : ""}`}
                    key={index}
                    style={{ transition: 'background-color 0.2s' }}
                  >
                    <Link href={`/product/${data?.slug}`} legacyBehavior>
                         <a className="d-flex align-items-center w-100 text-decoration-none text-dark" onClick={closeSearch}>
                            <div className="flex-shrink-0 me-3 position-relative" style={{ width: 50, height: 50 }}>
                                <Image
                                    src={data?.product_thumbnail?.original_url || data?.image_url || "/assets/images/placeholder.png"}
                                    alt={data?.name}
                                    fill
                                    className="rounded object-fit-contain border bg-white"
                                />
                            </div>
                            <div className="flex-grow-1">
                                <h6 className="mb-0 text-truncate" style={{ maxWidth: '300px' }}>{data?.name}</h6>
                                {data?.price && <small className="text-primary fw-bold">{data?.sale_price ? `$${data?.sale_price}` : `$${data?.price}`}</small>}
                            </div>
                         </a>
                    </Link>
                  </li>
                ))}
              </ul>
          </div>
        )}
      </div>
      
      <div className="border-top p-2 bg-light text-center">
            <Link href={{ pathname: `/search`, query: queryParams }} legacyBehavior>
                <a className="text-primary fw-bold small text-decoration-none" onClick={closeSearch}>View All Results</a>
            </Link>
      </div>
    </div>
  );
});

export default SearchDropDown;
