//import BrandSectionOne from "@/components/BrandSectionOne";
import BreadcrumbFive from "@/components/BreadcrumbFive";
import CartPersonal from "@/components/CartPersonal";
import FooterOne from "@/components/FooterOne";
import HeaderOne from "@/components/HeaderOne";
import Preloader from "@/helper/Preloader";
import { Suspense } from "react";

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


      {/* BreadcrumbFive */}
      <BreadcrumbFive />

      {/* CartPersonal */}
      <Suspense fallback={<div>Loading...</div>}>
        <CartPersonal />
      </Suspense>

      {/* BrandSectionOne */}
      {/* <BrandSectionOne /> */}


      {/* FooterOne */}
      <FooterOne />
    </>
  );
};

export default page;
