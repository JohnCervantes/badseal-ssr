require("dotenv").config();

module.exports = {
  reactStrictMode: true,
  env: {
    REACT_APP_ACCESS_ID: process.env.REACT_APP_ACCESS_ID,
    REACT_APP_ACCESS_KEY: process.env.REACT_APP_ACCESS_KEY,
    REACT_APP_REGION: process.env.REACT_APP_REGION,
    SECRET: process.env.SECRET,
    URI: process.env.URI,
    DB_URI: process.env.DB_URI,
    REACT_APP_GRAPHQL_URL: process.env.REACT_APP_GRAPHQL_URL,
    REACT_APP_LOCAL_GRAPHQL_URL: process.env.REACT_APP_LOCAL_GRAPHQL_URL
  },
  images: {
    domains: ["","badseal1.s3.us-west-2.amazonaws.com"],
  },
};
