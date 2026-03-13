"use client";
import Image from "next/image";
import React from "react";
import { useTranslation } from "react-i18next";
import { placeHolderImage } from "../Widgets/Placeholder";
import BlogImageDetails from "./BlogImageDetails";

const BlogCardDetails = ({ Blog }) => {
  const { t } = useTranslation("common");

  return (
    <div className="hbx-premium-blog-detail">
      <div className="blog-image-wrapper mb-4 rounded-4 overflow-hidden shadow-sm">
        {Blog?.blog_thumbnail?.original_url ? (
          <Image
            height={700}
            width={1400}
            src={Blog?.blog_thumbnail?.original_url}
            loading="lazy"
            className="img-fluid object-fit-cover w-100"
            alt={Blog?.title || "Blog Image"}
            style={{ maxHeight: '500px' }}
          />
        ) : null}
      </div>

      <div className="blog-header mb-5">
        <BlogImageDetails Blog={Blog} />
      </div>

      <div className="blog-detail-contain hbx-premium-blog-content ckeditor-content fs-5 text-secondary">
        <div className="content-inner" dangerouslySetInnerHTML={{ __html: Blog?.content }} />
      </div>
    </div>
  );
};

export default BlogCardDetails;
