"use client";
import React, { useContext } from "react";
import NoDataFound from "@/Components/Widgets/NoDataFound";
import CategoryContext from "@/Context/CategoryContext";
import Link from "next/link";
import { useTranslation } from "react-i18next";

const Category = () => {
  const { t } = useTranslation("common");
  const { filterCategory } = useContext(CategoryContext);
  const categoryData = filterCategory("post");
  return (
    <div className="theme-card">
      <h4>Categories</h4>
      {categoryData?.length > 0 ? (
        <ul className="categories">
          {categoryData?.map((category, index) => (
            <li key={index}>
              <Link
                href={{ pathname: `/blogs`, query: { category: category?.slug } }}
                legacyBehavior
              ><span>
<a className="category-name">
                  <h5>{category.name}</h5>
                  <span>({category?.blogs_count})</span>
                </a>
</span></Link>


            </li>
          ))}
        </ul>
      ) : (
        <NoDataFound customClass="bg-light no-data-added" title="no_category" />
      )}
    </div>
  );
};

export default Category;
