import React, { useMemo } from 'react';
import Slider from 'react-slick';
import Link from 'next/link';
import { homeBannerSettings } from '@/Data/SliderSetting';
import SkeletonLoader from '@/Components/Common/SkeletonLoader';
import { storageURL } from '@/Utils/Constants';
import Image from 'next/image';

const HomeBanner = ({ banners, isLoading }) => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
    arrows: false,
    fade: true, // Smooth transition
    cssEase: 'linear',
    responsive: [] // Disable any responsive overrides
  };

  // Provide default banners if none are passed
  const defaultBanners = useMemo(() => [
    {
      image_url: '/assets/images/banner1-def.jpg', // Placeholder
      title: 'Hard To Find Computer Parts? We Think Otherwise.',
      description: "We stock the industry's standard dummy text ever since the 1500s...",
      link: '/category/storage-devices'
    }
  ], []);

  const bannerList = banners?.length > 0 ? banners : defaultBanners;

  if (isLoading) {
      return (
          <div className="home-banner-skeleton" style={{ height: '500px', width: '100%' }}>
              <SkeletonLoader width="100%" height="100%" />
          </div>
      )
  }

  return (
    <section className="home-slider-section position-relative overflow-hidden w-100">
      <Slider {...settings} className="home-slider">
        {bannerList.map((banner, index) => (
          <div key={index} className="position-relative">
             <div className="banner-image-wrapper" style={{ height: '500px', position: 'relative' }}>
                 {/* Use Next Image for optimization */}
                 {/* Note: In a real app we need valid URLs. If banner.image_url is a local path, use it directly. If it's a relative path from DB, prepend storageURL. */}
                 {banner.image_url ? (
                     <div style={{
                         position: 'absolute',
                         top: 0,
                         left: 0,
                         width: '100%',
                         height: '100%',
                         backgroundColor: '#1a1a1a' // Fallback color
                     }}>
                        {/* If it's a video, handle video. Else image */}
                         <Image 
                            src={banner.image_url.startsWith('http') ? banner.image_url : `${storageURL}${banner.image_url}`} 
                            alt={banner.title || "Banner"}
                            fill
                            style={{ objectFit: 'cover' }}
                            priority={index === 0}
                         />
                         {/* Overlay for readability */}
                         <div style={{ position: 'absolute', top: 0, left: 0, right:0, bottom:0, background: 'rgba(0,0,0,0.4)' }}></div>
                     </div>
                 ) : (
                    <div style={{ height: '100%', background: 'linear-gradient(45deg, #0044cc, #001f5c)' }}></div>
                 )}
                 
                 <div className="container h-100 position-relative">
                     <div className="row h-100 align-items-center">
                         <div className="col-lg-7 col-md-9 text-white z-1">
                            <h2 className="fw-bold display-5 mb-3 animate-fade-up">
                                {banner.title || "Premium Hardware Components"}
                            </h2>
                            <p className="lead mb-4 animate-fade-up delay-100">
                                {banner.description || "Discover top-tier computer parts and accessories for your build."}
                            </p>
                            <Link href={banner.link || "/shop"} className="btn btn-primary btn-lg rounded-pill px-4 animate-fade-up delay-200">
                                Shop Now
                            </Link>
                         </div>
                     </div>
                 </div>
             </div>
          </div>
        ))}
      </Slider>
    </section>
  );
};

export default HomeBanner;
