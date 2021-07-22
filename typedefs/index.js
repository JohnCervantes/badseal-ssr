import { gql } from "apollo-server-micro";
const typeDefs = gql`
  type project {
    _id: ID
    thumbnail: String!
    image: String!
    projectName: String!
    description: String!
    technology: String!
    status: String!
    feature: String!
  }

  type user {
    _id: ID
    password: String!
    email: String!
    firstName: String!
    lastName: String!
    phone: String
    isAdmin: Boolean
    registerDate: String!
    token: String
  }

  type Query {
    projects: [project]
    # users: [user]
    # user(email: String!, password: String!): user
  }
  type Mutation {
    # addAnimal(
    #   name: String!
    #   description: String!
    #   pic: String!
    #   phone: String
    #   email: String!
    # ): animal
    addProject(
      thumbnail: String!
      image: String!
      projectName: String!
      description: String!
      technology: String!
      status: String!
      feature: String!
    ): project
  }
`;

export default typeDefs;
