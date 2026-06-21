import { NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import Tenant from "@/models/Tenant";

export async function GET(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await connectDB();

    const { id } = await params;

    console.log("Tenant ID received:", id);

    const tenant = await Tenant.findById(id);

    console.log("Tenant found:", tenant);

    if (!tenant) {
      return NextResponse.json(
        { success: false, error: "Tenant not found", id },
        { status: 404 }
      );
    }

    return NextResponse.json(tenant);
  } catch (error: any) {
    console.error("GET TENANT ERROR:", error);

    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}