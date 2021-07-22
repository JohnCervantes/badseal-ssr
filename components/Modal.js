import React, { useState, useEffect } from "react";
import { setState } from "../operations/mutation";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTimes,
  faExclamationTriangle,
} from "@fortawesome/free-solid-svg-icons";
import { addAnimal, addUser } from "../operations/mutation";
import { RESET_MODAL, RESET_ICON } from "../cache";
import { useQuery } from "@apollo/client";
import { readState } from "../operations/query";
import Login from "./Login";
import { useFormik } from "formik";
import Image from "next/image";

function Modal() {
  const [pic, setPic] = useState("");

  const addAnimalForm = useFormik({
    initialValues: {
      name: "",
      description: "",
      phone: "",
      email: "",
    },
    validate: (values) => {
      const errors = {};
      if (!values.name) {
        errors.name = "This field is required";
      }
      if (!values.description) {
        errors.description = "This field is required";
      }

      if (!/^$|^\d{10}$/.test(values.phone)) {
        errors.phone = "invalid phone number";
      }

      if (!values.email) {
        errors.email = "This field is required";
      } else if (
        !/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
          values.email
        )
      ) {
        errors.email = "Invalid email address";
      }

      return errors;
    },

    validateOnChange: false,
    validateOnBlur: false,
    onSubmit: async ({ name, description, email, phone }, { resetForm }) => {
      await addAnimal(name, description, pic, phone, email);
      resetForm();
    },
  });

  const projectForm = useFormik({
    initialValues: {
      thumbnail: "",
      image: "",
      projectName: "",
      description: "",
      technology: "",
      status: "",
      feature: "",
    },
    validate: (values) => {
      const errors = {};
      if (!values.thumbnail) {
        errors.password = "This field is required";
      }

      if (!values.image) {
        errors.firstName = "This field is required";
      }

      if (!values.projectName) {
        errors.lastName = "This field is required";
      }

      if (!values.description) {
        errors.lastName = "This field is required";
      }

      if (!values.technology) {
        errors.lastName = "This field is required";
      }

      if (!values.status) {
        errors.lastName = "This field is required";
      }

      if (!values.feature) {
        errors.lastName = "This field is required";
      }

      return errors;
    },

    validateOnChange: false,
    validateOnBlur: false,
    onSubmit: async (
      {
        thumbnail,
        image,
        projectName,
        description,
        technology,
        status,
        feature,
      },
      { resetForm }
    ) => {
      await addProject(
        thumbnail,
        image,
        projectName,
        description,
        technology,
        status,
        feature
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
  } else if (showModal.type === "addAnimal") {
    return (
      <ModalTemplate type="addAnimal">
        <p className="form-header">Missing pet</p>
        <div className="flex-col">
          <Image
            src={pic}
            height="300px"
            width="300px"
            alt="Picture of the missing pet"
          />
        </div>
        <div className="mt-2 flex-col">
          <label>Pet&apos;s Name:</label>
          <input
            type="text"
            name="name"
            onChange={addAnimalForm.handleChange}
            value={addAnimalForm.values.name}
          />
          {addAnimalForm.errors.name ? (
            <LoginError>{addAnimalForm.errors.name}</LoginError>
          ) : (
            <div>{"\u00A0"}</div>
          )}
        </div>
        <div className="flex-col">
          <label>Description:</label>
          <textarea
            type="text"
            name="description"
            rows="4"
            value={addAnimalForm.values.description}
            onChange={addAnimalForm.handleChange}
          />
          {addAnimalForm.errors.description ? (
            <LoginError>{addAnimalForm.errors.description}</LoginError>
          ) : (
            <div>{"\u00A0"}</div>
          )}
        </div>
        <div className="flex-col">
          <label>Contact Email:</label>
          <input
            type="text"
            name="email"
            value={addAnimalForm.values.email}
            onChange={addAnimalForm.handleChange}
          />
          {addAnimalForm.errors.email ? (
            <LoginError>{addAnimalForm.errors.email}</LoginError>
          ) : (
            <div>{"\u00A0"}</div>
          )}
        </div>
        <div className="mb-2 flex-col">
          <label>Contact Phone number:</label>
          <input
            type="text"
            name="phone"
            value={addAnimalForm.values.phone}
            onChange={addAnimalForm.handleChange}
          />
          {addAnimalForm.errors.phone ? (
            <LoginError>{addAnimalForm.errors.phone}</LoginError>
          ) : (
            <div>{"\u00A0"}</div>
          )}
        </div>
        <button
          className="form-submit"
          type="submit"
          onClick={(e) => addAnimalForm.handleSubmit(e)}
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
      <p>
        <FontAwesomeIcon
          className="error"
          icon={faExclamationTriangle}
          size="sm"
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
      <form
        className={
          props.type !== "addAnimal"
            ? "modal-form justify-center"
            : "modal-form"
        }
      >
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
