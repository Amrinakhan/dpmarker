import { NextResponse } from 'next/server';
import mysql from 'mysql2/promise';

const dbConfig = {
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'dpmarker',
  charset: 'utf8mb4'
};

export async function GET(req) {
  const url = new URL(req.url);
  const email = url.searchParams.get('email');

  if (!email) {
    return NextResponse.json({ message: 'Unauthorized: Email is required.' }, { status: 401 });
  }

  let connection;
  try {
    connection = await mysql.createConnection(dbConfig);

    // Query to fetch redeemed coupons with vendor details
    const [coupons] = await connection.execute(`
      SELECT 
        c.coupon_id,
        c.title as coupon_title,
        c.discount,
        c.created_date as redeemed_date,
        v.vendor_id,
        v.vendor_title,
        v.vendor_description,
        v.vendor_logo,
        v.email as vendor_email,
        v.phone as vendor_phone
      FROM coupons c
      JOIN vendor v ON c.vendor_id = v.vendor_id
      WHERE c.redeemedBy = ?
      ORDER BY c.created_date DESC
    `, [email]);

    // Format the response
    const formattedCoupons = coupons.map(coupon => ({
      couponCode: coupon.coupon_title || 'N/A',
      discount: coupon.discount || 0,
      redeemDate: coupon.redeemed_date || new Date().toISOString(),
      vendor: {
        title: coupon.vendor_title || 'N/A',
        description: coupon.vendor_description || 'N/A',
        logo: coupon.vendor_logo || null,
        email: coupon.vendor_email || 'N/A',
        phone: coupon.vendor_phone || 'N/A'
      }
    }));

    return NextResponse.json(formattedCoupons);
  } catch (error) {
    console.error('Error fetching redeemed coupons:', error);
    return NextResponse.json({ 
      message: 'Internal Server Error', 
      details: error.message || 'An unknown error occurred' 
    }, { status: 500 });
  } finally {
    if (connection) {
      await connection.end();
    }
  }
}
