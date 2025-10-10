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



        {/*  */}





        {/* <WrapperComponent
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
        </WrapperComponent> */}

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



      <section className="shipping-bar    text-white py-2">
        <div className="container text-center d-flex justify-content-center align-items-center">
          <span className="">FREE SHIPPING WITHIN THE UNITED STATES & CANADA</span>
          <i className="ms-2 fas fa-truck"></i>
        </div>
      </section>
      <section className="hero-banner-section mt-0 text-white mb-5 d-flex align-items-center">
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
              <a href="/category/storage-devices" className="btn ">
                Shop Now
              </a>
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



      




        {/* Category Product 1 */}
      {/*{data?.category_product_1?.status && (
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







      {/*Banners*/}
      {/* <section className="banner-style-1">
        <div className="full-box">
          <Container>
            <Row className="ratio2_1">
              {data?.banner?.main_banner?.status && (
                <Col lg="5" md="7" className="card-margin">
                  <div className="banner-padding pt-0">
                    <Link href={Href} legacyBehavior>
                      <a className="collection-banner tl-content">
                        <ImageLink
                          imgUrl={data?.banner.main_banner}
                          bgImg={true}
                          classes="img-part custom-height"
                        />
                      </a>
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
                          <Link href={Href} legacyBehavior>
                            <div className="collection-banner">
                              <ImageLink imgUrl={data?.banner.grid_banner_1} bgImg={true} classes="img-part" />
                            </div>
                          </Link>
                        </Col>
                      )}
                      {data?.banner?.grid_banner_2?.status && (
                        <Col xs="12">
                          <Link href={Href} legacyBehavior>
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
                    <Link href={Href} legacyBehavior>
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
      </section> */}




    
      {/* Offer Banner 2 */}
      {/* Offer Banner 2 Styled Section */}
      {/* {data?.offer_banner_1?.status && (
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
      )} */}




      {/* 
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
      </WrapperComponent> */}




      {/* Category Products 2 */}
      {/* {data?.category_product_2?.status && (
        <WrapperComponent classes={{ sectionClass: "ratio_square bg-title wo-bg category-tab-section", fluidClass: "container" }} noRowCol={true}>
          <Row>
            <Col>
              <HomeProductTab style="vertical" tabStyle="simple" title={data?.category_product_2} classes="row row-cols-xxl-5 row-cols-xl-5 row-cols-md-3 row-cols-2 g-sm-4 g-3" paginate={5} categoryIds={data?.category_product_2?.category_ids} />
            </Col>
          </Row>
        </WrapperComponent>
      )} */}





      {/* airpods and gaming laptop sec */}
      <section className="py-5 bg-white">
        <div className="container p-3 ">
          <div className="row ">

            <div className="col-md-6   border rounded bg-light gmaingcolum">
              <div className="d-flex align-items-center justify-content-between p-4 border rounded bg-light">
                <div className="row d-flex align-items-center justify-content-between p-3">
                  <div className="col-4 text-div">
                    <p className="mb-1 text-muted">
                      Weekend <span className="text-primary fw-semibold">Offer</span>
                    </p>
                    <h3 className="text-black mb-5">Airpods Sale</h3>
                    <a href="/category/gaming-console" className="btn btn-primary d-inline-flex align-items-center">
                      SHOP NOW&nbsp;<span>&rarr;</span>
                    </a>
                  </div>
                  <div className="col-8 image-div">
                    <img
                      src="/assets/images/airpodsnew.webp"
                      alt="Airpods"
                      className="img-fluid"
                      style={{ maxHeight: '620px' }}
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="col-md-6   border rounded bg-light gmaingcolum">
              <div className="d-flex align-items-center justify-content-between p-4 border rounded bg-light">
                <div className="row d-flex align-items-center justify-content-between p-3">
                  <div className="col-4 text-div">
                    <p className="mb-1 text-muted">
                      Weekend <span className="text-primary fw-semibold">Offer</span>
                    </p>
                    <h3 className="text-black mb-5">Gaming Laptop</h3>
                    <a href="/category/gaming-accessories" className="btn btn-primary d-inline-flex align-items-center">
                      SHOP NOW&nbsp;<span>&rarr;</span>
                    </a>
                  </div>
                  <div className="col-8 image-div">
                    <img
                      src="/assets/images/airpodtwo.webp"
                      alt="Airpods"
                      className="img-fluid"
                      style={{ maxHeight: '620px' }}
                    />
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>





      {/* <section className="py-5 bg-white">
        <div className="container">
          <div className="row g-4">

            <div className="col-md-6">
              <img
                src="/assets/images/banner1.png"
                alt="Airpods Sale"
                className="img-fluid w-100 rounded"
              />
            </div>

            <div className="col-md-6">
              <img
                src="/assets/images/banner2.png"
                alt="Gaming Laptop"
                className="img-fluid w-100 rounded"
              />
            </div>

          </div>
        </div>
      </section> */}




      {/* Brands */}
      {data?.brand?.status && (
        <section className="section-b-space blog-wo-bg p-0">
          <HomeBrand brandIds={data?.brand?.brand_ids} />
        </section>
      )}





      {/* reviews section */}
      <section className="py-5 pt-3 mt-4 bg-light">
        <div className="container">
          <div className="row align-items-center mb-4">
            <div className="col-md-6">
              <h3 className="text-black ps-2">NEW ARRIVALS</h3>
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
      </section>








      {/* Category Products 2 */}
      {data?.category_product_2?.status && (
        <WrapperComponent classes={{ sectionClass: "ratio_square p-0 m-0 bg-title wo-bg category-tab-section ", fluidClass: "container" }} noRowCol={true}>
          <Row>
            <Col>
              <HomeProductTab style="vertical" tabStyle="simple" title={data?.category_product_2} classes="row row-cols-xxl-5 row-cols-xl-5 row-cols-md-3 row-cols-2 g-sm-4 g-3" paginate={5} categoryIds={data?.category_product_2?.category_ids} />
            </Col>
          </Row>
        </WrapperComponent>
      )}
      {/* reviews section */}

















      {/* About uss Section */}

      <section className="about d-flex align-items-center" style={{
        backgroundImage: 'url("/assets/images/warehouse-bg.jpg")',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        position: 'relative'
      }}>
        <div className="container">
          <div className="row align-items-center">

            {/* Left Content */}
            <div className="col-lg-6 text-white z-2">
              <h2 className="display-5">
                About Hardware Box<br />
              </h2>
              <p className="mt-3">
                Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.
              </p>
              <a href="/category/memories" className="btn btn-warning fw-semibold px-4 py-2 mt-4">
                Shop Now
              </a>
            </div>

            {/* Right Image */}
            <div className="col-lg-6 text-end">
              <img
                src="/assets/images/aboutnew.webp"  // Replace with your image path
                alt="Warehouse Worker with Tablet"
                className="img-fluid"
                style={{ maxHeight: '600px', objectFit: 'contain' }}
              />
            </div>

          </div>
        </div>

        {/* Optional overlay for dark gradient effect */}
        <div className="hero-overlay"></div>
      </section>


      {/* benfit section  */}


      {/* <section className="py-5 bg-light">
        <div className="container">
          <div className="row align-items-start">

            <div className="col-lg-4 mb-4 mb-lg-0">
              <h3 className=" mb-4 text-black">HARDWARE BOX BENEFITS</h3>

              <div className="d-flex mb-3">
                <div className="me-3">
                  <div className="colorful">
                    <img src="/assets/images/freedelivery.png" alt="Save" width="40" />
                  </div>
                </div>
                <div>
                  <h5 className="fw-bold mb-1">FREE DELIVERY
                  </h5>
                  <p className="mb-0 small text-muted">Up to 8lbs</p>
                </div>
              </div>

              <div className="d-flex mb-3">
                <div className="me-3">
                  <div className="colorful">
                    <img src="/assets/images/Securepayment.png" alt="Genuine Products" width="40" />
                  </div>
                </div>
                <div>
                  <h5 className="fw-bold mb-1">GENUINE SECURE PAYMENT</h5>
                  <p className="mb-0 small text-muted">100% protected checkout</p>
                </div>
              </div>

              <div className="d-flex">
                <div className="me-3">
                  <div className="colorful">
                    <img src="/assets/images/Return.png" alt="Genuine Products" width="40" />
                  </div>                  </div>
                <div>
                  <h5 className="fw-bold mb-1">90 DAYS RETURN</h5>
                  <p className="mb-0 small text-muted">On damaged units</p>
                </div>
              </div>
            </div>

            <div className="col-lg-8">
              <div className="bg-white border p-4 h-100">
                <div className="row d-flex">
                  <div className="col-md-6 border-end gap-5 p-3 mb-4 mb-md-0 text-center text-md-start">
                    <img src="/assets/images/benefitsec4.webp" alt="SAM Logo" className="mb-5" height="60" />
                    <h3 className=" text-black">Verified Vendor of SAM.gov</h3>
                    <p className="small mb-1">
                      CAGE Code : <span className="text-orange fw-semibold">9EQ82</span>
                    </p>
                    <p className="small text-muted mb-0">
                      Our commitment to meeting the standards set by the US Federal Contractor Registration has earned us a verified vendor status. We take pride in being listed in the highly-regarded System for Award Management (SAM).
                    </p>
                  </div>


                  <div className="col-md-6 p-3  text-center text-md-start">
                    <img src="/assets/images/benefitsec5.webp" alt="D&B Logo" className="mb-5" height="60" />
                    <h3 className=" text-black">D&B Rating</h3>
                    <p className="small mb-1">
                      D-U-N-S® Number is: <span className="text-orange fw-semibold">117396845</span>
                    </p>
                    <p className="small text-muted mb-0">
                      We are committed to providing our customers with top-quality computer accessories. Our Duns & Bradstreet rating is excellent and is a testament to our financial stability and strength in the industry.
                    </p>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section> */}



      <section className="py-5 bg-light">
        <div className="container">
          <div className="row align-items-start">

            {/* Left Column – Direct Macro Benefits */}
            <div className="col-lg-4 mb-4 mb-lg-0">
              <h3 className=" mb-4 text-black">HARDWARE BOX BENEFITS</h3>

              {/* Benefit Items */}
              <div className="d-flex mb-3">
                <div className="me-3">
                  <div className="colorful">
                    <img src="/assets/images/new2.png" alt="Save" width="60" />
                  </div>
                </div>
                <div>
                  <h5 className="fw-bold mb-1">FREE DELIVERY
                  </h5>
                  <p className="mb-0 small text-muted">Up to 8lbs</p>
                </div>
              </div>

              <div className="d-flex mb-3">
                <div className="me-3">
                  <div className="colorful">
                    <img src="/assets/images/BiJKSR.png" alt="Genuine Products" width="60" />
                  </div>
                </div>
                <div>
                  <h5 className="fw-bold mb-1">GENUINE SECURE PAYMENT</h5>
                  <p className="mb-0 small text-muted">100% protected checkout</p>
                </div>
              </div>

              <div className="d-flex">
                <div className="me-3">
                  <div className="colorful">
                    <img src="/assets/images/voyGMG.png" alt="Genuine Products" width="60" />
                  </div>                  </div>
                <div>
                  <h5 className="fw-bold mb-1">90 DAYS RETURN</h5>
                  <p className="mb-0 small text-muted">On damaged units</p>
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

                      <div className="d-flex  align-items-center gap-4">
                        <img src="/assets/images/govermentt.png" alt="SAM Logo" className="" height="60" />
                        <h4 className=" text-black">Government Agencies</h4>
                      </div>
                      <div className="d-flex  align-items-center gap-4">
                        <img src="/assets/images/banking.png" alt="SAM Logo" className="" height="60" />
                        <h4 className=" text-black">Banking & Financial Services</h4>
                      </div>

                      <div className="d-flex  align-items-center gap-4">
                        <img src="/assets/images/Education.png" alt="SAM Logo" className="" height="60" />
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
                      We are committed to providing our customers with top-quality computer accessories. Our Duns & Bradstreet rating is excellent and is a testament to our financial stability and strength in the industry.
                    </p>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>


      {/* we are expert section */}


      <section className="py-5" style={{ backgroundColor: "#ffe4e4" }}>
        <div className="container">
          <div className="row mb-4">
            <div className="col-12">
              <h2 className="" style={{ color: "#ff5050" }}>
                We're expert in new & refurbished IT <br /> equipment and solutions.
              </h2>
            </div>
          </div>

          <div className="row">
            <div className="col-md-4 mb-4">

              <h4 className="text-black">
                How quickly can we deliver it you?<br />
                As fast as you want with reliable delivery service.
              </h4>
              <p className="text-muted">
                Tell us when you need your IT part, and we'll ensure it arrives on time, whether it's urgent or falls within the agreed time frame.
              </p>
            </div>

            <div className="col-md-4 mb-4">
              <h4 className="text-black">
                Think +500,000 products is too good to be true? You're welcome at our warehouses.
              </h4>
              <p className="text-muted">
                In our many warehouses in North America and worldwide, we keep a wide range of items in stock, from the most popular equipment to rare, hard-to-find parts. Just ask, and we'll find it quickly.
              </p>
            </div>

            <div className="col-md-4 mb-4">
              <h4 className=" text-black">
                Not sure whether refurbished IT equipment lasts? Let us address your concerns.
              </h4>
              <p className="text-muted">
                You can trust us completely. We meticulously prepare and test all IT parts before selling, ensuring their durability for as long as you use them.
              </p>
            </div>
          </div>
        </div>
      </section>










      {/* blog section */}


      <section className="py-5 bg-white">
        <div className="container">
          <div className="d-flex justify-content-between align-items-center mb-4">
            <h3 className=" mb-0 text-black">RECENT BLOG POSTS</h3>
            <a href="/blog" className="text-decoration-none fw-semibold">
              View All
            </a>
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


      <section className="p-0 contactustoget">
        <div className="container py-1 px-3 my-1"
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
                  Contact us to get expert advice and dedicated account management today.
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
      <section className="pt-5 bg-white">
        <div className="container">
          <div className="row align-items-center g-4">
            {/* Left: Contact Info */}
            <div className="col-md-4">
              <h3>
                <span className="contactjoin fw-bold text-black">Contact</span> &amp; Join<br />Together
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
