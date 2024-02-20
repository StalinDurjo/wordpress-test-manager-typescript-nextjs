import { deleteDirectory } from "@/lib/file/fileUtils";
import { WP_DIR } from "@/support/directory";
import { NextResponse } from "next/server";

export async function DELETE() {
  try {
    await deleteDirectory(WP_DIR);
    return NextResponse.json(
      { message: `WordPress Directory Deleted!` },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: `Something Went Wrong!` },
      { status: 400 }
    );
  }
}
