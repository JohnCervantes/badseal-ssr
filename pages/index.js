import React, { useEffect } from "react";
import Image from "next/legacy/image";
import { ALL_PROJECTS, readState } from "../operations/query";
import { getStandAloneApolloClient } from "./_app";
import { setState } from "../operations/mutation";
import Link from "next/link";
import { useQuery } from "@apollo/client";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faInfoCircle } from "@fortawesome/free-solid-svg-icons";
import connectMongo from "../dbConfig/mongoose";
import Head from "next/head";
import { useInView } from "react-intersection-observer";
import { getSignedUrl } from "../helpers/aws";
import ProjectCard from "../components/ProjectCard";

export default function projects({ projects, error }) {
  const {
    data: {
      readState: { projects: projectsVar, navbarOpen },
    },
  } = useQuery(readState("projects, navbarOpen"));

  const { ref, inView, entry } = useInView({
    /* Optional options */
    threshold: 0,
    triggerOnce: true,
  });

  useEffect(() => {
    if (error) return console.log("Errors: " + error);
    if (projects) {
      setState({ projects, showSpinner: false });
    }
  }, [projects]);

  if (projectsVar.length > 0) {
    return (
      <div
        className={`relative projects-container ${
          navbarOpen ? "pt-64" : "pt-40"
        }`}
      >
        <Head>
          <title>Projects</title>
          <meta
            name="description"
            content="Projects page of the portfolio website developed by John Cervantes."
          />
        </Head>
        {/* <div
          className={`flex justify-center absolute ${
            navbarOpen ? "top-52" : "top-28"
          } right-5 sm:top-28`}
        >
          <div className="text-blue-300 hover-trigger">
            <FontAwesomeIcon icon={faInfoCircle} size={"2x"} className="mr-1" />
            <div className="absolute text-left right-5 rounded bg-black w-[300px] hover-target p-3 z-50">
              Crud operations are available in public intentionally for demo purposes only.
              Updating data will not be reflected to the front-end immediately
              by design. Please be patient when updating data and edit
              responsibly :)
            </div>
          </div>
          <button
            onClick={() =>
              setState({ showModal: { show: true, type: "addProject" } })
            }
          >
            Add+
          </button>
        </div> */}
        <div className="sm:w-[85%] grid-layout mx-auto">
          {projectsVar.map((project) => {
            return <ProjectCard ref={ref} project={project}></ProjectCard>;
          })}
        </div>
      </div>
    );
  } else {
    return <div className="projects-container min-h-screen" />;
  }
}

export async function getStaticProps(context) {
  try {
    await connectMongo();
    const client = getStandAloneApolloClient();
    const { data, error } = await client.query(
      { query: ALL_PROJECTS },
      {
        fetchPolicy: "no-cache",
      }
    );

    let projects = [...data.projects];
    let i = 0;

    if (!data) {
      return { props: { projects: [], error } };
    }

    for (const project of projects) {
      let imageUpdatedUrl = [];
      for (const image of JSON.parse(project.image)) {
        let imageKey = Object.keys(image)[0];
        if (imageKey.includes("seal")) break;
        const updatedPresignedURLCarousel = await getSignedUrl(imageKey);

        imageUpdatedUrl.push({ [imageKey]: updatedPresignedURLCarousel });
      }
      if (imageUpdatedUrl.length > 0) {
        let thumbnailKey = Object.keys(JSON.parse(project.thumbnail))[0];
        const updatedPresignedURLThumbnail = await getSignedUrl(thumbnailKey);
        projects[i] = {
          ...projects[i],
          image: JSON.stringify(imageUpdatedUrl),
          thumbnail: JSON.stringify({
            [thumbnailKey]: updatedPresignedURLThumbnail,
          }),
        };
        // client.mutate({
        //   mutation: UPDATE_PROJECT,
        //   variables: {
        //     _id: projects[i]._id,
        //     thumbnail: projects[i].thumbnail,
        //     image: projects[i].image,
        //     projectName: projects[i].projectName,
        //     shortDescription: projects[i].shortDescription,
        //     longDescription: projects[i].longDescription,
        //     technology: projects[i].technology,
        //     status: projects[i].status,
        //     feature: projects[i].feature,
        //     git: projects[i].git,
        //   },
        // });
      }
      i++;
    }

    return {
      props: {
        projects,
      },
      revalidate: 60, // Revalidate every 60 seconds
    };
  } catch (error) {
    return { props: { error: error.message } };
  }
}
