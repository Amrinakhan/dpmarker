"use client";
import React, { useState, useEffect } from 'react';
import AdminLayout from '@/components/AdminLayout'; // Import the AdminLayout component
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Search, Edit, Trash2, Plus } from 'lucide-react';

const VendorsList = () => {
  const router = useRouter();
  const [vendors, setVendors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');

  useEffect(() => {
    fetchVendors();
  }, []);

    const fetchVendors = async () => {
      try {
      const response = await fetch('/api/vendors');
      if (!response.ok) {
        throw new Error('Failed to fetch vendors');
      }
      const data = await response.json();
      setVendors(data);
      } catch (err) {
        setError(err.message);
      console.error('Error fetching vendors:', err);
      } finally {
        setLoading(false);
      }
    };

  const handleDelete = async (vendorId) => {
    if (!confirm('Are you sure you want to delete this vendor?')) return;

    try {
      const response = await fetch(`/api/vendors/${vendorId}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.message || 'Failed to delete vendor');
      }

      // Show success message
      alert('Vendor deleted successfully');
      
      // Refresh the vendors list
      fetchVendors();
    } catch (err) {
      setError(err.message);
      // Show error in alert as well
      alert(`Error: ${err.message}`);
    }
  };

  const filteredVendors = vendors.filter(vendor => {
    const matchesSearch = vendor.vendor_title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         vendor.vendor_description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === 'all' || vendor.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  return (
    <AdminLayout>
      <div className="dashboard-body__content">
        <div className="welcome-balance mt-2 mb-40 flx-between gap-2">
          <div className="welcome-balance__left">
            <h4 className="welcome-balance__title mb-0">Vendors Management</h4>
          </div>
          <div className="welcome-balance__right">
            <button 
              className="btn btn-primary"
              onClick={() => router.push('/admin/vendors/add')}
            >
              <Plus size={20} className="mr-2" />
              Add New Vendor
            </button>
          </div>
        </div>

        <div className="dashboard-body__item">
          <div className="dashboard-card">
            <div className="dashboard-card__header flx-between gap-2">
              <h6 className="dashboard-card__title mb-0">All Vendors</h6>
              <div className="d-flex gap-3">
                <div className="search-box">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Search vendors..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
                <select
                  className="form-control"
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value)}
                >
                  <option value="all">All Status</option>
                  <option value="active">Active</option>
                  <option value="pending">Pending</option>
                  <option value="inactive">Inactive</option>
                </select>
              </div>
            </div>

            <div className="dashboard-card__content">
              {error && (
                <div className="alert alert-danger mb-4" role="alert">
                  {error}
                </div>
              )}

              {loading ? (
                <div className="text-center py-4">
                  <div className="spinner-border text-primary" role="status">
                    <span className="visually-hidden">Loading...</span>
                  </div>
                </div>
              ) : (
                <div className="table-responsive">
                  <table className="table">
        <thead>
          <tr>
                        <th>ID</th>
                        <th>Image</th>
                        <th>Title</th>
                        <th>Description</th>
                        <th>Status</th>
                        <th>Created Date</th>
                        <th>Actions</th>
          </tr>
        </thead>
        <tbody>
                      {filteredVendors.map((vendor) => (
                        <tr key={vendor.vendor_id}>
                          <td>{vendor.vendor_id}</td>
                          <td>
                            {vendor.vendor_img ? (
                              <img
                                src={vendor.vendor_img}
                                alt={vendor.vendor_title}
                                className="vendor-thumbnail"
                                style={{ width: '50px', height: '50px', objectFit: 'cover' }}
                              />
                            ) : (
                              <div className="vendor-thumbnail-placeholder">
                                No Image
                              </div>
                            )}
                          </td>
                          <td>{vendor.vendor_title}</td>
                          <td>
                            <div className="vendor-description">
                              {vendor.vendor_description?.substring(0, 50)}...
                            </div>
                          </td>
                          <td>
                            <span className={`status-badge status-${vendor.status}`}>
                              {vendor.status}
                            </span>
                          </td>
                          <td>{new Date(vendor.created_date).toLocaleDateString()}</td>
                          <td>
                            <div className="action-buttons">
                              <button
                                className="btn btn-sm btn-primary mr-2"
                                onClick={() => router.push(`/admin/vendors/edit/${vendor.vendor_id}`)}
                              >
                                <Edit size={16} />
                              </button>
                              <button
                                className="btn btn-sm btn-danger"
                                onClick={() => handleDelete(vendor.vendor_id)}
                              >
                                <Trash2 size={16} />
                              </button>
                            </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .vendor-thumbnail {
          border-radius: 4px;
        }

        .vendor-thumbnail-placeholder {
          width: 50px;
          height: 50px;
          background-color: #f0f0f0;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 4px;
          font-size: 0.75rem;
          color: #666;
          text-align: center;
        }

        .vendor-description {
          max-width: 200px;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        .status-badge {
          display: inline-block;
          padding: 0.25em 0.5em;
          font-size: 0.75em;
          font-weight: 700;
          line-height: 1;
          text-align: center;
          white-space: nowrap;
          vertical-align: baseline;
          border-radius: 0.25rem;
        }

        .status-active {
          color: #fff;
          background-color: #28a745;
        }

        .status-pending {
          color: #212529;
          background-color: #ffc107;
        }

        .status-inactive {
          color: #fff;
          background-color: #dc3545;
        }

        .action-buttons button {
          padding: 0.375rem 0.75rem;
        }

        .table th,
        .table td {
          color: #333;
        }

        .search-box {
          position: relative;
          display: flex;
          align-items: center;
        }

        .search-box .form-control {
          border-radius: 0.25rem;
          border: 1px solid #ced4da;
          transition: border-color 0.15s ease-in-out;
        }

        .search-box .form-control:focus {
          border-color: #80bdff;
          outline: 0;
          box-shadow: 0 0 0 0.2rem rgba(0, 123, 255, 0.25);
        }
      `}</style>
    </AdminLayout>
  );
};

export default VendorsList; 