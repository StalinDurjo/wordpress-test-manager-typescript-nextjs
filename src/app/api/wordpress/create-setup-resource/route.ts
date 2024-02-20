import { DOCKER_SETUP_RESOURCE_DIR, WP_DIR } from "@/support/directory";
import {
  copyFileToDirectory,
  createFile,
  isDirectoryPresent,
  isFilePresent,
  overwriteFileContent,
  renameFile,
  writeToFile,
} from "@/lib/file/fileUtils";
import { NextResponse } from "next/server";
import { WPInstanceConfig } from "@/global";
import prisma from "@/lib/db/prisma";

const createDockerResource = async (config: WPInstanceConfig) => {
  const wpProjectDirectory = config.wordpress_project_directory as string;
  const dockerComposeFile = `${DOCKER_SETUP_RESOURCE_DIR}/docker-compose.yml`;
  const dockerEnvFile = `${DOCKER_SETUP_RESOURCE_DIR}/env.sample`;
  const destinationDirectory = `${WP_DIR}/${config.project_name}`;

  if (await isDirectoryPresent(wpProjectDirectory)) {
    await copyFileToDirectory(dockerComposeFile, destinationDirectory);
    await createFile(".env", destinationDirectory);
  }
};

const writeToEnvFile = async (config: WPInstanceConfig) => {
  const envFilePath = `${WP_DIR}/${config.project_name}/.env`;

  if (await isFilePresent(envFilePath)) {
    await overwriteFileContent(envFilePath, "");
    await writeToFile(
      envFilePath,
      `WORDPRESS_VERSION=${config.wordpress_version}\n`
    );
    await writeToFile(envFilePath, `MYSQL_VERSION=${config.mysql_version}\n`);
    await writeToFile(envFilePath, `MYSQL_DATABASE=${config.mysql_database}\n`);
    await writeToFile(
      envFilePath,
      `MYSQL_USER=${config.mysql_database_username}\n`
    );
    await writeToFile(
      envFilePath,
      `MYSQL_PASSWORD=${config.mysql_database_password}\n`
    );
    await writeToFile(
      envFilePath,
      `MYSQL_ROOT_PASSWORD=${config.mysql_database_root_password}\n`
    );
    await writeToFile(envFilePath, `DB_PORT=${config.docker_mysql_port}\n`);
    await writeToFile(
      envFilePath,
      `PHPMYADMIN_PORT=${config.docker_phpmyadmin_port}\n`
    );
    await writeToFile(
      envFilePath,
      `WORDPRESS_PORT=${config.docker_wordpress_port}\n`
    );
  } else {
    console.log(`Aborting env config write operation. File is not present.`);
  }
};

const createDockerShellScript = async (config: WPInstanceConfig) => {
  const wpInstanceDirectory = config.wordpress_project_directory as string;
  if (await isDirectoryPresent(wpInstanceDirectory)) {
    const startFile = `${WP_DIR}/${config.project_name}-start.sh`;
    const stopFile = `${WP_DIR}/${config.project_name}-stop.sh`;

    if (!(await isFilePresent(startFile))) {
      await createFile(config.project_name + "-start.sh", `${WP_DIR}`);
      await writeToFile(startFile, `cd ./out/wp/${config.project_name}\n`);
      await writeToFile(startFile, `docker-compose up`);
    }

    if (!(await isFilePresent(stopFile))) {
      await createFile(config.project_name + "-stop.sh", `${WP_DIR}`);
      await writeToFile(stopFile, `cd ./out/wp/${config.project_name}\n`);
      await writeToFile(stopFile, `docker-compose down`);
    }
  }
};

export async function POST() {
  try {
    const configList = await prisma.dockerWordpressProject.findMany();

    for (const config of configList) {
      await createDockerResource(config);
      await writeToEnvFile(config);
      await createDockerShellScript(config);
    }

    return NextResponse.json(
      {
        message: `Request executed successfylly. Make sure WordPress instance(s) are already created, otherwise this request will have no effect.`,
      },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      {
        message: `Something went wrong!`,
      },
      { status: 400 }
    );
  }
}
