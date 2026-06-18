import { NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import Tenant from "@/models/Tenant";

export async function POST(req: Request) {
  try {
    await connectDB();

    const {
      tenantId,
      _id,
      rentAmount,
      electricityAmount,
      totalAmount,
    } = await req.json();

    const tenant = await Tenant.findById(
      tenantId
    );

    if (!tenant) {
      return NextResponse.json({
        success: false,
      });
    }

    const bill = tenant.bills.id(_id);

    if (!bill) {
      return NextResponse.json({
        success: false,
      });
    }

    bill.rentAmount = Number(
      rentAmount
    );

    bill.electricityAmount =
      Number(
        electricityAmount
      );

    bill.totalAmount = Number(
      totalAmount
    );

    await tenant.save();

    return NextResponse.json({
      success: true,
    });

  } catch (error) {
    return NextResponse.json({
      success: false,
      error: "Bill Update Failed",
    });
  }
}