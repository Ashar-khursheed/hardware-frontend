import React, { useContext, useEffect } from "react";
import Head from "next/head";
import { Container, Row, Col } from "reactstrap";

import ProductIdsContext from "@/Context/ProductIdsContext";
import BrandIdsContext from "@/Context/BrandIdsContext";
import BlogIdsContext from "@/Context/BlogIdsContext";

import useCustomDataQuery from "@/Utils/Hooks/useCustomDataQuery";
import { horizontalProductSlider5 } from "@/Data/SliderSetting";

import WrapperComponent from "@/Components/Widgets/WrapperComponent";
import TitleBox from "@/Components/Widgets/Title";
import HomeProduct from "@/Components/Themes/Widgets/HomeProduct";
import HomeProductTab from "@/Components/Themes/Widgets/HomeProductTab";
import HomeBrand from "@/Components/Themes/Widgets/HomeBrand";
import HomeService from "@/Components/Themes/Widgets/HomeService";
import HomeFourColumnProduct from "@/Components/Themes/Widgets/HomeFourColumnProduct";
import HomeParallaxBanner from "@/Components/Themes/Widgets/HomeParallaxBanner";
import HomeBlog from "@/Components/Themes/Widgets/HomeBlog";

// New Components
import HomeBanner from "./HomeBanner";
import ShippingBar from "./ShippingBar";
import PromoBanner from "./PromoBanner";
import HardwareBenefits from "./HardwareBenefits";
import SkeletonHomepage from "./SkeletonHomepage";

import ImageLink from "@/Components/Widgets/ImageLink";
import { Href, storageURL } from "@/Utils/Constants";
import { useSkeletonLoader2 } from "@/Utils/Hooks/useSkeleton2";
import Image from "next/image";
import Link from "next/link";
import HomeCategorySidebar from "@/Components/Themes/Widgets/HomeCategorySidebar";
import HomeServices from "@/Components/Themes/Widgets/HomeService";
import HomeSlider from "@/Components/Themes/Widgets/HomeSlider";


