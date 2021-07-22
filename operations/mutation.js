import { gql } from "@apollo/client";
import { state } from "../cache";
import { client } from "../pages/_app";

const ADD_PROJECT = gql`
  mutation addProject(
    $thumbnail: String!
    $image: String!
    $projectName: String!
    $description: String!
    $technology: String!
    $status: String!
    $feature: String!
  ) {
    addProject(
      thumbnail: $thumbnail
      image: $image
      projectName: $projectName
      description: $description
      technology: $technology
      status: $status
      feature: $feature
    ) {
      _id
      thumbnail
      image
      projectName
      description
      technology
      status
      feature
    }
  }
`;

export function setState(field) {
  state({ ...state(), ...field });
}
