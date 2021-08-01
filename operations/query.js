import { gql } from "@apollo/client";

export const ALL_PROJECTS = gql`
  query {
    projects {
      _id
      thumbnail
      image
      projectName
      shortDescription
      longDescription
      technology
      status
      feature
      git
    }
  }
`;

export const ALL_POST = gql`
  query {
    posts {
      _id
      banner
      postName
      content
      date
      shortDescription
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
