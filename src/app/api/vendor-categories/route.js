import { NextResponse } from 'next/server';
import mysql from 'mysql2/promise';

export async function GET() {
  let connection;
  try {
    // Create database connection
    connection = await mysql.createConnection({
      host: 'localhost',
      database: 'dpmarker',
      user: 'root',
      password: '',
    });

    // Fetch vendor categories
    const [rows] = await connection.execute(`
      SELECT 
        vc.vendor_id,
        vc.category_id,
        c.name as category_name,
        v.vendor_title as vendor_name
      FROM vendor_categories vc
      JOIN categories c ON vc.category_id = c.id
      JOIN vendor v ON vc.vendor_id = v.vendor_id
      ORDER BY c.name, v.vendor_title
    `);

    return NextResponse.json(rows);
  } catch (error) {
    console.error('Error fetching vendor categories:', error);
    return NextResponse.json(
      { error: 'Failed to fetch vendor categories' },
      { status: 500 }
    );
  } finally {
    if (connection) {
      await connection.end();
    }
  }
} 