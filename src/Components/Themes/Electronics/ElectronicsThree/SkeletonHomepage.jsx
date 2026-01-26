import React from 'react';
import { Container, Row, Col } from 'reactstrap';

const SkeletonHomepage = () => {
    return (
        <div className="skeleton-homepage overflow-hidden">
            {/* Home Banner Skeleton */}
            <div className="section-b-space position-relative" style={{ height: '500px', backgroundColor: '#f0f0f0' }}>
               <div className="skeleton-loader h-100 w-100"></div>
            </div>

            {/* Service Skeleton */}
            <section className="section-b-space">
                <Container>
                    <Row>
                        {[1,2,3,4].map(i => (
                             <Col md={3} key={i}>
                                 <div className="p-4 border rounded">
                                     <div className="skeleton-loader rounded-circle mb-3" style={{width: '50px', height: '50px'}}></div>
                                     <div className="skeleton-loader mb-2" style={{width: '80%', height: '20px'}}></div>
                                     <div className="skeleton-loader" style={{width: '60%', height: '15px'}}></div>
                                 </div>
                             </Col>
                        ))}
                    </Row>
                </Container>
            </section>

             {/* Wrapper/Products Skeleton */}
            <section className="section-b-space">
                 <Container>
                     <div className="skeleton-loader mb-4" style={{width: '200px', height: '30px'}}></div>
                     <Row>
                         {[1,2,3,4].map(i => (
                             <Col md={3} key={i}>
                                  <div className="product-card-skeleton border rounded p-3">
                                      <div className="skeleton-loader w-100 mb-3" style={{height: '200px'}}></div>
                                      <div className="skeleton-loader w-75 mb-2" style={{height: '20px'}}></div>
                                      <div className="skeleton-loader w-50" style={{height: '20px'}}></div>
                                  </div>
                             </Col>
                         ))}
                     </Row>
                 </Container>
            </section>

             {/* Banner Skeleton */}
             <section className="section-b-space">
                  <Container>
                       <div className="skeleton-loader w-100 rounded" style={{height: '300px'}}></div>
                  </Container>
             </section>
             
              {/* Blog Skeleton */}
              <section className="section-b-space">
                 <Container>
                     <div className="skeleton-loader mb-4" style={{width: '200px', height: '30px'}}></div>
                     <Row>
                         {[1, 2, 3].map(i => (
                             <Col md={4} key={i}>
                                  <div className="product-card-skeleton border rounded p-3">
                                      <div className="skeleton-loader w-100 mb-3" style={{height: '200px'}}></div>
                                      <div className="skeleton-loader w-75 mb-2" style={{height: '20px'}}></div>
                                      <div className="skeleton-loader w-50" style={{height: '20px'}}></div>
                                  </div>
                             </Col>
                         ))}
                     </Row>
                 </Container>
            </section>
             
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
        </div>
    );
};

export default SkeletonHomepage;
