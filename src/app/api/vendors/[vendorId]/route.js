import { NextResponse } from 'next/server';
import mysql from 'mysql2/promise';

// Database configuration
const dbConfig = {
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'dpmarker'
};

// Helper function to ensure proper image URL format
function formatImageUrl(url) {
  if (!url) return '/images/placeholder.jpg'; // Return a default placeholder image
  
  // If the URL is already absolute, return it
  if (url.startsWith('http://') || url.startsWith('https://')) {
    return url;
  }
  
  // If the URL starts with a forward slash, it's relative to the root
  if (url.startsWith('/')) {
    return url;
  }
  
  // Otherwise, assume it's relative to the public directory
  return `/${url}`;
}

// Fetch vendor data from the database by ID
async function getVendorData(vendorId) {
  let connection;
  try {
    connection = await mysql.createConnection(dbConfig);
    
    const [rows] = await connection.execute(
      `SELECT 
        vendor_id, 
        vendor_title, 
        vendor_img, 
        vendor_description, 
        email,
        phone,
        address,
        status,
        commission_rate,
        payment_method,
        created_date,
        vendor_logo
      FROM vendor 
      WHERE vendor_id = ?`,
      [vendorId]
    );

    const vendor = rows[0] || null;
    if (vendor) {
        // Format the image URL to ensure it's valid
        const formattedImageUrl = formatImageUrl(vendor.vendor_img);
        
        // Map database fields to match the structure expected by components
        return {
            id: vendor.vendor_id,
            name: vendor.vendor_title,
            bio: vendor.vendor_description,
            shortDescription: vendor.vendor_description,
            image: formattedImageUrl,
            coverImage: formattedImageUrl,
            logo: formatImageUrl(vendor.vendor_logo),
            email: vendor.email,
            phone: vendor.phone,
            address: vendor.address,
            status: vendor.status,
            commission_rate: vendor.commission_rate,
            payment_method: vendor.payment_method,
            created_date: vendor.created_date,
            products: [],
            rating: 4.9,
            customers: '2.5k+',
            totalProducts: 0,
            totalSales: 0
        };
    } else {
        return null;
    }

  } catch (error) {
    console.error('Database error:', error);
    throw new Error('Failed to fetch vendor data');
  } finally {
    if (connection) {
      await connection.end();
    }
  }
}

export async function GET(request, { params }) {
  const vendorId = params.vendorId;

  if (!vendorId) {
    return NextResponse.json({ message: 'Vendor ID is required' }, { status: 400 });
  }

  try {
    const vendor = await getVendorData(vendorId);
    if (vendor) {
      return NextResponse.json(vendor);
    } else {
      return NextResponse.json({ message: 'Vendor not found' }, { status: 404 });
    }
  } catch (error) {
    return NextResponse.json({ message: 'Error fetching vendor data', error: error.message }, { status: 500 });
  }
}

// You might also need POST, PUT, DELETE handlers for editing, creating, deleting vendors
// based on your admin dashboard functionality. For now, we only recreate the GET handler.
// export async function PUT(request, { params }) { ... }

export async function DELETE(request, { params }) {
  let connection;
  try {
    const vendorId = params.vendorId;

    if (!vendorId) {
      return NextResponse.json({ message: 'Vendor ID is required' }, { status: 400 });
    }

    connection = await mysql.createConnection(dbConfig);

    // Start a transaction to ensure atomicity
    await connection.beginTransaction();

    try {
      // Delete the vendor
      const [result] = await connection.execute(
        `DELETE FROM vendor WHERE vendor_id = ?`,
        [vendorId]
      );

      if (result.affectedRows === 0) {
        await connection.rollback();
        return NextResponse.json({ message: 'Vendor not found' }, { status: 404 });
      }

      // Commit the transaction
      await connection.commit();
      return NextResponse.json({ message: 'Vendor deleted successfully' });

    } catch (deleteError) {
      console.error('Error deleting vendor:', deleteError);
      await connection.rollback();
      return NextResponse.json({ 
        message: 'Failed to delete vendor',
        error: deleteError.message 
      }, { status: 500 });
    }

  } catch (error) {
    console.error('Database connection error:', error);
    return NextResponse.json({ 
      message: 'Database connection error',
      error: error.message 
    }, { status: 500 });
  } finally {
    if (connection) {
      await connection.end();
    }
  }
} 