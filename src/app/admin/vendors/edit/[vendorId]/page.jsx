import React from 'react';
import AdminLayout from '@/components/AdminLayout';
// We'll create this client component next
import EditVendorForm from '../EditVendorForm';

async function getVendor(vendorId) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/api/vendors/${vendorId}`);

  if (!res.ok) {
    // Handle errors, maybe redirect or show a message
    // For now, we'll throw an error which will be caught by error.js if it exists
    const errorData = await res.json();
    throw new Error(errorData.message || 'Failed to fetch vendor');
  }

  return res.json();
}

const EditVendorPage = async ({ params }) => {
  const { vendorId } = params;
  let vendor = null;
  let error = null;

  try {
    vendor = await getVendor(vendorId);
  } catch (err) {
    error = err.message;
    console.error('Error fetching vendor for edit:', err);
  }

  if (error) {
    return (
      <AdminLayout>
        <div className="dashboard-body__content">
          <div className="alert alert-danger" role="alert">
            Error loading vendor: {error}
          </div>
        </div>
      </AdminLayout>
    );
  }

  if (!vendor) {
     return (
      <AdminLayout>
        <div className="dashboard-body__content">
          <div className="alert alert-warning" role="alert">
            Vendor not found.
          </div>
        </div>
      </AdminLayout>
    );
  }

  // We will create EditVendorForm.jsx next to handle the form
  return (
    <AdminLayout>
      <div className="dashboard-body__content">
         <div className="welcome-balance mt-2 mb-40 flx-between gap-2">
            <div className="welcome-balance__left">
              <h4 className="welcome-balance__title mb-0">Edit Vendor: {vendor.vendor_title}</h4>
            </div>
          </div>
        {/* Pass the fetched vendor data to the client component */}
        <EditVendorForm vendor={vendor} />
        {/* <p>Loading edit form...</p> {/* Placeholder */}
      </div>
    </AdminLayout>
  );
};

export default EditVendorPage; 