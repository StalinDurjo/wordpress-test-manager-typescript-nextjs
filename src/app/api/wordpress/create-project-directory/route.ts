import prisma from "@/lib/db/prisma";
import { createDirectory, isDirectoryPresent } from "@/lib/file/fileUtils";
import { WP_DIR } from "@/support/directory";

import { NextResponse } from "next/server";

export async function POST() {
  if (await isDirectoryPresent(WP_DIR)) {
    const configList = await prisma.dockerWordpressProject.findMany();

    try {
      const createdDirectoryList = [];
      for (const config of configList) {
        const wordpressProjectDirectory =
          config.wordpress_project_directory as string;

        // create wordpress instance directory if not created
        if (!(await isDirectoryPresent(wordpressProjectDirectory))) {
          await createDirectory(wordpressProjectDirectory);
        }

        if (await isDirectoryPresent(wordpressProjectDirectory)) {
          createdDirectoryList.push(wordpressProjectDirectory);
        }
      }

      return NextResponse.json(
        {
          message: `Request Successful!`,
          created_directory_list: createdDirectoryList,
        },
        { status: 200 }
      );
    } catch (error) {
      console.log(error);
      return NextResponse.json({ error: error }, { status: 400 });
    }
  } else {
    return NextResponse.json(
      { message: `Wordpress directory must be created first!` },
      { status: 400 }
    );
  }
}
