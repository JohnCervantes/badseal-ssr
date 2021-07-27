import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import { readState } from "../../operations/query";
import { useQuery } from "@apollo/client";
import FeaturedEmblaCarousel from "../../components/Carousel/FeaturedCarousel";
import { setState, updateProject } from "../../operations/mutation";
import { uploadPhotos } from "../../helpers/aws";

export default function Project() {
  const router = useRouter();
  const { id } = router.query;
  const [editMode, setEditMode] = useState(false);
  const [project, setProject] = useState(undefined);
  const [projectName, setProjectName] = useState("");
  const [images, setImages] = useState({});
  const [longDescription, setLongDescription] = useState("");
  const [feature, setFeature] = useState("");
  const {
    data: {
      readState: { projects },
    },
  } = useQuery(readState("projects"));

  useEffect(() => {
    const proj = projects.find((p) => p._id === id);
    setLongDescription(proj.longDescription);
    setFeature(proj.feature);
    setProjectName(proj.projectName);
    setProject(proj);
  }, [id, projects]);


  if (!project) {
    return <p>loading...</p>;
  }

  if (editMode) {
    return editForm();
  }

  return (
    <div className="homepage-container">
      <div className="relative bg-white w-10/12 mx-auto text-center p-5">
        <button
          className="absolute top-3 right-5 border-2 bg-green rounded"
          onClick={() => setEditMode(true)}
        >
          Edit
        </button>
        <div className="grid mx-auto grid-cols-1 divide-y-2 divide-blue-300 w-[200px] text-3xl mb-7">
          <div className={"mb-2 font-semibold"}>{projectName}</div>
          <span></span>
        </div>
        <FeaturedEmblaCarousel projectImages={project.image} />

        <div className="text-left p-5">
          <p>What is this project about?</p>
          <p className="whitespace-pre-wrap">{project.longDescription}</p>
          <p>What are the features of this project?</p>
          <p className="whitespace-pre-wrap">{project.feature}</p>
        </div>
      </div>
    </div>
  );
  function editForm() {
    return (
      <div className="homepage-container">
        <div className="relative bg-white w-10/12 mx-auto text-center p-5">
          <button
            className=" absolute top-3 right-5 border-2 bg-green rounded"
            onClick={() => {
              setEditMode(false);
              setImages({});
            }}
          >
            Cancel
          </button>
          <div className="grid mx-auto grid-cols-1 divide-y-2 divide-blue-300 w-[200px] text-3xl mb-7">
            <textarea
              className="overflow-hidden text-center mb-2 resize-none"
              placeholder="Edit title..."
              value={projectName}
              onChange={(e) => setProjectName(e.target.value)}
              rows="1"
            ></textarea>
            <span></span>
          </div>
          <div className="w-[80%] bg-gray-300 mx-auto h-[250px] text-center whitespace-nowrap overflow-x-auto">
            {images.length > 0 ? (
              Array.from(images).map((image) => {
                return (
                  <Image
                    src={URL.createObjectURL(image)}
                    width="400px"
                    height="200px"
                    unoptimized={true}
                    className="m-3 block"
                  />
                );
              })
            ) : (
              <p>no images selected</p>
            )}
          </div>
          <input
            onClick={(e) => {
              e.target.value = null;
              setImages({});
            }}
            multiple
            type="file"
            onChange={(e) => {
              setImages(e.target.files);
            }}
          />
          <div className="text-left p-5">
            <p>What is this project about?</p>
            <textarea
              rows="10"
              onChange={(e) => {
                setLongDescription(e.target.value);
              }}
              value={longDescription}
              placeholder="Edit full description..."
            />
            <p>What are the features of this project?</p>
            <textarea
              rows="10"
              onChange={(e) => {
                setFeature(e.target.value);
              }}
              value={feature}
              placeholder="Edit features..."
            />
          </div>

          <button
            onClick={async () => {
              setState({showSpinner: true})
              const imagesFileNames = await uploadPhotos(images);
              updateProject({
                ...project,
                feature,
                longDescription,
                projectName,
                image: imagesFileNames,
              });
              setEditMode(false);
              setState({showSpinner: false})
            }}
          >
            save
          </button>
        </div>
      </div>
    );
  }
}
