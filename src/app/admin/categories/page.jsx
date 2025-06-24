"use client";

import React, { useState, useEffect } from 'react';
import AdminLayout from '@/components/AdminLayout';

const AdminCategoriesPage = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCategories = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch('/api/admin/categories');
        const data = await response.json();

        if (response.ok) {
          setCategories(data);
        } else {
          setError(data.error || 'Failed to fetch categories');
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []); // Empty dependency array means this runs once on mount

  return (
    <AdminLayout>
      <div className="dashboard-body__content">
        <div className="welcome-balance mt-2 mb-40 flx-between gap-2">
          <div className="welcome-balance__left">
            <h4 className="welcome-balance__title mb-0">Category Management</h4>
          </div>
          {/* Optionally add a button for adding new categories */}
          {/* <div className="welcome-balance__right flx-align gap-2">
            <button className="btn btn-primary">
              Add New Category
            </button>
          </div> */}
        </div>

        <div className="dashboard-body__item">
          <div className="dashboard-card">
            <div className="dashboard-card__header">
              <h6 className="dashboard-card__title mb-0">Categories List</h6>
            </div>
            <div className="dashboard-card__content">
              {loading && <p>Loading categories...</p>}
              {error && <p className="text-danger">Error loading categories: {error}</p>}
              {!loading && !error && categories.length > 0 && (
                <div className="table-responsive">
                  <table className="table table-striped">
                    <thead>
                      <tr>
                        <th>ID</th>
                        <th>Name</th>
                        {/* Add more columns based on your categories table schema */}
                        <th>Created At</th>
                      </tr>
                    </thead>
                    <tbody>
                      {categories.map((category) => (
                        <tr key={category.id}>
                          <td>{category.id}</td>
                          <td>{category.name}</td> {/* Adjust 'name' to your actual column name */}
                           {/* Adjust 'created_at' to your actual column name and format as needed */}
                          <td>{category.created_at ? new Date(category.created_at).toLocaleString() : 'N/A'}</td> 
                          {/* Add more cells for other columns */}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
              {!loading && !error && categories.length === 0 && (
                <p>No categories found.</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminCategoriesPage; 