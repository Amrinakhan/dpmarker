'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

const EditVendorForm = ({ vendor }) => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    vendor_title: '',
    vendor_description: '',
    vendor_img: '',
    otp_code: '',
    phone_number: '',
    address: '',
    commission_rate: '',
    vendor_email: '',
    vendor_website: '',
    status: 'active', // Default status
    facebookLink: '',
    whatsappLink: '',
    twitterLink: '',
    featured: 0,
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    // Populate form data when the vendor prop changes
    if (vendor) {
      setFormData({
        vendor_title: vendor.vendor_title || '',
        vendor_description: vendor.vendor_description || '',
        vendor_img: vendor.vendor_img || '',
        otp_code: vendor.otp_code || '',
        phone_number: vendor.phone_number || '',
        address: vendor.address || '',
        commission_rate: vendor.commission_rate !== null ? vendor.commission_rate.toString() : '',
        vendor_email: vendor.vendor_email || '',
        vendor_website: vendor.vendor_website || '',
        status: vendor.status || 'active',
        facebookLink: vendor.facebookLink || '',
        whatsappLink: vendor.whatsappLink || '',
        twitterLink: vendor.twitterLink || '',
        featured: vendor.featured || 0,
      });
    }
  }, [vendor]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(false);

    // Basic validation
    if (!formData.vendor_title || !formData.vendor_description || !formData.otp_code || !formData.vendor_email) {
      setError('Please fill in all required fields.');
      setLoading(false);
      return;
    }

    try {
      const res = await fetch(`/api/vendors/${vendor.vendor_id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const result = await res.json();

      if (!res.ok) {
        throw new Error(result.message || 'Error updating vendor');
      }

      setSuccess(true);
      // Optionally redirect after a delay
      // setTimeout(() => router.push('/admin/vendors'), 2000);

    } catch (err) {
      console.error('Error updating vendor:', err);
      setError(err.message || 'An unexpected error occurred.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="dashboard-common-form">
      {error && (
        <div className="alert alert-danger mb-4" role="alert">
          {error}
        </div>
      )}
      {success && (
        <div className="alert alert-success mb-4" role="alert">
          Vendor updated successfully!
        </div>
      )}
      <div className="form-group">
        <label htmlFor="vendor_title">Vendor Title <span className="text-danger">*</span></label>
        <input
          type="text"
          className="form-control"
          id="vendor_title"
          name="vendor_title"
          value={formData.vendor_title}
          onChange={handleChange}
          required
        />
      </div>
      <div className="form-group">
        <label htmlFor="vendor_description">Vendor Description <span className="text-danger">*</span></label>
        <textarea
          className="form-control"
          id="vendor_description"
          name="vendor_description"
          value={formData.vendor_description}
          onChange={handleChange}
          required
          rows="4"
        ></textarea>
      </div>
       <div className="form-group">
        <label htmlFor="vendor_img">Vendor Image URL</label>
        <input
          type="text"
          className="form-control"
          id="vendor_img"
          name="vendor_img"
          value={formData.vendor_img}
          onChange={handleChange}
        />
         <small className="form-text text-muted">For now, please use an image URL.</small>
      </div>
      <div className="form-group">
        <label htmlFor="otp_code">OTP Code <span className="text-danger">*</span></label>
        <input
          type="text"
          className="form-control"
          id="otp_code"
          name="otp_code"
          value={formData.otp_code}
          onChange={handleChange}
          required
        />
      </div>
       <div className="form-group">
        <label htmlFor="phone_number">Phone Number</label>
        <input
          type="text"
          className="form-control"
          id="phone_number"
          name="phone_number"
          value={formData.phone_number}
          onChange={handleChange}
        />
      </div>
       <div className="form-group">
        <label htmlFor="address">Address</label>
        <input
          type="text"
          className="form-control"
          id="address"
          name="address"
          value={formData.address}
          onChange={handleChange}
        />
      </div>
      <div className="form-group">
        <label htmlFor="commission_rate">Commission Rate (%)</label>
        <input
          type="number"
          className="form-control"
          id="commission_rate"
          name="commission_rate"
          value={formData.commission_rate}
          onChange={handleChange}
          step="0.01"
        />
      </div>
      <div className="form-group">
        <label htmlFor="vendor_email">Vendor Email <span className="text-danger">*</span></label>
        <input
          type="email"
          className="form-control"
          id="vendor_email"
          name="vendor_email"
          value={formData.vendor_email}
          onChange={handleChange}
          required
        />
      </div>
       <div className="form-group">
        <label htmlFor="vendor_website">Vendor Website</label>
        <input
          type="url"
          className="form-control"
          id="vendor_website"
          name="vendor_website"
          value={formData.vendor_website}
          onChange={handleChange}
        />
      </div>
       <div className="form-group">
        <label htmlFor="status">Status</label>
        <select
          className="form-control"
          id="status"
          name="status"
          value={formData.status}
          onChange={handleChange}
        >
          <option value="active">Active</option>
          <option value="inactive">Inactive</option>
          <option value="pending">Pending</option>
        </select>
      </div>

      {/* Social Links */}
      <div className="form-group">
        <label htmlFor="facebookLink">Facebook Link</label>
        <input
          type="text"
          className="form-control"
          id="facebookLink"
          name="facebookLink"
          value={formData.facebookLink}
          onChange={handleChange}
        />
      </div>
      <div className="form-group">
        <label htmlFor="whatsappLink">WhatsApp Link</label>
        <input
          type="text"
          className="form-control"
          id="whatsappLink"
          name="whatsappLink"
          value={formData.whatsappLink}
          onChange={handleChange}
        />
      </div>
      <div className="form-group">
        <label htmlFor="twitterLink">Twitter Link</label>
        <input
          type="text"
          className="form-control"
          id="twitterLink"
          name="twitterLink"
          value={formData.twitterLink}
          onChange={handleChange}
        />
      </div>

      {/* Featured Vendor */}
      <div className="form-group form-check">
        <input
          type="checkbox"
          className="form-check-input"
          id="featured"
          name="featured"
          checked={formData.featured === 1}
          onChange={(e) => setFormData(prevData => ({ ...prevData, featured: e.target.checked ? 1 : 0 }))}
        />
        <label className="form-check-label" htmlFor="featured">Featured Vendor</label>
      </div>

      <button type="submit" className="btn btn-main" disabled={loading}>
        {loading ? 'Updating...' : 'Update Vendor'}
      </button>
    </form>
  );
};

export default EditVendorForm; 