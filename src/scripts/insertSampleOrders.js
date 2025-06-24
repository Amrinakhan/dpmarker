const mysql = require('mysql2/promise');

async function insertSampleOrders() {
    // Create a connection to the database
    const connection = await mysql.createConnection({
        host: 'localhost',
        user: 'root', // Replace with your MySQL username
        password: '', // Replace with your MySQL password
        database: 'dpmarker'
    });

    try {
        // Sample order data
        const sampleOrder = {
            email: 'john.doe@example.com',
            first_name: 'John',
            last_name: 'Doe',
            plan: 'Premium Plan',
            price: 99.99,
            agreed_to_terms: true,
            agreed_to_privacy: true
        };

        // Insert the sample order
        const [result] = await connection.execute(
            'INSERT INTO orders (email, first_name, last_name, plan, price, agreed_to_terms, agreed_to_privacy) VALUES (?, ?, ?, ?, ?, ?, ?)',
            [
                sampleOrder.email,
                sampleOrder.first_name,
                sampleOrder.last_name,
                sampleOrder.plan,
                sampleOrder.price,
                sampleOrder.agreed_to_terms,
                sampleOrder.agreed_to_privacy
            ]
        );

        console.log('Order inserted successfully!');
        console.log('Insert ID:', result.insertId);

    } catch (error) {
        console.error('Error inserting order:', error);
    } finally {
        // Close the connection
        await connection.end();
        console.log('Database connection closed.');
    }
}

// Run the function
insertSampleOrders(); 