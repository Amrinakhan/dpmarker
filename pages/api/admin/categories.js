import mysql from 'mysql2/promise';
import { NextResponse } from 'next/server';

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  let connection;
  try {
    connection = await mysql.createConnection({
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
    });

    // Assuming your categories table is named 'categories'
    // and you want to fetch all columns
    const [categories] = await connection.execute('SELECT * FROM categories ORDER BY id ASC');

    res.status(200).json(categories);

  } catch (error) {
    console.error('Error fetching categories:', error);
    res.status(500).json({ error: 'Failed to fetch categories' });
  } finally {
    if (connection) {
      await connection.end();
    }
  }
} 