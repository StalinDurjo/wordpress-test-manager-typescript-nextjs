import SubscriberType from "@/constant/SubscriberType";
import { execCommand } from "@/lib/cmd/cmdUtils";
import prisma from "@/lib/db/prisma";
import { isDirectoryPresent } from "@/lib/file/fileUtils";
import { subscriber } from "@/subscriber/subscriber";
import { NextResponse } from "next/server";

export async function POST() {
  try {
    const configList = await prisma.DockerWordpressProject.findMany();

    for (const config of configList) {
      if (
        await isDirectoryPresent(config.wordpress_project_directory as string)
      ) {
        await execCommand(`bash ./out/wp/${config.project_name}-stop.sh`, "./");
      }
    }

    return NextResponse.json(
      {
        message:
          "Process executed successfully. Note: if Wordpress project directory is not created, this process will have no effect.",
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
function executeCommand(arg0: string, arg1: string) {
  throw new Error("Function not implemented.");
}
