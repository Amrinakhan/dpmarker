import { NextResponse } from 'next/server';
import mysql from 'mysql2/promise';

const dbConfig = {
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'dpmarker'
};

export async function POST(request) {
    let connection;
    try {
        const { couponId, otpCode, userEmail } = await request.json();

        if (!couponId || !otpCode || !userEmail) {
            return NextResponse.json({ message: 'Coupon ID, OTP code, and user email are required' }, { status: 400 });
        }

        connection = await mysql.createConnection(dbConfig);

        // Fetch coupon details to get vendor_id and current redeemed status
        const [coupons] = await connection.execute(
            `SELECT coupon_id, vendor_id, redeemedBy FROM coupons WHERE coupon_id = ?`,
            [couponId]
        );

        if (coupons.length === 0) {
            return NextResponse.json({ message: 'Coupon not found' }, { status: 404 });
        }

        const coupon = coupons[0];

        if (coupon.redeemedBy) {
            return NextResponse.json({ message: 'Coupon already redeemed' }, { status: 400 });
        }

        // Fetch vendor OTP code using vendor_id from the coupon
        const [vendors] = await connection.execute(
            `SELECT otp_code FROM vendor WHERE vendor_id = ?`,
            [coupon.vendor_id]
        );

        if (vendors.length === 0) {
            // This case should ideally not happen if vendor_id is valid in coupons table
            return NextResponse.json({ message: 'Vendor not found for this coupon' }, { status: 404 });
        }

        const vendor = vendors[0];

        // Validate the entered OTP code
        if (vendor.otp_code !== otpCode) {
            return NextResponse.json({ message: 'Invalid OTP. Please try again.' }, { status: 400 });
        }

        // Update coupon redeemed status and store user email
        const [updateResult] = await connection.execute(
            `UPDATE coupons SET redeemedBy = ? WHERE coupon_id = ?`,
            [userEmail, couponId]
        );

        if (updateResult.affectedRows === 1) {
            return NextResponse.json({ success: true, message: 'Coupon redeemed successfully' });
        }

    } catch (error) {
        console.error('Database error during OTP verification and coupon redemption:', error);
        return NextResponse.json({ message: 'Error processing redemption', error: error.message }, { status: 500 });
    } finally {
        if (connection) {
            await connection.end();
        }
    }
} 