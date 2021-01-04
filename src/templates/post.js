import React from "react"
import { graphql } from "gatsby"
import Img from "gatsby-image"

const Post = ({ data: { post } }) => {
  return (
    <>
      <h1>{post.title}</h1>
      <Img fluid={post.mainImage.asset.fluid} />
    </>
  )
}

export default Post

// This needs to be dynamic based on the slug passed in via context in gatsby-node.js
export const query = graphql`
  query($slug: String!) {
    post: sanityPost(slug: { current: { eq: $slug } }) {
      title
      id
      mainImage {
        asset {
          fluid(maxWidth: 700) {
            ...GatsbySanityImageFluid
          }
        }
      }
    }
  }
`
