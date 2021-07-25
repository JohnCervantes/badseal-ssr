import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import { readState } from "../../operations/query";
import { useQuery } from "@apollo/client";
import FeaturedEmblaCarousel from "../../components/Carousel/FeaturedCarousel";

export default function Project() {
  const router = useRouter();
  const { id } = router.query;
  const [editMode, setEditMode] = useState(false);
  const [project, setProject] = useState(undefined);
  const {
    data: {
      readState: { projects },
    },
  } = useQuery(readState("projects"));

  useEffect(() => {
    const proj = projects.find((p) => p._id === id);
    setProject(proj);
  }, [id]);

  if (!project) {
    return <p>loading...</p>;
  }

  return (
    <div className="homepage-container">
      <div className="relative bg-white w-10/12 mx-auto text-center p-5">
        <button
          className=" absolute top-3 right-5 border-2 bg-green rounded"
          onClick={() => setEditMode(!editMode)}
        >
          Edit
        </button>
        <div className="grid mx-auto grid-cols-1 divide-y-2 divide-blue-300 w-[200px] text-3xl mb-7">
          {editMode ? (
            <textarea
              className="overflow-hidden text-center mb-2 resize-none"
              placeholder="insert title"
              value={project.projectName}
              onChange={(e) =>
                setProject({ ...project, projectName: e.target.value })
              }
              rows="1"
            ></textarea>
          ) : (
            <div className={"mb-2 font-semibold"}>{project.projectName}</div>
          )}
          <span></span>
        </div>
        <p>{project.image}</p>
        <FeaturedEmblaCarousel projectImages={project.image} />

        {/* <Image
          src="/stock.jpg"
          alt="picture of the project"
          height="200"
          width="250"
        ></Image> */}

        <div className="text-left p-5">
          <p>What is this project about?</p>
          <p>{project.longDescription}</p>
          <p>What are the features of this project?</p>
          <p>{project.features}</p>
        </div>
      </div>
    </div>
  );
}
