import { NextResponse } from 'next/server';
import mysql from 'mysql2/promise';

// Database configuration
const dbConfig = {
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'dpmarker'
};

// API Route Handler for GET requests (fetching all coupons)
export async function GET() {
  let connection;
  try {
    connection = await mysql.createConnection(dbConfig);
    
    const [rows] = await connection.execute(
      `SELECT 
        coupon_id,
        vendor_id,
        title,
        discount,
        status,
        valid_until,
        created_date
      FROM coupons`
    );

    // Return the coupons data as JSON
    return NextResponse.json(rows);

  } catch (error) {
    console.error('Database error fetching coupons:', error);
    return NextResponse.json({ message: 'Error fetching coupons data' }, { status: 500 });
  } finally {
    if (connection) {
      await connection.end();
    }
  }
} 