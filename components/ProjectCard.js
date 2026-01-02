import Link from "next/link";
import Image from "next/legacy/image";
import { useState } from "react";

const ProjectCard = ({ project, ref }) => {
  const [error, setError] = useState(false);

  return (
    <Link href={`/projects/${project._id}`} key={project._id} legacyBehavior>
      <div ref={ref} className="project-card group animate-fade-in-up h-auto">
        <div className="relative min-w-[170px] sm:min-w-[250px] ">
          <Image
            className="group-hover:scale-x-110 group-hover:transition-all group-hover:ease-in-out group-hover:duration-150"
            layout="fill"
            objectFit="cover"
            src={
              error
                ? "/default-project.png"
                : JSON.parse(project.thumbnail)[
                    Object.keys(JSON.parse(project.thumbnail))[0]
                  ]
            }
            placeholder="blur"
            blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkqAcAAIUAgUW0RjgAAAAASUVORK5CYII="
            quality="100"
            onError={() => setError(true)}
          ></Image>
        </div>
        <div className="relative break-words bg-white px-2 py-1">
          <p className="font-bold text-2xl text-center">
            {project.projectName}
          </p>
          <div className="w-full divider m-0 sm:mb-3 " />

          <p className="font-semibold text-sm mb-4">
            {project.shortDescription}
          </p>
          <p className="font-light text-xs ">{project.technology}</p>
        </div>
      </div>
    </Link>
  );
};

export default ProjectCard;
