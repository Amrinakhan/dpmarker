'use client';
import Link from "next/link";
import React, { useState, useEffect } from "react";


const ProductDetails = () => {
    const [pin, setPin] = useState(['', '', '', '']);
    const [message, setMessage] = useState('');
    const handlePinChange = (i, val) => {
        if (!/^[0-9]?$/.test(val)) return;
        const newPin = [...pin];
        newPin[i] = val;
        setPin(newPin);
        if (val && i < 3) document.getElementById(`pin${i+1}`).focus();
    };
    const handleSubmit = async () => {
        const entered_pin = pin.join('');
        const res = await fetch('http://localhost:4000/redeem-offer', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ restaurant_name: 'Akdeniz', entered_pin })
        });
        const data = await res.json();
        setMessage(data.success ? 'Redeemed!' : data.error);
    };

    useEffect(() => {
        fetch('/api/offers')
            .then(res => res.json())
            .then(data => {
                // Do something with data
                console.log(data);
            });
    }, []);
   
    return (
        <div className="product-details mt-32 padding-b-120">
            <div className="container container-two">
                <div className="row gy-4">
                    <div className="col-lg-8">
                        <div className="tab-content" id="pills-tabContent">
                            <div
                                className="tab-pane fade show active"
                                id="pills-product-details"
                                role="tabpanel"
                                aria-labelledby="pills-product-details-tab"
                                tabIndex={0}
                            >
                                {/* Product Details Content Start */}
                                <div className="product-details">
                                    <div className="product-details__thumb">
                                        <img src="assets/images/thumbs/product-details.png" alt="" />
                                        <div style={{
                                            display: "flex",
                                            justifyContent: "center",
                                            margin: "24px 0"
                                        }}>
                                            <TicketCoupon />
                                        </div>
                                    </div>
                                    <div className="product-details__buttons flx-align justify-content-center gap-3">
                                        <Link scroll={false}
                                            href="#"
                                            className="btn btn-main d-inline-flex align-items-center gap-2 pill px-sm-5 justify-content-center"
                                        >
                                            Live Preview
                                            <img src="assets/images/icons/eye-outline.svg" alt="" />
                                        </Link>
                                        <Link scroll={false}
                                            href="#"
                                            className="screenshot-btn btn btn-white pill px-sm-5"
                                            data-images='["assets/images/thumbs/product-details.png", "assets/images/thumbs/product-details.png"]'
                                        >
                                            Screenshot
                                        </Link>
                                    </div>
                                    <p className="product-details__desc">
                                        System management saas products, consectetur adipiscing elit,
                                        sed do eiusmod tempor incididunt ut labore et dolore magna
                                        aliqua. Ut enim ad minim veniam, quis nostrud exercitation
                                        ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis
                                        aute irure dolor in reprehenderit in voluptate velit esse cillum
                                        dolore eu fugiat nulla pariatur. Excepteur sint occaecat
                                        cupidatat non proident.
                                    </p>
                                    <div className="product-details__item">
                                        <h5 className="product-details__title mb-3">
                                            Template Features
                                        </h5>
                                        <ul className="product-list">
                                            <li className="product-list__item">
                                                Modern and Professional design
                                            </li>
                                            <li className="product-list__item">
                                                Built with Elementor Pro
                                            </li>
                                            <li className="product-list__item">
                                                100% Responsive &amp; mobile-friendly
                                            </li>
                                            <li className="product-list__item">
                                                12+ pre-built templates
                                            </li>
                                            <li className="product-list__item">Easy to customize</li>
                                            <li className="product-list__item">
                                                Fully responsive website
                                            </li>
                                        </ul>
                                    </div>
                                    <div className="product-details__item">
                                        <h5 className="product-details__title mb-3">Layout Features</h5>
                                        <ul className="product-list">
                                            <li className="product-list__item">One-Click demo import</li>
                                            <li className="product-list__item">Unlimited color style</li>
                                            <li className="product-list__item">850+ google fonts</li>
                                            <li className="product-list__item">Powered by dpmarket</li>
                                            <li className="product-list__item">
                                                Hight resolution images
                                            </li>
                                            <li className="product-list__item">Easy to customize</li>
                                        </ul>
                                    </div>
                                    <div className="product-details__item">
                                        <h5 className="product-details__title mb-3">Font Family</h5>
                                        <ul className="product-list">
                                            <li className="product-list__item text-heading">
                                                <Link scroll={false}
                                                    href="https://fonts.google.com/specimen/Fira+Sans?query=fira"
                                                    className="link text-body hover-text-main hover-text-decoration-underline"
                                                >
                                                    Fira Sans
                                                </Link>
                                            </li>
                                            <li className="product-list__item text-heading">
                                                <Link scroll={false}
                                                    href="https://fonts.google.com/specimen/Inter?query=inter"
                                                    className="link text-body hover-text-main hover-text-decoration-underline"
                                                >
                                                    Inter
                                                </Link>
                                            </li>
                                        </ul>
                                    </div>
                                    <div className="product-details__item">
                                        <h5 className="product-details__title mb-3">Support</h5>
                                        <p className="product-details__desc">
                                            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                                            do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                                            Ut enim ad minim veniam, quis nostrud exercitation ullamco
                                            laboris nisi ut aliquip ex ea commodo consequat. Duis aute
                                            irure dolor in reprehenderit in voluptate velit esse cillum
                                            dolore eu fugiat nulla pariatur. Excepteur sint occaecat
                                            cupidatat non proident.
                                        </p>
                                    </div>
                                    <div className="more-item">
                                        <div className="flx-between mb-4">
                                            <h5 className="more-item__title">More Items</h5>
                                            <Link scroll={false}
                                                href="/profile"
                                                className="text-heading fw-500 hover-text-decoration-underline"
                                            >
                                                View Author Profile
                                            </Link>
                                        </div>
                                        <div className="more-item__content flx-align">
                                            <div className="more-item__item">
                                                <Link scroll={false}
                                                    href="/all-product"
                                                    className="link w-100 h-100 d-block"
                                                >
                                                    <img src="assets/images/thumbs/more-item1.png" alt="" />
                                                </Link>
                                            </div>
                                            <div className="more-item__item">
                                                <Link scroll={false}
                                                    href="/all-product"
                                                    className="link w-100 h-100 d-block"
                                                >
                                                    <img src="assets/images/thumbs/more-item2.png" alt="" />
                                                </Link>
                                            </div>
                                            <div className="more-item__item">
                                                <Link scroll={false}
                                                    href="/all-product"
                                                    className="link w-100 h-100 d-block"
                                                >
                                                    <img src="assets/images/thumbs/more-item3.png" alt="" />
                                                </Link>
                                            </div>
                                            <div className="more-item__item">
                                                <Link scroll={false}
                                                    href="/all-product"
                                                    className="link w-100 h-100 d-block"
                                                >
                                                    <img src="assets/images/thumbs/more-item4.png" alt="" />
                                                </Link>
                                            </div>
                                            <div className="more-item__item">
                                                <Link scroll={false}
                                                    href="/all-product"
                                                    className="link w-100 h-100 d-block"
                                                >
                                                    <img src="assets/images/thumbs/more-item5.png" alt="" />
                                                </Link>
                                            </div>
                                            <div className="more-item__item">
                                                <Link scroll={false}
                                                    href="/all-product"
                                                    className="link w-100 h-100 d-block"
                                                >
                                                    <img src="assets/images/thumbs/more-item6.png" alt="" />
                                                </Link>
                                            </div>
                                            <div className="more-item__item">
                                                <Link scroll={false}
                                                    href="/all-product"
                                                    className="link w-100 h-100 d-block"
                                                >
                                                    <img src="assets/images/thumbs/more-item7.png" alt="" />
                                                </Link>
                                            </div>
                                            <div className="more-item__item">
                                                <Link scroll={false}
                                                    href="/all-product"
                                                    className="link w-100 h-100 d-block"
                                                >
                                                    <img src="assets/images/thumbs/more-item8.png" alt="" />
                                                </Link>
                                            </div>
                                            <div className="more-item__item">
                                                <Link scroll={false}
                                                    href="/all-product"
                                                    className="link w-100 h-100 d-block"
                                                >
                                                    <img src="assets/images/thumbs/more-item9.png" alt="" />
                                                </Link>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                {/* Product Details Content End */}
                            </div>
                            <div
                                className="tab-pane fade"
                                id="pills-rating"
                                role="tabpanel"
                                aria-labelledby="pills-rating-tab"
                                tabIndex={0}
                            >
                                <div className="product-review-wrapper">
                                    <div className="product-review">
                                        <div className="product-review__top flx-between">
                                            <div className="product-review__rating flx-align">
                                                <div className="d-flex align-items-center gap-1">
                                                    <ul className="star-rating">
                                                        <li className="star-rating__item font-11">
                                                            <i className="fas fa-star" />
                                                        </li>
                                                        <li className="star-rating__item font-11">
                                                            <i className="fas fa-star" />
                                                        </li>
                                                        <li className="star-rating__item font-11">
                                                            <i className="fas fa-star" />
                                                        </li>
                                                        <li className="star-rating__item font-11">
                                                            <i className="fas fa-star" />
                                                        </li>
                                                        <li className="star-rating__item font-11">
                                                            <i className="fas fa-star" />
                                                        </li>
                                                    </ul>
                                                    <span className="star-rating__text text-body"> 5.0</span>
                                                </div>
                                                <span className="product-review__reason">
                                                    For{" "}
                                                    <span className="product-review__subject">
                                                        Customer Support
                                                    </span>{" "}
                                                </span>
                                            </div>
                                            <div className="product-review__date">
                                                by{" "}
                                                <Link scroll={false} href="#" className="product-review__user text--base">
                                                    John Doe{" "}
                                                </Link>{" "}
                                                2 month ago
                                            </div>
                                        </div>
                                        <div className="product-review__body">
                                            <p className="product-review__desc">
                                                Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                                                Quibusdam itaque vitae ex possimus delectus? Voluptas
                                                expedita accusantium aperiam quo quod dolore dignissimos
                                                rerum praesentium deserunt libero recusandae quisquam est
                                                accusamus eos dolorum sit explicabo, sapiente pariatur
                                                voluptates veniam aut veritatis, magnam velit similique! Ex
                                                similique magni labore aperiam, eius quas molestiae
                                                accusantium porro eaque esse minus amet doloribus quo odit
                                                illo doloremque.
                                            </p>
                                        </div>
                                    </div>
                                    <div className="product-review">
                                        <div className="product-review__top flx-between">
                                            <div className="product-review__rating flx-align">
                                                <div className="d-flex align-items-center gap-1">
                                                    <ul className="star-rating">
                                                        <li className="star-rating__item font-11">
                                                            <i className="fas fa-star" />
                                                        </li>
                                                        <li className="star-rating__item font-11">
                                                            <i className="fas fa-star" />
                                                        </li>
                                                        <li className="star-rating__item font-11">
                                                            <i className="fas fa-star" />
                                                        </li>
                                                        <li className="star-rating__item font-11">
                                                            <i className="fas fa-star" />
                                                        </li>
                                                        <li className="star-rating__item font-11">
                                                            <i className="fas fa-star" />
                                                        </li>
                                                    </ul>
                                                    <span className="star-rating__text text-body"> 5.0</span>
                                                </div>
                                                <span className="product-review__reason">
                                                    For{" "}
                                                    <span className="product-review__subject">
                                                        Customer Support
                                                    </span>{" "}
                                                </span>
                                            </div>
                                            <div className="product-review__date">
                                                by{" "}
                                                <Link scroll={false} href="#" className="product-review__user text--base">
                                                    John Doe{" "}
                                                </Link>{" "}
                                                2 month ago
                                            </div>
                                        </div>
                                        <div className="product-review__body">
                                            <p className="product-review__desc">
                                                Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                                                Quibusdam itaque vitae ex possimus delectus? Voluptas
                                                expedita accusantium aperiam quo quod dolore dignissimos
                                                rerum praesentium deserunt libero recusandae quisquam est
                                                accusamus eos dolorum sit explicabo, sapiente pariatur
                                                voluptates veniam aut veritatis, magnam velit similique! Ex
                                                similique magni labore aperiam, eius quas molestiae
                                                accusantium porro eaque esse minus amet doloribus quo odit
                                                illo doloremque.
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div
                                className="tab-pane fade"
                                id="pills-comments"
                                role="tabpanel"
                                aria-labelledby="pills-comments-tab"
                                tabIndex={0}
                            >
                                {/* Comment Start */}
                                <div className="comment mt-64 mb-64">
                                    <h5 className="mb-32">2 Comments</h5>
                                    <ul className="comment-list">
                                        <li className="comment-list__item d-flex align-items-start gap-sm-4 gap-3">
                                            <div className="comment-list__thumb flex-shrink-0">
                                                <img
                                                    src="assets/images/thumbs/comment1.png"
                                                    className="cover-img"
                                                    alt=""
                                                />
                                            </div>
                                            <div className="comment-list__content">
                                                <div className="flx-between gap-2 align-items-start">
                                                    <div>
                                                        <h6 className="comment-list__name font-18 mb-sm-2 mb-1">
                                                            Jenny Wilson
                                                        </h6>
                                                        <span className="comment-list__date font-14">
                                                            Jan 21, 2024 at 11:25 pm
                                                        </span>
                                                    </div>
                                                    <Link scroll={false}
                                                        className="comment-list__reply fw-500 flx-align gap-2 hover-text-decoration-underline"
                                                        href="#comment-box"
                                                    >
                                                        Reply
                                                        <span className="icon">
                                                            <img
                                                                src="assets/images/icons/reply-icon.svg"
                                                                alt=""
                                                            />
                                                        </span>
                                                    </Link>
                                                </div>
                                                <p className="comment-list__desc mt-3">
                                                    Lorem ipsum dolor sit amet consectetur. Nec nunc
                                                    pellentesque massa pretium. Quam sapien nec venenatis
                                                    vivamus sed cras faucibus mi viverra. Quam faucibus morbi
                                                    cras vitae neque. Necnunc pellentesque massa pretium.
                                                </p>
                                            </div>
                                        </li>
                                        <li>
                                            <ul className="comment-list comment-list--two">
                                                <li className="comment-list__item d-flex align-items-start gap-sm-4 gap-3">
                                                    <div className="comment-list__thumb flex-shrink-0">
                                                        <img
                                                            src="assets/images/thumbs/comment2.png"
                                                            className="cover-img"
                                                            alt=""
                                                        />
                                                    </div>
                                                    <div className="comment-list__content">
                                                        <div className="flx-between gap-2 align-items-start">
                                                            <div>
                                                                <h6 className="comment-list__name font-18 mb-sm-2 mb-1">
                                                                    Courtney Henry
                                                                </h6>
                                                                <span className="comment-list__date font-14">
                                                                    Jan 21, 2024 at 11:25 pm
                                                                </span>
                                                            </div>
                                                            <Link scroll={false}
                                                                className="comment-list__reply fw-500 flx-align gap-2 hover-text-decoration-underline"
                                                                href="#comment-box"
                                                            >
                                                                Reply
                                                                <span className="icon">
                                                                    <img
                                                                        src="assets/images/icons/reply-icon.svg"
                                                                        alt=""
                                                                    />
                                                                </span>
                                                            </Link>
                                                        </div>
                                                        <p className="comment-list__desc mt-3">
                                                            Lorem ipsum dolor sit amet consectetur. Nec nunc
                                                            pellentesque massa pretium. Quam sapien nec venenatis
                                                            vivamus sed cras faucibus.
                                                        </p>
                                                    </div>
                                                </li>
                                            </ul>
                                        </li>
                                    </ul>
                                </div>
                                {/* Comment End */}
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-4">
                        {/* ======================= Product Sidebar Start ========================= */}
                        <div className="product-sidebar section-bg">
                            <div className="product-sidebar__top position-relative flx-between gap-1">
                                <button
                                    type="button"
                                    className="btn-has-dropdown font-heading font-18"
                                >
                                    Extended License
                                </button>
                                <div className="license-dropdown">
                                    <div className="license-dropdown__item mb-3">
                                        <h6 className="license-dropdown__title font-body mb-1 font-16">
                                            Regular License
                                        </h6>
                                        <p className="license-dropdown__desc font-13">
                                            Use, by you or one client, in a solitary finished result which
                                            end clients are not charged for. The complete cost
                                            incorporates the thing cost and a purchaser expense..
                                        </p>
                                    </div>
                                    <div className="license-dropdown__item">
                                        <h6 className="license-dropdown__title font-body mb-1 font-16">
                                            Extended License
                                        </h6>
                                        <p className="license-dropdown__desc font-13">
                                            Use, by you or one client, in a solitary final result which
                                            end clients can be charged for. The all out cost incorporates
                                            the thing cost and a purchaser expense.
                                        </p>
                                    </div>
                                    <div className="mt-3 pt-2 border-top text-center ">
                                        <Link scroll={false}
                                            href="#"
                                            className="link hover-text-decoration-underline font-14 text-main fw-500"
                                        >
                                            View License Details
                                        </Link>
                                    </div>
                                </div>
                                <h6 className="product-sidebar__title">$1580.00</h6>
                            </div>
                            <ul className="sidebar-list">
                                <li className="sidebar-list__item flx-align gap-2 font-14 fw-300 mb-2">
                                    <span className="icon">
                                        <img src="assets/images/icons/check-cirlce.svg" alt="" />
                                    </span>
                                    <span className="text">Quality verified</span>
                                </li>
                                <li className="sidebar-list__item flx-align gap-2 font-14 fw-300 mb-2">
                                    <span className="icon">
                                        <img src="assets/images/icons/check-cirlce.svg" alt="" />
                                    </span>
                                    <span className="text">Use for a single project</span>
                                </li>
                                <li className="sidebar-list__item flx-align gap-2 font-14 fw-300">
                                    <span className="icon">
                                        <img src="assets/images/icons/check-cirlce.svg" alt="" />
                                    </span>
                                    <span className="text">Non-paying users only</span>
                                </li>
                            </ul>
                            <div className="flx-between mt-3">
                                <div className="common-check mb-0">
                                    <input
                                        className="form-check-input"
                                        type="checkbox"
                                        name="checkbox"
                                        id="extended"
                                    />
                                    <label
                                        className="form-check-label mb-0 fw-300 text-body"
                                        htmlFor="extended"
                                    >
                                        Extended support 12 month
                                    </label>
                                </div>
                                <div className="flx-align gap-2">
                                    <span className="product-item__prevPrice text-decoration-line-through">
                                        $12
                                    </span>
                                    <h6 className="product-item__price mb-0 font-14 fw-500">$7.25</h6>
                                </div>
                            </div>
                            <button
                                type="button"
                                className="btn btn-main d-flex w-100 justify-content-center align-items-center gap-2 pill px-sm-5 mt-32"
                            >
                                <img src="assets/images/icons/add-to-cart.svg" alt="" />
                                Add To Cart
                            </button>
                            {/* Author Details Start*/}
                            <div className="author-details">
                                <div className="d-flex align-items-center gap-2">
                                    <div className="author-details__thumb flex-shrink-0">
                                        <img src="assets/images/thumbs/author-details-img.png" alt="" />
                                    </div>
                                    <div className="author-details__content">
                                        <h6 className="author-details__name font-18 mb-2">
                                            <Link scroll={false} href="/profile" className="link hover-text-main">
                                                Oviousdev
                                            </Link>
                                        </h6>
                                        <span className="d-flex align-items-center gap-1">
                                            <span className="star-rating">
                                                <span className="star-rating__item font-11">
                                                    <i className="fas fa-star" />
                                                </span>
                                                <span className="star-rating__item font-11">
                                                    <i className="fas fa-star" />
                                                </span>
                                                <span className="star-rating__item font-11">
                                                    <i className="fas fa-star" />
                                                </span>
                                                <span className="star-rating__item font-11">
                                                    <i className="fas fa-star" />
                                                </span>
                                                <span className="star-rating__item font-11">
                                                    <i className="fas fa-star" />
                                                </span>
                                            </span>
                                            <span className="star-rating__text text-body"> 5.0</span>
                                        </span>
                                    </div>
                                </div>
                                <ul className="badge-list flx-align gap-2 mt-3">
                                    <li
                                        className="badge-list__item"
                                        data-bs-toggle="tooltip"
                                        data-bs-placement="top"
                                        data-bs-title="Badge Info"
                                    >
                                        <img src="assets/images/thumbs/badge1.png" alt="" />
                                    </li>
                                    <li
                                        className="badge-list__item"
                                        data-bs-toggle="tooltip"
                                        data-bs-placement="top"
                                        data-bs-title="Badge Info"
                                    >
                                        <img src="assets/images/thumbs/badge2.png" alt="" />
                                    </li>
                                    <li
                                        className="badge-list__item"
                                        data-bs-toggle="tooltip"
                                        data-bs-placement="top"
                                        data-bs-title="Badge Info"
                                    >
                                        <img src="assets/images/thumbs/badge3.png" alt="" />
                                    </li>
                                    <li
                                        className="badge-list__item"
                                        data-bs-toggle="tooltip"
                                        data-bs-placement="top"
                                        data-bs-title="Badge Info"
                                    >
                                        <img src="assets/images/thumbs/badge4.png" alt="" />
                                    </li>
                                    <li
                                        className="badge-list__item"
                                        data-bs-toggle="tooltip"
                                        data-bs-placement="top"
                                        data-bs-title="Badge Info"
                                    >
                                        <img src="assets/images/thumbs/badge5.png" alt="" />
                                    </li>
                                    <li
                                        className="badge-list__item"
                                        data-bs-toggle="tooltip"
                                        data-bs-placement="top"
                                        data-bs-title="Badge Info"
                                    >
                                        <img src="assets/images/thumbs/badge6.png" alt="" />
                                    </li>
                                    <li
                                        className="badge-list__item"
                                        data-bs-toggle="tooltip"
                                        data-bs-placement="top"
                                        data-bs-title="Badge Info"
                                    >
                                        <img src="assets/images/thumbs/badge7.png" alt="" />
                                    </li>
                                    <li
                                        className="badge-list__item"
                                        data-bs-toggle="tooltip"
                                        data-bs-placement="top"
                                        data-bs-title="Badge Info"
                                    >
                                        <img src="assets/images/thumbs/badge8.png" alt="" />
                                    </li>
                                </ul>
                                <Link scroll={false}
                                    href="/profile"
                                    className="btn btn-outline-light w-100 pill mt-32"
                                >
                                    View Portfolio
                                </Link>
                            </div>
                            {/* Author Details End */}
                            {/* Meta Attribute List Start */}
                            <ul className="meta-attribute">
                                <li className="meta-attribute__item">
                                    <span className="name">Last Update</span>
                                    <span className="details">Feb 21, 2024</span>
                                </li>
                                <li className="meta-attribute__item">
                                    <span className="name">Published</span>
                                    <span className="details">Feb 15, 2024</span>
                                </li>
                                <li className="meta-attribute__item">
                                    <span className="name">Category</span>
                                    <span className="details">Themes</span>
                                </li>
                                <li className="meta-attribute__item">
                                    <span className="name">Widget Ready</span>
                                    <span className="details">Yes</span>
                                </li>
                                <li className="meta-attribute__item">
                                    <span className="name">High Resolution</span>
                                    <span className="details">Yes</span>
                                </li>
                                <li className="meta-attribute__item">
                                    <span className="name">Copatible with</span>
                                    <span className="details">
                                        <Link scroll={false} href="#" className="hover-text-decoration-underline">
                                            Contact Form 7,
                                        </Link>
                                        <Link scroll={false} href="#" className="hover-text-decoration-underline">
                                            {" "}
                                            Calendar,
                                        </Link>
                                        <Link scroll={false} href="#" className="hover-text-decoration-underline">
                                            {" "}
                                            Elementor,
                                        </Link>
                                        <Link scroll={false} href="#" className="hover-text-decoration-underline">
                                            {" "}
                                            Elementor Pro,
                                        </Link>
                                        <Link scroll={false} href="#" className="hover-text-decoration-underline">
                                            {" "}
                                            WooCommerce 8.x.x
                                        </Link>
                                    </span>
                                </li>
                                <li className="meta-attribute__item">
                                    <span className="name">File size</span>
                                    <span className="details">85 MB</span>
                                </li>
                                <li className="meta-attribute__item">
                                    <span className="name">Framework</span>
                                    <span className="details">Underscores</span>
                                </li>
                                <li className="meta-attribute__item">
                                    <span className="name">Software Version</span>
                                    <span className="details">
                                        <Link scroll={false} href="#" className="hover-text-decoration-underline">
                                            WordPress 6.3.x,
                                        </Link>
                                        <Link scroll={false} href="#" className="hover-text-decoration-underline">
                                            WordPress 6.2.x,
                                        </Link>
                                        <Link scroll={false} href="#" className="hover-text-decoration-underline">
                                            WordPress 6.1.x,
                                        </Link>
                                        <Link scroll={false} href="#" className="hover-text-decoration-underline">
                                            WordPress 6.0.x,
                                        </Link>
                                        <Link scroll={false} href="#" className="hover-text-decoration-underline">
                                            WordPress 5.9.x,
                                        </Link>
                                    </span>
                                </li>
                                <li className="meta-attribute__item">
                                    <span className="name">Marketplace Files Included</span>
                                    <span className="details">
                                        <Link scroll={false} href="#" className="hover-text-decoration-underline">
                                            PHP Files,
                                        </Link>
                                        <Link scroll={false} href="#" className="hover-text-decoration-underline">
                                            CSS Files,
                                        </Link>
                                        <Link scroll={false} href="#" className="hover-text-decoration-underline">
                                            SCSS Files,
                                        </Link>
                                        <Link scroll={false} href="#" className="hover-text-decoration-underline">
                                            JS Files,
                                        </Link>
                                    </span>
                                </li>
                                <li className="meta-attribute__item">
                                    <span className="name">Layout</span>
                                    <span className="details">Responsive</span>
                                </li>
                                <li className="meta-attribute__item">
                                    <span className="name">Tags</span>
                                    <span className="details">
                                        <Link scroll={false} href="#" className="hover-text-decoration-underline">
                                            theme,
                                        </Link>
                                        <Link scroll={false} href="#" className="hover-text-decoration-underline">
                                            web design,
                                        </Link>
                                        <Link scroll={false} href="#" className="hover-text-decoration-underline">
                                            minimal design,
                                        </Link>
                                        <Link scroll={false} href="#" className="hover-text-decoration-underline">
                                            trendy,
                                        </Link>
                                        <Link scroll={false} href="#" className="hover-text-decoration-underline">
                                            responsive,
                                        </Link>
                                        <Link scroll={false} href="#" className="hover-text-decoration-underline">
                                            wordpress,
                                        </Link>
                                        <Link scroll={false} href="#" className="hover-text-decoration-underline">
                                            saas,
                                        </Link>
                                        <Link scroll={false} href="#" className="hover-text-decoration-underline">
                                            dashboard,
                                        </Link>
                                    </span>
                                </li>
                            </ul>
                            {/* Meta Attribute List End */}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

function TicketCoupon() {
    const [isCopied, setIsCopied] = useState(false);
    const [showModal, setShowModal] = useState(false);

    const handleCopy = (e) => {
        e.stopPropagation(); // Prevent modal from opening when clicking copy
        navigator.clipboard.writeText("SAVE25NOW");
        setIsCopied(true);
        setTimeout(() => setIsCopied(false), 1200);
    };

    return (
        <>
            <div
                style={{
                    display: "flex",
                    background: "linear-gradient(90deg, #36c6f0 0%, #eaf6fd 100%)",
                    borderRadius: "16px",
                    boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
                    minWidth: 340,
                    maxWidth: 480,
                    alignItems: "center",
                    overflow: "hidden",
                    cursor: "pointer",
                }}
                onClick={() => setShowModal(true)}
            >
                {/* Left ticket stub */}
                <div style={{
                    background: "#1da1f2",
                    color: "#fff",
                    padding: "28px 36px",
                    fontWeight: "bold",
                    fontSize: "1.3rem",
                    textAlign: "center",
                    borderTopLeftRadius: "16px",
                    borderBottomLeftRadius: "16px",
                    minWidth: 100,
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center"
                }}>
                    Save<br />$25
                </div>
                {/* Perforation effect */}
                <div style={{
                    width: 12,
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                    alignItems: "center",
                    background: "transparent"
                }}>
                    {[...Array(8)].map((_, i) => (
                        <span key={i} style={{
                            width: 6,
                            height: 6,
                            background: "#fff",
                            borderRadius: "50%",
                            margin: "4px 0"
                        }} />
                    ))}
                </div>
                {/* Right content */}
                <div style={{
                    flex: 1,
                    padding: "20px 28px",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center"
                }}>
                    <div style={{ fontWeight: 600, fontSize: "1.1rem", marginBottom: 8 }}>
                        Use code below and save instantly!
                    </div>
                    <div style={{
                        display: "flex",
                        alignItems: "center",
                        gap: 12
                    }}>
                        <span style={{
                            fontFamily: "monospace",
                            background: "#eaf6fd",
                            padding: "6px 16px",
                            borderRadius: "8px",
                            fontSize: "1.1rem",
                            letterSpacing: 2,
                            color: "#1da1f2",
                            border: "1px dashed #36c6f0"
                        }}>
                            SAVE25NOW
                        </span>
                        <button
                            onClick={handleCopy}
                            style={{
                                background: "#1da1f2",
                                color: "#fff",
                                border: "none",
                                borderRadius: "6px",
                                padding: "6px 16px",
                                fontWeight: 500,
                                cursor: "pointer",
                                transition: "background 0.2s"
                            }}
                        >
                            {isCopied ? "Copied!" : "Copy"}
                        </button>
                    </div>
                </div>
            </div>
            {showModal && <CouponModal onClose={() => setShowModal(false)} />}
        </>
    );
}

function CouponModal({ onClose }) {
    const [pin, setPin] = React.useState(["", "", "", ""]);
    const pinRefs = [React.useRef(), React.useRef(), React.useRef(), React.useRef()];

    // Handle PIN input and auto-tab
    const handlePinChange = (idx, e) => {
        const val = e.target.value.replace(/[^0-9]/g, "").slice(0, 1);
        const newPin = [...pin];
        newPin[idx] = val;
        setPin(newPin);
        if (val && idx < 3) {
            pinRefs[idx + 1].current.focus();
        }
        if (!val && idx > 0 && e.nativeEvent.inputType === "deleteContentBackward") {
            pinRefs[idx - 1].current.focus();
        }
    };

    // Modal animation
    const [show, setShow] = React.useState(false);
    React.useEffect(() => {
        setTimeout(() => setShow(true), 10);
    }, []);

    const handleSubmit = async () => {
        const enteredPin = pin.join('');
        if (enteredPin.length !== 4) {
            alert('Please enter a 4-digit PIN');
            return;
        }
        const res = await fetch('/api/redeem', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                restaurant_name: 'Akdeniz',
                pin_code: enteredPin
            })
        });
        const data = await res.json();
        if (data.success) {
            alert('PIN saved!');
            onClose();
        } else {
            alert('Error: ' + data.error);
        }
    };

    return (
        <div style={{
            position: "fixed",
            top: 0, left: 0, right: 0, bottom: 0,
            background: "rgba(30,40,60,0.22)",
            zIndex: 1000,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            backdropFilter: "blur(6px)",
            transition: "background 0.3s"
        }}>
            <div style={{
                background: "rgba(255,255,255,0.92)",
                borderRadius: 28,
                maxWidth: 390,
                width: "94%",
                padding: "0 0 28px 0",
                boxShadow: "0 8px 32px 0 rgba(30,60,90,0.16)",
                position: "relative",
                fontFamily: "'Inter', 'Segoe UI', Arial, sans-serif",
                border: "1.5px solid #eaf6fd",
                overflow: "hidden",
                transform: show ? "translateY(0) scale(1)" : "translateY(40px) scale(0.98)",
                opacity: show ? 1 : 0,
                transition: "all 0.35s cubic-bezier(.4,1.4,.6,1)",
            }}>
                {/* Header with icon */}
                <div style={{
                    background: "linear-gradient(90deg, #36c6f0 0%, #eaf6fd 100%)",
                    borderTopLeftRadius: 28,
                    borderTopRightRadius: 28,
                    padding: "28px 0 18px 0",
                    textAlign: "center",
                    position: "relative",
                    boxShadow: "0 2px 12px #eaf6fd"
                }}>
                    {/* Floating Close button */}
                    <button
                        onClick={onClose}
                        style={{
                            position: "absolute",
                            top: 18,
                            right: 18,
                            background: "rgba(255,255,255,0.7)",
                            border: "none",
                            fontSize: 24,
                            cursor: "pointer",
                            color: "#1da1f2",
                            borderRadius: "50%",
                            width: 36,
                            height: 36,
                            boxShadow: "0 2px 8px rgba(30,60,90,0.10)",
                            transition: "background 0.2s, color 0.2s"
                        }}
                        onMouseOver={e => e.currentTarget.style.background = '#eaf6fd'}
                        onMouseOut={e => e.currentTarget.style.background = 'rgba(255,255,255,0.7)'}
                        aria-label="Close"
                    >×</button>
                    {/* Tablet/Menu Icon */}
                    <div style={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        marginBottom: 10
                    }}>
                        <div style={{
                            background: "#fff",
                            borderRadius: 16,
                            width: 54,
                            height: 54,
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            boxShadow: "0 2px 8px #eaf6fd"
                        }}>
                            {/* Tablet/Menu SVG icon */}
                            <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
                                <rect x="5" y="7" width="22" height="18" rx="4" fill="#eaf6fd" stroke="#1da1f2" strokeWidth="2" />
                                <rect x="10" y="12" width="12" height="2.5" rx="1.25" fill="#1da1f2" />
                                <rect x="10" y="17" width="8" height="2.5" rx="1.25" fill="#1da1f2" />
                            </svg>
                        </div>
                    </div>
                    <div style={{ fontWeight: 700, fontSize: 24, color: "#1da1f2", letterSpacing: 0.5, marginBottom: 2 }}>
                        Main Course
                    </div>
                    <div style={{ color: "#6b7a90", fontSize: 15, fontWeight: 500 }}>
                        of equal or lesser value
                    </div>
                </div>
                {/* Icons row */}
                <div style={{
                    display: "flex",
                    justifyContent: "center",
                    gap: 36,
                    margin: "22px 0 0 0"
                }}>
                    <div style={{ textAlign: "center" }}>
                        <div style={{
                            border: "2px solid #1da1f2",
                            borderRadius: 12,
                            width: 44,
                            height: 44,
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            margin: "0 auto 6px auto",
                            fontWeight: 700,
                            color: "#1da1f2",
                            fontSize: 18,
                            background: "#eaf6fd",
                            transition: "box-shadow 0.2s"
                        }}>
                            2<span style={{ fontSize: 13, fontWeight: 400 }}>&nbsp;for&nbsp;1</span>
                        </div>
                        <div style={{ fontSize: 13, color: "#6b7a90", fontWeight: 500, marginTop: 2 }}>Buy 1 Get 1 Free</div>
                    </div>
                    <div style={{ textAlign: "center" }}>
                        <div style={{
                            border: "2px solid #1da1f2",
                            borderRadius: 12,
                            width: 44,
                            height: 44,
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            margin: "0 auto 6px auto",
                            fontWeight: 700,
                            color: "#1da1f2",
                            fontSize: 22,
                            background: "#eaf6fd",
                            transition: "box-shadow 0.2s"
                        }}>
                            🍽️
                        </div>
                        <div style={{ fontSize: 13, color: "#6b7a90", fontWeight: 500, marginTop: 2 }}>Dine-in Only</div>
                    </div>
                </div>
                {/* Savings */}
                <div style={{ textAlign: "center", color: "#6b7a90", fontSize: 15, margin: "22px 0 4px 0", fontWeight: 500 }}>
                    Your Estimated Savings
                </div>
                <div style={{ textAlign: "center", color: "#1da1f2", fontWeight: 800, fontSize: 32, marginBottom: 12, letterSpacing: 1 }}>
                    OMR 4
                </div>
                {/* PIN input modern boxes */}
                <div style={{ textAlign: "center", marginBottom: 10, color: "#6b7a90", fontSize: 16, fontWeight: 500 }}>
                    Please ask Akdeniz to enter their PIN
                </div>
                <div style={{
                    display: "flex",
                    justifyContent: "center",
                    gap: 12,
                    marginBottom: 10
                }}>
                    {[0,1,2,3].map(i => (
                        <input
                            key={i}
                            ref={pinRefs[i]}
                            type="text"
                            inputMode="numeric"
                            maxLength={1}
                            value={pin[i]}
                            onChange={e => handlePinChange(i, e)}
                            style={{
                                width: 38,
                                height: 44,
                                borderRadius: 10,
                                background: pin[i] ? "#d0f1ff" : "#f4fafd",
                                border: pin[i] ? "2px solid #36c6f0" : "2px solid #eaf6fd",
                                textAlign: "center",
                                fontSize: 26,
                                color: "#1da1f2",
                                fontWeight: 700,
                                boxShadow: pin[i] ? "0 2px 8px #b6eaff" : "0 1px 4px #eaf6fd",
                                outline: "none",
                                transition: "all 0.18s"
                            }}
                            onFocus={e => e.target.select()}
                        />
                    ))}
                </div>
                <div style={{ textAlign: "center", color: "#bcdff6", fontSize: 13, marginBottom: 14, fontWeight: 600, letterSpacing: 1 }}>
                    Valid to 31 DEC 2021
                </div>
                <div style={{ borderTop: "1.5px solid #eaf6fd", margin: "14px 0 10px 0" }} />
                <div style={{ textAlign: "center", color: "#6b7a90", fontSize: 13, fontWeight: 500 }}>
                    Offers are subject to <a href="#" style={{ color: "#1da1f2", textDecoration: "underline", fontWeight: 600, transition: "color 0.2s" }}
                        onMouseOver={e => e.currentTarget.style.color = '#36c6f0'}
                        onMouseOut={e => e.currentTarget.style.color = '#1da1f2'}
                    >Rules of Use</a>
                </div>
                <button
                    style={{
                        margin: "12px auto 0 auto",
                        display: "block",
                        background: "#1da1f2",
                        color: "#fff",
                        border: "none",
                        borderRadius: "8px",
                        padding: "10px 32px",
                        fontWeight: 600,
                        fontSize: 16,
                        cursor: "pointer"
                    }}
                    onClick={handleSubmit}
                >
                    Submit PIN
                </button>
            </div>
        </div>
    );
}

export default ProductDetails;

