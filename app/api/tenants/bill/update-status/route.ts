import { NextResponse } from 'next/server';
import connectDB from '../../../../../lib/mongodb';
import Tenant from '../../../../../models/Tenant';

export async function POST(request: Request) {
  try {
    await connectDB();
    const { tenantId, billId, newStatus } = await request.json();

    const tenant = await Tenant.findOneAndUpdate(
      { _id: tenantId, 'bills._id': billId },
      {
  $set: {
    'bills.$.status': newStatus,
    'bills.$.paymentDate': new Date(),
    'bills.$.paymentMethod': 'Online',
  },
},
      { new: true }
    );

    if (!tenant) {
      return NextResponse.json({ success: false, error: 'Tenant ya Bill nahi mila' }, { status: 404 });
    }

    return NextResponse.json({ success: true, data: tenant }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}