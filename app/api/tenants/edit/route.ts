import { NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import Tenant from "@/models/Tenant";

export async function POST(req: Request) {
  try {
    await connectDB();

    const {
  _id,
  name,
  phone,
  roomNumber,
  rentAmount,
  advancePayment,
  rentStartDate,
  initialMeterReading,
  aadhaarCard,
  meterPhoto,
} = await req.json();

    await Tenant.findByIdAndUpdate(
  _id,
  {
    name,
    phone,
    roomNumber,
    rentAmount,
    advancePayment: Number(advancePayment) || 0,
    rentStartDate,
    initialMeterReading,
    aadhaarCard,
    meterPhoto,
  }
);

    return NextResponse.json({
      success: true,
    });

  } catch (error) {
    return NextResponse.json({
      success: false,
      error: "Update Failed",
    });
  }
}