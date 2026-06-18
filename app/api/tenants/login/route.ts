import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb'; // Apne path ke hisaab se check kar lein
import Tenant from '@/models/Tenant';   // Apne path ke hisaab se check kar lein

export async function POST(request: Request) {
  try {
    // Database connection
    await connectDB();
    
    // Request body se phone aur roomNumber lena
    const { phone, roomNumber } = await request.json();

    if (!phone || !roomNumber) {
      return NextResponse.json(
        { success: false, error: 'Phone number aur Room number zaroori hai.' },
        { status: 400 }
      );
    }

    // Database mein check karna
    const tenant = await Tenant.findOne({ phone, roomNumber });

    if (!tenant) {
      return NextResponse.json(
        { success: false, error: 'Tenant nahi mila! Kripya details check karein.' },
        { status: 404 }
      );
    }

    // Success response
    return NextResponse.json({ success: true, data: tenant }, { status: 200 });
    
  } catch (error: any) {
    console.error('Login Error:', error);
    return NextResponse.json(
      { success: false, error: 'Server error, baad mein koshish karein.' },
      { status: 500 }
    );
  }
}