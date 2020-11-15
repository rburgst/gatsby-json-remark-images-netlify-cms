import React from "react"
import PropTypes from "prop-types"
import { graphql } from "gatsby"
import Layout from "../components/layout"

const ElementPage = ({ data }) => {
  const { elementsJson: post } = data

  return (
    <Layout>
      <section className="section section--gradient">
        <div className="container">
          <div className="columns">
            <div className="column is-10 is-offset-1">
              <div className="section">
                <h2 className="title is-size-3 has-text-weight-bold is-bold-light">
                  {post.title}
                </h2>
                <div
                  className={"content"}
                  dangerouslySetInnerHTML={{
                    __html: post.information.general_informationHtml ?? "N/A",
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

ElementPage.propTypes = {
  data: PropTypes.object.isRequired,
}

export default ElementPage

export const elementQuery = graphql`
  query ElementPage($id: String!) {
    elementsJson(id: { eq: $id }) {
      id
      title
      templateKey
      information {
        about
        label_for_name_field
        label_for_opening_hours
        name
        label_for_general_information
        address
        general_information
        phone_number
        fax
        general_informationHtml
        opening_hours {
          opening_hours_info
          opening_hours_infoHtml
        }
        aboutHtml
      }
      children {
        id
        __typename
        ... on JsonRemarkProperty {
          id
          childMarkdownRemark {
            html
            rawMarkdownBody
            id
          }
        }
      }
    }
  }
`
