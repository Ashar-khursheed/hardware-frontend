import ThemeOptionContext from "@/Context/ThemeOptionsContext";
import { showMonthWiseDateAndTime } from "@/Utils/CustomFunctions/DateFormate";
import React, { useContext } from "react";

import { RiTimeLine } from "react-icons/ri";

const BlogImageDetails = ({ Blog }) => {
  const { themeOption } = useContext(ThemeOptionContext);
  return (
    <div className="blog-title-box">
      <h1 className="fw-bold text-dark display-6 mb-3">{Blog?.title}</h1>
      <div className="post-metadata d-flex flex-wrap align-items-center gap-3 text-muted small">
        {themeOption?.blog?.blog_author_enable && (
          <div className="author d-flex align-items-center">
            <span className="me-2 text-primary">By</span>
            <span className="fw-semibold text-dark">{Blog?.created_by?.name}</span>
          </div>
        )}
        <span className="separator d-none d-sm-block">•</span>
        <div className="date d-flex align-items-center">
          <RiTimeLine className="me-1" />
          {showMonthWiseDateAndTime(Blog?.created_at)}
        </div>
      </div>
    </div>
  );
};

export default BlogImageDetails;
