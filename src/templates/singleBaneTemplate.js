import React from 'react';
import { graphql } from 'gatsby';
import SingleItemBane from '../components/banes/single-item-bane';

export default function SingleBaneTemplate({ data }) {
  const bane = data.allBanesBanesYaml.edges[0].node
  return (
    <div>
      <SingleItemBane bane={bane} />
    </div>
  )
}

export const query = graphql`
  query SingleBane($slug: String) {
    allBanesBanesYaml(filter: {fields: {slug: {eq: $slug}}}) {
      edges {
        node {
          attack
          attackAttributes
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
