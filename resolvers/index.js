import { ApolloError } from "apollo-server-errors";
import project from "../models/project.js";
// import user from "../models/post.js";
// import bcrypt from "bcrypt";
// import jwt from "jsonwebtoken";

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
  },
  Mutation: {
    addProject: async (
      parent,
      {
        thumbnail,
        image,
        projectName,
        description,
        technology,
        status,
        feature,
      },
      context
    ) => {
      try {
        const result = await project.create({
          thumbnail,
          image,
          projectName,
          description,
          technology,
          status,
          feature,
        });
        return result;
      } catch (error) {
        throw new ApolloError(error);
      }
    },
  },

  //   addUser: async (
  //     parent,
  //     { password, email, firstName, lastName, phone, isAdmin, registerDate },
  //     context
  //   ) => {
  //     try {
  //       const saltRounds = 10;
  //       const passwordHashed = await bcrypt.hash(password, saltRounds);

  //       const result = await user.create({
  //         password: passwordHashed,
  //         email,
  //         firstName,
  //         lastName,
  //         phone,
  //         isAdmin,
  //         registerDate,
  //       });
  //       const userForToken = {
  //         email: result.email,
  //         id: result._id,
  //         firstName: result.firstName,
  //         lastName: result.lastName,
  //         phone: result.phone,
  //         isAdmin: result.isAdmin,
  //         registerDate: result.registerDate,
  //       };
  //       const token = jwt.sign(userForToken, process.env.SECRET, {
  //         expiresIn: "24h",
  //       });
  //       result.token = token;
  //       return result;
  //     } catch (error) {
  //       throw new ApolloError(error);
  //     }
  //   },
  //},
};

export default resolvers;
