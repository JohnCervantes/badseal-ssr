import React, { useState, useEffect } from "react";
import { setState } from "../operations/mutation";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTimes,
  faExclamationTriangle,
} from "@fortawesome/free-solid-svg-icons";
import { addProject } from "../operations/mutation";
import { RESET_MODAL, RESET_ICON } from "../cache";
import { useQuery } from "@apollo/client";
import { readState } from "../operations/query";
import { useFormik } from "formik";
import Image from "next/image";
import { uploadPhoto, getSignedUrl } from "../helpers/aws";

function Modal() {
  const [pic, setPic] = useState("/stock.jpg");

  // const addAnimalForm = useFormik({
  //   initialValues: {
  //     name: "",
  //     description: "",
  //     phone: "",
  //     email: "",
  //   },
  //   validate: (values) => {
  //     const errors = {};
  //     if (!values.name) {
  //       errors.name = "This field is required";
  //     }
  //     if (!values.description) {
  //       errors.description = "This field is required";
  //     }

  //     if (!/^$|^\d{10}$/.test(values.phone)) {
  //       errors.phone = "invalid phone number";
  //     }

  //     if (!values.email) {
  //       errors.email = "This field is required";
  //     } else if (
  //       !/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
  //         values.email
  //       )
  //     ) {
  //       errors.email = "Invalid email address";
  //     }

  //     return errors;
  //   },

  //   validateOnChange: false,
  //   validateOnBlur: false,
  //   onSubmit: async ({ name, description, email, phone }, { resetForm }) => {
  //     await addAnimal(name, description, pic, phone, email);
  //     resetForm();
  //   },
  // });

  const projectForm = useFormik({
    initialValues: {
      image: "[{\"seal1\":\"/stock1.jpg\"},{\"seal2\":\"/stock2.jpg\"},{\"seal3\":\"/stock3.jpg\"}]",
      projectName: "",
      shortDescription: "Add some description about the project...",
      longDescription: "Add full description about the project...",
      technology: "",
      status: "",
      feature: "Add some features of this project...",
      git: "n/a",
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
        await uploadPhoto(pic);
        thumbnail = getSignedUrl(pic.target.files[0].name);
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
        <div className="divider">
          <p className="form-header">Add Project</p>
          <div />
        </div>

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
            // temporary fix for the aws image bug. remove this when vercel 11.03 is available
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
        <button
          className="form-submit"
          type="submit"
          onClick={(e) => projectForm.handleSubmit(e)}
        >
          Submit
        </button>
      </ModalTemplate>
    );
  } else if (showModal.type === "login") {
    return (
      <ModalTemplate>
        <Login />
      </ModalTemplate>
    );
  } else if (showModal.type === "register") {
    return (
      <ModalTemplate>
        <p className="form-header">Register</p>
        <div className="flex-col">
          <label>Email:</label>
          <input
            type="text"
            value={registerForm.values.email}
            name="email"
            onChange={registerForm.handleChange}
          />
          {registerForm.errors.email ? (
            <LoginError>{registerForm.errors.email}</LoginError>
          ) : (
            <div>{"\u00A0"}</div>
          )}
        </div>
        <div className="flex-col">
          <label>Password:</label>
          <input
            type="password"
            value={registerForm.values.password}
            name="password"
            onChange={registerForm.handleChange}
          />
          {registerForm.errors.password ? (
            <LoginError>{registerForm.errors.password}</LoginError>
          ) : (
            <div>{"\u00A0"}</div>
          )}
        </div>
        <div className="flex-col">
          <label>First Name:</label>
          <input
            type="text"
            value={registerForm.values.firstName}
            name="firstName"
            onChange={registerForm.handleChange}
          />
          {registerForm.errors.firstName ? (
            <LoginError>{registerForm.errors.firstName}</LoginError>
          ) : (
            <div>{"\u00A0"}</div>
          )}
        </div>
        <div className="flex-col">
          <label>Last Name:</label>
          <input
            type="text"
            value={registerForm.values.lastName}
            name="lastName"
            onChange={registerForm.handleChange}
          />
          {registerForm.errors.lastName ? (
            <LoginError>{registerForm.errors.lastName}</LoginError>
          ) : (
            <div>{"\u00A0"}</div>
          )}
        </div>
        <div className="flex-col">
          <label>Phone Number:</label>
          <input
            type="text"
            value={registerForm.values.phone}
            name="phone"
            onChange={registerForm.handleChange}
            placeholder="optional"
          />
          {registerForm.errors.phone ? (
            <LoginError>{registerForm.errors.phone}</LoginError>
          ) : (
            <div>{"\u00A0"}</div>
          )}
        </div>
        <button
          className="form-submit"
          type="submit"
          onClick={(e) => registerForm.handleSubmit(e)}
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
