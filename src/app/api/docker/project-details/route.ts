import { execSync } from "child_process";
import { NextResponse } from "next/server";

const dockerProjectDetails = async () => {
  const containerList: any = [];
  const containerIdList = execSync("docker ps -q", { encoding: "utf-8" })
    .split("\n")
    .filter((id) => id != "");

  for (const containerId of containerIdList) {
    let container: any = {};
    const containerDetails = JSON.parse(
      execSync(`docker inspect ${containerId}`, {
        encoding: "utf-8",
      })
    );

    container = {
      image: containerDetails[0].Config.Image,
      status: containerDetails[0].State.Status,
      containerName: containerDetails[0].Name,
      dockerProject:
        containerDetails[0].Config.Labels["com.docker.compose.project"],
      projectWorkDir:
        containerDetails[0].Config.Labels[
          "com.docker.compose.project.working_dir"
        ],
    };

    containerList.push(container);
  }

  const dockerProjectNameList = Array.from(
    new Set(containerList.map((project: any) => project.dockerProject))
  );

  const dockerProjects: any = {};
  dockerProjectNameList.forEach((projectName: any) => {
    dockerProjects[projectName] = [];
  });

  containerList.forEach((container: any) => {
    for (const projectName of dockerProjectNameList) {
      if (container.dockerProject === projectName) {
        dockerProjects[projectName as string].push({
          ...container,
        });
      }
    }
  });

  return dockerProjects;
};

export async function GET() {
  try {
    let projectDetails = await dockerProjectDetails();

    if (
      (await projectDetails) &&
      Object.keys(await projectDetails).length > 0
    ) {
      return NextResponse.json(
        {
          data: projectDetails,
        },
        { status: 200 }
      );
    } else {
      return NextResponse.json(
        {
          message: `No data available. Check if docker containers are running.`,
        },
        { status: 200 }
      );
    }
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      {
        message: "Something went wrong. Failed to load docker project details!",
      },
      { status: 400 }
    );
  }
}
