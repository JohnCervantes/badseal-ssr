import "../styles/globals.css";
import { ApolloClient, ApolloProvider } from "@apollo/client";
import { cache } from "../cache.js";
import Navigation from "../components/Navigation";
import Footer from "../components/Footer";
import Spinner from "../components/Spinner";
import Modal from "../components/Modal";
import { createUploadLink } from "apollo-upload-client";
import Toast from "../components/Toast";

export const client = new ApolloClient({
  cache: cache,
  link: createUploadLink({
    uri:
      process.env.REACT_APP_GRAPHQL_URL || "http://localhost:3000/api/graphql",
  }),
});

function MyApp({ Component, pageProps }) {
  return (
    <ApolloProvider client={client}>
      <Navigation />
      <Spinner />
      <Modal />
      <Toast/>
      <Component {...pageProps} />
      <Footer />
    </ApolloProvider>
  );
}

export default MyApp;
