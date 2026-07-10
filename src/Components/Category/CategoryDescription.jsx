"use client";

import { useState } from "react";

const CategoryDescription = ({ heading, slug, description, content }) => {
  const [expanded, setExpanded] = useState(false);
  const fallbackHeading = slug?.split("-").map((word) => word.charAt(0).toUpperCase() + word.slice(1)).join(" ");

  return (
    <div className="category-header-section py-4 bg-white border-bottom">
      <div className="container">
        <h1 className="category-page-heading mb-2 text-dark">{heading || fallbackHeading}</h1>

        {description && (
          <div
            className="category-short-description mb-0"
            dangerouslySetInnerHTML={{ __html: description }}
          />
        )}

        {content && (
          <div className="category-expandable-content mt-2">
            <div
              className={`category-expanded-content ${expanded ? "is-visible" : ""}`}
              dangerouslySetInnerHTML={{ __html: content }}
            />
            <button
              type="button"
              className="category-show-more-btn btn btn-link p-0 mt-2"
              onClick={() => setExpanded((prev) => !prev)}
              aria-expanded={expanded}
            >
              {expanded ? "Show less" : "Show more"}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default CategoryDescription;
