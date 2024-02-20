import prisma from "@/lib/db/prisma";
import { NextResponse } from "next/server";
import os from "os";

const systemInfo = async () => {
  return {
    operating_system: os.version(),
    platform: os.platform(),
    architecture: os.arch(),
    nodejs_version: process.version || null,
  };
};

export async function GET() {
  try {
    const wordpressProjectConfiguration = (
      await prisma.dockerWordpressProject.findMany()
    ).map((configuration) => {
      return {
        project_name: configuration.project_name,
        wordpress_version: configuration.wordpress_version,
        mysql_version: configuration.mysql_version,
        base_url: configuration.base_url,
        project_directory: configuration.wordpress_project_directory,
      };
    });

    return NextResponse.json(
      {
        system_information: await systemInfo(),
        wordpress_project_details: wordpressProjectConfiguration,
      },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: `Something went wrong!` },
      { status: 400 }
    );
  }
}
