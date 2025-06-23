import ImageLink from "@/Components/Widgets/ImageLink";
import TitleBox from "@/Components/Widgets/Title";
import WrapperComponent from "@/Components/Widgets/WrapperComponent";
import BlogIdsContext from "@/Context/BlogIdsContext";
import BrandIdsContext from "@/Context/BrandIdsContext";
import ProductIdsContext from "@/Context/ProductIdsContext";
import { horizontalProductSlider5 } from "@/Data/SliderSetting";
import Loader from "@/Layout/Loader";
import { Href, storageURL } from "@/Utils/Constants";
import useCustomDataQuery from "@/Utils/Hooks/useCustomDataQuery";
import { useSkeletonLoader2 } from "@/Utils/Hooks/useSkeleton2";
import Image from "next/image";
import Link from "next/link";
import { useContext, useEffect } from "react";
import { Col, Container, Row } from "reactstrap";
import HomeBrand from "../../Widgets/HomeBrand";
import HomeCategorySidebar from "../../Widgets/HomeCategorySidebar";
import HomeProduct from "../../Widgets/HomeProduct";
import HomeProductTab from "../../Widgets/HomeProductTab";
import HomeServices from "../../Widgets/HomeService";
import HomeSlider from "../../Widgets/HomeSlider";
import Head from "next/head";


