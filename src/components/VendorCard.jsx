import React from 'react';
import { useRouter } from 'next/navigation';

const VendorCard = ({ vendor }) => {
  const router = useRouter();

  const handleClick = () => {
    router.push(`/product-details/${vendor.vendor_id}`);
  };

  return (
    <div 
      className="vendor-card common-card cursor-pointer"
      onClick={handleClick}
      style={{ cursor: 'pointer' }}
    >
      <div className="card-body">
        <div className="vendor-card__image mb-3">
          <img 
            src={vendor.vendor_img || '/assets/images/placeholder-vendor.jpg'} 
            alt={vendor.vendor_title}
            className="img-fluid rounded"
            style={{ width: '100%', height: '200px', objectFit: 'cover' }}
          />
        </div>
        <h4 className="vendor-card__title mb-2">{vendor.vendor_title}</h4>
        <p className="vendor-card__description text-muted mb-3">
          {vendor.vendor_description?.substring(0, 100)}
          {vendor.vendor_description?.length > 100 ? '...' : ''}
        </p>
        <div className="vendor-card__details">
          {vendor.commission_rate && (
            <span className="badge bg-main me-2">
              {vendor.commission_rate}% Commission
            </span>
          )}
          <span className={`badge ${vendor.status === 'active' ? 'bg-success' : 'bg-warning'}`}>
            {vendor.status}
          </span>
        </div>
      </div>
    </div>
  );
};

export default VendorCard; 