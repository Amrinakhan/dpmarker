import mysql from 'mysql2/promise';

export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method Not Allowed' });
    }

    const { user_id, email, first_name, last_name, plan_name, total_amount, payment_method, shipping_address, agreed_to_terms, agreed_to_privacy } = req.body;

    // Basic validation (can be expanded)
    if (!email || !first_name || !last_name || !plan_name || total_amount === undefined || agreed_to_terms === undefined || agreed_to_privacy === undefined) {
        return res.status(400).json({ error: 'Missing required fields' });
    }

    let connection;
    try {
        // Create a connection to the database
        connection = await mysql.createConnection({
            host: process.env.DB_HOST || 'localhost', // Use environment variables for credentials
            user: process.env.DB_USER || 'root',      // Replace with your MySQL username or use env var
            password: process.env.DB_PASSWORD || '',  // Replace with your MySQL password or use env var
            database: process.env.DB_NAME || 'dpmarker'
        });

        // Insert the order into the database
        const [result] = await connection.execute(
            'INSERT INTO orders (email, first_name, last_name, plan, price, agreed_to_terms, agreed_to_privacy) VALUES (?, ?, ?, ?, ?, ?, ?)',
            [
                email,
                first_name,
                last_name,
                plan_name,
                total_amount,
                agreed_to_terms,
                agreed_to_privacy
            ]
        );

        res.status(200).json({ success: true, orderId: result.insertId });

    } catch (error) {
        console.error('Error placing order:', error);
        res.status(500).json({ error: 'Failed to place order' });
    } finally {
        // Close the connection
        if (connection) {
            await connection.end();
        }
    }
} 