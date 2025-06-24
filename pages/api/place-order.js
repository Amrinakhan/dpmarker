import mysql from 'mysql2/promise';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { user_id, email, first_name, last_name, plan_name, total_amount, payment_method, shipping_address, agreed_to_terms, agreed_to_privacy, cartItems } = req.body;

  // Basic validation - Allow empty cartItems array
  if (!user_id || !email || !first_name || !last_name || !plan_name || !total_amount || !payment_method || !shipping_address || typeof agreed_to_terms === 'undefined' || typeof agreed_to_privacy === 'undefined' || !cartItems || !Array.isArray(cartItems)) {
    return res.status(400).json({ error: 'Missing or invalid order data' });
  }

  let connection;
  try {
    connection = await mysql.createConnection({
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
    });

    await connection.beginTransaction(); // Start a transaction

    // Insert into orders table (now with all required fields)
    const [orderResult] = await connection.execute(
      'INSERT INTO orders (user_id, email, first_name, last_name, plan_name, total_amount, payment_method, shipping_address, agreed_to_terms, agreed_to_privacy) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
      [user_id, email, first_name, last_name, plan_name, total_amount, payment_method, shipping_address, agreed_to_terms, agreed_to_privacy]
    );

    const orderId = orderResult.insertId; // Get the ID of the newly inserted order

    // Prepare values for batch insert into order_items table
    const orderItemValues = cartItems.map(item => [
      orderId, // Link to the new order
      item.product_id,
      item.product_name,
      item.price,
      item.quantity,
    ]);

    // Insert into order_items table (batch insert for efficiency)
    if (orderItemValues.length > 0) {
      await connection.query(
        'INSERT INTO order_items (order_id, product_id, product_name, price, quantity) VALUES ?',
        [orderItemValues]
      );
    }

    await connection.commit(); // Commit the transaction
    await connection.end(); // Close the connection

    res.status(200).json({ success: true, message: 'Order placed successfully', orderId: orderId });

  } catch (err) {
    if (connection) {
      await connection.rollback(); // Rollback the transaction on error
      await connection.end(); // Close the connection
    }
    console.error('Error placing order:', err);
    res.status(500).json({ success: false, error: 'Failed to place order' });
  }
} 