const ElectronicsThree = () => {
  const { data, refetch, isLoading } = useCustomDataQuery({ params: "electronics_three" });
  const { setGetProductIds, isRefetching: productLoad } = useContext(ProductIdsContext);
  const { isLoading: brandLoading } = useContext(BrandIdsContext);
  const { isLoading: blogLoading } = useContext(BlogIdsContext);

  useEffect(() => {
    if (data) {
      const allProductIds = [
        ...(data?.products_ids || []),
        ...(data?.products_list_1?.product_ids || []),
        ...(data?.category_product_1?.products?.product_ids || []),
        ...(data?.category_product_2?.products?.product_ids || []),
        ...(data?.category_product_3?.products?.product_ids || []),
      ];

      const uniqueIds = Array.from(new Set(allProductIds.filter(id => id !== null && id !== undefined)));
      if (uniqueIds.length > 0) {
        setGetProductIds({ ids: uniqueIds.join(",") });
      }
    }
  }, [data]);

  useEffect(() => {
    refetch();
  }, [isLoading]);

  useEffect(() => {
    document.body.classList.add("home");
    return () => {
      document.body.classList.remove("home");
    };
  }, []);

  useSkeletonLoader2([productLoad, blogLoading, brandLoading]);

  // Show skeleton if loading OR if data is not yet available
  if ((isLoading || !data) && typeof window !== 'undefined') return <SkeletonHomepage />;

  return (
    <>
      <Head>
        <link rel="stylesheet" href="/assets/css/style.css" />
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.1/font/bootstrap-icons.css"></link>
      </Head>

      <>
        <style jsx>{`
     .home-slider-section {
       width: 100%;
       position: relative;
       overflow: hidden;
     }

     .home-slider {
       width: 100%;
       position: relative;
     }

     :global(.responsive-slider) {
       position: absolute;
       top: 0;
       left: 0;
       width: 100%;
       height: 100%;
     }

     :global(.responsive-slider img) {
       width: 100%;
       height: 100%;
       object-fit: cover;
       display: block;
     }

     :global(.responsive-slider .slide-content),
     :global(.responsive-slider .banner-content),
     :global(.responsive-slider .slider-item) {
       width: 100%;
       height: 100%;
       padding: 2rem;
       display: flex;
       flex-direction: column;
       justify-content: center;
       align-items: center;
       box-sizing: border-box;
       text-align: center;
       background: rgba(0, 0, 0, 0.3); /* Optional overlay for contrast */
     }

     :global(.responsive-slider h1),
     :global(.responsive-slider .banner-title) {
       font-size: clamp(1.5rem, 4vw, 3rem);
       line-height: 1.2;
       margin-bottom: 1rem;
       color: #fff;
       word-break: break-word;
     }

     :global(.responsive-slider p),
     :global(.responsive-slider .banner-description) {
       font-size: clamp(0.9rem, 2.5vw, 1.1rem);
       line-height: 1.4;
       margin-bottom: 1.5rem;
       color: #fff;
     }

     :global(.responsive-slider .btn),
     :global(.responsive-slider button) {
       font-size: clamp(0.85rem, 2vw, 1rem);
       padding: 0.75rem 1.5rem;
       background-color: #0044cc;
       color: white;
       border: none;
       cursor: pointer;
       margin-top: 1rem;
     }

     @media (max-width: 1024px) {
       .home-slider {
         aspect-ratio: 4 / 2;
         padding-top: 0%;
       }
     }

     @media (max-width: 768px) {
       .home-slider {
         aspect-ratio: 0;
         padding-top: 0%;
       }

       :global(.responsive-slider .slide-content),
       :global(.responsive-slider .banner-content),
       :global(.responsive-slider .slider-item) {
         padding: 1.5rem 1rem;
       }

       :global(.responsive-slider .swiper-button-next),
       :global(.responsive-slider .swiper-button-prev) {
         display: none;
       }

       :global(.responsive-slider .swiper-pagination) {
         bottom: 10px;
       }
     }

     @media (max-width: 480px) {
       .home-slider {
         aspect-ratio: 0;
         padding-top: 0%;
       }
       .bg-img.w-100.img-fluid img {
         height:500px !important;
         }

       :global(.responsive-slider h1),
       :global(.responsive-slider .banner-title) {
         font-size: clamp(1.25rem, 5vw, 2rem);
         margin-bottom: 0.75rem;
       }

       :global(.responsive-slider p),
       :global(.responsive-slider .banner-description) {
         font-size: clamp(0.8rem, 3vw, 0.95rem);
         margin-bottom: 1rem;
       }

       :global(.responsive-slider .btn),
       :global(.responsive-slider button) {
         font-size: 0.9rem;
         padding: 0.6rem 1.2rem;
       }
     }

     /* Header logo fix for small screens */
     @media (max-width: 480px) {
       .site-header .logo img,
       .site-header .logo {
         max-width: 120px;
         height: auto;
         object-fit: contain;
         overflow: hidden;
       }
     }

     body,
     html {
       margin: 0;
       padding: 0;
     }
   `}</style>
      </>




      <section className="hero-banner-section mt-0 text-white mb-5 d-flex align-items-center">
        <div className="container">
          <div className="row">
            <div className="col-md-7 hbx-animate-up hbx-delay-1">
              <h2 className="fw-bold text-white mb-3">
                Can’t Find Computer Parts? <br /> We’ve Got You Covered
              </h2>
              <p className="mb-4 text-white">
                At Hardware Box, we are dealing with the sourcing of high-quality computer hardware and networking equipment to businesses, IT professionals, and system builders.
              </p>
              <Link href="/category/switches" className="btn ">
                Shop Now
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Services */}
      {/* {data?.services && (
        <WrapperComponent classes={{ sectionClass: "service-w-bg pt-0 tools-service", fluidClass: "container" }} noRowCol={true}>
          <HomeServices services={data?.services?.banners} />
        </WrapperComponent>
      )} */}

      {/* Product List 1 */}
      {data?.products_list_1?.status && (
        <>
          <WrapperComponent
            classes={{ sectionClass: "section-b-space ratio_square no-arrow", fluidClass: "container" }}
            colProps={{ xs: "12" }}
          >
            <TitleBox type="icon" title={data?.products_list_1} />
            <div className="custom-slick-wrapper hbx-animate-up hbx-delay-2">
              <HomeProduct
                productIds={data?.products_list_1?.product_ids}
                slider={true}
                sliderOptions={horizontalProductSlider5}
                style="vertical"
              />
            </div>
          </WrapperComponent>
        </>
      )}

      {/* airpods and gaming laptop sec */}
      <section className="py-5 bg-white section-b-space max-height-220">
        <div className="container p-3 ">
          <div className="row ">

            <div className="col-md-6 mb-4">
              <div className="promo-banner-card border rounded bg-light h-100 overflow-hidden">
                <div className="row align-items-center h-100 g-0">
                  <div className="col-7 p-4">
                    <p className="mb-1 text-muted small text-uppercase fw-bold">
                      Weekend <span className="text-primary">Offer</span>
                    </p>
                    <h3 className="text-black mb-3 h4 fw-bold">Premium CPU Processors</h3>
                    <Link href="/category/cpus-processors" className="btn btn-primary btn-sm px-3 py-2">
                      SHOP NOW &rarr;
                    </Link>
                  </div>
                  <div className="col-5">
                    <img
                      src="/assets/images/airpodsnew.webp"
                      alt="Premium CPU Processors"
                      className="img-fluid w-100 h-100 object-fit-contain"
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="col-md-6 mb-4">
              <div className="promo-banner-card border rounded bg-light h-100 overflow-hidden">
                <div className="row align-items-center h-100 g-0">
                  <div className="col-7 p-4">
                    <p className="mb-1 text-muted small text-uppercase fw-bold">
                      Limited <span className="text-primary">Deal</span>
                    </p>
                    <h3 className="text-black mb-3 h4 fw-bold">High-Performance Network Routers</h3>
                    <Link href="/category/networking-devices" className="btn btn-primary btn-sm px-3 py-2">
                      BROWSE &rarr;
                    </Link>
                  </div>
                  <div className="col-5">
                    <img
                      src="/assets/images/airpodtwo.webp"
                      alt="High-Performance Network Routers"
                      className="img-fluid w-100 h-100 object-fit-contain"
                    />
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Brands */}
      {data?.brand?.status && (
        <section className="section-b-space blog-wo-bg p-0">
          <Container>
            <div className="row">
              <div className="col-12">
                <HomeBrand brandIds={data?.brand?.brand_ids} />
              </div>
            </div>
          </Container>
        </section>
      )}

      {/* reviews section */}
      <section className="py-5 pt-3 mt-4 mb-4 bg-light section-b-space">
        <div className="container">
          <div className="row align-items-center mb-4">
            <div className="col-md-6">
              <h3 className="text-black ps-2">CUSTOMER REVIEWS </h3>
            </div>
            <div className="col-md-6 mobhide text-md-end d-flex justify-content-end gap-3 text-center">
              <div>
                <span className="fw-bold me-2">Excellent</span>
                <img src="/assets/images/reviewshead.png" alt="Google" />
              </div>
              <div>
                <span className="me-2">540 reviews on</span>
                <img src="/assets/images/reviewsgoogle.png" alt="Google" height="20" />
              </div>
            </div>
          </div>

          <div className="row g-4">
            {[
              {
                name: "Michael Carter",
                role: "IT Infrastructure Manager",
                text: "Hardware Box assisted us in procurement of enterprise SSD drives which were highly inaccessible in other directions. There was no trouble with the ordering, it was delivered in a shorter time and the goods were just as they are said to be. They also assisted us in determining that they were compatible with our servers, which saved us a lot of time."
              },
              {
                name: "Daniel Brooks",
                role: "System Integrator",
                text: "I have been buying networking elements and processors in regular basis to our projects on system integration and Hardware Box has emerged as one of our most trusted suppliers. Their stocks are admirable and their prices are very competitive with other hardware sellers on internet."
              },
              {
                name: "Sarah Mitchell",
                role: "Data Center Administrator",
                text: "We have had to upgrade our data center by refurbishing the storage drives without overshooting budget. Hardware Box was supplying good quality refurbished hardware that could work like new. They had very good quality and packaging."
              },
              {
                name: "Robert Chen",
                role: "Network Engineer",
                text: "It is sometimes tedious to come up with compatible server components, but Hardware Box has simplified the process. Their team informed us on the process of choosing the appropriate hardware and made it arrive safely and in time."
              }
            ].map((review, index) => (
              <div className="col-md-6 col-lg-3" key={index}>
                <div className="p-3 border rounded bg-white h-100 d-flex flex-column justify-content-between reviewscol">
                  <div>
                    <img className="mb-2" src="/assets/images/revieewstar.png" alt="Rating" />
                    <p className="text-muted small mb-0 reviewtext">
                      "{review.text}"
                    </p>
                  </div>
                  <div className="d-flex align-items-center mt-3">
                    <img
                      src="/assets/images/review.png"
                      alt={review.name}
                      width="40"
                      height="40"
                      className="rounded-circle me-2"
                    />
                    <div>
                      <div className="fw-bold">{review.name}</div>
                      <div className="text-muted small">{review.role}</div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Category Products 2 */}
      {data?.category_product_2?.status && (
        <WrapperComponent classes={{ sectionClass: "ratio_square p-0 m-0 bg-title wo-bg category-tab-section section-b-space", fluidClass: "container" }} noRowCol={true}>
          <Row>
            <Col>
              <HomeProductTab style="vertical" tabStyle="simple" title={data?.category_product_2} classes="row row-cols-xxl-5 row-cols-xl-5 row-cols-md-3 row-cols-2 g-sm-4 g-3" paginate={5} categoryIds={data?.category_product_2?.category_ids} />
            </Col>
          </Row>
        </WrapperComponent>
      )}

      {/* About uss Section */}
      <section className="about d-flex align-items-center section-b-space" style={{
        backgroundImage: 'url("/assets/images/warehouse-bg.jpg")',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        position: 'relative'
      }}>
        <div className="container">
          <div className="row align-items-center">

            {/* Left Content */}
            <div className="col-lg-6 text-white z-2">
              <h2 className="display-5  size-28">
                Hardware Box Overview<br />
              </h2>
              <p className="mt-3">
                Hardware Box is a reliable online shop in selling computer parts, networking devices and enterprise IT hardware. Our vision is to make the sourcing of good technology products to businesses, system integrators, and IT professionals to be an easy task. Having access to a worldwide network of suppliers and an ever-growing inventory, we supply all storage devices and processors, as well as networking switches and server components. We are a trusted supplier of all your hardware requirements as we are quality-oriented, fast, and offer competitive prices.
              </p>
              {/* <Link href="/category/all" className="btn btn-warning fw-semibold px-4 py-2 mt-4">
                Explore More
              </Link> */}
            </div>

            {/* Right Image */}
            <div className="col-lg-6 text-end mt-3">
              <img
                src="/assets/images/aboutnew.webp"  // Replace with your image path
                alt="Warehouse Worker with Tablet"
                className="img-fluid "
                style={{ maxHeight: '600px', objectFit: 'contain' }}
              />
            </div>

          </div>
        </div>

        {/* Optional overlay for dark gradient effect */}
        <div className="hero-overlay"></div>
      </section>

      <section className="py-5 bg-light section-b-space">
        <div className="container">
          <div className="row align-items-start">

            {/* Left Column – Direct Macro Benefits */}
            <div className="col-lg-4 mb-4 mb-lg-0 p-4 p-lg-0">
              <h3 className=" mb-4 text-black">HARDWARE BOX BENEFITS</h3>

              {/* Benefit Items */}
              <div className="d-flex mb-3">
                <div className="me-3">
                  <div className="colorful">
                    <img src="/assets/images/new2.png" alt="Save" width="60" />
                  </div>
                </div>
                <div>
                  <h5 className="fw-bold mb-1">FREE SHIPPING ON SELECT ORDERS</h5>
                  <p className="mb-0 small text-muted">Rapid delivery available</p>
                </div>
              </div>

              <div className="d-flex mb-3">
                <div className="me-3">
                  <div className="colorful">
                    <img src="/assets/images/BiJKSR.png" alt="Genuine Products" width="60" />
                  </div>
                </div>
                <div>
                  <h5 className="fw-bold mb-1">SECURE PAYMENTS</h5>
                  <p className="mb-0 small text-muted">100% protected checkout</p>
                </div>
              </div>

              <div className="d-flex mb-3">
                <div className="me-3">
                  <div className="colorful">
                    <img src="/assets/images/voyGMG.png" alt="Genuine Products" width="60" />
                  </div>                  </div>
                <div>
                  <h5 className="fw-bold mb-1">EASY RETURNS</h5>
                  <p className="mb-0 small text-muted">Hassle-free process</p>
                </div>
              </div>

              <div className="d-flex mb-3">
                <div className="me-3">
                  <div className="colorful">
                    <i className="ri-customer-service-2-line fs-1 text-primary"></i>
                  </div>
                </div>
                <div>
                  <h5 className="fw-bold mb-1">24/7 CUSTOMER SUPPORT</h5>
                  <p className="mb-0 small text-muted">We are here to help</p>
                </div>
              </div>
            </div>

            {/* Right Column – SAM & D&B */}
            <div className="col-lg-8">
              <div className="bg-white border p-4 h-100">
                <div className="row d-flex">
                  {/* SAM Info */}
                  <div className="col-md-6 d-flex align-items-center border-end    ">
                    <div className="row gap-3">

                      <div className="d-flex align-items-center gap-4">
                        <img src="/assets/images/new1.png" alt="Government" className="" height="60" />
                        <h4 className=" text-black">Government Agencies</h4>
                      </div>
                      <div className="d-flex align-items-center gap-4">
                        <img src="/assets/images/sam_logo_badge.png" alt="SAM Logo" className="" height="60" width="60" />
                        <h4 className=" text-black">SAM Registered</h4>
                      </div>
                      <div className="d-flex align-items-center gap-4">
                        <img src="/assets/images/Banking.png" alt="Banking" className="" height="60" />
                        <h4 className=" text-black">Banking & Financial Services</h4>
                      </div>
                      <div className="d-flex align-items-center gap-4">
                        <img src="/assets/images/Education.png" alt="Education" className="" height="60" />
                        <h4 className=" text-black">Universities & Research Institutions</h4>
                      </div>

                    </div>

                  </div>


                  {/* D&B Info */}
                  <div className="col-md-6 p-3  text-center text-md-start">
                    {/* <img src="/assets/images/benefitsec5.webp" alt="D&B Logo" className="mb-5" height="60" /> */}
                    <h3 className=" text-black">D&B Rating</h3>
                    <p className="small mb-1">
                      D-U-N-S® Number is: <span className="text-orange fw-semibold">117396845</span>
                    </p>
                    <p className="small text-muted mb-0">
                      Hardware Box is committed to delivering high-quality computer accessories and dependable service. Our Dun & Bradstreet profile reflects our credibility, financial stability, and trusted presence in the technology supply industry.
                    </p>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>


      {/* we are expert section */}


      <section className="py-5 section-b-space" style={{ backgroundColor: "#ffe4e4" }}>
        <div className="container">
          <div className="row mb-4">
            <div className="col-12">
              <h2 className="" style={{ color: "#ff5050" }}>
                Experts in New & Refurbished IT <br /> Hardware Solutions
              </h2>
            </div>
          </div>

          <div className="row">
            <div className="col-md-4 mb-4">

              <h4 className="text-black">
                How Quickly Can We Deliver Your IT Hardware?
              </h4>
              <p className="text-muted">
                As quickly as your business needs it. Hardware Box is a company that offers quality and prompt delivery services to get your IT equipment delivered at the right time. You can either require an urgent replacement or hardware to upgrade an existing one, our logistical network provides safe and timely deliveries.
              </p>
            </div>

            <div className="col-md-4 mb-4">
              <h4 className="text-black">
                Looking for Hard-to-Find Computer Hardware?
              </h4>
              <p className="text-muted">
                Hardware Box gives you access to a wide inventory of computer components, server parts, storage drives, and networking equipment. Our sourcing network will find you what you need when you need it, whether that is the most popular hardware, or something that is no longer being made.
              </p>
            </div>

            <div className="col-md-4 mb-4">
              <h4 className=" text-black">
                Are Refurbished IT Components Reliable?
              </h4>
              <p className="text-muted">
                Absolutely. All the refurbished products at Hardware Box are inspected and tested to the maximum to guarantee high performance and reliability. Our quality control system is such that every part of the infrastructure is of professional quality, so you can upgrade your infrastructure without fear of incurring costs.
              </p>
            </div>
          </div>
        </div>
      </section>


      {/* blog section */}


      <section className="py-5 bg-white section-b-space">
        <div className="container">
          <div className="d-flex justify-content-between align-items-center mb-4">
            <h3 className=" mb-0 text-black">RECENT BLOG POSTS</h3>
            <Link href="/blog" className="text-decoration-none fw-semibold">
              View All
            </Link>
          </div>

          <div className="row">
            {/* Blog Post 1 */}
            <div className="col-md-4 mb-4">
              <div className="card h-100 border-0 shadow-sm">
                <img
                  src="/assets/images/blog1.webp" // Replace with actual path
                  alt="Blog 1"
                  className="card-img-top"
                />
                <div className="card-body">
                  <h4 className="text-muted small">Buying Guides , SSDs , Storage Devices</h4>
                  <h5 className=" text-black">
                    Kioxia Unveils 245.76TB SSD That Can Store 3 Years of 4K Video on a Single Drive! A New Standard for AI & Cloud Giants
                  </h5>
                </div>
              </div>
            </div>

            {/* Blog Post 2 */}
            <div className="col-md-4 mb-4">
              <div className="card h-100 border-0 shadow-sm">
                <img
                  src="/assets/images/blog2.webp" // Replace with actual path
                  alt="Blog 2"
                  className="card-img-top"
                />
                <div className="card-body">
                  <h4 className="text-muted small">Server Hard Drives , Storage Devices</h4>
                  <h5 className=" text-black">
                    Server HDD vs SSD: Which Storage Drive is Best for Your Server?
                  </h5>
                </div>
              </div>
            </div>

            {/* Blog Post 3 */}
            <div className="col-md-4 mb-4">
              <div className="card h-100 border-0 shadow-sm">
                <img
                  src="/assets/images/blog3.webp" // Replace with actual path
                  alt="Blog 3"
                  className="card-img-top"
                />
                <div className="card-body">
                  <h4 className="text-muted small">Buying Guides , SSDs</h4>
                  <h5 className=" text-black">
                    Internal SSD vs External SSD – Which Type is Best for Gamers, Creators and Power Users?
                  </h5>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>



      {/* contact us to get invite section */}


      <section className="p-0 contactustoget section-b-space">
        <div className="container heightcus py-1 px-3 my-1"
          style={{
            height: "175px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            // backgroundColor: "#3a1c71", // Deep purple tone
            backgroundImage: "url('/assets/images/newbannerimg.webp')", // Replace with your background image
            backgroundSize: "cover",
            objectFit: "cover",
            backgroundPosition: "center",
            borderRadius: "10px",
          }}

        >
          <div className="container p-3">
            <div className="row align-items-center justify-content-between">
              <div className="col-md-8 mb-3 mb-md-0">
                <h3 className="text-white fw-bold mb-0">
                  Get Expert Advice for Your IT Hardware Needs
                </h3>
              </div>
              <div className="col-md-4 text-md-end">
                <a
                  href="#contact" // Change to your actual link
                  className="btn fw-bold"
                  style={{
                    backgroundColor: "#ff6600",
                    color: "#fff",
                    padding: "12px 20px",
                    borderRadius: "4px",
                    border: "none !important",

                    textTransform: "uppercase",
                    fontSize: "14px",
                  }}
                >
                  Request Bulk Quote
                </a>
              </div>
            </div>
          </div>
        </div>
      </section >
      {/* request a quote section  */}


      {/* contact section */}
      <section className="pt-5 bg-white section-b-space">
        <div className="container">
          <div className="row align-items-center g-4">
            {/* Left: Contact Info */}
            <div className="col-md-4">
              <h3>
                <span className="contactjoin fw-bold text-black">Contact</span> &amp; Partner <br />with Us
              </h3>
              <div className="mt-4">
                <div className="d-flex align-items-start mb-4">
                  <div className="me-3">
                    <div className="location">
                      {/* <i className="bi bi-geo-alt-fill"></i> */}
                      <img src="/assets/images/phoneimg.png" className="locationimg" alt="Location" />
                    </div>
                  </div>
                  <div>
                    <h4 className="fw-bold text-black mb-1">Office Address</h4>
                    <p className="text-muted mb-0">5900 Balcones Drive # 22288<br />Austin, TX 78731</p>
                  </div>
                </div>

                <div className="d-flex align-items-center mb-4">
                  <div className="me-3">
                    <div className="phone">
                      <img src="/assets/images/phone2.png" className="locationimg" alt="Phone" />
                    </div>
                  </div>
                  <div>
                    <h4 className="fw-bold text-black mb-1">Phone Number</h4>
                    <p className="text-muted mb-0">
                      <a href="tel:+18328835303">(+1) 832 8835303</a>
                    </p>

                  </div>
                </div>

                <div className="d-flex align-items-center">
                  <div className="me-3">
                    <div className="email">
                      <img src="/assets/images/email.png" className="locationimg" alt="Email" />
                    </div>
                  </div>
                  <div>
                    <h4 className="fw-bold text-black mb-1">Email Address</h4>
                    <p className="text-muted mb-0">
                      <a href="mailto:hello@hardwarebox.com">hello@hardwarebox.com</a>
                    </p>

                  </div>
                </div>
              </div>
            </div>

            {/* Center: Image */}
            <div className="col-md-4 text-start">
              <img
                src="/assets/images/contactsec.png" // replace with actual path
                alt="Contact Person"
                className="img-fluid contactimg3"
              />
            </div>

            {/* Right: Contact Form */}
            <div className="col-md-4">
              <div className="p-4 border rounded">
                <h3 className="fw-bold text-center mb-3">Get In Touch</h3>
                <p className="text-muted text-center small mb-4">
                </p>
                <form>
                  <div className="mb-3">
                    <input type="text" className="form-control" placeholder="Enter Your Name*" />
                  </div>
                  <div className="mb-3">
                    <input type="email" className="form-control" placeholder="Enter Your Email Id*" />
                  </div>
                  <div className="mb-3">
                    <textarea className="form-control" rows="3" placeholder="Enter Your Message*" />
                  </div>
                  <button type="submit" className="btn btn-primary w-100 fw-semibold">
                    SUBMIT A MESSAGE
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default ElectronicsThree;
