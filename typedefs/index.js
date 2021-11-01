import { gql } from "apollo-server-micro";
const typeDefs = gql`
  type project {
    _id: ID
    thumbnail: String!
    image: String!
    projectName: String!
    shortDescription: String
    longDescription: String
    technology: String!
    status: String!
    feature: String!
    git: String!
    URL: String
  }

  type post {
    _id: ID
    banner: String
    postName: String!
    date: String!
    shortDescription: String!
    content: String!
  }

  type Query {
    projects: [project]
    posts: [post]
  }
  type Mutation {
    addPost(
      banner: String
      postName: String!
      date: String!
      shortDescription: String!
      content: String!
    ): post
    updatePost(
      _id: ID!
      banner: String
      postName: String
      date: String
      shortDescription: String
      content: String
    ): post
    addProject(
      thumbnail: String!
      image: String!
      projectName: String!
      shortDescription: String
      longDescription: String
      technology: String!
      status: String!
      feature: String!
      git: String!
    ): project
    updateProject(
      _id: ID!
      thumbnail: String
      image: String
      projectName: String
      shortDescription: String
      longDescription: String
      technology: String
      status: String
      feature: String
      git: String
    ): project
  }
`;

export default typeDefs;
