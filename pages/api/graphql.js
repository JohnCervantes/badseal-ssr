// pages/api/graphql.js
import { ApolloServer } from "apollo-server-micro";
import typeDefs from "../../typedefs/index";
import resolvers from "../../resolvers/index";
import connectMongo from "../../dbConfig/mongoose";

connectMongo();

export const config = {
  api: {
    bodyParser: false,
  },
};

const apolloServer = new ApolloServer({
  typeDefs,
  resolvers,
  playground: true,
  introspection: true,
});

// module.exports = apolloServer
//   .start()
//   .then(() => apolloServer.createHandler({ path: "/api/graphql" }));

export default apolloServer.createHandler({ path: "/api/graphql" });
