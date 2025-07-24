import Image from "next/image";
import Link from "next/link";
import React, { Fragment } from "react";
import { useTranslation } from "react-i18next";

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
          <a>{category.name}</a>
        </Link>
      </Fragment>
    ))}
  </>
);

const SearchDropDown = React.forwardRef((props, ref) => {
  const { searchValue, categoryLoading, categoryData, searchArr, selectedItemIndex } = props;
  const { t } = useTranslation("common");
  const skeleton = Array.from({ length: 3 }, (_, index) => index);
  const queryParams = searchValue ? { search: searchValue } : null;

  return (
    <div className="search-suggestion-box" ref={ref}>
      <div
        className={
          !(categoryData?.length || categoryLoading)
            ? "mb-4 mt-0 recent-search-section"
            : "recent-search-section mb-4"
        }
      >
        {categoryLoading ? (
          <div className="filter-row filter-skeleton">
            {skeleton.map((number) => (
              <div className="skeleton__p" key={number}></div>
            ))}
          </div>
        ) : (
          <>
            {categoryData?.length > 0 && (
              <>
                <h4 className="page-title">{t("related_categories")}</h4>
                <div className="filter-row">
                  <RecursiveCategory categories={categoryData} />
                </div>
              </>
            )}
          </>
        )}
      </div>

      <div className="recent-search-section">
        <Link href={{ pathname: `/search`, query: queryParams }} legacyBehavior>
          <a>{t("view_all")}</a>
        </Link>

        {searchArr?.length === 0 ? (
          <div className="not-found-box">
            <h5>
              No results for <span>{searchValue}</span>
            </h5>
          </div>
        ) : (
          <ul>
            {searchArr?.map((data, index) => (
              <li
                id={`searchItem_${index}`}
                className={`result-item ${selectedItemIndex == index ? "selected" : ""}`}
                key={index}
              >
                <div className="suggestion-image">
                  <Image
                    height={50}
                    width={50}
                    src={data?.original_url || "/assets/images/placeholder.png"}
                    alt="product image"
                  />
                </div>

                <div className="suggestion-category">
                  <Link href={`/product/${data?.slug}`} legacyBehavior>
                    <a>
                      <div>
                        <h5>{data?.name}</h5>
                        <img src={data?.image_url} alt={data?.name} />
                      </div>
                    </a>
                  </Link>
                </div>

                {data?.categories?.map((category, catIndex) => (
                  <p key={catIndex}>
                    <Link
                      href={{ pathname: "/collections", query: { category: category?.slug } }}
                      legacyBehavior
                    >
                      <a>{category.name}</a>
                    </Link>
                  </p>
                ))}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
});

export default SearchDropDown;
