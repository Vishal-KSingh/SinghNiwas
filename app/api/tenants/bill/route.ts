import { NextResponse } from 'next/server';
import connectDB from '../../../../lib/mongodb'; 
import Tenant from '../../../../models/Tenant';

export async function POST(request: Request) {
  try {
    await connectDB();
    const { tenantId, month, electricityUnits, perUnitRate } = await request.json();

    const tenant = await Tenant.findById(tenantId);
    if (!tenant) {
      return NextResponse.json({ success: false, error: 'Tenant nahi mila' }, { status: 404 });
    }

    // Safety Check: Agar bills array missing hai toh initialize karein
    if (!tenant.bills) {
      tenant.bills = [];
    }

    const electricityAmount =
  Number(electricityUnits) * Number(perUnitRate);

// Rent Start Date
const startDate = new Date(tenant.rentStartDate);

// Aaj ki date
const today = new Date();

// Kitne din raha
const stayDays =
  Math.ceil(
    (today.getTime() - startDate.getTime()) /
      (1000 * 60 * 60 * 24)
  ) + 1;

// Current month me total days
const daysInMonth = new Date(
  today.getFullYear(),
  today.getMonth() + 1,
  0
).getDate();

// Per day rent
const perDayRent =
  tenant.rentAmount / daysInMonth;

// Final rent
const rentAmount =
  Math.round(perDayRent * stayDays);

// Total Bill
const totalAmount =
  rentAmount + electricityAmount;

    const newBill = {
      month,
      electricityUnits: Number(electricityUnits),
      electricityAmount,
      rentAmount,
      totalAmount,
      status: 'Unpaid'
    };

    tenant.bills.push(newBill);
    await tenant.save();

    return NextResponse.json({ success: true, data: tenant }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}