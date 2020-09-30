require("dotenv").config({
  path: `.env`,
});
console.log("api key : " + process.env.API_KEY);
module.exports = {
  plugins: [
    "gatsby-plugin-react-helmet",
    "gatsby-plugin-emotion",
    {
      resolve: "gatsby-source-prismic",
      options: {
        repositoryName: "emileTemplate",
        accessToken: process.env.API_KEY,
      },
    },
  ],
};
