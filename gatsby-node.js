/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.com/docs/node-apis/
 */

// You can delete this file if you're not using it
const _ = require("lodash")
const path = require("path")
const { createFilePath } = require("gatsby-source-filesystem")
const { fmImagesToRelative } = require("gatsby-remark-relative-images")

exports.createPages = ({ actions, graphql }) => {
  const { createPage } = actions

  return graphql(`
    {
      elements: allElementsJson(limit: 1000) {
        nodes {
          id
          title
          templateKey
        }
      }
      pages: allFile(filter: { extension: { eq: "md" } }) {
        nodes {
          name
        }
      }
    }
  `).then(result => {
    if (result.errors) {
      result.errors.forEach(e => console.error(e.toString()))
      return Promise.reject(result.errors)
    }

    console.log("graphql result", result)
    const elements = result.data.elements.nodes
    const pages = result.data.pages.nodes

    elements.forEach(edge => {
      const id = edge.id
      const template = edge.templateKey
      console.log("template", template)
      if (template) {
        const slug = edge.title.toLowerCase().replace(/\s/g, "_")
        createPage({
          path: `elements/${slug}`,
          component: path.resolve(`src/templates/${template}.js`),
          // additional data can be passed via context
          context: {
            id,
          },
        })
      }
    })

    pages.forEach(edge => {
      const id = edge.id
      createPage({
        path: `pages/${edge.name}`,
        component: path.resolve(`src/templates/page.js`),
        // additional data can be passed via context
        context: {
          id,
          slug: edge.name,
        },
      })
    })

    // Tag pages:
    let tags = []
    // Iterate through each post, putting all found tags into `tags`
    elements.forEach(edge => {
      if (_.get(edge, `node.frontmatter.tags`)) {
        tags = tags.concat(edge.node.frontmatter.tags)
      }
    })
    // Eliminate duplicate tags
    tags = _.uniq(tags)

    // Make tag pages
    tags.forEach(tag => {
      const tagPath = `/tags/${_.kebabCase(tag)}/`

      createPage({
        path: tagPath,
        component: path.resolve(`src/templates/tags.js`),
        context: {
          tag,
        },
      })
    })
  })
}
