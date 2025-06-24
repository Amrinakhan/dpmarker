import { NextResponse } from 'next/server';
import mysql from 'mysql2/promise';
import { writeFile } from 'fs/promises';
import { join } from 'path';

export async function POST(request) {
  try {
    const formData = await request.formData();
    
    // Extract form fields
    const vendor_title = formData.get('vendor_title');
    const vendor_description = formData.get('vendor_description');
    const otp_code = formData.get('otp_code');
    const email = formData.get('email');
    const phone = formData.get('phone');
    const address = formData.get('address');
    const status = formData.get('status');
    const commission_rate = formData.get('commission_rate');
    const payment_method = formData.get('payment_method');
    const vendor_img = formData.get('vendor_img');
    const vendor_logo = formData.get('vendor_logo'); // Get vendor logo file
    const couponsData = formData.get('coupons'); // Get coupons data as JSON string
    const coupons = JSON.parse(couponsData || '[]'); // Parse JSON string to array, default to empty array if null

    // Extract new fields
    const facebookLink = formData.get('facebookLink');
    const whatsappLink = formData.get('whatsappLink');
    const twitterLink = formData.get('twitterLink');
    const featured = formData.get('featured'); // Will be '1' or '0' as a string

    // Validate required fields
    if (!vendor_title || !vendor_description || !otp_code || !email || !phone || !address) {
      return NextResponse.json(
        { message: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Handle image upload
    let vendor_img_path = null;
    if (vendor_img && vendor_img instanceof File) {
      const bytes = await vendor_img.arrayBuffer();
      const buffer = Buffer.from(bytes);

      // Create unique filename
      const timestamp = Date.now();
      const filename = `${timestamp}-${vendor_img.name}`;
      
      // Save to public/uploads directory
      const uploadDir = join(process.cwd(), 'public', 'uploads');
      const filepath = join(uploadDir, filename);
      
      await writeFile(filepath, buffer);
      vendor_img_path = `/uploads/${filename}`;
    }

    // Handle logo upload
    let vendor_logo_path = null;
    if (vendor_logo && vendor_logo instanceof File) {
      const bytes = await vendor_logo.arrayBuffer();
      const buffer = Buffer.from(bytes);

      // Create unique filename for logo
      const timestamp = Date.now();
      const filename = `logo-${timestamp}-${vendor_logo.name}`;
      
      // Save to public/uploads directory
      const uploadDir = join(process.cwd(), 'public', 'uploads');
      const filepath = join(uploadDir, filename);
      
      await writeFile(filepath, buffer);
      vendor_logo_path = `/uploads/${filename}`;
    }

    // Create database connection
    const connection = await mysql.createConnection({
      host: process.env.DB_HOST || 'localhost',
      user: process.env.DB_USER || 'root',
      password: process.env.DB_PASSWORD || '',
      database: process.env.DB_NAME || 'dpmarker',
      charset: 'utf8mb4'
    });

    // Insert vendor data
    const [result] = await connection.execute(
      "INSERT INTO vendor (vendor_title, vendor_description, otp_code, email, phone, address, status, commission_rate, payment_method, vendor_img, vendor_logo, facebookLink, whatsappLink, twitterLink, featured, created_date) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, NOW())",
      [
        vendor_title,
        vendor_description,
        otp_code,
        email,
        phone,
        address,
        status,
        parseFloat(commission_rate) || null,
        payment_method,
        vendor_img_path || null,
        vendor_logo_path || '',
        facebookLink || '',
        whatsappLink || '',
        twitterLink || '',
        parseInt(featured) || 0,
      ]
    );

    // Insert coupons data
    if (coupons.length > 0) {
      const vendorId = result.insertId;
      const couponValues = coupons.map(coupon => [
        vendorId,
        coupon.title,
        parseInt(coupon.discount), // Ensure discount is an integer
        'active', // Default status
        '9999-12-31', // Placeholder valid_until date (far in the future)
        new Date() // created_date will be set by the database default
      ]);

      // Construct the multi-insert query
      const couponInsertQuery = `INSERT INTO coupons (vendor_id, title, discount, status, valid_until, created_date) VALUES ${couponValues.map(() => '(?, ?, ?, ?, ?, ?)').join(', ')}`;
      const couponInsertValues = couponValues.flat();

      await connection.execute(couponInsertQuery, couponInsertValues);
    }

    await connection.end();

    return NextResponse.json({
      message: 'Vendor added successfully',
      vendor_id: result.insertId
    });

  } catch (error) {
    console.error('Error adding vendor:', error);
    return NextResponse.json(
      { message: 'Error adding vendor' },
      { status: 500 }
    );
  }
} 