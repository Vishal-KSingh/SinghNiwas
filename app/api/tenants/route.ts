import { NextResponse } from "next/server";
import connectDB from "../../../lib/mongodb";
import Tenant from "../../../models/Tenant";

// GET
export async function GET() {
  try {
    await connectDB();

    const tenants = await Tenant.find({});

    return NextResponse.json(
      { success: true, data: tenants },
      { status: 200 }
    );
  } catch (error: any) {
    console.error("GET error:", error);

    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}

// POST
export async function POST(request: Request) {
  try {
    await connectDB();

    const body = await request.json();

    console.log("Tenant Data Received:", body);

    const newTenant = await Tenant.create(body);

    return NextResponse.json(
      { success: true, data: newTenant },
      { status: 201 }
    );
  } catch (error: any) {
    console.error("POST error:", error);

    return NextResponse.json(
      { success: false, error: error.message },
      { status: 400 }
    );
  }
}

// DELETE
export async function DELETE(request: Request) {
  try {
    await connectDB();

    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json(
        {
          success: false,
          error: "Tenant ID is required",
        },
        { status: 400 }
      );
    }

    const tenant = await Tenant.findById(id);

    if (!tenant) {
      return NextResponse.json(
        {
          success: false,
          error: "Tenant not found",
        },
        { status: 404 }
      );
    }

    tenant.status = "inactive";
    tenant.vacateDate = new Date();
    tenant.phone =
  tenant.phone +
  "_vacated_" +
  Date.now();

    await tenant.save();

    return NextResponse.json(
      {
        success: true,
       message:
  "Room vacated successfully. Tenant moved to history.",
      },
      { status: 200 }
    );
  } catch (error: any) {
    console.error("DELETE error:", error);

    return NextResponse.json(
      {
        success: false,
        error: error.message,
      },
      { status: 500 }
    );
  }
}

// PUT (Update Tenant)

export async function PUT(request: Request) {
  try {
    await connectDB();

    const body = await request.json();
    console.log(body.phone);

    const updatedTenant = await Tenant.findByIdAndUpdate(
  body._id,
  {
    name: body.name,
    phone: body.phone,
    roomNumber: body.roomNumber,
    rentAmount: body.rentAmount,
    advancePayment: Number(body.advancePayment) || 0,
    rentStartDate: body.rentStartDate,
    initialMeterReading: body.initialMeterReading,
    aadhaarCard: body.aadhaarCard,
    meterPhoto: body.meterPhoto,
  },
  {
  new: true,
  runValidators: true,
}
);

    return NextResponse.json(
      {
        success: true,
        data: updatedTenant,
      },
      {
        status: 200,
      }
    );
  } catch (error: any) {
    console.log(error);
    return NextResponse.json(
      {
        success: false,
        error: error.message,
      },
      {
        status: 500,
      }
    );
  }
}