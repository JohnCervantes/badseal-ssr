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
      readState: { projects, navbarOpen },
    },
  } = useQuery(readState("projects, navbarOpen"));

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
    <div className={`projects-container ${navbarOpen ? "pt-60" : "pt-36"}`}>
      <div className="relative bg-white w-10/12 mx-auto text-center p-5">
        <button
          className="absolute top-3 right-5"
          onClick={() => setEditMode(true)}
        >
          Edit
        </button>
        <div className={"mb-2 font-semibold text-3xl text-center"}>
          {projectName}
        </div>
        <div className="divider" />

        <FeaturedEmblaCarousel projectImages={project.image} />

        <div className="text-left p-5">
          <p className="mt-10 mb-2 font-semibold text-3xl text-center">
            What is this project about?
          </p>
          <div className="divider" />
          <p className="whitespace-pre-wrap">{project.longDescription}</p>

          <p className="mt-10 mb-2 font-semibold text-3xl text-center">
            What are the features of this project?
          </p>
          <div className="divider" />
          <p className="whitespace-pre-wrap">{project.feature}</p>
        </div>
      </div>
    </div>
  );
  function editForm() {
    return (
      <div className={`homepage-container ${navbarOpen ? "pt-60" : "pt-36"}`}>
        <div className="relative bg-white w-10/12 mx-auto text-center p-5">
          <button
            className=" absolute top-3 right-5 text-red-900"
            onClick={() => {
              setEditMode(false);
              setImages({});
            }}
          >
            Cancel
          </button>
          <textarea
            className="overflow-hidden text-center w-[250px] resize-none text-3xl"
            placeholder="Edit title..."
            value={projectName}
            onChange={(e) => setProjectName(e.target.value)}
            rows="1"
          ></textarea>
          <div className="divider" />

          <div className="w-[80%] leading-10 font-extralight text-xl bg-gray-300 mx-auto h-[250px] text-center whitespace-nowrap overflow-x-auto">
            {images.length > 0 ? (
              Array.from(images).map((image) => {
                return (
                  <Image
                    src={URL.createObjectURL(image)}
                    width="400px"
                    height="200px"
                    className="m-3 block"
                    unoptimized={true}
                  />
                );
              })
            ) : (
              <p>No images selected...</p>
            )}
          </div>
          <input
            className="w-[30%] mt-3"
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
            <p className="mt-10 mb-2 font-semibold text-3xl text-center">
              {" "}
              What is this project about?
            </p>
            <div className="divider" />
            <textarea
              rows="10"
              onChange={(e) => {
                setLongDescription(e.target.value);
              }}
              value={longDescription}
              placeholder="Edit full description..."
            />
            <p className="mt-10 mb-2 font-semibold text-3xl text-center">
              What are the features of this project?
            </p>
            <div className="divider" />
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
              let imagesFileNames;
              setState({ showSpinner: true });
              if (images.length > 0) {
                imagesFileNames = await uploadPhotos(images);
              }
              updateProject({
                ...project,
                feature,
                longDescription,
                projectName,
                image: imagesFileNames ? imagesFileNames : project.image,
              });
              setEditMode(false);
              setState({ showSpinner: false });
            }}
          >
            Save
          </button>
        </div>
      </div>
    );
  }
}
