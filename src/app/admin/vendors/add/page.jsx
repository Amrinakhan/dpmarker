"use client";

import React, { useState, useRef } from 'react';
import AdminLayout from '@/components/AdminLayout';
import { useRouter } from 'next/navigation';
import { Upload, X } from 'lucide-react';

const AddVendor = () => {
  const router = useRouter();
  const fileInputRef = useRef(null);
  const logoInputRef = useRef(null);
  const [formData, setFormData] = useState({
    vendor_title: '',
    vendor_description: '',
    otp_code: '',
    email: '',
    phone: '',
    address: '',
    status: 'pending',
    commission_rate: '',
    payment_method: 'bank_transfer',
    facebookLink: '',
    whatsappLink: '',
    twitterLink: '',
    featured: 0 // Default to not featured
  });
  const [imagePreview, setImagePreview] = useState(null);
  const [logoPreview, setLogoPreview] = useState(null);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);
  const [coupons, setCoupons] = useState([{ title: '', discount: '' }]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith('image/')) {
      setError('Please upload an image file');
      return;
    }

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      setError('Image size should be less than 5MB');
      return;
    }

    // Create preview
    const reader = new FileReader();
    reader.onloadend = () => {
      setImagePreview(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const handleLogoChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith('image/')) {
      setError('Please upload an image file for the logo');
      return;
    }

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      setError('Logo image size should be less than 5MB');
      return;
    }

    // Create preview
    const reader = new FileReader();
    reader.onloadend = () => {
      setLogoPreview(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const removeImage = () => {
    setImagePreview(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const removeLogo = () => {
    setLogoPreview(null);
    if (logoInputRef.current) {
      logoInputRef.current.value = '';
    }
  };

  const handleCouponChange = (index, e) => {
    const { name, value } = e.target;
    const newCoupons = [...coupons];
    newCoupons[index][name] = value;
    setCoupons(newCoupons);
  };

  const addCoupon = () => {
    setCoupons([...coupons, { title: '', discount: '' }]);
  };

  const removeCoupon = (index) => {
    const newCoupons = coupons.filter((_, i) => i !== index);
    setCoupons(newCoupons);
  };

  const validateForm = () => {
    const errors = [];

    if (!formData.vendor_title.trim()) {
      errors.push('Vendor title is required');
    }

    if (!formData.vendor_description.trim()) {
      errors.push('Description is required');
    }

    if (!formData.otp_code.trim()) {
      errors.push('OTP code is required');
    }

    if (!formData.email.trim()) {
      errors.push('Email is required');
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errors.push('Invalid email format');
    }

    if (!formData.phone.trim()) {
      errors.push('Phone number is required');
    } else if (!/^\+?[\d\s-]{10,}$/.test(formData.phone)) {
      errors.push('Invalid phone number format');
    }

    if (!formData.address.trim()) {
      errors.push('Address is required');
    }

    if (formData.commission_rate && (isNaN(formData.commission_rate) || formData.commission_rate < 0 || formData.commission_rate > 100)) {
      errors.push('Commission rate must be between 0 and 100');
    }

    return errors;
  };

  const validateCoupons = () => {
    const errors = [];
    coupons.forEach((coupon, index) => {
      if (!coupon.title.trim()) {
        errors.push(`Coupon ${index + 1} title is required`);
      }
      if (coupon.discount.trim() === '') {
        errors.push(`Coupon ${index + 1} discount is required`);
      } else if (isNaN(coupon.discount) || coupon.discount < 0 || coupon.discount > 100) {
        errors.push(`Coupon ${index + 1} discount must be a number between 0 and 100`);
      }
    });
    return errors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    // Validate form
    const errors = validateForm();
    const couponErrors = validateCoupons();
    const allErrors = [...errors, ...couponErrors];
    if (allErrors.length > 0) {
      setError(allErrors.join(', '));
      return;
    }

    setLoading(true);

    try {
      // Create FormData object for file upload
      const submitData = new FormData();
      Object.keys(formData).forEach(key => {
        submitData.append(key, formData[key]);
      });
      if (fileInputRef.current?.files[0]) {
        submitData.append('vendor_img', fileInputRef.current.files[0]);
      }

      if (logoInputRef.current?.files[0]) {
        submitData.append('vendor_logo', logoInputRef.current.files[0]);
      }

      // Append coupons data
      submitData.append('coupons', JSON.stringify(coupons));

      const response = await fetch('/api/vendors/add', {
        method: 'POST',
        body: submitData,
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Something went wrong');
      }

      setSuccess('Vendor added successfully!');
      setFormData({
        vendor_title: '',
        vendor_description: '',
        otp_code: '',
        email: '',
        phone: '',
        address: '',
        status: 'pending',
        commission_rate: '',
        payment_method: 'bank_transfer',
        facebookLink: '',
        whatsappLink: '',
        twitterLink: '',
        featured: 0
      });
      setImagePreview(null);
      setLogoPreview(null);
      setCoupons([{ title: '', discount: '' }]);

      // Redirect to vendors list after 2 seconds
      setTimeout(() => {
        router.push('/admin/vendors');
      }, 2000);

    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AdminLayout>
      <div className="dashboard-body__content">
        <div className="welcome-balance mt-2 mb-40 flx-between gap-2">
          <div className="welcome-balance__left">
            <h4 className="welcome-balance__title mb-0">Add New Vendor</h4>
          </div>
        </div>

        <div className="dashboard-body__item">
          <div className="dashboard-card">
            <div className="dashboard-card__header">
              <h6 className="dashboard-card__title mb-0">Vendor Information</h6>
            </div>
            <div className="dashboard-card__content">
              {error && (
                <div className="alert alert-danger mb-4" role="alert">
                  {error}
                </div>
              )}
              {success && (
                <div className="alert alert-success mb-4" role="alert">
                  {success}
                </div>
              )}

              <form onSubmit={handleSubmit} className="vendor-form">
                <div className="row">
                  <div className="col-md-6">
                    <div className="form-group mb-4">
                      <label htmlFor="vendor_title" className="form-label">
                        Vendor Title <span className="text-danger">*</span>
                      </label>
                      <input
                        type="text"
                        id="vendor_title"
                        name="vendor_title"
                        value={formData.vendor_title}
                        onChange={handleChange}
                        className="form-control"
                        required
                        maxLength={225}
                      />
                    </div>
                  </div>

                  <div className="col-md-6">
                    <div className="form-group mb-4">
                      <label htmlFor="email" className="form-label">
                        Email <span className="text-danger">*</span>
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className="form-control"
                        required
                      />
                    </div>
                  </div>
                </div>

                <div className="row">
                  <div className="col-md-6">
                    <div className="form-group mb-4">
                      <label htmlFor="phone" className="form-label">
                        Phone Number <span className="text-danger">*</span>
                      </label>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        className="form-control"
                        required
                      />
                    </div>
                  </div>

                  <div className="col-md-6">
                    <div className="form-group mb-4">
                      <label htmlFor="commission_rate" className="form-label">
                        Commission Rate (%)
                      </label>
                      <input
                        type="number"
                        id="commission_rate"
                        name="commission_rate"
                        value={formData.commission_rate}
                        onChange={handleChange}
                        className="form-control"
                        min="0"
                        max="100"
                        step="0.01"
                      />
                    </div>
                  </div>
                </div>

                <div className="form-group mb-4">
                  <label htmlFor="address" className="form-label">
                    Address <span className="text-danger">*</span>
                  </label>
                  <textarea
                    id="address"
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    className="form-control"
                    rows="2"
                    required
                  />
                </div>

                <div className="form-group mb-4">
                  <label htmlFor="vendor_description" className="form-label">
                    Description <span className="text-danger">*</span>
                  </label>
                  <textarea
                    id="vendor_description"
                    name="vendor_description"
                    value={formData.vendor_description}
                    onChange={handleChange}
                    className="form-control"
                    rows="4"
                    required
                  />
                </div>

                <div className="row">
                  <div className="col-md-6">
                    <div className="form-group mb-4">
                      <label htmlFor="status" className="form-label">
                        Status
                      </label>
                      <select
                        id="status"
                        name="status"
                        value={formData.status}
                        onChange={handleChange}
                        className="form-control"
                      >
                        <option value="pending">Pending</option>
                        <option value="active">Active</option>
                        <option value="inactive">Inactive</option>
                      </select>
                    </div>
                  </div>

                  <div className="col-md-6">
                    <div className="form-group mb-4">
                      <label htmlFor="payment_method" className="form-label">
                        Payment Method
                      </label>
                      <select
                        id="payment_method"
                        name="payment_method"
                        value={formData.payment_method}
                        onChange={handleChange}
                        className="form-control"
                      >
                        <option value="bank_transfer">Bank Transfer</option>
                        <option value="paypal">PayPal</option>
                        <option value="stripe">Stripe</option>
                      </select>
                    </div>
                  </div>
                </div>

                <div className="form-group mb-4">
                  <label htmlFor="otp_code" className="form-label">
                    OTP Code <span className="text-danger">*</span>
                  </label>
                  <input
                    type="text"
                    id="otp_code"
                    name="otp_code"
                    value={formData.otp_code}
                    onChange={handleChange}
                    className="form-control"
                    required
                    maxLength={20}
                  />
                </div>

                <div className="form-group mb-4">
                  <label className="form-label">Vendor Image</label>
                  <div className="image-upload-container">
                    <input
                      type="file"
                      ref={fileInputRef}
                      onChange={handleImageChange}
                      accept="image/*"
                      className="d-none"
                      id="vendor_img"
                    />
                    <label
                      htmlFor="vendor_img"
                      className="image-upload-label"
                    >
                      {imagePreview ? (
                        <div className="image-preview">
                          <img src={imagePreview} alt="Preview" />
                          <button
                            type="button"
                            className="remove-image"
                            onClick={removeImage}
                          >
                            <X size={20} />
                          </button>
                        </div>
                      ) : (
                        <div className="upload-placeholder">
                          <Upload size={24} />
                          <span>Click to upload image</span>
                        </div>
                      )}
                    </label>
                  </div>
                </div>

                <div className="form-group mb-4">
                  <label className="form-label">Vendor Logo</label>
                  <div className="image-upload-container">
                    <input
                      type="file"
                      ref={logoInputRef}
                      onChange={handleLogoChange}
                      accept="image/*"
                      className="d-none"
                      id="vendor_logo"
                    />
                    <label
                      htmlFor="vendor_logo"
                      className="image-upload-label"
                    >
                      {logoPreview ? (
                        <div className="image-preview">
                          <img src={logoPreview} alt="Logo Preview" />
                          <button
                            type="button"
                            className="remove-image"
                            onClick={removeLogo}
                          >
                            <X size={20} />
                          </button>
                        </div>
                      ) : (
                        <div className="upload-placeholder">
                          <Upload size={24} />
                          <span>Click to upload logo</span>
                        </div>
                      )}
                    </label>
                  </div>
                </div>

                <div className="dashboard-card__header mt-4">
                  <h6 className="dashboard-card__title mb-0">Coupons</h6>
                </div>
                <div className="dashboard-card__content">
                  {coupons.map((coupon, index) => (
                    <div key={index} className="row align-items-center mb-3">
                      <div className="col-md-5">
                        <div className="form-group mb-0">
                          <label htmlFor={`coupon-title-${index}`} className="form-label visually-hidden">
                            Coupon Title
                          </label>
                          <input
                            type="text"
                            id={`coupon-title-${index}`}
                            name="title"
                            value={coupon.title}
                            onChange={(e) => handleCouponChange(index, e)}
                            className="form-control"
                            placeholder="Coupon Title"
                            required
                          />
                        </div>
                      </div>
                      <div className="col-md-5">
                        <div className="form-group mb-0">
                          <label htmlFor={`coupon-discount-${index}`} className="form-label visually-hidden">
                            Discount (%)
                          </label>
                          <input
                            type="number"
                            id={`coupon-discount-${index}`}
                            name="discount"
                            value={coupon.discount}
                            onChange={(e) => handleCouponChange(index, e)}
                            className="form-control"
                            placeholder="Discount (%)"
                            required
                            min="0"
                            max="100"
                          />
                        </div>
                      </div>
                      <div className="col-md-2">
                        {coupons.length > 1 && (
                          <button
                            type="button"
                            onClick={() => removeCoupon(index)}
                            className="btn btn-danger pill"
                          >
                            Remove
                          </button>
                        )}
                      </div>
                    </div>
                  ))}
                  <button
                    type="button"
                    onClick={addCoupon}
                    className="btn btn-outline-primary pill mt-3"
                  >
                    + Add Coupon
                  </button>
                </div>

                {/* Social Links */}
                <div className="row">
                  <div className="col-md-4">
                    <div className="form-group mb-4">
                      <label htmlFor="facebookLink" className="form-label">
                        Facebook Link
                      </label>
                      <input
                        type="text"
                        id="facebookLink"
                        name="facebookLink"
                        value={formData.facebookLink}
                        onChange={handleChange}
                        className="form-control"
                      />
                    </div>
                  </div>
                  <div className="col-md-4">
                    <div className="form-group mb-4">
                      <label htmlFor="whatsappLink" className="form-label">
                        WhatsApp Link
                      </label>
                      <input
                        type="text"
                        id="whatsappLink"
                        name="whatsappLink"
                        value={formData.whatsappLink}
                        onChange={handleChange}
                        className="form-control"
                      />
                    </div>
                  </div>
                  <div className="col-md-4">
                    <div className="form-group mb-4">
                      <label htmlFor="twitterLink" className="form-label">
                        Twitter Link
                      </label>
                      <input
                        type="text"
                        id="twitterLink"
                        name="twitterLink"
                        value={formData.twitterLink}
                        onChange={handleChange}
                        className="form-control"
                      />
                    </div>
                  </div>
                </div>

                {/* Featured Vendor */}
                <div className="form-group mb-4">
                  <div className="form-check form-switch">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      id="featured"
                      name="featured"
                      checked={formData.featured === 1}
                      onChange={(e) => setFormData(prev => ({ ...prev, featured: e.target.checked ? 1 : 0 }))}
                    />
                    <label className="form-check-label" htmlFor="featured">
                      Featured Vendor
                    </label>
                  </div>
                </div>

                <div className="form-group">
                  <button
                    type="submit"
                    className="btn btn-primary"
                    disabled={loading}
                  >
                    {loading ? 'Adding Vendor...' : 'Add Vendor'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .image-upload-container {
          border: 2px dashed #ddd;
          border-radius: 8px;
          padding: 20px;
          text-align: center;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .image-upload-container:hover {
          border-color: #007bff;
        }

        .image-upload-label {
          cursor: pointer;
          display: block;
          width: 100%;
        }

        .upload-placeholder {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 10px;
          color: #666;
        }

        .image-preview {
          position: relative;
          display: inline-block;
        }

        .image-preview img {
          max-width: 200px;
          max-height: 200px;
          border-radius: 4px;
        }

        .remove-image {
          position: absolute;
          top: -10px;
          right: -10px;
          background: #dc3545;
          color: white;
          border: none;
          border-radius: 50%;
          width: 24px;
          height: 24px;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
        }

        .remove-image:hover {
          background: #c82333;
        }
      `}</style>
    </AdminLayout>
  );
};

export default AddVendor; 