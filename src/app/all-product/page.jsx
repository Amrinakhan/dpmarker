"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import BrandSectionOne from "@/components/BrandSectionOne";
import Breadcrumb from "@/components/Breadcrumb";
import FooterOne from "@/components/FooterOne";
import HeaderOne from "@/components/HeaderOne";
import ResourceOne from "@/components/ResourceOne";
import Preloader from "@/helper/Preloader";
import dynamic from 'next/dynamic';
import CategorySidebar from "@/components/CategorySidebar";

const VendorDisplayGrid = dynamic(() => import('@/components/VendorDisplayGrid'), { ssr: false });

// Import the getVendors function
import { getVendors as fetchVendorsApi } from '../page';

const Page = () => {
  const [vendors, setVendors] = useState([]);
  const [filteredVendors, setFilteredVendors] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedVendorId, setSelectedVendorId] = useState(null);
  const [activeButton, setActiveButton] = useState("grid-view");
  const [filterSidebarOpen, setFilterSidebarOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('All Categories');
  const [searchTag, setSearchTag] = useState('');
  const [priceRange, setPriceRange] = useState('');
  const [timeFrame, setTimeFrame] = useState('Now');
  const [selectedRating, setSelectedRating] = useState('View All');

  useEffect(() => {
    const loadVendors = async () => {
      try {
        const fetchedVendors = await fetchVendorsApi();
        setVendors(fetchedVendors);
        setFilteredVendors(fetchedVendors);
      } catch (err) {
        setError(err.message);
        console.error('Error fetching vendors on all-product page:', err);
      } finally {
        setLoading(false);
      }
    };

    loadVendors();
  }, []);

  useEffect(() => {
    console.log('Filtering vendors...');
    console.log('Selected Vendor ID:', selectedVendorId);
    console.log('All Vendors:', vendors);

    if (selectedVendorId === null) {
      console.log('Showing all vendors.');
      setFilteredVendors(vendors);
    } else {
      const filtered = vendors.filter(vendor => {
         console.log(`Checking vendor ID: ${vendor.vendor_id} against selected ID: ${selectedVendorId}`);
         return vendor.vendor_id === selectedVendorId;
      });
      console.log('Filtered Vendors:', filtered);
      setFilteredVendors(filtered);
    }
  }, [selectedVendorId, vendors]);

  const handleVendorSelect = (vendorId) => {
    setSelectedVendorId(vendorId);
  };

  const handleClick = (buttonName) => {
    setActiveButton(buttonName);
  };

  const handleFilterSidebarToggle = () => {
    setFilterSidebarOpen(!filterSidebarOpen);
  };

  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
    setSelectedVendorId(null);
  };

  const handleRatingSelect = (rating) => {
    setSelectedRating(rating);
  };

  return (
    <>
      {/* Preloader */}
      {loading && <Preloader />}

      {/* HeaderOne */}
      <HeaderOne />

      {/* Breadcrumb */}
      <Breadcrumb />

      {/* Main content area with Filters and Vendor Grid */}
      <section className={`all-product padding-y-120 section-bg position-relative z-index-1 ${activeButton === "list-view" ? "list-view" : ""}`}>
        <div className="container container-two">
          {/* Filter Tab/Bar - Copy from AllProduct.jsx */}
          <div className="row">
            <div className="col-lg-12">
              <div className="filter-tab gap-3 flx-between">
                {/* Filter button for mobile/sidebar toggle */}
                <button
                  type="button"
                  className="filter-tab__button btn btn-outline-light pill d-flex align-items-center d-lg-none"
                  onClick={handleFilterSidebarToggle}
                >
                  <span className="icon icon-left">
                    <img src="assets/images/icons/filter.svg" alt="" />
                  </span>
                  <span className="font-18 fw-500">Filters</span>
                </button>

                {/* Category/Sort Tabs - Copy from AllProduct.jsx */}
                {/* Note: These tabs are likely for product sorting, may need adjustment or removal if not applicable to vendors */}
                <ul
                  className="nav common-tab nav-pills mb-0 gap-lg-2 gap-1 ms-lg-auto"
                  id="pills-tab"
                  role="tablist"
                >
                  <li className="nav-item" role="presentation">
                    <button
                      className={`nav-link ${selectedCategory === 'All Categories' ? 'active' : ''}`}
                      id="pills-all-item-tab"
                      data-bs-toggle="pill"
                      data-bs-target="#pills-all-item"
                      type="button"
                      role="tab"
                      aria-controls="pills-all-item"
                      aria-selected={selectedCategory === 'All Categories'}
                      onClick={() => handleCategorySelect('All Categories')}
                    >
                      All Item
                    </button>
                  </li>
                  <li className="nav-item" role="presentation">
                    <button
                      className={`nav-link ${selectedCategory === 'Best Match' ? 'active' : ''}`}
                      id="pills-bestMatch-tab"
                      data-bs-toggle="pill"
                      data-bs-target="#pills-bestMatch"
                      type="button"
                      role="tab"
                      aria-controls="pills-bestMatch"
                      aria-selected={selectedCategory === 'Best Match'}
                      onClick={() => handleCategorySelect('Best Match')}
                    >
                      Best Match
                    </button>
                  </li>
                  <li className="nav-item" role="presentation">
                    <button
                      className={`nav-link ${selectedCategory === 'Best Rating' ? 'active' : ''}`}
                      id="pills-bestRating-tab"
                      data-bs-toggle="pill"
                      data-bs-target="#pills-bestRating"
                      type="button"
                      role="tab"
                      aria-controls="pills-bestRating"
                      aria-selected={selectedCategory === 'Best Rating'}
                      onClick={() => handleCategorySelect('Best Rating')}
                    >
                      Best Rating
                    </button>
                  </li>
                  <li className="nav-item" role="presentation">
                    <button
                      className={`nav-link ${selectedCategory === 'Site Template' ? 'active' : ''}`}
                      id="pills-trending-tab"
                      data-bs-toggle="pill"
                      data-bs-target="#pills-trending"
                      type="button"
                      role="tab"
                      aria-controls="pills-trending"
                      aria-selected={selectedCategory === 'Site Template'}
                      onClick={() => handleCategorySelect('Site Template')}
                    >
                      Site Template
                    </button>
                  </li>
                  <li className="nav-item" role="presentation">
                    <button
                      className={`nav-link ${selectedCategory === 'Best Offers' ? 'active' : ''}`}
                      id="pills-bestOffers-tab"
                      data-bs-toggle="pill"
                      data-bs-target="#pills-bestOffers"
                      type="button"
                      role="tab"
                      aria-controls="pills-bestOffers"
                      aria-selected={selectedCategory === 'Best Offers'}
                      onClick={() => handleCategorySelect('Best Offers')}
                    >
                      Best Offers
                    </button>
                  </li>
                  <li className="nav-item" role="presentation">
                    <button
                      className={`nav-link ${selectedCategory === 'Best Selling' ? 'active' : ''}`}
                      id="pills-bestSelling-tab"
                      data-bs-toggle="pill"
                      data-bs-target="#pills-bestSelling"
                      type="button"
                      role="tab"
                      aria-controls="pills-bestSelling"
                      aria-selected={selectedCategory === 'Best Selling'}
                      onClick={() => handleCategorySelect('Best Selling')}
                    >
                      Best Selling
                    </button>
                  </li>
                </ul>

                {/* List/Grid Toggle - Copy from AllProduct.jsx */}
                {/* Keep if needed, otherwise remove */}
                <div className="list-grid d-flex align-items-center gap-2">
                  <button
                    className={`list-grid__button list-button d-sm-flex d-none text-body ${activeButton === "list-view" ? "active" : ""}`}
                    onClick={() => handleClick("list-view")}
                  >
                    <i className="las la-list" />
                  </button>
                  <button
                    className={`list-grid__button grid-button d-sm-flex d-none text-body ${activeButton === "grid-view" ? "active" : ""}`}
                    onClick={() => handleClick("grid-view")}
                  >
                    <i className="las la-border-all" />
                  </button>
                  {/* Sidebar toggle button for smaller screens */}
                  <button className="list-grid__button sidebar-btn text-body d-lg-none d-flex" onClick={handleFilterSidebarToggle}>
                    <i className="las la-bars" />
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Filter Form (Tag, Price, Time Frame) - Copy from AllProduct.jsx */}
           <div className="row">
            <div className="col-lg-12">
              <form action="#" className="filter-form pb-4 d-block">
                <div className="row gy-3">
                  <div className="col-sm-4 col-xs-6">
                    <div className="flx-between gap-1">
                      <label htmlFor="tag" className="form-label font-16">Tag</label>
                      <button type="reset" className="text-body font-14" onClick={() => setSearchTag('')}>Clear</button>
                    </div>
                    <div className="position-relative">
                      <input
                        type="text"
                        className="common-input border-gray-five common-input--withLeftIcon"
                        id="tag"
                        placeholder="Search By Tag..."
                        value={searchTag}
                        onChange={(e) => setSearchTag(e.target.value)}
                      />
                      <span className="input-icon input-icon--left"><img src="assets/images/icons/search-two.svg" alt="" /></span>
                    </div>
                  </div>
                  <div className="col-sm-4 col-xs-6">
                    <div className="flx-between gap-1">
                      <label htmlFor="Price" className="form-label font-16">Price</label>
                      <button type="reset" className="text-body font-14" onClick={() => setPriceRange('')}>Clear</button>
                    </div>
                    <div className="position-relative">
                      <input
                        type="text"
                        className="common-input border-gray-five"
                        id="Price"
                        placeholder="$7 - $29"
                         value={priceRange}
                        onChange={(e) => setPriceRange(e.target.value)}
                      />
                    </div>
                  </div>
                  <div className="col-sm-4">
                    <div className="flx-between gap-1">
                      <label htmlFor="time" className="form-label font-16">Time Frame</label>
                      <button type="reset" className="text-body font-14" onClick={() => setTimeFrame('Now')}>Clear</button>
                    </div>
                    <div className="position-relative select-has-icon">
                      <select
                         id="time"
                         className="common-input border-gray-five"
                         value={timeFrame}
                         onChange={(e) => setTimeFrame(e.target.value)}
                      >
                        <option value="Now">Now</option>
                        <option value="Yesterday">Yesterday</option>
                        <option value="1 Month Ago">1 Month Ago</option>
                      </select>
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>

          <div className="row">
            {/* Filter Sidebar (Category, Rating, Date) - Copy from AllProduct.jsx */}
            <div className="col-xl-3 col-lg-4">
               <div className={`filter-sidebar-wrapper ${filterSidebarOpen ? 'active' : ''}`}>
                <CategorySidebar onVendorSelect={handleVendorSelect} />
              </div>
            </div>

            {/* Vendor Display Area - Main content column */}
            <div className="col-xl-9 col-lg-8">
              {/* Section heading for vendors */}
               <div className="section-heading">
                 <h3 className="section-heading__title">
                   {selectedVendorId !== null ? 'Selected Vendor' : 'All Vendors'}
                 </h3>
              </div>
              {/* Container for vendor grid - Adjust classes if needed for spacing relative to heading */}
              <div> {/* Use a simple div or adjust existing ones - AVOID extra .row or .col-* here */}
                  {error && (
                    <div className="alert alert-danger text-center mb-4" role="alert">
                      {error}
                    </div>
                  )}
                  {!error && !loading && filteredVendors.length === 0 && (
                    <p className="text-center">No vendors found matching your criteria.</p>
                  )}
                  {!error && !loading && filteredVendors.length > 0 && (
                    <VendorDisplayGrid vendors={filteredVendors} isAllProductsPage={true} />
                  )}
              </div>
              {/* Any other elements in this column */}
            </div>
          </div>
        </div> {/* Closing the main row that holds filter sidebar and content */}
      </section> {/* Closing the main section */}

      {/* FooterOne */}
      <FooterOne />
    </>
  );
};

export default Page;
