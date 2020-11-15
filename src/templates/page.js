import React from "react"
import PropTypes from "prop-types"
import { graphql } from "gatsby"
import Layout from "../components/layout"

const Page = ({ data }) => {
  const { file } = data

  const post = file.md
  return (
    <Layout>
      <section className="section section--gradient">
        <div className="container">
          <div className="columns">
            <div className="column is-10 is-offset-1">
              <div className="section">
                <h2 className="title is-size-3 has-text-weight-bold is-bold-light">
                  {post.frontmatter.title}
                </h2>
                <div
                  className={"content"}
                  dangerouslySetInnerHTML={{
                    __html: post.html ?? "N/A",
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  )
}

Page.propTypes = {
  data: PropTypes.object.isRequired,
}

export default Page

export const pageQuery = graphql`
  query Page($slug: String!) {
    file(name: { eq: $slug }) {
      id
      md: childMarkdownRemark {
        html
        rawMarkdownBody
        frontmatter {
          title
        }
      }
    }
  }
`
