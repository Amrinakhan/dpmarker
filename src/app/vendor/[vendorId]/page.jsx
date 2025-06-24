'use client';

import React, { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import HeaderOne from "@/components/HeaderOne";
import FooterOne from "@/components/FooterOne";
import VendorProfileHeader from '@/components/VendorProfileHeader';
import VendorCouponsList from '@/components/VendorCouponsList';
import ProductCouponModal from '@/components/ProductCouponModal';

export default function VendorDetailsPage() {
  const { vendorId } = useParams();
  const [vendor, setVendor] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // State for coupons
  const [coupons, setCoupons] = useState([]);
  const [couponLoading, setCouponLoading] = useState(true);
  const [couponError, setCouponError] = useState(null);

  // State for current logged-in user's email
  const [currentUserEmail, setCurrentUserEmail] = useState(null);
  const [userLoading, setUserLoading] = useState(true);

  // Add state for coupon modal
  const [showCouponModal, setShowCouponModal] = useState(false);
  const [selectedCoupon, setSelectedCoupon] = useState(null);

  // Handlers for coupon modal
  const handleShowCouponModal = (coupon) => {
    setSelectedCoupon(coupon);
    setShowCouponModal(true);
  };

  const handleCloseCouponModal = () => {
    setSelectedCoupon(null);
    setShowCouponModal(false);
  };

  // Handler for successful coupon redemption
  const handleCouponRedeemedSuccess = (redeemedCouponId) => {
    // Update the local coupons state
    setCoupons(prevCoupons =>
      prevCoupons.map(coupon =>
        coupon.coupon_id === redeemedCouponId ? { ...coupon, redeemed: 1 } : coupon
      )
    );
  };

  // Effect to get user email from localStorage
  useEffect(() => {
    const email = localStorage.getItem('userEmail');
    setCurrentUserEmail(email);
    setUserLoading(false);
  }, []); // Run once on component mount

  // Effect to fetch vendor details
  useEffect(() => {
    const fetchVendorDetails = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch(`/api/vendors/${vendorId}`);
        const data = await response.json();

        if (response.ok) {
          setVendor(data);
        } else {
          setError(data.message || 'Failed to fetch vendor details');
          setVendor(null);
        }
      } catch (err) {
        setError(err.message);
        setVendor(null);
      } finally {
        setLoading(false);
      }
    };

    if (vendorId) {
      fetchVendorDetails();
    }
  }, [vendorId]);

  // Effect to fetch coupons
  useEffect(() => {
    const fetchCoupons = async () => {
      setCouponLoading(true);
      setCouponError(null);
      try {
        // Get user email from localStorage - this is now less critical as modal uses state
        const userEmailForHeader = localStorage.getItem('userEmail');
        
        const response = await fetch(`/api/vendors/${vendorId}/coupons`, {
          headers: {
            'x-user-email': userEmailForHeader || '' // Pass user email in header
          }
        });
        const data = await response.json();

        if (response.ok) {
          setCoupons(data);
        } else {
          setCouponError(data.message || 'Failed to fetch coupons');
        }
      } catch (err) {
        setCouponError(err.message);
      } finally {
        setCouponLoading(false);
      }
    };

    if (vendorId) {
      fetchCoupons();
    }
  }, [vendorId]);

  if (loading || couponLoading || userLoading) {
    return <div>Loading vendor details...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (couponError) {
    return <div>Error loading coupons: {couponError}</div>;
  }

  if (!vendor) {
    return <div>Vendor not found</div>;
  }

  return (
    <>
      <HeaderOne />
      
      <div className="vendor-profile padding-y-120" style={{ paddingTop: '18px' }}>
        <div className="container container-two">
          <VendorProfileHeader vendor={vendor} />
          
          <div className="row mt-32">
            <div className="col-lg-8">
              <div className="common-card mb-4">
                <div className="card-body" style={{ marginTop: '2px' }}>
                  <h4 className="card-title mb-4">About {vendor.name}</h4>
                  <p className="card-text">{vendor.bio || 'No description available.'}</p>
                </div>
              </div>

              {/* Vendor Coupons List */}
                  <VendorCouponsList
                    coupons={coupons}
                    loading={couponLoading}
                    error={couponError}
                    onCouponClick={handleShowCouponModal}
                  />
            </div>

            <div className="col-lg-4">
              <div className="common-card">
                <div className="card-body">
                  <h4 className="card-title mb-4">Contact Vendor</h4>
                  <button className="btn btn-main w-100 pill">
                    <i className="las la-envelope me-2"></i>
                    Send Message
                  </button>
                  
                  <div className="mt-4">
                    <h6 className="mb-3">Share Profile</h6>
                    <div className="d-flex gap-3">
                      <a href="#" className="btn btn-outline-main pill">
                        <i className="lab la-facebook-f"></i>
                      </a>
                      <a href="#" className="btn btn-outline-main pill">
                        <i className="lab la-twitter"></i>
                      </a>
                      <a href="#" className="btn btn-outline-main pill">
                        <i className="lab la-whatsapp"></i>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Coupon Modal */}
      {showCouponModal && selectedCoupon && (
        <ProductCouponModal
          coupon={selectedCoupon}
          onClose={handleCloseCouponModal}
          vendorName={vendor.name}
          vendorLogo={vendor.logo}
          onRedeemSuccess={handleCouponRedeemedSuccess}
          userEmail={currentUserEmail}
        />
      )}

      <FooterOne />
    </>
  );
}