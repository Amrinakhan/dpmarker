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
        const { couponCode } = await request.json();

        if (!couponCode) {
            return NextResponse.json({ message: 'Coupon code is required' }, { status: 400 });
        }

        connection = await mysql.createConnection(dbConfig);

        // Check coupon status and if it exists
        const [coupons] = await connection.execute(
            `SELECT coupon_id, redeemed FROM coupons WHERE code = ?`,
            [couponCode]
        );

        if (coupons.length === 0) {
            // Coupon not found
            return NextResponse.json({ message: 'Coupon already redeemed or invalid' }, { status: 404 });
        }

        const coupon = coupons[0];

        if (coupon.redeemed === 1) {
            // Coupon already redeemed
            return NextResponse.json({ message: 'Coupon already redeemed or invalid' }, { status: 400 });
        }

        // Redeem the coupon (update redeemed status)
        const [result] = await connection.execute(
            `UPDATE coupons SET redeemed = 1 WHERE coupon_id = ?`,
            [coupon.coupon_id]
        );

        if (result.affectedRows === 1) {
            return NextResponse.json({ success: true, message: 'Coupon redeemed successfully' });
        } else {
            // This case should theoretically not happen if coupon was found and not redeemed
            return NextResponse.json({ message: 'Failed to update coupon status' }, { status: 500 });
        }

    } catch (error) {
        console.error('Database error during coupon redemption:', error);
        return NextResponse.json({ message: 'Error redeeming coupon', error: error.message }, { status: 500 });
    } finally {
        if (connection) {
            await connection.end();
        }
    }
} 