"use client";

import React, { useState, useEffect } from 'react';
import AdminLayout from '@/components/AdminLayout';
import { useParams } from 'next/navigation';

const AdminVendorDetailsPage = () => {
  const { id } = useParams();
  const [vendor, setVendor] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchVendorDetails = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch(`/api/admin/vendors/${id}`);
        const data = await response.json();

        if (data.success) {
          setVendor(data.vendor);
        } else {
          setError(data.error);
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchVendorDetails();
    }
  }, [id]);

  if (loading) {
    return (
      <AdminLayout>
        <p>Loading vendor details...</p>
      </AdminLayout>
    );
  }

  if (error) {
    return (
      <AdminLayout>
        <p>Error loading vendor details: {error}</p>
      </AdminLayout>
    );
  }

  if (!vendor) {
      return (
          <AdminLayout>
              <p>Vendor not found.</p>
          </AdminLayout>
      );
  }

  // Basic inline styles for layout - replace with your actual theme's styling
  const sectionStyle = {
      marginBottom: '20px',
      padding: '15px',
      border: '1px solid #e0e0e0',
      borderRadius: '5px',
      backgroundColor: '#ffffff',
  };

  const productItemStyle = {
      border: '1px solid #e0e0e0',
      padding: '10px',
      marginBottom: '10px',
      borderRadius: '5px',
  };

  return (
    <AdminLayout> {/* Use AdminLayout */}
      <h2 className="text-2xl font-bold mb-4">Vendor Details: {vendor.name}</h2>

      {/* Vendor Profile Details */}
      <div style={sectionStyle}> {/* Apply section styles */}
          <h3 className="text-xl font-semibold mb-2">Profile Information</h3>
          <p><strong>Email:</strong> {vendor.email}</p>
          <p><strong>Phone:</strong> {vendor.phone || 'N/A'}</p>
          <p><strong>Country:</strong> {vendor.country || 'N/A'}</p>
          <p><strong>Status:</strong> {vendor.status}</p>
          <p><strong>Join Date:</strong> {vendor.joinDate}</p>
          <div><strong>Bio:</strong> <p>{vendor.bio || 'N/A'}</p></div>
          {vendor.profileImage && (
              <div>
                  <strong>Profile Image:</strong>
                  <img src={vendor.profileImage} alt={`${vendor.name}'s profile`} style={{width: '100px', height: '100px', objectFit: 'cover', marginTop: '10px'}} /> {/* Basic image styling */}
              </div>
          )}
          {/* Options to upload/change profile image and activate/deactivate will be added here */}
          {/* For example: <button>Activate Vendor</button> */}

      </div>

      {/* Vendor Products List */}
      <div style={sectionStyle}> {/* Apply section styles */}
          <h3 className="text-xl font-semibold mb-2">Products Listed ({vendor.products.length})</h3>
          {vendor.products.length > 0 ? (
              <ul>
                  {vendor.products.map(product => (
                      <li key={product.id} style={productItemStyle}> {/* Apply product item styles */}
                          <p><strong>Title:</strong> {product.title}</p>
                          <p><strong>Price:</strong> ${product.price.toFixed(2)}</p>
                          {product.image && (
                              <div>
                                  <strong>Image:</strong>
                                  <img src={product.image} alt={`${product.title} image`} style={{width: '50px', height: '50px', objectFit: 'cover', marginTop: '5px'}} /> {/* Basic image styling */}
                              </div>
                          )}
                      </li>
                  ))}
              </ul>
          ) : (
              <p>No products listed.</p>
          )}
      </div>

    </AdminLayout>
  );
};

export default AdminVendorDetailsPage; 