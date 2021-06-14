import React from 'react';
import { graphql } from 'gatsby';
import SingleItemBoon from '../components/boons/single-item-boon';
import NavLayout from '../layouts/nav-layout';

export default function SingleBaneTemplate({ data }) {
  const boon = data.allBoonsBoonsYaml.edges[0].node
  return (
    <div>
      <NavLayout>
        <SingleItemBoon boon={boon} />
      </NavLayout>
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
