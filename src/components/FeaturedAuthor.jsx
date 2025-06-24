"use client";
import { useEffect, useRef } from "react";
import Link from "next/link";

const FeaturedAuthor = () => {
  const textRef = useRef(null);

  useEffect(() => {
    const text = textRef.current;
    
    if (text) {
      text.innerHTML = text.innerText
        .split("")
        .map(
          (char, i) => `<span style="transform:rotate(${i * 11.5}deg)">${char}</span>`
        )
        .join("");
    }
  }, []);

  return (
    <section className="top-author padding-y-120 section-bg position-relative z-index-1">
      <img
        src="assets/images/gradients/featured-gradient.png"
        alt=""
        className="bg--gradient white-version"
      />
      <img
        src="assets/images/shapes/spider-net.png"
        alt=""
        className="spider-net position-absolute top-0 start-0 z-index--1 white-version"
      />
      <img
        src="assets/images/shapes/spider-net-white2.png"
        alt=""
        className="spider-net position-absolute top-0 start-0 z-index--1 dark-version"
      />
      <img
        src="assets/images/shapes/pattern-curve-three.png"
        alt=""
        className="position-absolute top-0 end-0 z-index--1"
      />
      <img
        src="assets/images/shapes/element1.png"
        alt=""
        className="element two"
      />
      <div className="container container-two">
        <div className="row gy-4 align-items-center">
          <div className="col-xl-5">
            <div className="section-content">
              <div className="section-heading style-left">
                <h3 className="section-heading__title">Featured Author</h3>
                <p className="section-heading__desc font-18 w-sm">
                  Check out our featured author and their amazing products.
                </p>
              </div>
              <div className="author-info d-flex align-items-center gap-3">
                <div className="author-info__thumb">
                  <img src={'/assets/images/thumbs/author-img.png'} alt="Featured Author" style={{ width: '80px', height: '80px', objectFit: 'cover', borderRadius: '50%' }}/>
                </div>
                <div className="author-info__content">
                  <h4 className="author-info__name mb-1">Featured Author Name</h4>
                  <span className="author-info__text">Member Since 2023</span>
                </div>
              </div>
              <div className="flx-align gap-2 mt-48">
                <Link scroll={false}
                  href="#"
                  className="btn btn-main btn-lg pill fw-300"
                >
                  View Profile
                </Link>
                <button
                  type="button"
                  className="follow-btn btn btn-outline-light btn-lg pill"
                >
                  Follow
                </button>
              </div>
            </div>
          </div>
          <div className="col-xl-6">
            <div className="circle-content position-relative">
              <div className="circle static-circle">
                <div className="circle__badge">
                  <img src="assets/images/icons/featured-badge.png" alt="" />
                </div>
                <div className="circle__text" ref={textRef}>
                     <p>Featured Author Name</p>
                </div>
              </div>
              <div className="row gy-4 card-wrapper">
                {/* Static Product Items */}
                <div className="col-sm-6">
                    <div className="product-item box-shadow">
                      <div className="product-item__thumb d-flex">
                        <Link scroll={false} href="#" className="link w-100">
                          <img
                            src="assets/images/product/product-1.jpg"
                            alt=""
                            className="cover-img"
                          />
                        </Link>
                        <button type="button" className="product-item__wishlist">
                          <i className="fas fa-heart" />
                        </button>
                      </div>
                      <div className="product-item__content">
                        <h6 className="product-item__title">
                          <Link scroll={false} href="#" className="link">
                             Static Product 1
                          </Link>
                        </h6>
                        <div className="product-item__info flx-between gap-2">
                          <span className="product-item__author">
                            by
                            <Link scroll={false}
                              href="#"
                              className="link hover-text-decoration-underline"
                            >
                              Static Vendor 1
                            </Link>
                          </span>
                          <div className="flx-align gap-2">
                            <h6 className="product-item__price mb-0">$XX.XX</h6>
                          </div>
                        </div>
                        <div className="product-item__bottom flx-between gap-2">
                          <div>
                            <span className="product-item__sales font-14 mb-2">
                              X Sales
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                   <div className="col-sm-6">
                    <div className="product-item box-shadow">
                      <div className="product-item__thumb d-flex">
                        <Link scroll={false} href="#" className="link w-100">
                          <img
                            src="assets/images/product/product-2.jpg"
                            alt=""
                            className="cover-img"
                          />
                        </Link>
                        <button type="button" className="product-item__wishlist">
                          <i className="fas fa-heart" />
                        </button>
                      </div>
                      <div className="product-item__content">
                        <h6 className="product-item__title">
                          <Link scroll={false} href="#" className="link">
                             Static Product 2
                          </Link>
                        </h6>
                        <div className="product-item__info flx-between gap-2">
                          <span className="product-item__author">
                            by
                            <Link scroll={false}
                              href="#"
                              className="link hover-text-decoration-underline"
                            >
                              Static Vendor 2
                            </Link>
                          </span>
                          <div className="flx-align gap-2">
                            <h6 className="product-item__price mb-0">$XX.XX</h6>
                          </div>
                        </div>
                        <div className="product-item__bottom flx-between gap-2">
                          <div>
                            <span className="product-item__sales font-14 mb-2">
                              X Sales
                            </span>
                          </div>
                        </div>
                      </div>
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

export default FeaturedAuthor;
