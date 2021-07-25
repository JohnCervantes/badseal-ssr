import { gql } from "@apollo/client";
import { state } from "../cache";
import { client } from "../pages/_app";

const ADD_PROJECT = gql`
  mutation addProject(
    $thumbnail: String!
    $image: String!
    $projectName: String!
    $shortDescription: String
    $longDescription: String
    $technology: String!
    $status: String!
    $feature: String!
    $git: String!
  ) {
    addProject(
      thumbnail: $thumbnail
      image: $image
      projectName: $projectName
      shortDescription: $shortDescription
      longDescription: $longDescription
      technology: $technology
      status: $status
      feature: $feature
      git: $git
    ) {
      _id
      thumbnail
      image
      projectName
      shortDescription
      longDescription
      git
      technology
      status
      feature
    }
  }
`;

export async function addProject(
  thumbnail,
  image,
  projectName,
  shortDescription,
  longDescription,
  technology,
  status,
  feature,
  git
) {
  try {
    const {
      data: { addProject },
    } = await client.mutate({
      mutation: ADD_PROJECT,
      variables: {
        thumbnail,
        image,
        projectName,
        shortDescription,
        longDescription,
        technology,
        status,
        feature,
        git,
      },
    });
    console.log(addProject)
    setState({
      projects: state().projects.concat(addProject),
      showModal: { show: false, type: "" },
      showToast: {
        show: true,
        status: "success",
        header: "SUCCESS",
        message: "New project has been successfully added!",
      },
    });
    console.log(state().projects)
  } catch (e) {
    setState({
      showToast: {
        showToast: {
          show: true,
          status: "error",
          header: "Failed to add a project",
          message: e.message,
        },
      },
    });
  }
}

export function setState(field) {
  state({ ...state(), ...field });
}
