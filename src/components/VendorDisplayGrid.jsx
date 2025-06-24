'use client';

import React from 'react';
import { useRouter } from 'next/navigation';

const VendorDisplayGrid = ({ vendors, isAllProductsPage }) => {
  const router = useRouter();

  const handleVendorClick = (vendorId) => {
    router.push(`/vendor/${vendorId}`);
  };

  if (!vendors || vendors.length === 0) {
    return null; // Handled in the parent page.jsx
  }

  return (
    <div className="row gy-4" style={isAllProductsPage ? { width: '107%' } : {}}>
      {vendors.map(vendor => (
        <div
          key={vendor.vendor_id}
          className="col-xl-3 col-lg-4 col-sm-6 cursor-pointer"
          onClick={() => handleVendorClick(vendor.vendor_id)}
        >
          <div className="product-item shadow-md hover:shadow-lg transition-shadow duration-300 transform hover:-translate-y-1 overlay-none" style={{ height: '388px' }}>
            <div className="product-item__thumb d-flex max-h-unset" style={{ height: '160px' }}>
              {/* Vendor Image */}
              {vendor.vendor_img ? (
                <img
                  src={vendor.vendor_img}
                  alt={vendor.vendor_title}
                  className="cover-img"
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
              ) : (
                <div className="w-full h-48 bg-gray-100 flex items-center justify-center text-gray-500 text-sm text-center p-4 rounded-lg">
                  No Image Available
                </div>
              )}
            </div>
            <div className="product-item__content">
              {/* Vendor Name */}
              <h6 className="product-item__title">
                {vendor.vendor_title}
              </h6>
              {/* Bottom section with logo and button */}
              <div className="product-item__bottom d-flex flex-column align-items-start gap-2">
                {/* Vendor logo button */}
                <button
                  onClick={(e) => {
                    e.stopPropagation(); // Prevent card click event from triggering
                    router.push(`/vendor/${vendor.vendor_id}`);
                  }}
                  className="vendor-logo-circle d-flex align-items-center justify-content-center rounded-circle overflow-hidden border-0 p-0"
                  style={{ width: '25px', height: '25px', cursor: 'pointer' }}>
                  {vendor.vendor_logo ? (
                    <img
                      src={vendor.vendor_logo}
                      alt={`${vendor.vendor_title} Logo`}
                      style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    />
                  ) : vendor.vendor_img ? (
                    <img
                      src={vendor.vendor_img}
                      alt={`${vendor.vendor_title} Logo`}
                      style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    />
                  ) : (
                    <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                      <span className="text-gray-500 text-xs">Logo</span>
                    </div>
                  )}
                </button>
                {/* View More button */}
                <button
                  onClick={(e) => {
                    e.stopPropagation(); // Prevent card click event from triggering
                    router.push(`/vendor/${vendor.vendor_id}`);
                  }}
                  className="btn btn-outline-light pill"
                >
                  View More
                </button>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default VendorDisplayGrid; 