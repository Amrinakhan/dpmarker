import { NextResponse } from 'next/server';
import { PrismaClient } from '../../../../src/generated/prisma/index.js';
const prisma = new PrismaClient();

export async function GET(req) {
  const url = new URL(req.url);
  const email = url.searchParams.get('email');

  if (!email) {
    return NextResponse.json({ message: 'Unauthorized: Email is required.' }, { status: 401 });
  }

  try {
    // First try to find the user by email
    let user = await prisma.user.findFirst({
      where: { email: email },
      select: {
        id: true,
        first_name: true,
        last_name: true,
        email: true,
        address: true,
      },
    });

    // If user not found, create a new user with the email
    if (!user) {
      // Extract name from email (before @ symbol)
      const name = email.split('@')[0];
      const firstName = name.charAt(0).toUpperCase() + name.slice(1);
      
      user = await prisma.user.create({
        data: {
          email: email,
          first_name: firstName,
          last_name: '',
          address: '',
        },
        select: {
          id: true,
          first_name: true,
          last_name: true,
          email: true,
          address: true,
        },
      });
    }

    return NextResponse.json(user);
  } catch (error) {
    console.error('Error fetching/creating user data:', error);
    return NextResponse.json({ 
      message: 'Internal Server Error', 
      details: error.message || 'An unknown error occurred' 
    }, { status: 500 });
  }
}

export async function PUT(req) {
  try {
    const { email, ...updateData } = await req.json();

    if (!email) {
      return NextResponse.json({ message: 'Email is required.' }, { status: 400 });
  }

    const updatedUser = await prisma.user.update({
      where: { email: email },
      data: updateData,
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
    return NextResponse.json({ message: 'Internal Server Error', details: error.message || 'An unknown error occurred' }, { status: 500 });
  }
} 