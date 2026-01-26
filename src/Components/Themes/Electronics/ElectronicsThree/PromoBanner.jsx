import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

const PromoBanner = () => {
  return (
    <section className="py-5 bg-white">
      <div className="container p-3">
        <div className="row g-4">
          <div className="col-lg-6">
            <div className="promo-card border rounded bg-light overflow-hidden position-relative h-100 shadow-sm transition-hover">
              <div className="row align-items-center h-100 p-4">
                  <div className="col-md-5 z-1">
                      <p className="mb-2 text-muted text-uppercase small ls-1">Weekend <span className="text-primary fw-bold">Offer</span></p>
                      <h3 className="mb-4 fw-bold">Airpods Sale</h3>
                      <Link href="/category/audio" className="btn btn-outline-primary rounded-pill px-4">
                          Shop Now <i className="bi bi-arrow-right ms-2"></i>
                      </Link>
                  </div>
                  <div className="col-md-7 text-center">
                    <div className="image-container" style={{ position: 'relative', height: '250px', width: '100%' }}>
                         {/* Replace with local or real image */}
                        <Image src="/assets/images/airpodsnew.webp" alt="Airpods" fill style={{ objectFit: 'contain' }} />
                    </div>
                  </div>
              </div>
            </div>
          </div>
          
          <div className="col-lg-6">
            <div className="promo-card border rounded bg-light overflow-hidden position-relative h-100 shadow-sm transition-hover">
            <div className="row align-items-center h-100 p-4">
                  <div className="col-md-5 z-1">
                      <p className="mb-2 text-muted text-uppercase small ls-1">New <span className="text-primary fw-bold">Arrival</span></p>
                      <h3 className="mb-4 fw-bold">Gaming Laptop</h3>
                      <Link href="/category/laptops" className="btn btn-outline-primary rounded-pill px-4">
                          Shop Now <i className="bi bi-arrow-right ms-2"></i>
                      </Link>
                  </div>
                  <div className="col-md-7 text-center">
                    <div className="image-container" style={{ position: 'relative', height: '250px', width: '100%' }}>
                        <Image src="/assets/images/airpodtwo.webp" alt="Gaming Laptop" fill style={{ objectFit: 'contain' }} />
                    </div>
                  </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PromoBanner;
