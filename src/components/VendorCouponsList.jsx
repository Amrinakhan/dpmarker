"use client";

import React, { useState, useEffect } from 'react';

const VendorCouponsList = ({ coupons, loading, error, onCouponClick }) => {

  if (loading) {
    return (
      <div className="common-card">
        <div className="card-body">
          <h4 className="card-title mb-4">Available Coupons</h4>
          <p>Loading coupons...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="common-card">
        <div className="card-body">
          <h4 className="card-title mb-4">Available Coupons</h4>
          <p>Error loading coupons: {error}</p>
        </div>
      </div>
    );
  }

  if (coupons.length === 0) {
    return (
      <div className="common-card">
        <div className="card-body">
          <h4 className="card-title mb-4">Available Coupons</h4>
          <p>No coupons available at the moment.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="common-card">
      <div className="card-body">
        <h4 className="card-title mb-4">Available Coupons</h4>
        <div className="coupons-list">
          {coupons.map((coupon, index) => (
            <div key={coupon.coupon_id} className="mb-4">
              <div
                style={{
                  display: "flex",
                  background: coupon.redeemed === 1 ? "#e0e0e0" : "linear-gradient(90deg, #36c6f0 0%, #eaf6fd 100%)",
                  borderRadius: "16px",
                  boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
                  minWidth: 340,
                  maxWidth: "100%",
                  alignItems: "center",
                  overflow: "hidden",
                  cursor: coupon.redeemed === 1 ? 'not-allowed' : 'pointer',
                  opacity: coupon.redeemed === 1 ? 0.6 : 1,
                }}
                onClick={() => {
                  if (coupon.redeemed !== 1) {
                    onCouponClick(coupon);
                  }
                }}
              >
                {/* Left ticket stub */}
                <div
                  style={{
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
                  }}
                >
                  Save<br />{coupon.discount}%
                </div>

                {/* Perforation effect */}
                <div
                  style={{
                    width: 12,
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                    alignItems: "center",
                    background: "transparent"
                  }}
                >
                  {[...Array(8)].map((_, i) => (
                    <span
                      key={i}
                      style={{
                        width: 6,
                        height: 6,
                        background: "#fff",
                        borderRadius: "50%",
                        margin: "4px 0"
                      }}
                    />
                  ))}
                </div>

                {/* Right content */}
                <div
                  style={{
                    flex: 1,
                    padding: "20px 28px",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center"
                  }}
                >
                  <div style={{ fontWeight: 600, fontSize: "1.1rem", marginBottom: 8 }}>
                    {coupon.title}
                  </div>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 12
                    }}
                  >
                    {/* Assuming you want to display a code if available, otherwise the title */}
                    <span
                      style={{
                        fontFamily: "monospace",
                        background: "#eaf6fd",
                        padding: "6px 16px",
                        borderRadius: "8px",
                        fontSize: "1.1rem",
                        letterSpacing: 2,
                        color: "#1da1f2",
                        border: "1px dashed #36c6f0"
                      }}
                    >
                      {coupon.code || coupon.title.substring(0, 6).toUpperCase() + '...'} {/* Placeholder code or truncated title */}
                    </span>
                  </div>
                  <div className="mt-2" style={{ fontSize: "0.9rem", color: "#666" }}>
                    {coupon.status === 'active' ? (
                      <span style={{ color: '#28a745' }}>Active</span>
                    ) : (
                      <span style={{ color: '#dc3545' }}>Expired</span>
                    )}
                     {coupon.valid_until && (
                        <span style={{ marginLeft: 10 }}>Valid Until: {new Date(coupon.valid_until).toLocaleDateString()}</span>
                     )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default VendorCouponsList; 