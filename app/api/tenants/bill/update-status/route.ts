import { NextResponse } from 'next/server';
import connectDB from '../../../../../lib/mongodb';
import Tenant from '../../../../../models/Tenant';
import mongoose from "mongoose";

export async function POST(request: Request) {
  try {
   await connectDB();

const { tenantId, billId, newStatus } =
  await request.json();

console.log("tenantId:", tenantId);
console.log("billId:", billId);
console.log("newStatus:", newStatus);

const tenant = await Tenant.findOneAndUpdate(
{
  _id: new mongoose.Types.ObjectId(tenantId),
  "bills._id": new mongoose.Types.ObjectId(billId),
},
{
  $set: {
    "bills.$.status": "Paid",
    "bills.$.paymentDate": new Date(),
    "bills.$.paymentMethod": "Razorpay",
  },
},
{ new: true }
);
console.log("UPDATED TENANT:", tenant);
    if (!tenant) {
      return NextResponse.json({ success: false, error: 'Tenant ya Bill nahi mila' }, { status: 404 });
    }

    return NextResponse.json({ success: true, data: tenant }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

