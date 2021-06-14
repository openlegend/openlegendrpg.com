import React from 'react';
import { graphql } from 'gatsby';
import SingleItemBane from '../components/banes/single-item-bane';
import NavLayout from '../layouts/nav-layout';

export default function SingleBaneTemplate({ data }) {
  const bane = data.allBanesBanesYaml.edges[0].node
  return (
    <div>
      <NavLayout>
        <SingleItemBane bane={bane} />
      </NavLayout>
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
