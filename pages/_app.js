import "../styles/globals.css";
import { ApolloClient, ApolloProvider } from "@apollo/client";
import { cache } from "../cache.js";
import Navigation from "../components/Navigation";


export const client = new ApolloClient({
  cache: cache,
});

function MyApp({ Component, pageProps }) {
  return (
    <ApolloProvider client={client}>
      <Navigation />
      <Component {...pageProps} />
    </ApolloProvider>
  );
}

export default MyApp;
