import { NextResponse } from 'next/server';
import mysql from 'mysql2/promise';

// Database configuration
const dbConfig = {
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'dpmarker'
};

// API Route Handler for GET requests (fetching coupons for a vendor)
export async function GET(request, { params }) {
  let connection;
  try {
    const vendorId = params.vendorId;
    const userEmail = request.headers.get('x-user-email'); // Get user email from header

    if (!vendorId) {
      return NextResponse.json({ message: 'Vendor ID is required' }, { status: 400 });
    }

    connection = await mysql.createConnection(dbConfig);
    
    const [rows] = await connection.execute(
      `SELECT 
        coupon_id,
        vendor_id,
        title,
        discount,
        status,
        valid_until,
        created_date,
        redeemedBy
      FROM coupons 
      WHERE vendor_id = ? AND status = 'active'`, // Fetch only active coupons
      [vendorId]
    );

    // Process the coupons to determine if they're redeemed by the current user
    const processedCoupons = rows.map(coupon => ({
      ...coupon,
      redeemed: coupon.redeemedBy === userEmail ? 1 : 0 // Only mark as redeemed if redeemed by current user
    }));

    // Return the coupons data as JSON
    return NextResponse.json(processedCoupons);

  } catch (error) {
    console.error('Database error fetching coupons:', error);
    return NextResponse.json({ message: 'Error fetching coupons data' }, { status: 500 });
  } finally {
    if (connection) {
      await connection.end();
    }
  }
} 