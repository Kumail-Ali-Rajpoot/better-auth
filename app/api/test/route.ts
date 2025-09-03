import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(req: Request) {
  try {
    const data = await req.json();

    const saved = await prisma.test.create({
      data: {
        name: data.name,
        message: data.message,
      },
    });

    return NextResponse.json({ success: true, saved });
  } catch (error) {
    console.error("Error saving data:", error);
    return NextResponse.json(
      { success: false, error: "Failed to save data" },
      { status: 500 }
    );
  }
}
