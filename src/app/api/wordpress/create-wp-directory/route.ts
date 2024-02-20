import { createDirectorySync } from "@/lib/file/fileUtilsSync";
import { OUT_DIR } from "@/support/directory";
import { NextResponse } from "next/server";

export async function POST() {
  try {
    const isDirectoryCreated = createDirectorySync(`${OUT_DIR}/wp`);
    if (isDirectoryCreated) {
      return NextResponse.json(
        { message: `WordPress Directory Created!` },
        { status: 201 }
      );
    } else {
      return NextResponse.json(
        {
          message: `Failed to create wp directory! Check if 'out' directory is created.`,
        },
        { status: 400 }
      );
    }
  } catch (error) {
    return NextResponse.json(
      { message: `Something Went Wrong!` },
      { status: 400 }
    );
  }
}
