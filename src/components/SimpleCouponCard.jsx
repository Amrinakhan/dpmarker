"use client";

import React from 'react';

const SimpleCouponCard = ({ couponCode }) => {
  const handleCopy = () => {
    navigator.clipboard.writeText(couponCode);
    alert(`Copied coupon code: ${couponCode}`);
  };

  return (
    <div style={{ border: '1px dashed #ccc', padding: '15px', textAlign: 'center', margin: '20px 0' }}>
      <h4 style={{ margin: '0 0 10px 0' }}>Coupon Code</h4>
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <span style={{ fontSize: '1.2em', fontWeight: 'bold', marginRight: '10px' }}>{couponCode}</span>
        <button
          onClick={handleCopy}
          style={{ padding: '5px 10px', cursor: 'pointer' }}
        >
          Copy
        </button>
      </div>
    </div>
  );
};

export default SimpleCouponCard; 