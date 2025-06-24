"use client";

import React, { useState, useEffect } from 'react';
import AdminLayout from '@/components/AdminLayout';

const AdminCouponsPage = () => {
  const [coupons, setCoupons] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCoupons = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch('/api/coupons');
        const data = await response.json();

        if (response.ok) {
          setCoupons(data);
        } else {
          setError(data.message || 'Failed to fetch coupons');
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCoupons();
  }, []);

  return (
    <AdminLayout>
      <div className="dashboard-body__content">
        <div className="welcome-balance mt-2 mb-40 flx-between gap-2">
          <div className="welcome-balance__left">
            <h4 className="welcome-balance__title mb-0">All Coupons</h4>
          </div>
        </div>

        <div className="dashboard-body__item">
          <div className="dashboard-card">
            <div className="dashboard-card__header">
              <h6 className="dashboard-card__title mb-0">Coupons List</h6>
            </div>
            <div className="dashboard-card__content">
              {loading && <p>Loading coupons...</p>}
              {error && <p className="text-danger">Error loading coupons: {error}</p>}
              {!loading && !error && coupons.length > 0 && (
                <div className="table-responsive">
                  <table className="table table-striped">
                    <thead>
                      <tr>
                        <th>Coupon ID</th>
                        <th>Vendor ID</th>
                        <th>Title</th>
                        <th>Discount (%)</th>
                        <th>Status</th>
                        <th>Valid Until</th>
                        <th>Created Date</th>
                        {/* <th>Actions</th> */}
                      </tr>
                    </thead>
                    <tbody>
                      {coupons.map((coupon) => (
                        <tr key={coupon.coupon_id}>
                          <td>{coupon.coupon_id}</td>
                          <td>{coupon.vendor_id}</td>
                          <td>{coupon.title}</td>
                          <td>{coupon.discount}</td>
                          <td>{coupon.status}</td>
                          <td>{coupon.valid_until ? new Date(coupon.valid_until).toLocaleDateString() : 'N/A'}</td>
                          <td>{new Date(coupon.created_date).toLocaleDateString()}</td>
                          {/* <td>
                            <button className="btn btn-sm btn-outline-primary me-2">Edit</button>
                            <button className="btn btn-sm btn-outline-danger">Delete</button>
                          </td> */}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
              {!loading && !error && coupons.length === 0 && (
                <p>No coupons found.</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminCouponsPage; 