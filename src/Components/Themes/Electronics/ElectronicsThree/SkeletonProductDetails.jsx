import React from "react";
import { Container, Row, Col } from "reactstrap";

const SkeletonProductDetails = () => {
  return (
    <section className="section-b-space">
      <Container>
        <div className="collection-wrapper">
          <Row>
            {/* Image Skeleton */}
            <Col lg="6" className="col-12">
               <Row >
                   <Col className="col-2">
                       <div className="skeleton-loader" style={{ height: '80px', marginBottom: '10px' }}></div>
                       <div className="skeleton-loader" style={{ height: '80px', marginBottom: '10px' }}></div>
                       <div className="skeleton-loader" style={{ height: '80px', marginBottom: '10px' }}></div>
                   </Col>
                   <Col className="col-10">
                       <div className="skeleton-loader w-100" style={{ height: '500px' }}></div>
                   </Col>
               </Row>
            </Col>
            
            {/* Details Skeleton */}
            <Col lg="6" rtl="true">
              <div className="product-right">
                <div className="skeleton-loader mb-3" style={{ width: '80%', height: '30px' }}></div>
                <div className="skeleton-loader mb-3" style={{ width: '40%', height: '20px' }}></div>
                <div className="skeleton-loader mb-4" style={{ width: '30%', height: '40px' }}></div>
                
                <div className="border-product">
                    <div className="skeleton-loader mb-3" style={{ width: '100%', height: '15px' }}></div>
                    <div className="skeleton-loader mb-3" style={{ width: '90%', height: '15px' }}></div>
                    <div className="skeleton-loader" style={{ width: '60%', height: '15px' }}></div>
                </div>

                <div className="skeleton-loader mt-4 mb-3" style={{ width: '30%', height: '50px' }}></div>
                <div className="skeleton-loader" style={{ width: '40%', height: '50px' }}></div>
              </div>
            </Col>
          </Row>
        </div>
      </Container>
      <style jsx>{`
        .skeleton-loader {
            background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
            background-size: 200% 100%;
            animation: skeleton-loading 1.5s infinite;
            border-radius: 4px;
        }
        @keyframes skeleton-loading {
            0% { background-position: 200% 0; }
            100% { background-position: -200% 0; }
        }
      `}</style>
    </section>
  );
};

export default SkeletonProductDetails;
