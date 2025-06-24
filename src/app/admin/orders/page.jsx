"use client";

import React, { useState, useEffect } from 'react';
import AdminLayout from '@/components/AdminLayout';

const AdminOrdersPage = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchOrders = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch('/api/admin/orders');
        const data = await response.json();

        if (response.ok) {
          setOrders(data);
        } else {
          setError(data.error || 'Failed to fetch orders');
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []); // Empty dependency array means this runs once on mount

  return (
    <AdminLayout>
      <div className="dashboard-body__content">
        <div className="welcome-balance mt-2 mb-40 flx-between gap-2">
          <div className="welcome-balance__left">
            <h4 className="welcome-balance__title mb-0">Order Management</h4>
          </div>
        </div>

        <div className="dashboard-body__item">
          <div className="dashboard-card">
            <div className="dashboard-card__header">
              <h6 className="dashboard-card__title mb-0">Orders List</h6>
            </div>
            <div className="dashboard-card__content">
              {loading && <p>Loading orders...</p>}
              {error && <p className="text-danger">Error loading orders: {error}</p>}
              {!loading && !error && orders.length > 0 && (
                <div className="table-responsive">
                  <table className="table table-striped">
                    <thead>
                      <tr>
                        <th>Order ID</th>
                        <th>User ID</th>
                        <th>Email</th>
                        <th>Plan Name</th>
                        <th>Total Amount</th>
                        <th>Payment Method</th>
                        <th>Shipping Address</th>
                        <th>Agreed to Terms</th>
                        <th>Agreed to Privacy</th>
                        <th>Order Date</th>
                        {/* Add more columns as needed */}
                      </tr>
                    </thead>
                    <tbody>
                      {orders.map((order) => (
                        <tr key={order.id}>
                          <td>{order.id}</td>
                           {/* Display user_id, handle null case */}
                          <td>{order.user_id || 'N/A'}</td> 
                          <td>{order.email}</td>
                          <td>{order.plan_name}</td>
                          <td>${parseFloat(order.total_amount).toFixed(2)}</td>
                          <td>{order.payment_method}</td>
                          <td>{order.shipping_address}</td>
                          <td>{order.agreed_to_terms ? 'Yes' : 'No'}</td>
                          <td>{order.agreed_to_privacy ? 'Yes' : 'No'}</td>
                          {/* Format the date */}
                          <td>{order.created_at ? new Date(order.created_at).toLocaleString() : 'N/A'}</td>
                          {/* Add more cells for other columns */}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
              {!loading && !error && orders.length === 0 && (
                <p>No orders found.</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminOrdersPage; 