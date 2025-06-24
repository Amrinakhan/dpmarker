import mysql from 'mysql2/promise';
import { NextResponse } from 'next/server'; // Although Pages Router uses res, NextResponse is good for consistency or if refactoring to App Router later

export default async function handler(req, res) {
  // Only allow GET requests for fetching data
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  let connection;
  try {
    // Establish database connection using environment variables
    connection = await mysql.createConnection({
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
    });

    // Fetch all orders from the orders table
    const [orders] = await connection.execute('SELECT * FROM orders ORDER BY created_at DESC');

    // Send the orders data as a JSON response
    res.status(200).json(orders);

  } catch (error) {
    console.error('Error fetching orders:', error);
    // Send an error response
    res.status(500).json({ error: 'Failed to fetch orders' });
  } finally {
    // Close the database connection if it was established
    if (connection) {
      await connection.end();
    }
  }
} 