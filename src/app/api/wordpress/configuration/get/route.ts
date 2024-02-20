import prisma from "@/lib/db/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const wpConfigList = await prisma.DockerWordpressProject.findMany();

    return NextResponse.json(
      {
        message: "Success",
        data: wpConfigList,
      },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Something went wrong!", data: error },
      { status: 400 }
    );
  }
}
