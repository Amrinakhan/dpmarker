import React from 'react';
import Link from 'next/link';
import HeaderOne from "@/components/HeaderOne";
import FooterOne from "@/components/FooterOne";
import Preloader from "@/helper/Preloader";
import { getAllVendors } from '@/data/vendors';

export const metadata = {
  title: 'Our Vendors - Marketplace',
  description: 'Browse through our trusted vendors and their products',
};

export default function VendorsPage() {
  const vendors = getAllVendors();

  return (
    <>
      <Preloader />
      <HeaderOne />
      
      <div className="vendors-page padding-y-120">
        <div className="container container-two">
          <h1 className="page-title mb-4">Our Vendors</h1>
          <p className="lead mb-5">Discover amazing products from our trusted vendors</p>
          
          <div className="row">
            {vendors.map((vendor) => (
              <div key={vendor.id} className="col-lg-6 mb-4">
                <Link href={`/product-details/${vendor.slug}`} className="text-decoration-none">
                  <div className="vendor-card common-card h-100">
                    <div className="card-body">
                      <div className="d-flex align-items-center mb-3">
                        <img 
                          src={vendor.image} 
                          alt={vendor.name}
                          className="vendor-image rounded-circle me-3"
                          style={{ width: '80px', height: '80px', objectFit: 'cover' }}
                        />
                        <div>
                          <h3 className="card-title mb-1">{vendor.name}</h3>
                          <div className="d-flex align-items-center">
                            <span className="text-warning me-2">
                              {'★'.repeat(Math.floor(vendor.rating))}
                              {'☆'.repeat(5 - Math.floor(vendor.rating))}
                            </span>
                            <span className="text-muted">({vendor.rating})</span>
                          </div>
                        </div>
                      </div>
                      
                      <p className="card-text text-muted mb-3">
                        {vendor.bio.length > 150 ? `${vendor.bio.substring(0, 150)}...` : vendor.bio}
                      </p>
                      
                      <div className="d-flex justify-content-between text-muted">
                        <span>
                          <i className="las la-shopping-cart me-1"></i>
                          {vendor.totalSales} Sales
                        </span>
                        <span>
                          <i className="las la-box me-1"></i>
                          {vendor.products.length} Products
                        </span>
                        <span>
                          <i className="las la-calendar me-1"></i>
                          Joined {new Date(vendor.joinedDate).toLocaleDateString()}
                        </span>
                      </div>
                    </div>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>

      <FooterOne />
    </>
  );
} 