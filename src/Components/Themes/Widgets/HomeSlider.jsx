"use client";
import ImageLink from "@/Components/Widgets/ImageLink";
import { homeBannerSettings } from "@/Data/SliderSetting";
import { ImagePath, storageURL } from "@/Utils/Constants";
import Slider from "react-slick";

const HomeSlider = ({ bannerData, height, width, sliderClass }) => {
  const videoType = ["mp4", "webm", "ogg"];

  const renderOverlayContent = () => (
    <div className="container new-banner position-absolute top-50 start-0 translate-middle-y text-white ps-5" style={{ zIndex: 1 }}>
      <div className="row">
        <div className="col-lg-8 col-md-8 col-sm-10">
          <h2 className="fw-bold display-5 mainheading">Hard To Find Computer Parts? We Think Otherwise.</h2>
          <p className="mt-3 bannnertext">
            Lorem Ipsum Is Simply Dummy Text Of The Printing And Typesetting Industry.Text Ever Since The 1500s, When An Unknown Printer Into Electronic Typesetting, Remaining Essentially Unchanged.
          </p>
          <a href="#" className="btn btn-primary mt-3">Shop Now</a>
        </div>
      </div>
    </div>
  );

  return (
    <div className="container-fluid p-0 w-100 banner-con">
      <div className="position-relative">
        {bannerData?.banners?.length > 1 ? (
          <Slider {...homeBannerSettings} className={sliderClass || ""}>
            {bannerData.banners.map((banner, index) => {
              const isVideo = videoType.includes(banner?.image_url?.split(".").pop());
              return (
                <div className="slider-contain" id="block" style={{ width: "100%", position: "relative" }} key={index}>
                  {isVideo ? (
                    <>
                      <div style={{
                        position: "absolute", zIndex: -1, inset: 0,
                        overflow: "hidden", backgroundSize: "cover",
                        backgroundRepeat: "no-repeat", backgroundPosition: "0% 50%", backgroundImage: "none"
                      }}>
                        <video autoPlay loop muted style={{
                          margin: "auto", position: "absolute", zIndex: -1,
                          top: "50%", left: 0, transform: "translate(0%, -50%)",
                          visibility: "visible", opacity: 1, width: "100%", height: "auto"
                        }}>
                          <source src={storageURL + banner.image_url} type="video/mp4" />
                        </video>
                      </div>
                      {renderOverlayContent()}
                    </>
                  ) : (
                    <>
                      <ImageLink
                        imgUrl={banner}
                        placeholder={`${ImagePath}/banner.png`}
                        link={banner}
                        height={height}
                        width={width}
                        homeBanner={true}
                      />
                      {renderOverlayContent()}
                    </>
                  )}
                </div>
              );
            })}
          </Slider>
        ) : (() => {
          const singleBanner = bannerData?.banners?.[0] || bannerData;
          const imageUrl = singleBanner?.image_url || bannerData?.image_url;
          const isVideo = videoType.includes(imageUrl?.split(".").pop());

          return isVideo ? (
            <div className="slider-contain" id="block" style={{ position: "relative" }}>
              <div style={{
                position: "absolute", zIndex: -1, inset: 0,
                overflow: "hidden", backgroundSize: "cover",
                backgroundRepeat: "no-repeat", backgroundPosition: "0% 50%", backgroundImage: "none"
              }}>
                <video autoPlay loop muted style={{
                  margin: "auto", position: "absolute", zIndex: -1,
                  top: "50%", left: 0, transform: "translate(0%, -50%)",
                  visibility: "visible", opacity: 1, width: "100%", height: "auto"
                }}>
                  <source src={storageURL + imageUrl} type="video/mp4" />
                </video>
              </div>
              {renderOverlayContent()}
            </div>
          ) : (
            <div style={{ position: "relative" }}>
              <ImageLink
                imgUrl={singleBanner}
                placeholder={`${ImagePath}/banner.png`}
                height={height}
                width={width}
              />
              {renderOverlayContent()}
            </div>
          );
        })()}
        
        {/* Skeleton Loader */}
        <div className="home-skeleton">
          <div className="skeleton-content">
            <div className="container">
              <div className="row">
                <div className="col-lg-7 col-sm-8 col-11">
                  <p className="card-text placeholder-glow row g-lg-4 g-sm-3 g-2">
                    <span className="col-7"><span className="placeholder"></span></span>
                    <span className="col-9"><span className="placeholder"></span></span>
                    <span className="col-6"><span className="placeholder"></span></span>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomeSlider;
