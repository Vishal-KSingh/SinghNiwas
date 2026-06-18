import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Complaint from '@/models/Complaint';

// ================= GET ALL COMPLAINTS =================

export async function GET() {
  try {
    await connectDB();

    const complaints = await Complaint.find({})
      .sort({ createdAt: -1 });

    return NextResponse.json({
      success: true,
      data: complaints,
    });

  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to fetch complaints',
      },
      { status: 500 }
    );
  }
}

// ================= CREATE / UPDATE COMPLAINT =================

export async function POST(req: Request) {
  try {
    await connectDB();

    const body = await req.json();

    // ADMIN UPDATE
    if (body.id) {
      const updatedComplaint =
        await Complaint.findByIdAndUpdate(
          body.id,
          {
            status: body.status,
            adminReply: body.adminReply,
          },
          {
            new: true,
          }
        );

      return NextResponse.json({
        success: true,
        data: updatedComplaint,
      });
    }

    // TENANT CREATE

    const newComplaint = await Complaint.create({
      tenantName: body.tenantName,
      roomNumber: body.roomNumber,
      issueType: body.issueType,
      description: body.description,
      status: 'Pending',
      adminReply: '',
    });

    return NextResponse.json({
      success: true,
      data: newComplaint,
    });

  } catch (error) {
    console.log(error);

    return NextResponse.json(
      {
        success: false,
        error: 'Database Error',
      },
      { status: 500 }
    );
  }
}

// ================= DELETE COMPLAINT =================

export async function DELETE(req: Request) {
  try {
    await connectDB();

    const { searchParams } = new URL(req.url);

    const id = searchParams.get("id");

    await Complaint.findByIdAndDelete(id);

    return NextResponse.json({
      success: true,
    });

  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        error: "Delete Failed",
      },
      {
        status: 500,
      }
    );
  }
}