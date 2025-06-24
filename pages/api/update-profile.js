import mysql from 'mysql2/promise';

export default async function handler(req, res) {
  const connection = await mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
  });

  try {
    if (req.method === 'GET') {
      // Fetch user data from profileup table
      const { emailAddress } = req.query; // Get email from query parameters (frontend might send as emailAddress)

      if (!emailAddress) {
        await connection.end();
        return res.status(400).json({ error: 'Missing user email address' });
      }

      const [users] = await connection.execute(
        'SELECT id, firstname, lastname, `Phone Number`, `Email Address`, City, `State/Region`, Postcode, Country FROM profileup WHERE `Email Address` = ?',
        [emailAddress]
      );

      if (users.length === 0) {
        await connection.end();
        return res.status(404).json({ error: 'User not found' });
      }

      await connection.end();
      res.status(200).json({ success: true, user: users[0] });

    } else if (req.method === 'POST') {
      // Update user data in profileup table
      const { emailAddress, firstname, lastname, phoneNumber, city, stateRegion, postcode, country } = req.body; // Get data from request body

      if (!emailAddress) {
        await connection.end();
        return res.status(400).json({ error: 'Missing user email address for update' });
      }

      // Construct UPDATE query dynamically based on provided fields
      const updateFields = [];
      const queryParams = [];

      if (firstname !== undefined) { updateFields.push('`firstname` = ?'); queryParams.push(firstname); }
      if (lastname !== undefined) { updateFields.push('`lastname` = ?'); queryParams.push(lastname); }
      if (phoneNumber !== undefined) { updateFields.push('`Phone Number` = ?'); queryParams.push(phoneNumber); }
      if (city !== undefined) { updateFields.push('`City` = ?'); queryParams.push(city); }
      if (stateRegion !== undefined) { updateFields.push('`State/Region` = ?'); queryParams.push(stateRegion); }
      if (postcode !== undefined) { updateFields.push('`Postcode` = ?'); queryParams.push(postcode); }
      if (country !== undefined) { updateFields.push('`Country` = ?'); queryParams.push(country); }

      if (updateFields.length === 0) {
        await connection.end();
        return res.status(400).json({ error: 'No fields to update' });
      }

      queryParams.push(emailAddress); // Add email address for the WHERE clause

      const updateQuery = `UPDATE profileup SET ${updateFields.join(', ')} WHERE \`Email Address\` = ?`; // Note: profileup table doesn't have updated_at in schema provided

      const [result] = await connection.execute(updateQuery, queryParams);

      if (result.affectedRows === 0) {
        // Check if user exists before concluding no changes were made
        const [existingUser] = await connection.execute(
          'SELECT 1 FROM profileup WHERE `Email Address` = ?', [emailAddress]
        );
        if (existingUser.length === 0) {
          await connection.end();
          return res.status(404).json({ error: 'User not found' });
        } else {
          await connection.end();
          return res.status(200).json({ success: true, message: 'Profile data is the same, no update needed.' });
        }
      }

      await connection.end();
      res.status(200).json({ success: true, message: 'Profile updated successfully' });

    } else {
      // Method not allowed
      await connection.end();
      res.status(405).json({ error: 'Method not allowed' });
    }
  } catch (err) {
    console.error('Database error:', err);
    if (connection) {
      await connection.end();
    }
    res.status(500).json({ success: false, error: err.message });
  }
} 