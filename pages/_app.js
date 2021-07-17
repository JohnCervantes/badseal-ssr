import "../styles/globals.css";
import { ApolloClient, ApolloProvider } from "@apollo/client";
import { cache } from "../cache.js";
import Navigation from "../components/Navigation";
import Footer from "../components/Footer";
import Spinner from "../components/Spinner";


export const client = new ApolloClient({
  cache: cache,
});

function MyApp({ Component, pageProps }) {
  return (
    <ApolloProvider client={client}>
      <Navigation />
      <Spinner/>
      <Component {...pageProps} />
      <Footer/>
    </ApolloProvider>
  );
}

export default MyApp;
