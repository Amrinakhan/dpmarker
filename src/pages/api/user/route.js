import { NextResponse } from 'next/server';
import prisma from '@/src/generated/prisma';

export async function GET(req) {
  const url = new URL(req.url);
  const userId = url.searchParams.get('userId');

  if (!userId) {
    return NextResponse.json({ message: 'Unauthorized: User ID is required.' }, { status: 401 });
  }

  try {
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: {
        id: true,
        first_name: true,
        last_name: true,
        email: true,
        address: true,
      },
    });

    if (!user) {
      return NextResponse.json({ message: 'User not found.' }, { status: 404 });
    }

    return NextResponse.json(user);
  } catch (error) {
    console.error('Error fetching user data:', error);
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
  }
}

export async function PUT(req) {
  const body = await req.json();
  const { userId, first_name, last_name, email, address } = body;

  if (!userId) {
    return NextResponse.json({ message: 'Unauthorized: User ID is required.' }, { status: 401 });
  }

  if (!first_name || !last_name || !email) {
    return NextResponse.json({ message: 'First name, last name, and email are required.' }, { status: 400 });
  }

  try {
    const updatedUser = await prisma.user.update({
      where: { id: userId },
      data: {
        first_name,
        last_name,
        email,
        address,
      },
      select: {
        id: true,
        first_name: true,
        last_name: true,
        email: true,
        address: true,
      },
    });

    return NextResponse.json(updatedUser);
  } catch (error) {
    console.error('Error updating user data:', error);
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
  }
}