const ElectronicsThree = () => {
  const { data, refetch, isLoading } = useCustomDataQuery({ params: "electronics_three" });
  const { setGetProductIds, isRefetching: productLoad } = useContext(ProductIdsContext);
  const { isLoading: brandLoading } = useContext(BrandIdsContext);
  const { isLoading: blogLoading } = useContext(BlogIdsContext);

  useEffect(() => {
    if (data?.products_ids) {
      setGetProductIds({ ids: Array.from(new Set(data?.products_ids))?.join(",") });
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
  if (isLoading && document.body) return <Loader />;

  return (
    <>
      <Head>
        <link rel="stylesheet" href="/assets/css/style.css" />   
                
      </Head>

      {/* Home Banners */}
      {/* { <WrapperComponent classes={{ sectionClass: "small-section ", fluidClass: "container-fluid mycon" }} noRowCol={true}>
        <div className="home-slider">
          <HomeSlider bannerData={data?.home_banner} height={539} width={1376} />
        </div>
      </WrapperComponent> } */}

     <>
  <WrapperComponent
    classes={{
      sectionClass: "home-slider-section",
      fluidClass: "container-fluid p-0",
    }}
    noRowCol={true}
  >
    <div className="home-slider mb-5">
      <HomeSlider
        bannerData={data?.home_banner}
        height={539}
        width={1376}
        className="responsive-slider"
      />
    </div>
  </WrapperComponent>

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



      {/* <section className="hero-banner-section text-white mb-5 d-flex align-items-center">
        <div className="container">
          <div className="row">
            <div className="col-md-7">
              <h2 className="fw-bold text-white mb-3">
                Hard To Find Computer Parts? <br /> We Think Otherwise.
              </h2>
              <p className="mb-4 text-white">
                Lorem Ipsum Is Simply Dummy Text Of The Printing And Typesetting Industry. Lorem Ipsum Has
                Been The Industry’s Standard Dummy Text Ever Since The 1500s, When An Unknown Printer Took A Galley Of Type And Scrambled It...
              </p>
              <a href="#" className="btn ">
                Shop Now
              </a>
            </div>
          </div>
        </div>
      </section> */}


      {/* Services */}
      {data?.services && (
        <WrapperComponent classes={{ sectionClass: "service-w-bg pt-0 tools-service", fluidClass: "container" }} noRowCol={true}>
          <HomeServices services={data?.services?.banners} />
        </WrapperComponent>
      )}

      {/* Product List 1 */}
      {data?.products_list_1?.status && (
        <>
          <style jsx global>{`
            .custom-slick-wrapper .slick-track {
              width: auto !important;
              display: flex !important;
            }
          `}</style>

          <WrapperComponent
            classes={{ sectionClass: "ratio_square no-arrow", fluidClass: "container" }}
            colProps={{ xs: "12" }}
          >
            <TitleBox type="icon" title={data?.products_list_1} />
            <div className="custom-slick-wrapper">
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

      {/*Banners*/}
      <section className="banner-style-1">
        <div className="full-box">
          <Container>
            <Row className="ratio2_1">
              {data?.banner?.main_banner?.status && (
                <Col lg="5" md="7" className="card-margin">
                  <div className="banner-padding pt-0">
                    <Link href={Href}>
                      <div className="collection-banner tl-content">
                        <ImageLink imgUrl={data?.banner.main_banner} bgImg={true} classes="img-part custom-height" />
                      </div>
                    </Link>
                  </div>
                </Col>
              )}
              <Col lg="4" md="5">
                <div className="banner-padding pt-0 ratio2_1">
                  <Container className="p-0">
                    <Row>
                      {data?.banner?.grid_banner_1?.status && (
                        <Col xs="12" className="mb-4">
                          <Link href={Href}>
                            <div className="collection-banner">
                              <ImageLink imgUrl={data?.banner.grid_banner_1} bgImg={true} classes="img-part" />
                            </div>
                          </Link>
                        </Col>
                      )}
                      {data?.banner?.grid_banner_2?.status && (
                        <Col xs="12">
                          <Link href={Href}>
                            <div className="collection-banner">
                              <ImageLink imgUrl={data?.banner.grid_banner_2} bgImg={true} classes="img-part" />
                            </div>
                          </Link>
                        </Col>
                      )}
                    </Row>
                  </Container>
                </div>
              </Col>
              {data?.banner?.grid_banner_3?.status && (
                <Col lg="3" xs="12" className="d-lg-block d-none">
                  <div className="banner-padding pt-0">
                    <Link href={Href}>
                      <div className="collection-banner tl-content">
                        <ImageLink imgUrl={data?.banner.grid_banner_3} bgImg={true} classes="img-part custom-height" />
                      </div>
                    </Link>
                  </div>
                </Col>
              )}
            </Row>
          </Container>
        </div>
      </section>

      {/* Category Product 1 */}
      {data?.category_product_1?.status && (
        <WrapperComponent classes={{ sectionClass: "container" }} customCol={true}>
          {data?.category_product_1?.categories?.status && (
            <Col xl="2" className="d-xl-inline-block d-none">
              <div className="left-header left-header-relative">
                <div className="metro">
                  <div className="main-menu">
                    <div className="menu-left">
                      <HomeCategorySidebar categoryIds={data?.category_product_1?.categories?.category_ids} style="vertical" />
                    </div>
                  </div>
                </div>
              </div>
            </Col>
          )}
          {data?.category_product_1?.products?.status && (
            <div className={data?.category_product_1?.categories?.status ? "col-xl-10" : "col-xl-12"}>
              <HomeProduct productIds={data?.category_product_1?.products?.product_ids || []} style="vertical" />
            </div>
          )}
        </WrapperComponent>
      )}

      {/* Offer Banner 2 */}

      {/* Offer Banner 2 Styled Section */}
      {data?.offer_banner_1?.status && (
        <section
          className="container mt-5 offer-banner-section d-flex align-items-center text-white text-center"
          style={{
            backgroundImage: `url(${storageURL + data?.offer_banner_1?.image_url})`,
            backgroundSize: 'cover',
            backgroundPosition: 'bottom',
            height: '211px',
            width: '100%',
            padding: '0',
            borderradius: '10px',
          }}
        >
          <div className="container">
            <div className="row justify-content-center">
              <div className="col-lg-8">
                <p className="mb-2 fs-6 fw-bold text-white ">
                  Save up to <span className="text-primary fw-bold">60% off</span>
                </p>
                <h2 className="offerbanner2 fw-bold mb-2">Photography Workshop</h2>
                <a href="#" className="btn  fw-semibold">
                  SHOP NOW
                </a>
              </div>
            </div>
          </div>
        </section>
      )}



      <WrapperComponent classes={{ sectionClass: "ratio2_1 banner-padding", fluidClass: "container", row: "g-sm-4 g-3" }} customCol={true}>
        {data?.offer_banner_2?.banner_1?.status && (
          <div className={data?.offer_banner_2?.banner_2?.status ? "col-md-6" : "col-12"}>
            <ImageLink imgUrl={data?.offer_banner_2?.banner_1} bgImg={true} />
          </div>
        )}
        {data?.offer_banner_2?.banner_2?.status && (
          <div className={data?.offer_banner_2?.banner_1?.status ? "col-md-6" : "col-12"}>
            <ImageLink imgUrl={data?.offer_banner_2?.banner_2} bgImg={true} />
          </div>
        )}
      </WrapperComponent>





      {/* Category Products 2 */}
      {data?.category_product_2?.status && (
        <WrapperComponent classes={{ sectionClass: "ratio_square bg-title wo-bg category-tab-section", fluidClass: "container" }} noRowCol={true}>
          <Row>
            <Col>
              <HomeProductTab style="vertical" tabStyle="simple" title={data?.category_product_2} classes="row row-cols-xxl-5 row-cols-xl-5 row-cols-md-3 row-cols-2 g-sm-4 g-3" paginate={5} categoryIds={data?.category_product_2?.category_ids} />
            </Col>
          </Row>
        </WrapperComponent>
      )}



      {/* airpods and gaming laptop sec */}
      {/* <section className="py-5 bg-white">
        <div className="container">
          <div className="row g-4">

            <div className="col-md-6">
              <div className="d-flex align-items-center justify-content-between p-4 border rounded bg-light">
                <div>
                  <p className="mb-1 text-muted">
                    Weekend <span className="text-primary fw-semibold">Offer</span>
                  </p>
                  <h4 className="fw-bold mb-3">Airpods Sale</h4>
                  <a href="#" className="btn btn-primary d-inline-flex align-items-center">
                    SHOP NOW&nbsp;<span>&rarr;</span>
                  </a>
                </div>
                <img
                  src="/assets/images/airpods.png"
                  alt="Airpods"
                  className="img-fluid"
                  style={{ maxHeight: '120px' }}
                />
              </div>
            </div>

            <div className="col-md-6">
              <div className="d-flex align-items-center justify-content-between p-4 border rounded bg-light">
                <div>
                  <p className="mb-1 text-muted">
                    Special <span className="text-primary fw-semibold">Offer</span>
                  </p>
                  <h4 className="fw-bold mb-3">Gaming Laptop</h4>
                  <a href="#" className="btn btn-primary d-inline-flex align-items-center">
                    SHOP NOW&nbsp;<span>&rarr;</span>
                  </a>
                </div>
                <img
                  src="/assets/images/laptop.png"
                  alt="Gaming Laptop"
                  className="img-fluid"
                  style={{ maxHeight: '120px' }}
                />
              </div>
            </div>

          </div>
        </div>
      </section> */}

      <section className="py-5 bg-white">
        <div className="container">
          <div className="row g-4">

            {/* Airpods Sale Banner */}
            <div className="col-md-6">
              <img
                src="/assets/images/banner1.png"
                alt="Airpods Sale"
                className="img-fluid w-100 rounded"
              />
            </div>

            {/* Gaming Laptop Banner */}
            <div className="col-md-6">
              <img
                src="/assets/images/banner2.png"
                alt="Gaming Laptop"
                className="img-fluid w-100 rounded"
              />
            </div>

          </div>
        </div>
      </section>


      {/* Brands */}
      {data?.brand?.status && (
        <section className="section-b-space blog-wo-bg">
          <HomeBrand brandIds={data?.brand?.brand_ids} />
        </section>
      )}



      {/* Category Products 2 */}
      {data?.category_product_2?.status && (
        <WrapperComponent classes={{ sectionClass: "ratio_square bg-title wo-bg category-tab-section", fluidClass: "container" }} noRowCol={true}>
          <Row>
            <Col>
              <HomeProductTab style="vertical" tabStyle="simple" title={data?.category_product_2} classes="row row-cols-xxl-5 row-cols-xl-5 row-cols-md-3 row-cols-2 g-sm-4 g-3" paginate={5} categoryIds={data?.category_product_2?.category_ids} />
            </Col>
          </Row>
        </WrapperComponent>
      )}


      {/* reviews section */}
      {/* <section className="py-5 mt-4 bg-light">
        <div className="container">
          <div className="row align-items-center mb-4">
            <div className="col-md-6">
              <h3 className="fw-bold text-black  ps-2">NEW ARRIVALS</h3>
            </div>
            <div className="col-md-6 text-md-end d-flex justify-content-end gap-3 text-center">
              <div>
                <span className="fw-bold me-2">Excellent</span>
                <img src="/assets/images/reviewshead.png" alt="Google" />
              </div>
              <div>
                <span className="me-2">1540 reviews on</span>
                <img src="/assets/images/reviewsgoogle.png" alt="Google" height="20" />
              </div>
            </div>
          </div>

          <div className="row g-4">
            {[1, 2, 3, 4].map((item) => (
              <div className="col-md-6 col-lg-3" key={item}>
                <div className="p-3 border rounded bg-white h-100 d-flex flex-column justify-content-between reviewscol">
                  <div>
                    <img className="mb-2" src="/assets/images/revieewstar.png" alt="Google" />
                    <p className="text-muted small mb-0 reviewtext">
                      Lorem Ipsum Dolor Sit Amet Consectetur. Ullamcorper Enim Nulla Sem Libero Dictumst Habitasse.
                      Senectus Non Pharetra Leo Turpis Sapien Volutpat Ut. Vitae Faucibus Consequat Potenti Etiam Aliquet.
                      Varius Sed Nisi Urna Amet Nec Lectus Eget In.
                    </p>
                  </div>
                  <div className="d-flex align-items-center mt-3">
                    <img
                      src="./assets/images/review.png"
                      alt="Maren Lipshutz"
                      width="40"
                      height="40"
                      className="rounded-circle me-2"
                    />
                    <div>
                      <div className="fw-bold">Maren Lipshutz</div>
                      <div className="text-muted small">Designation</div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section> */}


      {/* contact section */}
      <section className="pt-5 bg-white">
        <div className="container">
          <div className="row align-items-center g-4">
            {/* Left: Contact Info */}
            <div className="col-md-4">
              <h3>
                <span className="text-primary contactjoin fw-bold">Contact</span> &amp; Join<br />Together
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
                    <p className="text-muted mb-0">5 Benedict Court<br />Sacramento, CA 95823 USA</p>
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
                      <a href="tel:+19163046606">(+1) 916 304 6606</a>
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
                      <a href="mailto:info@convexns.com">info@convexns.com</a>
                    </p>

                  </div>
                </div>
              </div>
            </div>

            {/* Center: Image */}
            <div className="col-md-4 text-center">
              <img
                src="/assets/images/contactsec.png" // replace with actual path
                alt="Contact Person"
                className="img-fluid"
              />
            </div>

            {/* Right: Contact Form */}
            <div className="col-md-4">
              <div className="p-4 border rounded">
                <h3 className="fw-bold text-center mb-3">Get In Touch</h3>
                <p className="text-muted text-center small mb-4">
                  Hymenaeos! Omnis arcu vitae? Phasellus irure cupidatat incidunt.
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
