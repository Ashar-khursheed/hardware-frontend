"use client";

import NoDataFound from "@/Components/Widgets/NoDataFound";
import { placeHolderImage } from "@/Components/Widgets/Placeholder";
import request from "@/Utils/AxiosUtils";
import { BlogAPI } from "@/Utils/AxiosUtils/API";
import { showMonthWiseDateAndTime } from "@/Utils/CustomFunctions/DateFormate";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect } from "react";
import { useTranslation } from "react-i18next";

const RecentPost = ({
  currentSlug,
  title = "Related Blogs",
  limit = 3,
}) => {

  const {
    data: blogState,
    isLoading,
    refetch,
  } = useQuery(
    [BlogAPI, currentSlug],
    () =>
      request({
        url: BlogAPI,
        params: {
          paginate: 10,
        },
      }),
    {
      enabled: false,
      refetchOnWindowFocus: false,
      select: (res) => res?.data?.data,
    }
  );

  useEffect(() => {
    refetch();
  }, [refetch]);

  const { t } = useTranslation("common");

  const relatedBlogs =
    blogState
      ?.filter((blog) => blog?.slug !== currentSlug)
      ?.slice(0, limit) || [];

  return (
    <section className="hbx-related-blogs">

      <div className="hbx-related-heading">
        <span />
        <h2>{title}</h2>
        <span />
      </div>

      {isLoading ? (
        <div className="hbx-related-loading">
          Loading...
        </div>
      ) : relatedBlogs?.length > 0 ? (

        <div className="hbx-related-grid">

          {relatedBlogs.map((blog, index) => (

            <article
              className="hbx-related-card"
              key={blog?.id || index}
            >

              <Link href={`/blog/${blog?.slug}`}>

                <div className="hbx-related-image">

                  <Image
                    height={220}
                    width={360}
                    className="img-fluid"
                    src={
                      blog?.blog_thumbnail?.original_url ||
                      placeHolderImage
                    }
                    alt={blog?.thumbnail_alt || blog?.title || "Related Blog"}
                  />

                </div>

                <div className="hbx-related-content">

                  <span className="hbx-related-date">
                    {showMonthWiseDateAndTime(blog?.created_at)}
                  </span>

                  <h3>
                    {blog?.title}
                  </h3>

                  <span className="hbx-read-more">
                    Read More →
                  </span>

                </div>

              </Link>

            </article>

          ))}

        </div>

      ) : (
        <NoDataFound
          customClass="bg-light no-data-added"
          title="no_blog"
        />
      )}

    </section>
  );
};

export default RecentPost;