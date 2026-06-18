import { NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import Tenant from "@/models/Tenant";

export async function POST(request: Request) {
  try {
    await connectDB();

    const { tenantId } = await request.json();

    await Tenant.findByIdAndUpdate(
      tenantId,
      {
        lastReminderSent: new Date(),
      }
    );

    return NextResponse.json({
      success: true,
    });

  } catch (error) {
    return NextResponse.json({
      success: false,
      error: "Reminder update failed",
    });
  }
}