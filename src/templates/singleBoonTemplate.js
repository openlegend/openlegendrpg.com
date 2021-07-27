import React from 'react';
import { graphql } from 'gatsby';
import SingleItemBoon from '../components/boons/single-item-boon';

export default function SingleBaneTemplate({ data }) {
  const boon = data.allBoonsBoonsYaml.edges[0].node
  return (
    <div>
      <SingleItemBoon boon={boon} />
    </div>
  )
}

export const query = graphql`
  query SingleBoon($slug: String) {
    allBoonsBoonsYaml(filter: {fields: {slug: {eq: $slug}}}) {
      edges {
        node {
          attribute
          description
          duration
          effect
          invocationTime
          name
          power
          special
          fields {
            slug
          }
        }
      }
    }
  }
`
