import { NextResponse } from 'next/server';
import mysql from 'mysql2/promise';

const dbConfig = {
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'dpmarker'
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

    // Query to fetch orders, joining with subscriptions and users tables
    const [orders] = await connection.execute(`
      SELECT 
        o.created_at AS purchase_date,
        o.payment_method,
        o.total_amount,
        s.subsc_title AS subscription_name,
        s.subsc_image AS subscription_image,
        s.subsc_price AS subscription_price_from_plan,
        u.first_name,
        u.last_name,
        u.email AS user_email
      FROM orders o
      LEFT JOIN subscriptions s ON o.plan_name = s.subsc_title
      LEFT JOIN users u ON o.email = u.email
      WHERE o.email = ?
      ORDER BY o.created_at DESC
    `, [email]);

    const formattedOrders = orders.map(order => ({
      subscriptionName: order.subscription_name || order.plan_name, // Fallback to plan_name if subscription title not found
      subscriptionPrice: order.subscription_price_from_plan || order.total_amount, // Prefer plan price, fallback to total_amount
      subscriptionImage: order.subscription_image || null,
      purchaseDate: order.purchase_date,
        paymentMethod: order.payment_method,
      totalAmount: order.total_amount, // This is the actual amount paid for the order
      userName: `${order.first_name || ''} ${order.last_name || ''}`.trim() || 'N/A',
      userEmail: order.user_email || 'N/A',
    }));

    return NextResponse.json(formattedOrders);
  } catch (error) {
    console.error('Error fetching orders:', error);
    return NextResponse.json({ message: 'Internal Server Error', details: error.message || 'An unknown error occurred' }, { status: 500 });
  } finally {
    if (connection) {
      await connection.end();
    }
  }
} 