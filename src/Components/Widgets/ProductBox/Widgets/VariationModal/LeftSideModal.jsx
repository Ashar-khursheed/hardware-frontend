import { useEffect, useRef, useState } from "react";
import Slider from "react-slick";
import { Col, Row } from "reactstrap";
import { viewModalSliderOption } from "@/Data/SliderSetting";
import { RiVideoLine } from "react-icons/ri";

const LeftSideModal = ({ cloneVariation, productObj }) => {
  const [state, setState] = useState({ nav1: null, nav2: null });
  const [videType] = useState(["video/mp4", "video/webm", "video/ogg"]);
  const [audioType] = useState(["audio/mpeg", "audio/wav", "audio/ogg"]);
  const slider1 = useRef();
  const slider2 = useRef();
  const { nav1, nav2 } = state;

  const placeHolderImage = "/assets/images/placeholder.png";

  useEffect(() => {
    setState({
      nav1: slider1.current,
      nav2: slider2.current,
    });
  }, []);

  const currentVariation = cloneVariation?.selectedVariation?.variation_galleries?.length
    ? cloneVariation?.selectedVariation?.variation_galleries
    : cloneVariation?.product?.product_galleries?.length
      ? cloneVariation?.product?.product_galleries
      : cloneVariation?.product?.product_thumbnail ? [cloneVariation?.product?.product_thumbnail] : [];

  // Return placeholder if no images
  if (!currentVariation || currentVariation.length === 0) {
    return (
      <Col lg="6">
        <div className="view-image-slider">
          <img src={placeHolderImage} className="img-fluid" alt="placeholder" style={{ width: '100%', height: 'auto', objectFit: 'contain' }} />
        </div>
      </Col>
    );
  }

  const renderMedia = (item, showControls = true) => {
    if (videType.includes(item?.mime_type)) {
      return (
        <video className="w-100" controls={showControls}>
          <source src={item?.original_url || ""} type={item?.mime_type} />
        </video>
      );
    } else if (audioType.includes(item?.mime_type)) {
      return (
        <div className="slider-main-img">
          <audio controls={showControls}>
            <source src={item?.original_url || ""} type={item?.mime_type} />
          </audio>
        </div>
      );
    } else {
      const imgUrl = item?.original_url || item?.asset_url || placeHolderImage;
      return (
        <img
          src={imgUrl}
          className="img-fluid"
          alt={cloneVariation?.product?.name || "Product image"}
          style={{ width: '100%', height: 'auto', maxHeight: '500px', objectFit: 'contain' }}
        />
      );
    }
  };

  // Single image - no slider
  if (currentVariation.length === 1) {
    return (
      <Col lg="6">
        <div className="sticky-top-custom position-relative top-0">
          <div className="thumbnail-image-slider">
            <Row className="g-sm-4 g-3">
              <Col xs="12">
                <div className="view-image-slider">
                  <div className="slider-image single-image">
                    {renderMedia(currentVariation[0])}
                  </div>
                </div>
              </Col>
            </Row>
          </div>
        </div>
      </Col>
    );
  }

  // Multiple images - show slider
  return (
    <Col lg="6">
      <div className="sticky-top-custom position-relative top-0">
        <div className="thumbnail-image-slider">
          <Row className="g-sm-4 g-3">
            <Col xs="12">
              <div className="view-image-slider">
                <Slider
                  asNavFor={nav2}
                  ref={(slider) => (slider1.current = slider)}
                  arrows={true}
                  dots={false}
                  infinite={true}
                  speed={500}
                  slidesToShow={1}
                  slidesToScroll={1}
                  adaptiveHeight={true}
                >
                  {currentVariation.map((item, i) => (
                    <div className="slider-image" key={i}>
                      {renderMedia(item)}
                    </div>
                  ))}
                </Slider>
              </div>
            </Col>

            <Col xs="12">
              <div className="thumbnail-slider slider-nav no-arrow">
                <Slider
                  {...viewModalSliderOption}
                  adaptiveHeight={true}
                  slidesToShow={Math.min(currentVariation.length, 4)}
                  asNavFor={nav1}
                  ref={(slider) => (slider2.current = slider)}
                  focusOnSelect={true}
                  swipeToSlide={true}
                >
                  {currentVariation.map((item, i) => (
                    <div className="slider-image" key={i}>
                      {videType.includes(item?.mime_type) ? (
                        <>
                          <div className="video-icon">
                            <RiVideoLine />
                          </div>
                          <video className="w-100">
                            <source src={item?.original_url || ""} type={item?.mime_type} />
                          </video>
                        </>
                      ) : audioType.includes(item?.mime_type) ? (
                        <div className="slider-main-img">
                          <audio>
                            <source src={item?.original_url || ""} type={item?.mime_type} />
                          </audio>
                        </div>
                      ) : (
                        (item?.original_url || item?.asset_url) && (
                          <img
                            src={item?.original_url || item?.asset_url}
                            className="img-fluid"
                            alt={cloneVariation?.product?.name || "Product image"}
                            style={{ width: '100%', height: 'auto', maxHeight: '100px', objectFit: 'contain' }}
                          />
                        )
                      )}
                    </div>
                  ))}
                </Slider>
              </div>
            </Col>
          </Row>
        </div>
      </div>
    </Col>
  );
};

export default LeftSideModal;