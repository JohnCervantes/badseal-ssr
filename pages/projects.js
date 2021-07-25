import React, { useEffect } from "react";
import Image from "next/image";
import { ALL_PROJECTS, readState } from "../operations/query";
import { client } from "./_app";
import { setState } from "../operations/mutation";
import Link from "next/link";
import { useQuery } from "@apollo/client";

export default function projects({ data: { projects }, errors }) {
  const {
    data: {
      readState: { projects: projectsVar },
    },
  } = useQuery(readState("projects"));

  // useEffect(() => {
  //   if (errors) return console.log(errors);
  //   if (projects) {
  //     setState({ projects });
  //   }
  // }, [projects]);

  if (projectsVar.length > 0) {
    return (
      <div className="relative projects-container grid-layout">
        <button
          className="absolute top-36 right-5 border-2 bg-green rounded"
          onClick={() =>
            setState({ showModal: { show: true, type: "addProject" } })
          }
        >
          Add Project
        </button>

        {projectsVar.map((project) => {
          return (
            <Link href={`/projects/${project._id}`} key={project._id}>
              <div className="project-card group">
                <div className="relative w-[200px] h-full">
                  <Image
                    className="group-hover:scale-x-110 group-hover:transition-all group-hover:ease-in-out group-hover:duration-150"
                    layout="fill"
                    src={project.thumbnail}
                    unoptimized={true}
                  ></Image>
                </div>
                <div className="break-words w-[70%] ml-1 bg-white p-5">
                  <p className="font-semibold mb-3">{project.projectName}</p>
                  <p>{project.shortDescription}</p>
                  <p className="font-thin">
                    Technologies: {project.technology}
                  </p>
                  <p className="font-thin">
                    Completion status: {project.status}
                  </p>
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    );
  } 
  return <p>no projects</p>
}

// export const getStaticProps = async () => {
//   try {
//     const { data, errors } = await client.query(
//       { query: ALL_PROJECTS },
//       {
//         fetchPolicy: "no-cache",
//       }
//     );
//     // const newData = [];
//     // await Promise.all(
//     //   data.animals.map(async (animal) => {
//     //     const { base64 } = await getPlaiceholder(animal.pic);
//     //     newData.push({ ...animal, blurDataURL: base64 });
//     //   })
//     // );

//     if (!data) {
//       return { props: { data: { projects: [] } }, errors };
//     }
//     return {
//       props: {
//         data,
//       },
//     };
//   } catch (error) {
//     return { props: { errors: error.message } };
//   }
// };
