import BrandSectionOne from "@/components/BrandSectionOne";
import BreadcrumbTwo from "@/components/BreadcrumbTwo";
import FooterOne from "@/components/FooterOne";
import HeaderOne from "@/components/HeaderOne";
import ProductDetails from "@/components/ProductDetails";
import Preloader from "@/helper/Preloader";
import React from "react";
import SimpleCouponCard from "@/components/SimpleCouponCard";

export const metadata = {
  title: "Digital Market Place NEXT Js Template",
  description:
    "DpMarket – Digital Products Marketplace NEXT JS Template – A versatile and meticulously designed set of templates crafted to elevate your Digital Products Marketplace content and experiences.",
};

const page = () => {
  return (
    <>
      {/* Preloader */}
      <Preloader />

      {/* HeaderOne */}
      <HeaderOne />

      {/* BreadcrumbTwo */}
      <BreadcrumbTwo />


      {/* ProductDetails */}
      <ProductDetails />

      {/* Add the Simple Coupon Card here */}
      <SimpleCouponCard couponCode="EXAMPLECODE123" /> {/* Replace with dynamic code if available */}

      {/* BrandSectionOne */}

      <BrandSectionOne />


      {/* FooterOne */}
      <FooterOne />
    </>
  );
};

export default page; 