"use client";

import React, { useState } from 'react';
import AdminLayout from '@/components/AdminLayout';
import dynamic from 'next/dynamic';
import { 
  Users, 
  Store, 
  Ticket, 
  CreditCard, 
  BarChart2,
  UserPlus,
  UserMinus,
  CheckCircle,
  XCircle,
  RefreshCw,
  Trash2,
  TrendingUp
} from 'lucide-react';

const Chart = dynamic(() => import('react-apexcharts'), { ssr: false });

// Mock data for demonstration
const mockUsers = [
  { id: 1, name: 'John Doe', email: 'john@example.com', status: 'active', subscription: 'premium' },
  { id: 2, name: 'Jane Smith', email: 'jane@example.com', status: 'blocked', subscription: 'basic' },
];

const mockVendors = [
  { id: 1, name: 'Tech Store', email: 'tech@store.com', status: 'approved', sales: 1500, products: 45 },
  { id: 2, name: 'Fashion Hub', email: 'fashion@hub.com', status: 'pending', sales: 0, products: 12 },
];

const mockCoupons = [
  { id: 1, code: 'SUMMER20', discount: '20%', usage: 150, status: 'active' },
  { id: 2, code: 'WELCOME10', discount: '10%', usage: 89, status: 'active' },
];

const mockSubscriptions = [
  { id: 1, user: 'John Doe', plan: 'Premium', status: 'active', expiry: '2024-12-31' },
  { id: 2, user: 'Jane Smith', plan: 'Basic', status: 'inactive', expiry: '2024-06-30' },
];

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('users');

  // Chart configuration
  const chartOptions = {
    chart: {
      height: 350,
      type: 'area'
    },
    dataLabels: {
      enabled: false
    },
    stroke: {
      curve: 'smooth'
    },
    xaxis: {
      type: 'datetime',
      categories: ["2018-09-19T00:00:00.000Z", "2018-09-19T01:30:00.000Z", "2018-09-19T02:30:00.000Z", "2018-09-19T03:30:00.000Z", "2018-09-19T04:30:00.000Z", "2018-09-19T05:30:00.000Z", "2018-09-19T06:30:00.000Z"]
    },
    tooltip: {
      x: {
        format: 'dd/MM/yy HH:mm'
      },
    },
  };

  const chartSeries = [{
    name: 'Users',
    data: [31, 40, 28, 51, 42, 109, 100]
  }, {
    name: 'Vendors',
    data: [11, 32, 45, 32, 34, 52, 41]
  }];

  const renderContent = () => {
    switch (activeTab) {
      case 'users':
        return (
          <div className="dashboard-body__item">
            <div className="welcome-balance mt-2 mb-40 flx-between gap-2">
              <div className="welcome-balance__left">
                <h4 className="welcome-balance__title mb-0">Users Management</h4>
              </div>
              <div className="welcome-balance__right flx-align gap-2">
                <button className="btn btn-primary">
                  <UserPlus size={20} className="mr-2" />
                  Add User
                </button>
              </div>
            </div>
            <div className="row gy-4">
              {mockUsers.map(user => (
                <div key={user.id} className="col-xl-4 col-md-6">
                  <div className="dashboard-widget">
                    <img
                      src="assets/images/shapes/widget-shape1.png"
                      alt=""
                      className="dashboard-widget__shape one"
                    />
                    <img
                      src="assets/images/shapes/widget-shape2.png"
                      alt=""
                      className="dashboard-widget__shape two"
                    />
                    <div className="dashboard-widget__content">
                      <h4 className="dashboard-widget__title">{user.name}</h4>
                      <p className="dashboard-widget__text">{user.email}</p>
                      <div className="mt-2">
                        <span className={`dashboard-widget__status ${
                          user.status === 'active' ? 'status-active' : 'status-blocked'
                        }`}>
                          {user.status}
                        </span>
                      </div>
                      <div className="dashboard-widget__actions mt-3">
                        <button className="btn btn-sm btn-danger mr-2">
                          <UserMinus size={16} />
                        </button>
                        <button className="btn btn-sm btn-secondary">
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );

      case 'vendors':
        return (
          <div className="dashboard-body__item">
            <div className="welcome-balance mt-2 mb-40 flx-between gap-2">
              <div className="welcome-balance__left">
                <h4 className="welcome-balance__title mb-0">Vendor Management</h4>
              </div>
              <div className="welcome-balance__right flx-align gap-2">
                <button className="btn btn-primary">
                  <Store size={20} className="mr-2" />
                  Add Vendor
                </button>
              </div>
            </div>
            <div className="row gy-4">
              {mockVendors.map(vendor => (
                <div key={vendor.id} className="col-xl-4 col-md-6">
                  <div className="dashboard-widget">
                    <img
                      src="assets/images/shapes/widget-shape1.png"
                      alt=""
                      className="dashboard-widget__shape one"
                    />
                    <img
                      src="assets/images/shapes/widget-shape2.png"
                      alt=""
                      className="dashboard-widget__shape two"
                    />
                    <div className="dashboard-widget__content">
                      <h4 className="dashboard-widget__title">{vendor.name}</h4>
                      <p className="dashboard-widget__text">{vendor.email}</p>
                      <div className="mt-2">
                        <div className="dashboard-widget__stats">
                          <div className="stat-item">
                            <span className="stat-label">Sales:</span>
                            <span className="stat-value">${vendor.sales}</span>
                          </div>
                          <div className="stat-item">
                            <span className="stat-label">Products:</span>
                            <span className="stat-value">{vendor.products}</span>
                          </div>
                        </div>
                      </div>
                      <div className="dashboard-widget__actions mt-3">
                        {vendor.status === 'pending' ? (
                          <>
                            <button className="btn btn-sm btn-success mr-2">
                              <CheckCircle size={16} />
                            </button>
                            <button className="btn btn-sm btn-danger">
                              <XCircle size={16} />
                            </button>
                          </>
                        ) : (
                          <button className="btn btn-sm btn-primary">
                            <RefreshCw size={16} />
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );

      case 'coupons':
        return (
          <div className="dashboard-body__item">
            <div className="welcome-balance mt-2 mb-40 flx-between gap-2">
              <div className="welcome-balance__left">
                <h4 className="welcome-balance__title mb-0">Coupon Management</h4>
              </div>
              <div className="welcome-balance__right flx-align gap-2">
                <button className="btn btn-primary">
                  <Ticket size={20} className="mr-2" />
                  Add Coupon
                </button>
              </div>
            </div>
            <div className="row gy-4">
              {mockCoupons.map(coupon => (
                <div key={coupon.id} className="col-xl-4 col-md-6">
                  <div className="dashboard-widget">
                    <img
                      src="assets/images/shapes/widget-shape1.png"
                      alt=""
                      className="dashboard-widget__shape one"
                    />
                    <img
                      src="assets/images/shapes/widget-shape2.png"
                      alt=""
                      className="dashboard-widget__shape two"
                    />
                    <div className="dashboard-widget__content">
                      <h4 className="dashboard-widget__title">{coupon.code}</h4>
                      <p className="dashboard-widget__text">{coupon.discount} off</p>
                      <div className="mt-2">
                        <p className="dashboard-widget__text">Usage: {coupon.usage} times</p>
                      </div>
                      <div className="dashboard-widget__actions mt-3">
                        <button className="btn btn-sm btn-danger">
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );

      case 'subscriptions':
        return (
          <div className="dashboard-body__item">
            <div className="welcome-balance mt-2 mb-40 flx-between gap-2">
              <div className="welcome-balance__left">
                <h4 className="welcome-balance__title mb-0">Subscription Management</h4>
              </div>
            </div>
            <div className="row gy-4">
              {mockSubscriptions.map(sub => (
                <div key={sub.id} className="col-xl-4 col-md-6">
                  <div className="dashboard-widget">
                    <img
                      src="assets/images/shapes/widget-shape1.png"
                      alt=""
                      className="dashboard-widget__shape one"
                    />
                    <img
                      src="assets/images/shapes/widget-shape2.png"
                      alt=""
                      className="dashboard-widget__shape two"
                    />
                    <div className="dashboard-widget__content">
                      <h4 className="dashboard-widget__title">{sub.user}</h4>
                      <p className="dashboard-widget__text">{sub.plan}</p>
                      <div className="mt-2">
                        <p className="dashboard-widget__text">Expires: {sub.expiry}</p>
                      </div>
                      <div className="mt-2">
                        <span className={`dashboard-widget__status ${
                          sub.status === 'active' ? 'status-active' : 'status-inactive'
                        }`}>
                          {sub.status}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );

      case 'reports':
        return (
          <div className="dashboard-body__item">
            <div className="welcome-balance mt-2 mb-40 flx-between gap-2">
              <div className="welcome-balance__left">
                <h4 className="welcome-balance__title mb-0">Reports & Analytics</h4>
              </div>
            </div>
            <div className="row gy-4">
              <div className="col-xl-8">
                <div className="dashboard-card">
                  <div className="dashboard-card__header flx-between gap-2">
                    <h6 className="dashboard-card__title mb-0">User & Vendor Growth</h6>
                    <div className="select-has-icon d-inline-block">
                      <select className="select common-input select-sm" defaultValue={1}>
                        <option value={1}>Monthly</option>
                        <option value={2}>Daily</option>
                        <option value={3}>Yearly</option>
                      </select>
                    </div>
                  </div>
                  <div className="dashboard-card__chart">
                    <Chart options={chartOptions} series={chartSeries} type="area" height={350} width="100%" />
                  </div>
                </div>
              </div>
              <div className="col-xl-4">
                <div className="dashboard-card">
                  <div className="dashboard-card__header">
                    <h6 className="dashboard-card__title mb-0">Top Used Coupons</h6>
                  </div>
                  <div className="dashboard-card__content">
                    {mockCoupons.map(coupon => (
                      <div key={coupon.id} className="dashboard-card__item flx-between">
                        <span>{coupon.code}</span>
                        <span className="font-semibold">{coupon.usage} uses</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <AdminLayout>
      <div className="dashboard-body__content">
        <div className="welcome-balance mt-2 mb-40 flx-between gap-2">
          <div className="welcome-balance__left">
            <h4 className="welcome-balance__title mb-0">Admin Dashboard</h4>
          </div>
        </div>
        <div className="dashboard-body__item">
          <div className="row gy-4">
            <div className="col-xl-3 col-sm-6">
              <div className="dashboard-widget">
                <img
                  src="assets/images/shapes/widget-shape1.png"
                  alt=""
                  className="dashboard-widget__shape one"
                />
                <img
                  src="assets/images/shapes/widget-shape2.png"
                  alt=""
                  className="dashboard-widget__shape two"
                />
                <span className="dashboard-widget__icon">
                  <Users size={24} />
                </span>
                <div className="dashboard-widget__content flx-between gap-1 align-items-end">
                  <div>
                    <h4 className="dashboard-widget__number mb-1 mt-3">{mockUsers.length}</h4>
                    <span className="dashboard-widget__text font-14">
                      Total Users
                    </span>
                  </div>
                  <img src="assets/images/icons/chart-icon.svg" alt="" />
                </div>
              </div>
            </div>
            <div className="col-xl-3 col-sm-6">
              <div className="dashboard-widget">
                <img
                  src="assets/images/shapes/widget-shape1.png"
                  alt=""
                  className="dashboard-widget__shape one"
                />
                <img
                  src="assets/images/shapes/widget-shape2.png"
                  alt=""
                  className="dashboard-widget__shape two"
                />
                <span className="dashboard-widget__icon">
                  <Store size={24} />
                </span>
                <div className="dashboard-widget__content flx-between gap-1 align-items-end">
                  <div>
                    <h4 className="dashboard-widget__number mb-1 mt-3">{mockVendors.length}</h4>
                    <span className="dashboard-widget__text font-14">
                      Total Vendors
                    </span>
                  </div>
                  <img src="assets/images/icons/chart-icon.svg" alt="" />
                </div>
              </div>
            </div>
            <div className="col-xl-3 col-sm-6">
              <div className="dashboard-widget">
                <img
                  src="assets/images/shapes/widget-shape1.png"
                  alt=""
                  className="dashboard-widget__shape one"
                />
                <img
                  src="assets/images/shapes/widget-shape2.png"
                  alt=""
                  className="dashboard-widget__shape two"
                />
                <span className="dashboard-widget__icon">
                  <Ticket size={24} />
                </span>
                <div className="dashboard-widget__content flx-between gap-1 align-items-end">
                  <div>
                    <h4 className="dashboard-widget__number mb-1 mt-3">{mockCoupons.length}</h4>
                    <span className="dashboard-widget__text font-14">
                      Active Coupons
                    </span>
                  </div>
                  <img src="assets/images/icons/chart-icon.svg" alt="" />
                </div>
              </div>
            </div>
            <div className="col-xl-3 col-sm-6">
              <div className="dashboard-widget">
                <img
                  src="assets/images/shapes/widget-shape1.png"
                  alt=""
                  className="dashboard-widget__shape one"
                />
                <img
                  src="assets/images/shapes/widget-shape2.png"
                  alt=""
                  className="dashboard-widget__shape two"
                />
                <span className="dashboard-widget__icon">
                  <CreditCard size={24} />
                </span>
                <div className="dashboard-widget__content flx-between gap-1 align-items-end">
                  <div>
                    <h4 className="dashboard-widget__number mb-1 mt-3">{mockSubscriptions.length}</h4>
                    <span className="dashboard-widget__text font-14">
                      Subscriptions
                    </span>
                  </div>
                  <img src="assets/images/icons/chart-icon.svg" alt="" />
                </div>
              </div>
            </div>
          </div>
        </div>
        {renderContent()}
      </div>
    </AdminLayout>
  );
};

export default AdminDashboard; 