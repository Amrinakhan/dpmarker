import React from 'react';
import BannerOne from "@/components/BannerOne";
import BecomeSellerOne from "@/components/BecomeSellerOne";
import BlogOne from "@/components/BlogOne";
import BrandSectionOne from "@/components/BrandSectionOne";
import FeaturedAuthor from "@/components/FeaturedAuthor";
import FeaturedOne from "@/components/FeaturedOne";
import FooterOne from "@/components/FooterOne";
import HeaderOne from "@/components/HeaderOne";
import PerformanceAuthor from "@/components/PerformanceAuthor";
import PopularOne from "@/components/PopularOne";
import SaleOffer from "@/components/SaleOffer";
import SellingOne from "@/components/SellingOne";
import Preloader from "@/helper/Preloader";
import dynamic from 'next/dynamic';

const VendorDisplayGrid = dynamic(() => import('@/components/VendorDisplayGrid'), { ssr: false });

export async function getVendors() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/api/vendors`, {
    cache: 'no-store' // Ensure data is always fresh
  });

  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error('Failed to fetch vendors');
  }

  return res.json();
}

const HomePage = async () => {
  let vendors = [];
  let error = null;

  try {
    vendors = await getVendors();
  } catch (err) {
    error = err.message;
    console.error('Error fetching vendors on homepage:', err);
  }

  return (
    <section className="change-gradient">
      {/* Preloader */}
      <Preloader />

      {/* SaleOffer */}
      <SaleOffer />

      {/* HeaderOne */}
      <HeaderOne />

      {/* BannerOne */}
      <BannerOne />

      {/* PopularOne */}
      <PopularOne />

      {/* Section mimicking ArrivalOne layout but with dynamic vendor data */}
      <section className="arrival-product padding-y-120 section-bg position-relative z-index-1">
        {/* Replicating background and elements from ArrivalOne */}
        <img
          src="assets/images/gradients/product-gradient.png"
          alt=""
          className="bg--gradient white-version"
        />
        <img
          src="assets/images/shapes/element2.png"
          alt=""
          className="element one"
        />

        <div className="container container-two">
          {/* Heading */}
          <div className="section-heading">
            <h3 className="section-heading__title">Featured Vendors</h3>
          </div>

          {/* Tab Content Area (main grid) */}
          <div className="tab-content" id="pills-tabContent">
            <div className="tab-pane fade show active" id="pills-all" role="tabpanel" aria-labelledby="pills-all-tab" tabIndex={0}>

              {/* Vendor Display Area - Main content column */}
              {error && (
                <div className="alert alert-danger text-center mb-4" role="alert">
                  {error}
                </div>
              )}

              {!error && vendors.length === 0 && (
                <p className="text-center">No vendors found.</p>
              )}

              {!error && vendors.length > 0 && (
                <VendorDisplayGrid vendors={vendors.filter(vendor => vendor.featured === 1 || vendor.featured === undefined || vendor.featured === null)} />
              )}

            </div>
            {/* Other tab panes removed as they contained static data */}
          </div>

          {/* View All Products Button - Optional */}
          {/* <div className="text-center mt-64"><Link scroll={false} href="/all-product" className="btn btn-main btn-lg pill fw-300">View All Products</Link></div> */}

        </div>
      </section>

      {/* FooterOne */}
      <FooterOne />
    </section>
  );
};

export default HomePage;
