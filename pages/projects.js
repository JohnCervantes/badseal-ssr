import React, { useEffect } from "react";
import Image from "next/image";
import { ALL_PROJECTS, readState } from "../operations/query";
import { getStandAloneApolloClient } from "./_app";
import { setState } from "../operations/mutation";
import Link from "next/link";
import { useQuery } from "@apollo/client";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faInfoCircle } from "@fortawesome/free-solid-svg-icons";

export default function projects({ projects, error }) {
  const {
    data: {
      readState: { projects: projectsVar, navbarOpen },
    },
  } = useQuery(readState("projects, navbarOpen"));

  useEffect(() => {
    if (error) return console.log("Errors: " + error);
    if (projects) {
      setState({ projects, showSpinner: false });
    }
  }, [projects]);

  if (projectsVar.length > 0) {
    return (
      <div
        className={`relative projects-container grid-layout ${
          navbarOpen ? "pt-64" : "pt-40"
        }`}
      >
        <div
          className={`flex justify-center items-center  absolute ${
            navbarOpen ? "top-52" : "top-28"
          } right-5 sm:top-28`}
        >
          <div className="text-blue-300 hover-trigger">
            <FontAwesomeIcon icon={faInfoCircle} size={"2x"} className="mr-1" />
            <div className="absolute right-20 rounded bg-black w-[200px] hover-target p-3 z-50">For demo purposes, I made crud operations available in public. Please edit responsibly :)</div>
          </div>
          <button
            onClick={() =>
              setState({ showModal: { show: true, type: "addProject" } })
            }
          >
            Add+
          </button>
        </div>

        {projectsVar.map((project) => {
          return (
            <Link href={`/projects/${project._id}`} key={project._id}>
              <div className="project-card group">
                <div className="relative w-[200px] h-full">
                  <Image
                    className="group-hover:scale-x-110 group-hover:transition-all group-hover:ease-in-out group-hover:duration-150"
                    layout="fill"
                    src={project.thumbnail}
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
  } else {
    return <p className="projects-container min-h-screen"></p>;
  }
}

export async function getServerSideProps(context) {
  try {
    const client = getStandAloneApolloClient();
    const { data, error } = await client.query(
      { query: ALL_PROJECTS },
      {
        fetchPolicy: "no-cache",
      }
    );

    if (!data) {
      return { props: { projects: [], error } };
    }
    const projects = data.projects;
    return {
      props: {
        projects,
      },
    };
  } catch (error) {
    return { props: { error: error.message } };
  }
}
