import mysql from 'mysql2/promise';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { pin_code } = req.body;

  if (!pin_code) {
    return res.status(400).json({ error: 'Missing data' });
  }

  try {
    const connection = await mysql.createConnection({
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
    });

    // Find the offer_id based on the pin_code in restaurant_offers table
    const [offers] = await connection.execute(
      'SELECT id FROM restaurant_offers WHERE pin_code = ?',
      [pin_code]
    );

    if (offers.length === 0) {
      await connection.end();
      return res.status(404).json({ error: 'Invalid PIN code' });
    }

    const offer_id = offers[0].id;
    const used_by = 'anonymous'; // Placeholder - replace with actual user identifier

    // Insert into redemptions table with offer_id and used_by
    await connection.execute(
      'INSERT INTO redemptions (offer_id, used_by, pin_code) VALUES (?, ?, ?)',
      [offer_id, used_by, pin_code]
    );

    await connection.end();
    res.status(200).json({ success: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}
