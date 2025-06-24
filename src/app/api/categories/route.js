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

    // Fetch categories
    const [rows] = await connection.execute(
      'SELECT id, name FROM categories ORDER BY name ASC'
    );

    return NextResponse.json(rows);
  } catch (error) {
    console.error('Error fetching categories:', error);
    return NextResponse.json(
      { error: 'Failed to fetch categories' },
      { status: 500 }
    );
  } finally {
    if (connection) {
      await connection.end();
    }
  }
}

export async function POST(request) {
  let connection;
  try {
    const { name } = await request.json();

    if (!name || typeof name !== 'string' || name.trim() === '') {
      return NextResponse.json(
        { error: 'Category name is required' },
        { status: 400 }
      );
    }

    // Create database connection
    connection = await mysql.createConnection({
      host: 'localhost',
      database: 'dpmarker',
      user: 'root',
      password: '',
    });

    // Insert new category
    const [result] = await connection.execute(
      'INSERT INTO categories (name) VALUES (?)',
      [name.trim()]
    );

    return NextResponse.json({
      id: result.insertId,
      name: name.trim()
    });

  } catch (error) {
    console.error('Error adding category:', error);
    return NextResponse.json(
      { error: 'Failed to add category' },
      { status: 500 }
    );
  } finally {
    if (connection) {
      await connection.end();
    }
  }
} 