import mysql.connector
from datetime import datetime

# Database connection configuration
db_config = {
    'host': 'localhost',
    'user': 'root',  # Replace with your database username
    'password': '',  # Replace with your database password
    'database': 'dpmarker'
}

try:
    # Establish database connection
    connection = mysql.connector.connect(**db_config)
    cursor = connection.cursor()

    # Sample data to insert
    sample_orders = [
        {
            'email': 'john.doe@example.com',
            'first_name': 'John',
            'last_name': 'Doe',
            'plan': 'Basic Plan',
            'price': 29.99,
            'agreed_to_terms': True,
            'agreed_to_privacy': True
        },
        {
            'email': 'jane.smith@example.com',
            'first_name': 'Jane',
            'last_name': 'Smith',
            'plan': 'Premium Plan',
            'price': 49.99,
            'agreed_to_terms': True,
            'agreed_to_privacy': True
        },
        {
            'email': 'bob.wilson@example.com',
            'first_name': 'Bob',
            'last_name': 'Wilson',
            'plan': 'Enterprise Plan',
            'price': 99.99,
            'agreed_to_terms': True,
            'agreed_to_privacy': True
        }
    ]

    # SQL query to insert data
    insert_query = """
    INSERT INTO orders (email, first_name, last_name, plan, price, agreed_to_terms, agreed_to_privacy)
    VALUES (%s, %s, %s, %s, %s, %s, %s)
    """

    # Insert each sample order
    for order in sample_orders:
        values = (
            order['email'],
            order['first_name'],
            order['last_name'],
            order['plan'],
            order['price'],
            order['agreed_to_terms'],
            order['agreed_to_privacy']
        )
        cursor.execute(insert_query, values)

    # Commit the transaction
    connection.commit()
    print("Successfully inserted sample orders into the database!")

except mysql.connector.Error as err:
    print(f"Error: {err}")
    if connection.is_connected():
        connection.rollback()
        print("Transaction rolled back due to error.")

finally:
    if 'connection' in locals() and connection.is_connected():
        cursor.close()
        connection.close()
        print("Database connection closed.") 