import React from 'react';

import { graphql, useStaticQuery } from 'gatsby'
import { getImage } from "gatsby-plugin-image"

import { BgImage } from 'gbimage-bridge';


const BackgroundSection = (props) => {
  const { placeholderImage } = useStaticQuery(
    graphql`
      query {
        placeholderImage: file(relativePath: { eq: "open_legend_saryth_navigator_night_in_forest.jpg" }) {
          childImageSharp {
            gatsbyImageData(
              placeholder: BLURRED
              formats: [AUTO, WEBP, AVIF]
            )
          }
        }
      }
    `
  )

  const image = getImage(placeholderImage);

  return (
    <BgImage
      style={{  height: '100vh', display: 'flex', backgroundPosition: 'fixed' }}
      image={image}
    >
      {props.children}
    </BgImage>  
    
  )
}

export default BackgroundSection;