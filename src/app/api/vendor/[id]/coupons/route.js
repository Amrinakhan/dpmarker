import { NextResponse } from 'next/server';

export async function GET(request, { params }) {
  const { id } = params;

  try {
    // TODO: Replace with actual database query
    // Mock data for now
    const mockCoupons = [
      {
        id: 1,
        code: 'WELCOME20',
        title: 'Welcome Discount',
        discount: 20,
        status: 'active',
        expiryDate: '2024-12-31',
        minPurchase: 50
      },
      {
        id: 2,
        code: 'SUMMER25',
        title: 'Summer Sale',
        discount: 25,
        status: 'active',
        expiryDate: '2024-08-31',
        minPurchase: 100
      },
      {
        id: 3,
        code: 'FLASH30',
        title: 'Flash Sale',
        discount: 30,
        status: 'expired',
        expiryDate: '2024-03-15',
        minPurchase: 75
      }
    ];

    return NextResponse.json({ success: true, coupons: mockCoupons });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Failed to fetch vendor coupons' },
      { status: 500 }
    );
  }
} 