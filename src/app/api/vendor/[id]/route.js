import { NextResponse } from 'next/server';

export async function GET(request, { params }) {
  const { id } = params;

  try {
    // TODO: Replace with actual database query
    // Mock data for now
    const mockVendor = {
      id: id,
      name: 'Tech Gadgets Store',
      email: 'contact@techgadgets.com',
      logo: '/assets/images/ji/cover.jpg',
      coverImage: '/assets/images/ji/vendor-2.jpg',
      shortDescription: 'Your one-stop shop for all tech gadgets and accessories. Quality products at competitive prices.',
      bio: 'Founded in 2020, Tech Gadgets Store has been providing high-quality tech products to customers worldwide. We specialize in smartphones, laptops, accessories, and smart home devices.',
      totalProducts: 156,
      totalSales: 1234,
      rating: 4.8,
      status: 'active',
      joinDate: '2020-01-15'
    };

    return NextResponse.json({ success: true, vendor: mockVendor });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Failed to fetch vendor details' },
      { status: 500 }
    );
  }
} 