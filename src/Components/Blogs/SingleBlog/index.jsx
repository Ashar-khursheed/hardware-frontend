"use client";

import WrapperComponent from "@/Components/Widgets/WrapperComponent";
import Loader from "@/Layout/Loader";
import request from "@/Utils/AxiosUtils";
import { BlogAPI } from "@/Utils/AxiosUtils/API";
import Breadcrumbs from "@/Utils/CommonComponents/Breadcrumb";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import React, { useEffect, useMemo, useState } from "react";
import { Col } from "reactstrap";

import BlogCardDetails from "../BlogCardDetails";
import Sidebar from "../Sidebar/Sidebar";
import RecentPost from "../Sidebar/RecentPost";


// ======================================================
// TABLE OF CONTENTS
// ======================================================

const TableOfContents = ({ content }) => {
  const [headings, setHeadings] = useState([]);

  useEffect(() => {
    if (!content) {
      setHeadings([]);
      return;
    }

    // Give React time to render BlogCardDetails content
    const timer = setTimeout(() => {
      const contentArea = document.querySelector(
        ".hbx-blog-content-inner"
      );

      if (!contentArea) {
        setHeadings([]);
        return;
      }

      const foundHeadings = [];

      // ==================================================
      // 1. REAL H2 / H3 HEADINGS
      // ==================================================

      contentArea.querySelectorAll("h2, h3").forEach((el) => {
        const text = el.textContent?.trim();

        if (!text) return;

        foundHeadings.push({
          element: el,
          text: text.replace(/:$/, ""),
          level: el.tagName.toLowerCase(),
        });
      });


      // ==================================================
      // 2. CKEDITOR BOLD SECTION HEADINGS
      //
      // Your current blog uses:
      //
      // <strong>Internal SSD:</strong><br>
      // content...
      // <br><br>
      // <strong>External SSD:</strong><br>
      // content...
      // <br><br>
      // <strong>Which One Should You Choose?</strong>
      //
      // ==================================================

      contentArea
        .querySelectorAll("strong, b")
        .forEach((el) => {

          const text = el.textContent?.trim();

          if (!text) return;

          const previous = el.previousSibling;
          const next = el.nextSibling;

          const previousIsBr =
            previous &&
            previous.nodeType === 1 &&
            previous.tagName.toLowerCase() === "br";

          const nextIsBr =
            next &&
            next.nodeType === 1 &&
            next.tagName.toLowerCase() === "br";


          /*
           * Section heading if:
           *
           * <strong>Heading</strong><br>
           *
           * OR
           *
           * <br><strong>Heading</strong>
           *
           * This means:
           *
           * Internal SSD          -> YES
           * External SSD          -> YES
           * Which One Should...   -> YES
           *
           * Gamers & Power Users  -> NO
           * Content Creators...   -> NO
           */

          if (!previousIsBr && !nextIsBr) {
            return;
          }


          // Don't add duplicate
          const alreadyExists = foundHeadings.some(
            (item) =>
              item.text.toLowerCase() ===
              text.replace(/:$/, "").toLowerCase()
          );

          if (alreadyExists) {
            return;
          }


          foundHeadings.push({
            element: el,
            text: text.replace(/:$/, ""),
            level: "h2",
          });
        });


      // ==================================================
      // SORT HEADINGS BY THEIR ACTUAL POSITION
      // ==================================================

      foundHeadings.sort((a, b) => {
        const position = a.element.compareDocumentPosition(
          b.element
        );

        if (
          position &
          Node.DOCUMENT_POSITION_FOLLOWING
        ) {
          return -1;
        }

        return 1;
      });


      // ==================================================
      // REMOVE DUPLICATES
      // ==================================================

      const uniqueHeadings = [];

      foundHeadings.forEach((heading) => {
        const exists = uniqueHeadings.some(
          (item) =>
            item.text.toLowerCase() ===
            heading.text.toLowerCase()
        );

        if (!exists) {
          uniqueHeadings.push(heading);
        }
      });


      // ==================================================
      // ADD IDS
      // ==================================================

      uniqueHeadings.forEach((heading, index) => {

        heading.element.id =
          `blog-heading-${index}`;

        heading.element.style.scrollMarginTop =
          "100px";
      });


      setHeadings(uniqueHeadings);

    }, 100);

    return () => clearTimeout(timer);

  }, [content]);


  // ==================================================
  // SCROLL TO HEADING
  // ==================================================

  const handleClick = (index) => {

    const target =
      document.getElementById(
        `blog-heading-${index}`
      );

    if (!target) return;

    target.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };


  // ==================================================
  // NO TOC
  // ==================================================

  if (!headings.length) {
    return null;
  }


  // ==================================================
  // TOC UI
  // ==================================================

  return (
    <div className="hbx-table-of-contents hbx-mobile-toc">

      <div className="hbx-toc-heading">
        <span className="hbx-toc-line"></span>

        <span>
          Table of Contents
        </span>
      </div>


      <div className="hbx-toc-list">

        {headings.map((heading, index) => (

          <button
            type="button"
            key={`toc-${index}`}
            className={`hbx-toc-item ${heading.level}`}
            onClick={() => handleClick(index)}
          >

            <span className="hbx-toc-number">
              {String(index + 1).padStart(2, "0")}
            </span>

            <span className="hbx-toc-text">
              {heading.text}
            </span>

          </button>

        ))}

      </div>

    </div>
  );
};

