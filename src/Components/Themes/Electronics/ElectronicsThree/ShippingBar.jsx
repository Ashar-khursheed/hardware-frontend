import React from 'react';

const ShippingBar = () => {
  return (
    <section className="shipping-bar text-white py-2" style={{ backgroundColor: '#0044cc' }}>
      <div className="container text-center d-flex justify-content-center align-items-center">
        <span className="fw-semibold">FREE SHIPPING WITHIN THE UNITED STATES & CANADA</span>
        <i className="ms-2 fas fa-truck"></i>
      </div>
    </section>
  );
};

export default ShippingBar;
