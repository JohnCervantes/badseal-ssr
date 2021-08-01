import React, { useState, useEffect } from "react";
import { setState } from "../operations/mutation";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTimes,
  faExclamationTriangle,
} from "@fortawesome/free-solid-svg-icons";
import { addProject, addPost } from "../operations/mutation";
import { RESET_MODAL, RESET_ICON } from "../cache";
import { useQuery } from "@apollo/client";
import { readState } from "../operations/query";
import { useFormik } from "formik";
import Image from "next/image";
import { uploadPhoto, getSignedUrl } from "../helpers/aws";

function Modal() {
  const [pic, setPic] = useState("/stock.jpg");
  const [selectedBanner, setSelectedBanner] = useState("/defaultBanner.png");

  const projectForm = useFormik({
    initialValues: {
      image:
        '[{"seal1":"/stock1.jpg"},{"seal2":"/stock2.jpg"},{"seal3":"/stock3.jpg"}]',
      projectName: "",
      shortDescription: "Add some description about the project...",
      longDescription:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed fermentum sapien neque, nec tincidunt dui fermentum ut. Fusce eleifend volutpat pellentesque. Vestibulum cursus eget urna in ultricies. Aenean venenatis ipsum vitae augue ultricies, non scelerisque ante finibus. Nunc orci lectus, commodo a congue vel, pulvinar vitae enim. Praesent ac sodales ipsum, non semper risus. Ut quis porta nibh.\n\nVestibulum ante nisl, ultricies vel imperdiet quis, interdum nec velit. Vestibulum a erat placerat, vestibulum massa sed, viverra dolor. Ut ultrices porta lectus. Fusce tempor turpis non tortor tincidunt semper. Donec vulputate est ut nibh elementum, in mollis lorem sollicitudin. Morbi vestibulum nulla nec imperdiet tristique. Curabitur tortor lorem, condimentum vitae nisi eget, pellentesque aliquet nisl. Suspendisse sit amet nulla luctus, pharetra eros id, condimentum velit. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse condimentum ligula eget massa malesuada, in dignissim quam feugiat.\n\nCurabitur gravida massa non massa blandit, molestie blandit lectus eleifend. Duis eget nisi ipsum. Fusce luctus eleifend purus, id semper quam condimentum ac. Cras vitae mauris mauris. Vestibulum neque est, vulputate sit amet ante viverra, ultrices mattis lectus. Mauris sit amet lorem mollis, fermentum ante eu, gravida sem. Praesent ornare, turpis quis posuere scelerisque, justo nunc posuere arcu, ut faucibus purus massa ut libero. Integer commodo vehicula congue. Cras id velit vitae eros mollis iaculis et non quam. Sed convallis rutrum tempor. Cras lobortis pulvinar tortor, eget vulputate arcu elementum non. Curabitur lobortis laoreet felis, vel porta nisi ornare vel. Proin at iaculis ex.",
      technology: "",
      status: "",
      feature:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed fermentum sapien neque, nec tincidunt dui fermentum ut. Fusce eleifend volutpat pellentesque. Vestibulum cursus eget urna in ultricies. Aenean venenatis ipsum vitae augue ultricies, non scelerisque ante finibus. Nunc orci lectus, commodo a congue vel, pulvinar vitae enim. Praesent ac sodales ipsum, non semper risus. Ut quis porta nibh.\n\nVestibulum ante nisl, ultricies vel imperdiet quis, interdum nec velit. Vestibulum a erat placerat, vestibulum massa sed, viverra dolor. Ut ultrices porta lectus. Fusce tempor turpis non tortor tincidunt semper. Donec vulputate est ut nibh elementum, in mollis lorem sollicitudin. Morbi vestibulum nulla nec imperdiet tristique. Curabitur tortor lorem, condimentum vitae nisi eget, pellentesque aliquet nisl. Suspendisse sit amet nulla luctus, pharetra eros id, condimentum velit. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse condimentum ligula eget massa malesuada, in dignissim quam feugiat.\n\nCurabitur gravida massa non massa blandit, molestie blandit lectus eleifend. Duis eget nisi ipsum. Fusce luctus eleifend purus, id semper quam condimentum ac. Cras vitae mauris mauris. Vestibulum neque est, vulputate sit amet ante viverra, ultrices mattis lectus. Mauris sit amet lorem mollis, fermentum ante eu, gravida sem. Praesent ornare, turpis quis posuere scelerisque, justo nunc posuere arcu, ut faucibus purus massa ut libero. Integer commodo vehicula congue. Cras id velit vitae eros mollis iaculis et non quam. Sed convallis rutrum tempor. Cras lobortis pulvinar tortor, eget vulputate arcu elementum non. Curabitur lobortis laoreet felis, vel porta nisi ornare vel. Proin at iaculis ex.",
      git: "",
    },
    validate: (values) => {
      const errors = {};

      if (!values.projectName) {
        errors.projectName = "This field is required";
      }

      if (!values.status) {
        errors.status = "This field is required";
      }

      if (!values.technology) {
        errors.technology = "This field is required";
      }

      if (!values.git) {
        errors.git = "This field is required";
      }

      return errors;
    },

    validateOnChange: false,
    validateOnBlur: false,
    onSubmit: async (
      {
        image,
        projectName,
        shortDescription,
        longDescription,
        technology,
        status,
        feature,
        git,
      },
      { resetForm }
    ) => {
      let thumbnail;
      if (pic === "/stock.jpg") {
        thumbnail = "/stock.jpg";
      } else {
        thumbnail = await uploadPhoto(pic);
      }
      await addProject(
        thumbnail,
        image,
        projectName,
        shortDescription,
        longDescription,
        technology,
        status,
        feature,
        git
      );
      resetForm();
    },
  });

  const postForm = useFormik({
    initialValues: {
      postName: "",
      banner: "/defaultBanner.png",
      shortDescription: "",
      date: Date.now().toString(),
      content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed fermentum sapien neque, nec tincidunt dui fermentum ut. Fusce eleifend volutpat pellentesque. Vestibulum cursus eget urna in ultricies. Aenean venenatis ipsum vitae augue ultricies, non scelerisque ante finibus. Nunc orci lectus, commodo a congue vel, pulvinar vitae enim. Praesent ac sodales ipsum, non semper risus. Ut quis porta nibh.\n\nVestibulum ante nisl, ultricies vel imperdiet quis, interdum nec velit. Vestibulum a erat placerat, vestibulum massa sed, viverra dolor. Ut ultrices porta lectus. Fusce tempor turpis non tortor tincidunt semper. Donec vulputate est ut nibh elementum, in mollis lorem sollicitudin. Morbi vestibulum nulla nec imperdiet tristique. Curabitur tortor lorem, condimentum vitae nisi eget, pellentesque aliquet nisl. Suspendisse sit amet nulla luctus, pharetra eros id, condimentum velit. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse condimentum ligula eget massa malesuada, in dignissim quam feugiat.\n\nCurabitur gravida massa non massa blandit, molestie blandit lectus eleifend. Duis eget nisi ipsum. Fusce luctus eleifend purus, id semper quam condimentum ac. Cras vitae mauris mauris. Vestibulum neque est, vulputate sit amet ante viverra, ultrices mattis lectus. Mauris sit amet lorem mollis, fermentum ante eu, gravida sem. Praesent ornare, turpis quis posuere scelerisque, justo nunc posuere arcu, ut faucibus purus massa ut libero. Integer commodo vehicula congue. Cras id velit vitae eros mollis iaculis et non quam. Sed convallis rutrum tempor. Cras lobortis pulvinar tortor, eget vulputate arcu elementum non. Curabitur lobortis laoreet felis, vel porta nisi ornare vel. Proin at iaculis ex.",
    },
    validate: (values) => {
      const errors = {};

      if (!values.postName) {
        errors.postName = "This field is required";
      }

      if (!values.shortDescription) {
        errors.shortDescription = "This field is required";
      }
      return errors;
    },

    validateOnChange: false,
    validateOnBlur: false,
    onSubmit: async (
      { date, shortDescription, content, postName },
      { resetForm }
    ) => {
      let banner;
      if (selectedBanner === "/defaultBanner.png") {
        banner = "/defaultBanner.png";
      } else {
        banner = await uploadPhoto(selectedBanner);
      }
      await addPost(banner, postName, date, shortDescription, content);
      resetForm();
    },
  });

  const {
    data: {
      readState: { showModal },
    },
  } = useQuery(readState("showModal"));

  if (!showModal.show) {
    return null;
  } else if (showModal.type === "addProject") {
    return (
      <ModalTemplate>
        <p className="form-header">Add Project</p>
        <div className="divider" />

        <div className="flex-col">
          <Image
            src={
              pic !== "/stock.jpg"
                ? URL.createObjectURL(pic.target.files[0])
                : pic
            }
            height="300px"
            width="300px"
            alt="Thumbnail of the project"
            unoptimized={true}
          />
          <label>Project&apos;s thumbnail:</label>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => {
              setPic(e);
            }}
          />
        </div>

        <div className="mt-2 flex-col">
          <label>Project&apos;s Title:</label>
          <input
            type="text"
            name="projectName"
            onChange={projectForm.handleChange}
            placeholder="Add title..."
          />
          {projectForm.errors.projectName ? (
            <LoginError>{projectForm.errors.projectName}</LoginError>
          ) : (
            <div>{"\u00A0"}</div>
          )}
        </div>
        <div className="flex-col">
          <label>Description:</label>
          <textarea
            type="text"
            name="shortDescription"
            rows="4"
            placeholder="Add description..."
            onChange={projectForm.handleChange}
          />
        </div>
        <div className="flex-col">
          <label>Technologies used:</label>
          <input
            type="text"
            name="technology"
            placeholder="Add framework/tech this project used..."
            onChange={projectForm.handleChange}
          />
          {projectForm.errors.technology ? (
            <LoginError>{projectForm.errors.technology}</LoginError>
          ) : (
            <div>{"\u00A0"}</div>
          )}
        </div>
        <div className="flex-col">
          <label>Project&apos;s completion status:</label>
          <input
            type="text"
            name="status"
            placeholder="Add project's completion status..."
            onChange={projectForm.handleChange}
          />
          {projectForm.errors.status ? (
            <LoginError>{projectForm.errors.status}</LoginError>
          ) : (
            <div>{"\u00A0"}</div>
          )}
        </div>

        <div className="flex-col">
          <label>Github page:</label>
          <input
            type="text"
            name="status"
            placeholder="Add github page link..."
            onChange={projectForm.handleChange}
          />
          {projectForm.errors.git ? (
            <LoginError>{projectForm.errors.git}</LoginError>
          ) : (
            <div>{"\u00A0"}</div>
          )}
        </div>
        <button
          className="w-[100px]"
          type="submit"
          onClick={(e) => projectForm.handleSubmit(e)}
        >
          Submit
        </button>
      </ModalTemplate>
    );
  } else if (showModal.type === "addPost") {
    return (
      <ModalTemplate>
        <p className="form-header">Add Post</p>
        <div className="divider" />

        <div className="flex-col">
          <Image
            src={
              selectedBanner !== "/defaultBanner.png"
                ? URL.createObjectURL(selectedBanner.target.files[0])
                : selectedBanner
            }
            height="200px"
            width="450px"
            alt="Banner of the post"
            unoptimized={true}
          />
          <label>Post&apos;s banner image:</label>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => {
              setSelectedBanner(e);
            }}
          />
        </div>

        <div className="mt-2 flex-col">
          <label>Post&apos;s Title:</label>
          <input
            type="text"
            name="postName"
            onChange={postForm.handleChange}
            placeholder="Add title..."
          />
          {postForm.errors.postName ? (
            <LoginError>{postForm.errors.postName}</LoginError>
          ) : (
            <div>{"\u00A0"}</div>
          )}
        </div>
        <div className="flex-col">
          <label>Description:</label>
          <textarea
            type="text"
            name="shortDescription"
            rows="4"
            placeholder="Add a short description..."
            onChange={postForm.handleChange}
          />
          {postForm.errors.shortDescription ? (
            <LoginError>{postForm.errors.shortDescription}</LoginError>
          ) : (
            <div>{"\u00A0"}</div>
          )}
        </div>

        <button
          className="w-[100px]"
          type="submit"
          onClick={(e) => postForm.handleSubmit(e)}
        >
          Submit
        </button>
      </ModalTemplate>
    );
  }

  function LoginError(props) {
    return (
      <p className="error">
        <FontAwesomeIcon
          icon={faExclamationTriangle}
          size="sm"
          className="mr-3"
        />
        {props.children}
      </p>
    );
  }
}

function ModalTemplate(props) {
  return (
    <div>
      <div
        className="modal-container"
        onClick={() => {
          setState({ showModal: RESET_MODAL, icon: RESET_ICON });
        }}
      ></div>
      <form className="modal-form">
        <FontAwesomeIcon
          className="cursor-pointer absolute top-3 right-3"
          size="lg"
          icon={faTimes}
          onClick={() => {
            setState({ showModal: RESET_MODAL, icon: RESET_ICON });
          }}
        />
        {props.children}
      </form>
    </div>
  );
}

export default Modal;
