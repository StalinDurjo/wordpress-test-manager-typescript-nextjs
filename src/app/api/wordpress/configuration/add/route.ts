import prisma from "@/lib/db/prisma";
import { WP_DIR } from "@/support/directory";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const reqBody = await req.json();

    for (const data of reqBody) {
      const projectName = data.project_name;
      const wordpressVersion = data.wordpress_version;
      const mysqlVersion = data.mysql_version;
      const mysqlDatabase = data.mysql_database;
      const mysqlDatabaseUsername = data.mysql_database_username;
      const mysqlDatabasePassword = data.mysql_database_password;
      const mysqlDatabaseRootPassword = data.mysql_database_root_password;
      const dockerMysqlPort = data.docker_mysql_port;
      const dockerPhpMysqlAdminPort = data.docker_phpmysqladmin_port;
      const dockerWordpressPort = data.docker_wordpress_port;

      const baseUrl = `http://localhost:${dockerWordpressPort}:80`;

      const wpInstanceDirectory = `${WP_DIR}/${projectName}`;

      await prisma.DockerWordpressProject.create({
        data: {
          project_name: projectName, // TODO :: Add check to see if project_name is already available in database and send apropriate message in response
          wordpress_version: wordpressVersion,
          mysql_version: mysqlVersion,
          mysql_database: mysqlDatabase,
          mysql_database_username: mysqlDatabaseUsername,
          mysql_database_password: mysqlDatabasePassword,
          mysql_database_root_password: mysqlDatabaseRootPassword,
          base_url: baseUrl,
          docker_mysql_port: dockerMysqlPort,
          docker_phpmyadmin_port: dockerPhpMysqlAdminPort,
          docker_wordpress_port: dockerWordpressPort,
          wordpress_project_directory: wpInstanceDirectory,
        },
      });
    }

    return NextResponse.json(
      {
        message: "Success",
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
