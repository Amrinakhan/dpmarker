"use client";

import React from 'react';

const VendorProfileHeader = ({ vendor }) => {
  return (
    <div className="vendor-profile-header position-relative">
      {/* Cover Image */}
      <div 
        className="vendor-cover position-relative"
        style={{
          height: '300px',
          backgroundImage: `url(${vendor.coverImage || '/assets/images/thumbs/cover-placeholder.jpg'})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          borderRadius: '16px',
          overflow: 'hidden'
        }}
      >
        {/* Overlay gradient */}
        <div 
          className="position-absolute w-100 h-100"
          style={{
            background: 'linear-gradient(to bottom, rgba(0,0,0,0.1), rgba(0,0,0,0.6))'
          }}
        />
      </div>

      {/* Vendor Info */}
      <div className="vendor-info position-relative" style={{ marginTop: '-80px' }}>
        <div className="container container-two">
          <div className="row align-items-end">
            <div className="col-lg-8">
              <div className="d-flex align-items-end gap-4">
                {/* Logo */}
                <div 
                  className="vendor-logo position-relative"
                  style={{
                    width: '160px',
                    height: '160px',
                    borderRadius: '16px',
                    overflow: 'hidden',
                    border: '4px solid #fff',
                    boxShadow: '0 4px 20px rgba(0,0,0,0.1)'
                  }}
                >
                  <img 
                    src={vendor.logo || '/assets/images/thumbs/logo-placeholder.jpg'} 
                    alt={vendor.name}
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover'
                    }}
                  />
                </div>

                {/* Name and Description */}
                <div className="vendor-details text-white mb-4">
                  <h2 className="vendor-name mb-2">{vendor.name}</h2>
                  <p className="vendor-description mb-0" style={{ maxWidth: '600px' }}>
                    {vendor.shortDescription || 'No description available.'}
                  </p>
                </div>
              </div>
            </div>

            {/* Stats */}
            <div className="col-lg-4">
              <div className="vendor-stats d-flex justify-content-end gap-4 text-white">
                <div className="stat-item text-center">
                  <h4 className="mb-1">{vendor.totalProducts || 0}</h4>
                  <p className="mb-0">Products</p>
                </div>
                <div className="stat-item text-center">
                  <h4 className="mb-1">{vendor.totalSales || 0}</h4>
                  <p className="mb-0">Sales</p>
                </div>
                <div className="stat-item text-center">
                  <h4 className="mb-1">{vendor.rating || '4.5'}</h4>
                  <p className="mb-0">Rating</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VendorProfileHeader; 