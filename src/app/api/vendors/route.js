import { NextResponse } from 'next/server';
import mysql from 'mysql2/promise';

export async function GET(request) {
  let connection;
  try {
    // Get query parameters
    const { searchParams } = new URL(request.url);
    const isFeatured = searchParams.get('featured') === '1';

    // Create database connection
    connection = await mysql.createConnection({
      host: 'localhost',
      database: 'dpmarker',
      user: 'root',
      password: '',
    });

    // Fetch vendors
    let query = `
      SELECT 
        vendor_id, 
        vendor_title, 
        vendor_img, 
        vendor_description, 
        status, 
        created_date, 
        vendor_logo, 
        facebookLink, 
        whatsappLink, 
        twitterLink, 
        featured,
        email,
        phone,
        address
      FROM vendor
    `;
    const queryParams = [];

    if (isFeatured) {
      query += ` WHERE featured = ?`;
      queryParams.push(1);
    }

    query += ` ORDER BY created_date DESC`;

    const [rows] = await connection.execute(query, queryParams);

    // Format the response
    const formattedVendors = rows.map(vendor => ({
      ...vendor,
      vendor_img: vendor.vendor_img || '/images/placeholder.jpg',
      vendor_logo: vendor.vendor_logo || '/images/placeholder.jpg',
      status: vendor.status || 'pending'
    }));

    return NextResponse.json(formattedVendors);

  } catch (error) {
    console.error('Error fetching vendors:', error);
    return NextResponse.json(
      { message: 'Error fetching vendors', error: error.message },
      { status: 500 }
    );
  } finally {
    if (connection) {
      await connection.end();
    }
  }
} 