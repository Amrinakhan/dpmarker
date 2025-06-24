export default async function handler(req, res) {
  if (req.method === 'GET') {
    // Return mock vendor data for now
    const mockVendors = [
      {
        id: 'vendor1',
        name: 'Vendor A',
        email: 'vendorA@example.com',
        profileImage: '/images/vendorA.jpg',
        totalProducts: 50,
        joinDate: '2023-01-15',
        status: 'Active',
      },
      {
        id: 'vendor2',
        name: 'Vendor B',
        email: 'vendorB@example.com',
        profileImage: '/images/vendorB.png',
        totalProducts: 120,
        joinDate: '2022-07-01',
        status: 'Inactive',
      },
      // Add more mock vendors here
    ];

    res.status(200).json({ success: true, vendors: mockVendors });

  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
} 