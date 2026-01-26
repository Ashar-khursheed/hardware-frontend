import React from 'react';
import Image from 'next/image';

const HardwareBenefits = () => {
    return (
        <section className="py-5 bg-light">
        <div className="container">
          <div className="row align-items-start g-4">

            {/* Left Column – Direct Macro Benefits */}
            <div className="col-lg-4">
              <h3 className="mb-4 text-black fw-bold">HARDWARE BOX BENEFITS</h3>

              {/* Benefit Items */}
              <div className="benefit-item d-flex mb-4 p-3 bg-white rounded shadow-sm">
                <div className="me-3 d-flex align-items-center">
                    <div style={{ width: 60, height: 60, position: 'relative' }}>
                         <Image src="/assets/images/new2.png" alt="Free Delivery" fill style={{ objectFit: 'contain' }} />
                    </div>
                </div>
                <div>
                  <h5 className="fw-bold mb-1">FREE DELIVERY</h5>
                  <p className="mb-0 small text-muted">On all orders up to 8lbs</p>
                </div>
              </div>

              <div className="benefit-item d-flex mb-4 p-3 bg-white rounded shadow-sm">
                <div className="me-3 d-flex align-items-center">
                   <div style={{ width: 60, height: 60, position: 'relative' }}>
                         {/* Correct the path/image name if needed */}
                         <Image src="/assets/images/BiJKSR.png" alt="Secure Payment" fill style={{ objectFit: 'contain' }} />
                    </div>
                </div>
                <div>
                  <h5 className="fw-bold mb-1">SECURE PAYMENT</h5>
                  <p className="mb-0 small text-muted">100% protected checkout</p>
                </div>
              </div>

              <div className="benefit-item d-flex mb-0 p-3 bg-white rounded shadow-sm">
                <div className="me-3 d-flex align-items-center">
                    <div style={{ width: 60, height: 60, position: 'relative' }}>
                         <Image src="/assets/images/voyGMG.png" alt="Returns" fill style={{ objectFit: 'contain' }} />
                    </div>
                 </div>
                <div>
                  <h5 className="fw-bold mb-1">90 DAYS RETURN</h5>
                  <p className="mb-0 small text-muted">Hassle-free returns on damaged units</p>
                </div>
              </div>
            </div>

            {/* Right Column – SAM & D&B */}
            <div className="col-lg-8">
              <div className="bg-white border rounded p-4 h-100 shadow-sm">
                <div className="row h-100">
                  {/* SAM Info */}
                  <div className="col-md-6 d-flex flex-column justify-content-center border-end-md">
                      <div className="d-flex align-items-center gap-3 mb-4">
                        <div style={{ width: 60, height: 60, position: 'relative', flexShrink: 0 }}>
                            <Image src="/assets/images/govermentt.png" alt="Government" fill style={{ objectFit: 'contain' }} />
                        </div>
                        <h4 className="text-black m-0 fs-5">Government Agencies</h4>
                      </div>
                      <div className="d-flex align-items-center gap-3 mb-4">
                         <div style={{ width: 60, height: 60, position: 'relative', flexShrink: 0 }}>
                            <Image src="/assets/images/banking.png" alt="Banking" fill style={{ objectFit: 'contain' }} />
                        </div>
                        <h4 className="text-black m-0 fs-5">Banking & Financial Services</h4>
                      </div>
                      <div className="d-flex align-items-center gap-3">
                         <div style={{ width: 60, height: 60, position: 'relative', flexShrink: 0 }}>
                            <Image src="/assets/images/Education.png" alt="Education" fill style={{ objectFit: 'contain' }} />
                        </div>
                        <h4 className="text-black m-0 fs-5">Universities & Research Institutions</h4>
                      </div>
                  </div>

                  {/* D&B Info */}
                  <div className="col-md-6 p-3 d-flex flex-column justify-content-center text-center text-md-start">
                    <h3 className="text-black fw-bold mb-3">D&B Rating</h3>
                    <p className="mb-2 fs-5">
                      D-U-N-S® Number: <span className="text-primary fw-bold">117396845</span>
                    </p>
                    <p className="text-muted mb-0">
                      We are committed to providing our customers with top-quality computer accessories. Our Dun & Bradstreet rating is excellent, a testament to our financial stability and reliability.
                    </p>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>
    );
};

export default HardwareBenefits;
