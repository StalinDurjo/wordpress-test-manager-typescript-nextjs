/*
  Warnings:

  - You are about to drop the `DockerWordpressProject` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "DockerWordpressProject";
PRAGMA foreign_keys=on;

-- CreateTable
CREATE TABLE "WordpressProject" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "project_name" TEXT NOT NULL,
    "wordpress_version" TEXT,
    "mysql_version" TEXT,
    "mysql_database" TEXT,
    "mysql_database_username" TEXT,
    "mysql_database_password" TEXT,
    "mysql_database_root_password" TEXT,
    "base_url" TEXT,
    "docker_mysql_port" TEXT,
    "docker_phpmyadmin_port" TEXT,
    "docker_wordpress_port" TEXT,
    "wordpress_project_directory" TEXT
);

-- CreateIndex
CREATE UNIQUE INDEX "WordpressProject_project_name_key" ON "WordpressProject"("project_name");
