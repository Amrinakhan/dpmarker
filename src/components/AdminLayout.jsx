"use client";

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  LayoutDashboard, 
  Users, 
  Store, 
  Ticket, 
  CreditCard, 
  BarChart2,
  LogOut,
  Settings,
  ClipboardList,
  Tag
} from 'lucide-react';

const AdminLayout = ({ children }) => {
  const pathname = usePathname();
  const isAdmin = true; // Temporarily assume admin for layout structure
  const loading = false; // Temporarily assume not loading

  if (loading) {
    return (
      <div className="dashboard-body__content">
        <div className="welcome-balance mt-2 mb-40 flx-between gap-2">
          <div className="welcome-balance__left">
            <h4 className="welcome-balance__title mb-0">Loading...</h4>
          </div>
        </div>
      </div>
    );
  }

  if (!isAdmin) {
    return (
      <div className="dashboard-body__content">
        <div className="welcome-balance mt-2 mb-40 flx-between gap-2">
          <div className="welcome-balance__left">
            <h4 className="welcome-balance__title mb-0 text-red-600">Access Denied</h4>
            <p className="dashboard-widget__text font-14">You must be an admin to view this page.</p>
          </div>
        </div>
      </div>
    );
  }

  const navItems = [
    { href: '/admin', label: 'Dashboard', icon: LayoutDashboard },
    { href: '/admin/users', label: 'Users', icon: Users },
    { href: '/admin/vendors', label: 'Vendors', icon: Store },
    { href: '/admin/coupons', label: 'Coupons', icon: Ticket },
    { href: '/admin/subscriptions', label: 'Subscriptions', icon: CreditCard },
    { href: '/admin/reports', label: 'Reports', icon: BarChart2 },
    { href: '/admin/orders', label: 'Orders', icon: ClipboardList },
    { href: '/admin/categories', label: 'Categories', icon: Tag },
    { href: '/admin/settings', label: 'Settings', icon: Settings },
  ];

  return (
    <div className="dashboard-body">
      {/* Top Navigation Bar */}
      <div className="header">
        <div className="container container-full">
          <nav className="header-inner flx-between">
            <div className="logo">
              <Link scroll={false} href="/admin" className="link white-version">
                <img src="/assets/images/logo/logo-two.png" alt="Logo" />
              </Link>
              <Link scroll={false} href="/admin" className="link dark-version">
                <img src="/assets/images/logo/white-logo.png" alt="Logo" />
              </Link>
            </div>
            <div className="header-right flx-align">
              <button className="header-right__button cart-btn position-relative">
                <LogOut size={20} />
                <span className="ml-2">Logout</span>
              </button>
            </div>
          </nav>
        </div>
      </div>

      <div className="dashboard-body__content">
        <div className="row">
          {/* Sidebar */}
          <div className="col-xl-3">
            <div className="dashboard-body__item">
              <nav className="dashboard-nav">
                <ul className="nav-menu">
                  {navItems.map((item) => {
                    const Icon = item.icon;
                    const isActive = pathname === item.href;
                    return (
                      <li key={item.href} className={`nav-menu__item ${isActive ? 'activePage' : ''}`}>
                        <Link
                          scroll={false}
                          href={item.href}
                          className="nav-menu__link flx-align"
                        >
                          <Icon size={20} className="mr-2" />
                          {item.label}
                        </Link>
            </li>
                    );
                  })}
          </ul>
        </nav>
            </div>
          </div>

          {/* Main Content */}
          <div className="col-xl-9">
            <div className="dashboard-body__item">
        {children}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminLayout; 