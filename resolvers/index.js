import { ApolloError } from "apollo-server-errors";
import project from "../models/project.js";

const resolvers = {
  Query: {
    projects: async (parent, args, context) => {
      try {
        const result = await project.find({});
        console.log(result)
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
    }
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

// export const handleFileUpload = async (file) => {
//   console.log(file);
//   const { createReadStream, filename } = await file;

//   const key = uuid();

//   return new Promise((resolve, reject) => {
//     s3.upload(
//       {
//         ...s3DefaultParams,
//         Body: createReadStream(),
//         Key: `${key}/${filename}`,
//       },
//       (err, data) => {
//         if (err) {
//           console.log("error uploading...", err);
//           reject(err);
//         } else {
//           console.log("successfully uploaded file...", data);
//           resolve(data);
//         }
//       }
//     );
//   });
// };

export default resolvers;
