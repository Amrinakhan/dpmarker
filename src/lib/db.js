import mysql from 'mysql2/promise';

export async function query(sql, values) {
  const connection = await mysql.createConnection({
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || '',
    database: process.env.DB_NAME || 'dpmarker',
    charset: 'utf8mb4'
  });

  try {
    const [results] = await connection.execute(sql, values);
    return results;
  } catch (error) {
    throw error;
  } finally {
    await connection.end();
  }
} 