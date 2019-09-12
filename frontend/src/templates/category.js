import React from "react"
import { Box } from "rebass"
import { Link } from "gatsby"

import { HeroCard } from "../components/styles"

export default function CategoryTemplate({ pageContext, data }) {
  const { category, categorySlug } = pageContext
  const { edges } = data.allSanityTag

  return (
    <Box my={[2]} px={[2]}>
      {edges.map(edge => (
        <Link
          key={edge.node.id}
          to={`/guide/categories/${categorySlug}/${edge.node.slug.current}`}
        >
          <HeroCard text={edge.node.tag} fluid={edge.node.image.asset.fluid} />
        </Link>
      ))}
    </Box>
  )
}

// Query all tags in array of tag slugs
export const CATEGORY_PAGE_QUERY = graphql`
  query($tags: [String!]) {
    allSanityTag(filter: { slug: { current: { in: $tags } } }) {
      edges {
        node {
          ...SanityTagFragment
        }
      }
    }
  }
`
