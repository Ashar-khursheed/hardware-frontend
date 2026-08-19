"use client";

import Image from "next/image";
import React, { useState } from "react";
import BlogImageDetails from "./BlogImageDetails";
import {
  FaFacebookF,
  FaLinkedinIn,
  FaWhatsapp,
  FaXTwitter,
} from "react-icons/fa6";
import { FiCopy, FiShare2, FiCheck } from "react-icons/fi";

const BlogCardDetails = ({ Blog, mobileToc }) => {
  
  const [copied, setCopied] = useState(false);

  const getBlogUrl = () => {
    if (typeof window !== "undefined") {
      return window.location.href;
    }
    return "";
  };

  const handleCopyLink = async () => {
    const url = getBlogUrl();

    if (!url) return;

    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);

      setTimeout(() => {
        setCopied(false);
      }, 2000);
    } catch (error) {
      console.error("Copy failed:", error);
    }
  };

  const handleNativeShare = async () => {
    const url = getBlogUrl();

    if (!url || !navigator.share) return;

    try {
      await navigator.share({
        title: Blog?.title || "Blog",
        text: Blog?.description || Blog?.title || "",
        url,
      });
    } catch (error) { }
  };

  const shareUrl =
    typeof window !== "undefined" ? window.location.href : "";

  const encodedUrl = encodeURIComponent(shareUrl);
  const encodedTitle = encodeURIComponent(Blog?.title || "");

  return (
    <>
      <div className="hbx-premium-blog-detail">

        {/* =========================
            FEATURED IMAGE
        ========================== */}
        <div className="blog-image-wrapper">
          {Blog?.blog_thumbnail?.original_url ? (
            <Image
              height={700}
              width={1500}
              src={Blog.blog_thumbnail.original_url}
              loading="lazy"
              className="img-fluid"
              alt={Blog?.title || "Blog Image"}
            />
          ) : null}
        </div>

        {/* =========================
        TITLE + META
    ========================== */}
        <div className="blog-header">
          <BlogImageDetails Blog={Blog} />
        </div>

        <div className="hbx-mobile-toc-wrapper">
          {mobileToc}
        </div>

        {/* =========================
        MOBILE TABLE OF CONTENTS
    ========================== */}

        {/* =========================
        BLOG CONTENT
    ========================== */}
        <article className="hbx-blog-content">
          <div
            className="hbx-blog-content-inner"
            dangerouslySetInnerHTML={{
              __html: Blog?.content || "",
            }}
          />
        </article>

      </div>
    </>
  );
};

export default BlogCardDetails;