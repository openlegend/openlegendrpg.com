/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.com/docs/node-apis/
 */

// You can delete this file if you're not using it
// sort: { order: ASC, fields: [frontmatter___date] }

const { createFilePath } = require(`gatsby-source-filesystem`)

exports.onCreateNode = ({ node, getNode, actions }) => {
  const { createNodeField } = actions
  if(node.internal.type === `BanesBanesYaml`) {
    const slug = `/bane/${node.name.toLowerCase().replace(/\s+/, '-')}`
    createNodeField({
      node,
      name: `slug`,
      value: slug,
    })
  } else if (node.internal.type === `BoonsBoonsYaml`) {
    const slug = `/boon/${node.name.toLowerCase().replace(/\s+/, '-')}`
    createNodeField({
      node, 
      name: `slug`,
      value: slug,
    })
  } else if (node.internal.type === `FeatsFeatsYaml`) {
    const slug = `/feat/${node.name.toLowerCase().replace(/\(/, '!').split(' !')[0].replace(/\s+/g, '-')}`
    createNodeField({
      node, 
      name: `slug`,
      value: slug,
    })
  }
 }

exports.onCreateWebpackConfig = ({ actions }) => {
    actions.setWebpackConfig({
        resolve: {
            alias: {
                path: require.resolve("path-browserify")
            },
            fallback: {
                fs: false,
            }
        }
    })
}


exports.createPages = async ({ actions, graphql, reporter }) => {
  const { createPage } = actions
  const coreRulesTemplate = require.resolve(`./src/templates/coreRulesTemplate.js`)
  const communityLicenseTemplate = require.resolve(`./src/templates/communityLicenseTemplate.js`)
  const result = await graphql(`
    {
      allMdx(
        sort: { order: ASC, fields: [frontmatter___index] }
        limit: 1000
      ) {
        edges {
          node {
            frontmatter {
              slug
            }
          }
        }
      }

      allBanesBanesYaml {
        nodes {
          id
          name
          fields {
            slug
          }
        }
      }

      allBoonsBoonsYaml {
        nodes {
          id 
          name 
          fields {
            slug
          }
        }
      }

      allFeatsFeatsYaml {
        nodes {
          id
          name
          fields {
            slug
          }
        }
      }
    }
  `);

  // Handle errors
  if (result.errors) {
    reporter.panicOnBuild(`Error while running GraphQL query.`)
    return
  }

  // Handle the coreRulesChapter and communityLicenseTemplate page creation
  const coreRulesChapter = result.data.allMdx.edges
  
  coreRulesChapter.forEach(({ node }, index) => {
    if(node.frontmatter.slug === '/community-license') {
      createPage({
        path: node.frontmatter.slug,
        component: communityLicenseTemplate,
      });
    } else {
      createPage({
        path: node.frontmatter.slug,
        component: coreRulesTemplate,
        context: {
          prev: index === 0 ? null : coreRulesChapter[index - 1].node,
          next: index === coreRulesChapter.length - 2 ? null : coreRulesChapter[index + 1].node,
          slug: node.frontmatter.slug,
        },
      });
    }
  });

  // Create Banes main page and individual banes pages
  createPage({
    path: `/banes/`,
    component: require.resolve(`./src/templates/allBanes`),
  })

  result.data.allBanesBanesYaml.nodes.forEach(node => {
    const { slug } = node.fields
    createPage({
      path: `${slug}`,
      component: require.resolve(`./src/templates/singleBaneTemplate.js`),
      context: {
        slug,
        name: node.name
      }
    }) 
  });

  // Create Boons main page and individual boons pages
  createPage({
    path: `/boons/`,
    component: require.resolve(`./src/templates/allBoons`),
  })

  result.data.allBoonsBoonsYaml.nodes.forEach(node => {
    const { slug } = node.fields
    createPage({
      path: `${slug}`,
      component: require.resolve(`./src/templates/singleBoonTemplate.js`),
      context: {
        slug, 
        name: node.name
      }
    })
  })

  // Create Feats main page and individual pages

  createPage({
    path: `/feats/`,
    component: require.resolve(`./src/templates/allFeats`)
  })

  result.data.allFeatsFeatsYaml.nodes.forEach(node => {
    const { slug } = node.fields
    createPage({
      path: `${slug}`,
      component: require.resolve(`./src/templates/singleFeatTemplate.js`),
      context: {
        slug, 
        name: node.name
      }
    })
  })
}
