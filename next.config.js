require("dotenv").config();

module.exports = {
  reactStrictMode: true,
  env: {
    REACT_APP_ACCESS_ID: process.env.REACT_APP_ACCESS_ID,
    REACT_APP_ACCESS_KEY: process.env.REACT_APP_ACCESS_KEY,
    REACT_APP_REGION : process.env.REACT_APP_REGION 
  },
  images: {
    domains: ["cervantes-family.s3.us-west-2.amazonaws.com"],
  }
};
