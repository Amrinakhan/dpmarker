export default async function handler(req, res) {
  const { id } = req.query; // Get the vendor ID from the URL

  // Mock data for individual vendors
  const mockVendorDetails = {
    vendor1: {
      id: 'vendor1',
      name: 'Vendor A',
      email: 'vendorA@example.com',
      phone: '123-456-7890',
      country: 'USA',
      profileImage: '/images/vendorA_full.jpg',
      bio: 'This is a sample bio for Vendor A.',
      status: 'Active',
      joinDate: '2023-01-15',
      products: [
        { id: 'p1', title: 'Product One', price: 19.99, image: '/images/product1.jpg' },
        { id: 'p2', title: 'Product Two', price: 29.99, image: '/images/product2.png' },
      ],
    },
    vendor2: {
      id: 'vendor2',
      name: 'Vendor B',
      email: 'vendorB@example.com',
      phone: '987-654-3210',
      country: 'Canada',
      profileImage: '/images/vendorB_full.png',
      bio: 'This is a sample bio for Vendor B.',
      status: 'Inactive',
      joinDate: '2022-07-01',
      products: [
        { id: 'p3', title: 'Product Three', price: 5.00, image: '/images/product3.gif' },
      ],
    },
    // Add more mock details for other vendors
  };

  if (req.method === 'GET') {
    const vendor = mockVendorDetails[id];

    if (vendor) {
      res.status(200).json({ success: true, vendor });
    } else {
      res.status(404).json({ success: false, error: 'Vendor not found' });
    }

  } else if (req.method === 'PUT') {
      // Placeholder for updating vendor status or profile
      // In a real application, you would update your database here
      const { status, profileImage } = req.body;
      const vendor = mockVendorDetails[id]; // Find the vendor (in mock data)

      if (vendor) {
          if (status !== undefined) vendor.status = status;
          if (profileImage !== undefined) vendor.profileImage = profileImage;
          // Simulate a successful update
          res.status(200).json({ success: true, message: 'Vendor updated successfully' });
      } else {
          res.status(404).json({ success: false, error: 'Vendor not found' });
      }

  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
} 