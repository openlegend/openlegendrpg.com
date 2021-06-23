module.exports = {
  siteMetadata: {
    title: `Open Legend RPG`,
    description: `The Open Legend RPG website`,
    author: `Brandon Tripp for OpenLegendRPG`,
  },
  plugins: [
    {
      resolve: `gatsby-plugin-react-svg`,
      options: {
        rule: {
          include: /svgs/
        }
      }
    },
    `gatsby-theme-material-ui`,
    `gatsby-plugin-react-helmet`,
    `gatsby-transformer-yaml-full`,
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'yamlNodes',
        path: `${__dirname}/src/core-rules`,
      }
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `core-rules-pages-mdx`,
        path: `${__dirname}/src/core-rules/`,
      },
    },
    {
      resolve: `gatsby-plugin-mdx`,
      options: { 
        remarkPlugins: [require('remark-slug')],
      }
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/img`,
      },
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    `gatsby-plugin-image`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `Open Legend, Open-Source RPG `,
        short_name: `OpenLegend RPG`,
        start_url: `/`,
        background_color: `#663399`,
        theme_color: `#663399`,
        display: `minimal-ui`,
        icon: `src/icons/favicon-32x32.png`, // This path is relative to the root of the site.
      },
    },
    // this (optional) plugin enables Progressive Web App + Offline functionality
    // To learn more, visit: https://gatsby.dev/offline
    // `gatsby-plugin-offline`,
  ],
}
