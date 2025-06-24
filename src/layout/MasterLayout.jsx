'use client'
import ThemeToggle from "@/components/ThemeToggle";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

const MasterLayout = ({ children }) => {
    let pathname = usePathname();
    let [active, setActive] = useState(false)
    let [show, setShow] = useState(false)
    let dashboardControl = () => {
        setActive(!active)
    }
    let showProfileControl = () => {
        setShow(!show)
    }


    
    return (
        <>

            <div className="mobile-menu d-lg-none d-block" >
                <button type="button" className="close-button text-body hover-text-main" >
                    {" "}
                    <i className="las la-times" />{" "}
                </button>
                <div className="mobile-menu__inner">
                    <Link scroll={false} href="/" className="mobile-menu__logo">
                        <img
                            src="assets/images/logo/logo.png"
                            alt="Logo"
                            className="white-version"
                        />
                        <img
                            src="assets/images/logo/white-logo-two.png"
                            alt="Logo"
                            className="dark-version"
                        />
                    </Link>
                    <div className="mobile-menu__menu">
                        <ul className="nav-menu flx-align nav-menu--mobile">
                            <li className="nav-menu__item has-submenu">
                                <Link scroll={false} href="#" className="nav-menu__link">
                                    Home
                                </Link>
                            </li>
                            <li className="nav-menu__item has-submenu">
                                <Link scroll={false} href="/#" className="nav-menu__link">
                                    Products
                                </Link>
                                <ul className="nav-submenu">
                                    <li className="nav-submenu__item">
                                        <Link scroll={false} href="/all-product" className="nav-submenu__link">
                                            {" "}
                                            All Products
                                        </Link>
                                    </li>
                                    <li className="nav-submenu__item">
                                        <Link scroll={false} href="/product-details" className="nav-submenu__link">
                                            {" "}
                                            Product Details
                                        </Link>
                                    </li>
                                </ul>
                            </li>
                            <li className="nav-menu__item has-submenu">
                                <Link scroll={false} href="/#" className="nav-menu__link">
                                    Pages
                                </Link>
                                <ul className="nav-submenu">
                                    <li className="nav-submenu__item">
                                        <Link scroll={false} href="/profile" className="nav-submenu__link">
                                            {" "}
                                            Profile
                                        </Link>
                                    </li>
                                    <li className="nav-submenu__item">
                                        <Link scroll={false} href="/cart" className="nav-submenu__link">
                                            {" "}
                                            Shopping Cart
                                        </Link>
                                    </li>
                                    <li className="nav-submenu__item">
                                        <Link scroll={false} href="/cart-personal" className="nav-submenu__link">
                                            {" "}
                                            Mailing Address
                                        </Link>
                                    </li>
                                    <li className="nav-submenu__item">
                                        <Link scroll={false} href="/cart-payment" className="nav-submenu__link">
                                            {" "}
                                            Payment Method
                                        </Link>
                                    </li>
                                    <li className="nav-submenu__item">
                                        <Link scroll={false} href="/cart-thank-you" className="nav-submenu__link">
                                            {" "}
                                            Preview Order
                                        </Link>
                                    </li>
                                    <li className="nav-submenu__item">
                                        <Link scroll={false} href="/dashboard" className="nav-submenu__link">
                                            {" "}
                                            Dashboard
                                        </Link>
                                    </li>
                                </ul>
                            </li>
                            <li className="nav-menu__item has-submenu">
                                <Link scroll={false} href="/#" className="nav-menu__link">
                                    Blog
                                </Link>
                                <ul className="nav-submenu">
                                    <li className="nav-submenu__item">
                                        <Link scroll={false} href="/blog" className="nav-submenu__link">
                                            {" "}
                                            Blog
                                        </Link>
                                    </li>
                                    <li className="nav-submenu__item">
                                        <Link scroll={false} href="/blog-details" className="nav-submenu__link">
                                            {" "}
                                            Blog Details
                                        </Link>
                                    </li>
                                    <li className="nav-submenu__item">
                                        <Link scroll={false} href="/blog-details-sidebar" className="nav-submenu__link">
                                            {" "}
                                            Blog Details Sidebar
                                        </Link>
                                    </li>
                                </ul>
                            </li>
                            <li className="nav-menu__item">
                                <Link scroll={false} href="/contact" className="nav-menu__link">
                                    Contact
                                </Link>
                            </li>
                        </ul>
                        <div className="header-right__inner d-lg-none my-3 gap-1 d-flex flx-align">
                            <Link scroll={false} href="/register" className="btn btn-main pill">
                                <span className="icon-left icon">
                                    <img src="assets/images/icons/user.svg" alt="" />
                                </span>
                                Create Account
                            </Link>
                            <div className="language-select flx-align select-has-icon">
                                <img
                                    src="assets/images/icons/globe.svg"
                                    alt=""
                                    className="globe-icon white-version"
                                />
                                <img
                                    src="assets/images/icons/globe-white.svg"
                                    alt=""
                                    className="globe-icon dark-version"
                                />
                                <select className="select py-0 ps-2 border-0 fw-500">
                                    <option value={1}>Eng</option>
                                    <option value={2}>Bn</option>
                                    <option value={3}>Eur</option>
                                    <option value={4}>Urd</option>
                                </select>
                            </div>
                        </div>
                    </div>
                </div>
            </div>


            <section className={`dashboard ${active && "active"}`} onClick={()=> show ===true && setShow(false) }>
                <div className="dashboard__inner d-flex">
                    {/* Dashboard Sidebar Start */}
                    <div className={`dashboard-sidebar ${active && "active"}`}>
                        <button
                            type="button"
                            className="dashboard-sidebar__close d-lg-none d-flex text-body hover-text-main"  onClick={dashboardControl}
                        >
                            <i className="las la-times" />
                        </button>
                        <div className="dashboard-sidebar__inner">
                            <Link scroll={false} href="/" className="logo mb-48">
                                <img
                                    src="assets/images/logo/logo.png"
                                    alt=""
                                    className="white-version"
                                />
                                <img
                                    src="assets/images/logo/white-logo-two.png"
                                    alt=""
                                    className="dark-version"
                                />
                            </Link>
                            <Link scroll={false} href="/" className="logo favicon mb-48">
                                <img src="assets/images/logo/favicon.png" alt="" />
                            </Link>
                            {/* Sidebar List Start */}
                            <ul className="sidebar-list">
                                <li className={`sidebar-list__item ${pathname == "/dashboard" && "activePage"}`}>
                                    <Link scroll={false} href="/dashboard" className="sidebar-list__link">
                                        <span className="sidebar-list__icon">
                                            <img
                                                src="assets/images/icons/sidebar-icon1.svg"
                                                alt=""
                                                className="icon"
                                            />
                                            <img
                                                src="assets/images/icons/sidebar-icon-active1.svg"
                                                alt=""
                                                className="icon icon-active"
                                            />
                                        </span>
                                        <span className="text">Dashboard</span>
                                    </Link>
                                </li>
                                {/* Remove Profile link */}
                                {/* <li className={`sidebar-list__item ${pathname == "/dashboard-profile" && "activePage"}`}>
                                    <Link scroll={false} href="/dashboard-profile" className="sidebar-list__link">
                                        <span className="sidebar-list__icon">
                                            <img
                                                src="assets/images/icons/sidebar-icon2.svg"
                                                alt=""
                                                className="icon"
                                            />
                                            <img
                                                src="assets/images/icons/sidebar-icon-active2.svg"
                                                alt=""
                                                className="icon icon-active"
                                            />
                                        </span>
                                        <span className="text">Profile</span>
                                    </Link>
                                </li> */}
                                <li className={`sidebar-list__item ${pathname == "/account" && "activePage"}`}>
                                    <Link scroll={false} href="/account" className="sidebar-list__link">
                                        <span className="sidebar-list__icon">
                                            <img
                                                src="assets/images/icons/sidebar-icon9.svg"
                                                alt=""
                                                className="icon"
                                            />
                                            <img
                                                src="assets/images/icons/sidebar-icon-active9.svg"
                                                alt=""
                                                className="icon icon-active"
                                            />
                                        </span>
                                        <span className="text">Settings</span>
                                    </Link>
                                </li>
                                <li className="sidebar-list__item">
                                    <Link scroll={false} href="/login" className="sidebar-list__link">
                                        <span className="sidebar-list__icon">
                                            <img
                                                src="assets/images/icons/sidebar-icon11.svg"
                                                alt=""
                                                className="icon"
                                            />
                                            <img
                                                src="assets/images/icons/sidebar-icon-active11.svg"
                                                alt=""
                                                className="icon icon-active"
                                            />
                                        </span>
                                        <span className="text">Logout</span>
                                    </Link>
                                </li>
                            </ul>
                        </div>
                    </div>
                    {/* Dashboard Sidebar End */}

                    {/* Main Content */}
                    <div className="dashboard-body__right">
                        <div className="dashboard-content-top">
                            <div className="dashboard-content-top__left flx-align">
                                <button type="button" className="sidebar-toggler d-block d-lg-none" onClick={dashboardControl}>
                                    <i className="las la-bars"></i>
                                </button>
                            </div>
                            <div className="dashboard-content-top__right flx-align">
                                <div className="notification-item">
                                    <Link scroll={false} href="/notification" className="notification-item__link">
                                        <img src="assets/images/icons/bell.svg" alt="" className="icon"/>
                                        <span className="notification-counter">0</span>
                                    </Link>
                                </div>
                                <ThemeToggle />
                            </div>
                        </div>
                        {/* children */}
                        {children}
                        {/* Dashboard Footer */}
                        <div className="dashboard-footer bottom-footer-two mt-32 border-0 bg-white">
                            <div className="bottom-footer__inner flx-between gap-3">
                                <p className="bottom-footer__text font-14">
                                    {" "}
                                    Copyright © 2024 DPmarket, All rights reserved.
                                </p>
                                <div className="footer-links gap-4">
                                    <Link scroll={false} href="/#" className="footer-link hover-text-heading font-14">
                                        Terms of service
                                    </Link>
                                    <Link scroll={false} href="/#" className="footer-link hover-text-heading font-14">
                                        Privacy Policy
                                    </Link>
                                    <Link scroll={false} href="/#" className="footer-link hover-text-heading font-14">
                                        cookies
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>


                </div>
            </section>





        </>
    );
}

export default MasterLayout;