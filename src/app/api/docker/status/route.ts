import { dockerProjectDetails } from "@/lib/docker/dockerUtils";
import { execSync } from "child_process";
import { NextResponse } from "next/server";

// Checks if docker is running
const dockerStatus = async (): Promise<Boolean> => {
  try {
    execSync("docker ps", { encoding: "utf-8" });
    return true;
  } catch (error) {
    return false;
  }
};

const findContainer = (containerList: any, containerName: string): boolean => {
  if (containerList) {
    return containerList.some((container: any) =>
      container.image.includes(containerName)
    );
  }
  return false;
};
const returnStatus = async (
  containerName: string,
  projectList: any,
  statusObject: { [key: string]: boolean }
) => {
  for (const [key] of Object.entries(projectList)) {
    statusObject[key] = findContainer(projectList[key], containerName);
  }

  if (Object.values(statusObject).length > 0) {
    statusObject["overall"] = Object.values(statusObject).every(
      (entry) => entry === true
    );
  } else {
    statusObject["overall"] = false;
  }

  return statusObject;
};
const overallActiveStatus = async () => {
  try {
    const projectList: {
      [key: string]: Object[];
    } = await dockerProjectDetails();
    const mysqlStatus: { [key: string]: boolean } = {};
    const wordpressStatus: { [key: string]: boolean } = {};
    const phpMyAdminStatus: { [key: string]: boolean } = {};

    return {
      mysql: await returnStatus("mysql", projectList, mysqlStatus),
      wordpress: await returnStatus("wordpress", projectList, wordpressStatus),
      phpMyAdmin: await returnStatus(
        "phpmyadmin",
        projectList,
        phpMyAdminStatus
      ),
    };
  } catch (error) {
    return {
      message: "Failed to retrive status",
    };
  }
};

export async function GET() {
  try {
    const isDockerActive = await dockerStatus();
    const dockerContainerStatus = await overallActiveStatus();

    return NextResponse.json(
      {
        is_docker_active: isDockerActive,
        docker_container_status: dockerContainerStatus,
      },
      { status: 200 }
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: `Something went wrong!` },
      { status: 400 }
    );
  }
}
