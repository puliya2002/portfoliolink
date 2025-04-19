"use client";
import Image from "next/image";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

function ProjectDetails() {
  const { id } = useParams();
  const [project, setProject] = useState<any>(null);

  useEffect(() => {
    // Retrieve selected project data from localStorage
    const storedProject = JSON.parse(
      localStorage.getItem("selectedProject") || "{}"
    );

    // Ensure the retrieved project matches the ID in the URL
    if (storedProject && storedProject.id == id) {
      setProject(storedProject);
    } else {
      // If no selected project found, retrieve all projects and find the correct one
      const allProjects = JSON.parse(localStorage.getItem("projects") || "[]");
      const selectedProject = allProjects.find((proj: any) => proj.id == id);
      setProject(selectedProject);
    }
  }, [id]);

  if (!project) return <p className="text-center text-xl mt-10">Loading...</p>;

  return (
    <div className="">
      <div className=" max-w-3xl mx-auto justify-center p-5 pt-14 content-center z-50">
        <div
          className="bg-gradient-to-br from-gray-500/30 to-gray-500/20
      border-white/5 border-2 rounded-xl shadow p-5"
        >
          <div className="content-center pb-6">
            <p className="text-2xl font-medium py-2">{project.name}</p>
            <p className="opacity-50">
              {project.discription ||
                "This is a placeholder description for the project. You can modify this with actual project details."}
            </p>
          </div>
          <Image
            src={project.image || "/placeholder.png"}
            alt={project.name}
            className="rounded-lg w-full h-auto"
            width={1500}
            height={1500}
          />
          <div className="flex pt-5 content-center justify-center gap-2">
            {project.skills?.map((skill: string, index: number) => (
              <span
                key={index}
                className="bg-gray-500/20 opacity-80 border-[1.7px] border-gray-600 px-3 py-1 rounded-md text-sm"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProjectDetails;