// ======================================================
// FLOATING SOCIAL SHARE
// ======================================================

const FloatingShare = ({ Blog }) => {

  const [url, setUrl] = useState("");

  useEffect(() => {
    setUrl(window.location.href);
  }, []);

  if (!url) return null;

  const encodedUrl = encodeURIComponent(url);
  const encodedTitle = encodeURIComponent(
    Blog?.title || ""
  );

  return (
    <div className="hbx-floating-share">

      <span className="hbx-share-label">
        Share
      </span>

      <a
        href={`https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`}
        target="_blank"
        rel="noopener noreferrer"
        className="facebook"
        aria-label="Share on Facebook"
      >
        f
      </a>

      <a
        href={`https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`}
        target="_blank"
        rel="noopener noreferrer"
        className="twitter"
        aria-label="Share on X"
      >
        𝕏
      </a>

      <a
        href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`}
        target="_blank"
        rel="noopener noreferrer"
        className="linkedin"
        aria-label="Share on LinkedIn"
      >
        in
      </a>

      <a
        href={`https://wa.me/?text=${encodedTitle}%20${encodedUrl}`}
        target="_blank"
        rel="noopener noreferrer"
        className="whatsapp"
        aria-label="Share on WhatsApp"
      >
        W
      </a>

    </div>
  );
};


// ======================================================
// SINGLE BLOG
// ======================================================

const SingleBlog = ({ params }) => {

  const {
    data: Blog,
    isLoading,
  } = useQuery(
    [params],
    () =>
      request({
        url: `${BlogAPI}/slug/${params}`,
      }),
    {
      enabled: true,
      refetchOnWindowFocus: false,
      select: (res) => res?.data,
    }
  );


  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <>

          {/* =================================================
              FULL WIDTH BLOG BANNER
          ================================================= */}

          <section className="hbx-blog-banner">

            {Blog?.blog_thumbnail?.original_url && (

              <div className="hbx-blog-banner-media">

                <Image
                  src={Blog.blog_thumbnail.original_url}
                  alt={Blog?.title || "Blog Banner"}
                  fill
                  priority
                  sizes="100vw"
                  className="hbx-blog-banner-image"
                />

              </div>

            )}

          </section>


          {/* =================================================
              BREADCRUMB
          ================================================= */}

          <div className="hbx-blog-breadcrumb">

            <div className="hbx-1376-container">

              <Breadcrumbs
                title={Blog?.title}
                subNavigation={[
                  {
                    name: "Blog",
                    link: "/blog",
                  },
                  {
                    name: Blog?.title,
                  },
                ]}
              />

            </div>

          </div>


          {/* =================================================
              FLOATING SHARE
          ================================================= */}

          <FloatingShare Blog={Blog} />


          {/* =================================================
              MAIN BLOG AREA
          ================================================= */}

          <main className="hbx-single-blog-wrapper">

            <div className="hbx-1376-container">

              <div className="hbx-blog-layout">


                {/* =========================================
                    LEFT - BLOG
                ========================================== */}

                <article className="hbx-blog-main">
                  <BlogCardDetails
                    Blog={Blog}
                    key={params}
                    mobileToc={<TableOfContents content={Blog?.content} />}
                  />

                </article>


                {/* =========================================
                    RIGHT - TOC + SIDEBAR
                ========================================== */}

                <aside className="hbx-blog-right">

                  <div className="hbx-blog-right-sticky">

                    {/* TOC */}

                    <div className="hbx-desktop-toc">
                      <TableOfContents content={Blog?.content} />
                    </div>

                    {/* Category + Tags */}
                    <Sidebar
                      isLoading={isLoading}
                    />

                  </div>

                </aside>

              </div>


              {/* =========================================
                  RELATED BLOGS
              ========================================== */}

              <RecentPost
                currentSlug={Blog?.slug}
                title="Related Blogs"
                limit={3}
              />

            </div>

          </main>

        </>
      )}
    </>
  );
};

export default SingleBlog;