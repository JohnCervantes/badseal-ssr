import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Image from "next/legacy/image";
import { readState } from "../../operations/query";
import { useQuery } from "@apollo/client";
import FeaturedEmblaCarousel from "../../components/Carousel/FeaturedCarousel";
import { setState, updateProject } from "../../operations/mutation";
import { uploadPhotos, uploadPhoto } from "../../helpers/aws";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithubSquare } from "@fortawesome/free-brands-svg-icons";
import { faGlobe } from "@fortawesome/free-solid-svg-icons";
import Head from "next/head";
import { useInView } from "react-intersection-observer";

export default function Project() {
  const router = useRouter();
  const { id } = router.query;
  const [editMode, setEditMode] = useState(false);
  const [project, setProject] = useState(undefined);
  const [uneditedProject, setUneditedProject] = useState(undefined);
  const [images, setImages] = useState({});
  const [thumbnail, setThumbnail] = useState(undefined);

  const { ref: titleRef, inView: titleView } = useInView({
    /* Optional options */
    threshold: 0,
    triggerOnce: true,
  });

  const { ref: aboutRef, inView: aboutView } = useInView({
    /* Optional options */
    threshold: 0,
    triggerOnce: true,
  });

  const { ref: featuresRef, inView: featuresView } = useInView({
    /* Optional options */
    threshold: 0,
    triggerOnce: true,
  });

  const { ref: sourceCodeRef } = useInView({
    /* Optional options */
    threshold: 0,
    triggerOnce: true,
  });

  const {
    data: {
      readState: { projects, navbarOpen },
    },
  } = useQuery(readState("projects, navbarOpen"));

  useEffect(() => {
    const proj = projects.find((p) => p._id === id);
    setUneditedProject(proj);
    setProject(proj);
  }, [id, projects]);

  if (!project) {
    return (
      <div
        className={`projects-container ${
          navbarOpen ? "pt-60" : "pt-36"
        } min-h-screen`}
      />
    );
  }

  if (editMode) {
    return editForm();
  }
  return (
    <div className={`projects-container ${navbarOpen ? "pt-60" : "pt-36"}`}>
      <Head>
        <title>Project - {project.projectName}</title>
        <meta
          name="description"
          content="Project page of the portfolio website developed by John Cervantes."
        />
      </Head>
      <div className="relative bg-white w-[95%] shadow-md mx-auto text-center py-20 px-2">
        <button
          className="absolute top-3 right-5"
          onClick={() => setEditMode(true)}
        >
          Edit
        </button>
        <div
          ref={titleRef}
          className={
            "mb-2 font-semibold text-3xl text-center text-green-700" +
            (titleView
              ? " delay-300 animate-fade-in-right-to-left"
              : " invisible")
          }
        >
          {uneditedProject.projectName}
          <div className="divider" />
        </div>

        <FeaturedEmblaCarousel projectImages={uneditedProject.image} />

        <div className="text-left p-5 mb-10">
          <p
            ref={aboutRef}
            className={
              "mt-10 mb-2 font-semibold text-3xl text-center text-green-700" +
              (aboutView
                ? " delay-300 animate-fade-in-right-to-left"
                : " invisible")
            }
          >
            What is this project about?
          </p>
          <div className="divider" />
          <p className="whitespace-pre-wrap">
            {uneditedProject.longDescription}
          </p>

          <p
            ref={featuresRef}
            className={
              "mt-10 mb-2 font-semibold text-3xl text-center text-green-700" +
              (featuresView
                ? " delay-300 animate-fade-in-right-to-left"
                : " invisible")
            }
          >
            What are the features of this project?
          </p>
          <div className="divider" />
          <p className="whitespace-pre-wrap">{uneditedProject.feature}</p>
        </div>
        {/* <button
          ref={sourceCodeRef}
          className="animate-fade-in-up"
          onClick={() => window.open(uneditedProject.git, "_blank")}
        >
          View source code <FontAwesomeIcon icon={faGithubSquare} size="lg" />
        </button> */}
        {uneditedProject.URL && uneditedProject.URL !== "" ? (
          <button
            ref={sourceCodeRef}
            className="animate-fade-in-up"
            onClick={() => window.open(uneditedProject.URL, "_blank")}
          >
           View application <FontAwesomeIcon icon={faGlobe} size="lg" />
          </button>
        ) : undefined}
      </div>
    </div>
  );
  function editForm() {
    return (
      <div className={`homepage-container ${navbarOpen ? "pt-60" : "pt-36"}`}>
        <div className="relative bg-white w-10/12 mx-auto text-center py-20 px-2">
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
            className="overflow-hidden text-center w-[250px] resize-none text-3xl text-green-700 "
            placeholder="Edit title..."
            value={project.projectName}
            onChange={(e) =>
              setProject({ ...project, projectName: e.target.value })
            }
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
              <p>Select carousel images...</p>
            )}
          </div>
          <input
            className="w-[70%] sm:w-[30%] mt-3"
            onClick={(e) => {
              e.target.value = null;
              setImages({});
            }}
            multiple
            type="file"
            accept="image/*"
            onChange={(e) => {
              setImages(e.target.files);
            }}
          />
          <div className="text-left p-5">
            <p className="mt-10 mb-2 font-semibold text-3xl text-center text-green-700 ">
              {" "}
              What is this project about?
            </p>
            <div className="divider" />
            <textarea
              rows="10"
              onChange={(e) => {
                setProject({ ...project, longDescription: e.target.value });
              }}
              value={project.longDescription}
              placeholder="Edit full description..."
            />
            <p className="mt-10 mb-2 font-semibold text-3xl text-center text-green-700">
              What are the features of this project?
            </p>
            <div className="divider" />
            <textarea
              rows="10"
              onChange={(e) => {
                setProject({ ...project, feature: e.target.value });
              }}
              value={project.feature}
              placeholder="Edit features..."
            />
          </div>
          <div>
            <p className="mt-10 mb-2 font-semibold text-3xl text-center text-green-700">
              Change thumbnail:
            </p>
            <div className="divider" />
            <div className="flex items-center justify-center w-[80%] bg-gray-300 mx-auto h-[250px]">
              <Image
                src={
                  thumbnail
                    ? URL.createObjectURL(thumbnail.target.files[0])
                    : project.thumbnail
                }
                width="400px"
                height="200px"
                unoptimized={true}
              />
            </div>
            <input
              className="w-[70%] sm:w-[30%] mt-3"
              onClick={(e) => {
                e.target.value = null;
                setThumbnail(undefined);
              }}
              accept="image/*"
              type="file"
              onChange={(e) => {
                setThumbnail(e);
              }}
            />

            <p className="mt-10 mb-2 font-semibold text-3xl text-center text-green-700 ">
              Edit short description:
            </p>
            <div className="divider" />
            <textarea
              className="w-[50%]"
              rows="4"
              onChange={(e) => {
                setProject({ ...project, shortDescription: e.target.value });
              }}
              value={project.shortDescription}
              placeholder="Edit short description ..."
            />

            <p className="mt-10 mb-2 font-semibold text-3xl text-center text-green-700 ">
              Edit Technologies used:
            </p>
            <div className="divider" />
            <textarea
              className="w-[50%]"
              rows="2"
              onChange={(e) => {
                setProject({ ...project, technology: e.target.value });
              }}
              value={project.technology}
              placeholder="Edit technologies used..."
            />

            <p className="mt-10 mb-2 font-semibold text-3xl text-center text-green-700 ">
              Edit status:
            </p>
            <div className="divider" />
            <textarea
              className="w-[50%]"
              rows="2"
              onChange={(e) => {
                setProject({ ...project, status: e.target.value });
              }}
              value={project.status}
              placeholder="Edit technologies used..."
            />

            <p className="mt-10 mb-2 font-semibold text-3xl text-center text-green-700 ">
              Edit Github page:
            </p>
            <div className="divider" />
            <textarea
              className="w-[50%]"
              rows="2"
              onChange={(e) => {
                setProject({ ...project, git: e.target.value });
              }}
              value={project.git}
              placeholder="Edit Github page link..."
            />

            <button
              className="block mt-10"
              onClick={async () => {
                let imagesFileNames;
                let updatedThumbnail;
                setState({ showSpinner: true });
                if (images.length > 0) {
                  imagesFileNames = await uploadPhotos(images);
                }
                if (thumbnail) {
                  updatedThumbnail = await uploadPhoto(thumbnail);
                }
                await updateProject({
                  ...project,
                  image: imagesFileNames ? imagesFileNames : project.image,
                  thumbnail: updatedThumbnail
                    ? updatedThumbnail
                    : project.thumbnail,
                });

                setEditMode(false);
                setState({ showSpinner: false });
              }}
            >
              Save
            </button>
          </div>
        </div>
      </div>
    );
  }
}
