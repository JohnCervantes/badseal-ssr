import { ApolloError } from "apollo-server-errors";
import post from "../models/post.js";
import project from "../models/project.js";

const resolvers = {
  Query: {
    projects: async (parent, args, context) => {
      try {
        const result = await project.find({});
        return result;
      } catch (error) {
        throw new ApolloError(error);
      }
    },
    posts: async (parent, args, context) => {
      try {
        const result = await post.find({});
        return result;
      } catch (error) {
        throw new ApolloError(error);
      }
    },
  },
  Mutation: {
    addProject: async (
      parent,
      {
        thumbnail,
        image,
        projectName,
        shortDescription,
        technology,
        status,
        feature,
        longDescription,
        git,
      },
      context
    ) => {
      try {
        const result = await project.create({
          thumbnail,
          image,
          projectName,
          shortDescription,
          longDescription,
          technology,
          status,
          feature,
          git,
        });
        return result;
      } catch (error) {
        throw new ApolloError(error);
      }
    },
    updateProject: async (
      parent,
      {
        _id,
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
      context
    ) => {
      try {
        const result = await project.findOneAndUpdate(
          { _id },
          {
            thumbnail,
            image,
            projectName,
            shortDescription,
            longDescription,
            technology,
            status,
            feature,
            git
          },
          {
            new: true,
          }
        );
        return result;
      } catch (error) {
        throw new ApolloError(error);
      }
    },
    addPost: async (
      parent,
      { banner, shortDescription, content, date, postName },
      context
    ) => {
      try {
        const result = await post.create({
          banner,
          shortDescription,
          content,
          date,
          postName,
        });
        return result;
      } catch (error) {
        throw new ApolloError(error);
      }
    },
    updatePost: async (
      parent,
      { _id, banner, shortDescription, content, date, postName },
      context
    ) => {
      try {
        const result = await post.findOneAndUpdate(
          { _id },
          {
            banner,
            shortDescription,
            content,
            date,
            postName,
          },
          {
            new: true,
          }
        );
        return result;
      } catch (error) {
        throw new ApolloError(error);
      }
    },
  },
};

export default resolvers;
