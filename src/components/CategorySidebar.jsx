"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';

const CategorySidebar = ({ onVendorSelect }) => {
  const [categories, setCategories] = useState([]);
  const [vendorCategories, setVendorCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [expandedCategories, setExpandedCategories] = useState({});
  const [selectedVendorId, setSelectedVendorId] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const categoriesResponse = await fetch('/api/categories');
        if (!categoriesResponse.ok) throw new Error('Failed to fetch categories');
        const categoriesData = await categoriesResponse.json();
        setCategories(categoriesData);

        const vendorCategoriesResponse = await fetch('/api/vendor-categories');
        if (!vendorCategoriesResponse.ok) throw new Error('Failed to fetch vendor categories');
        const vendorCategoriesData = await vendorCategoriesResponse.json();
        setVendorCategories(vendorCategoriesData);
      } catch (err) {
        setError(err.message);
        console.error('Error fetching data:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const toggleCategory = (categoryId) => {
    setExpandedCategories(prev => ({
      ...prev,
      [categoryId]: !prev[categoryId]
    }));
  };

  const handleVendorClick = (vendorId) => {
    setSelectedVendorId(vendorId);
    onVendorSelect(vendorId);
  };

  const getVendorsForCategory = (categoryId) => {
    return vendorCategories.filter(vc => vc.category_id === categoryId);
  };

  if (loading) return <div className="text-center">Loading...</div>;
  if (error) return <div className="text-danger">Error: {error}</div>;

  return (
    <div className="filter-sidebar">
      <div className="filter-sidebar__widget">
        <h4 className="filter-sidebar__widget-title">Categories</h4>
        <ul className="filter-sidebar__list list-unstyled">
          <li className="filter-sidebar__item">
            <div className="d-flex justify-content-between align-items-center">
              <button 
                type="button"
                className={`text-decoration-none p-0 ${selectedVendorId === null ? 'active font-bold' : ''}`}
                onClick={() => handleVendorClick(null)}
                style={{ color: 'black !important' }}
              >
                All Categories
              </button>
            </div>
          </li>

          {categories.map((category) => (
            <li key={category.id} className="filter-sidebar__item">
              <div className="d-flex justify-content-between align-items-center">
                <button 
                  type="button"
                  className="text-decoration-none p-0 font-bold"
                  onClick={() => toggleCategory(category.id)}
                  style={{ color: 'black !important' }}
                >
                  {category.name}
                </button>
                <button 
                  className="btn btn-link p-0"
                  onClick={() => toggleCategory(category.id)}
                >
                  <i className={`fas fa-chevron-${expandedCategories[category.id] ? 'up' : 'down'}`}></i>
                </button>
              </div>
              
              {expandedCategories[category.id] && (
                <div className="filter-sidebar__sublist ms-3 mt-2 d-flex flex-column">
                  {getVendorsForCategory(category.id).map((vc) => (
                    <button
                      key={`${vc.vendor_id}-${vc.category_id}`}
                      className={`btn btn-link text-decoration-none p-0 text-start text-gray-600 ${selectedVendorId === vc.vendor_id ? 'active' : ''}`}
                      onClick={() => handleVendorClick(vc.vendor_id)}
                      style={{ marginBottom: '5px' }}
                    >
                      {vc.vendor_name}
                    </button>
                  ))}
                  {getVendorsForCategory(category.id).length === 0 && expandedCategories[category.id] && !loading && !error && (
                    <span className="text-muted text-sm">No vendors in this category</span>
                  )}
                </div>
              )}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default CategorySidebar; 