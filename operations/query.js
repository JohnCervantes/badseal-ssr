import { gql } from "@apollo/client";

export const ALL_PROJECTS = gql`
  query {
    projects {
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

export function readState(fields) {
  return gql`query {
    readState @client {
      ${fields}
    }
  }
`;
}
