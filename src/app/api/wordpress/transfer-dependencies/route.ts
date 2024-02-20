import prisma from "@/lib/db/prisma";
import { NextResponse } from "next/server";

// TODO
export async function POST() {
  try {
    const wordpressProjectConfigurationList =
      await prisma.DockerWordpressProject.findMany();

    return NextResponse.json(
      { wordpress_project_details: "" },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: `Something went wrong!` },
      { status: 400 }
    );
  }
}
