import React from 'react';
import { graphql } from 'gatsby';
import SingleItemFeat from '../components/feats/single-item-feat';
import NavLayout from '../layouts/nav-layout';

export default function SingleFeatTemplate({ data }) {
  const feat = data.allFeatsFeatsYaml.edges[0].node

  return (
    <div>
      <SingleItemFeat  feat={feat}/>
    </div>
  )
}

export const query = graphql`
  query SingleFeat($slug: String) {
    allFeatsFeatsYaml(filter: {fields: {slug: {eq: $slug}}}) {
      edges {
        node {
          name
          fields {
            slug
          }
        }
      }
    }
  }
`
