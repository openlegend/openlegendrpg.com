import React from 'react';
import { graphql } from "gatsby";
import { StaticImage } from 'gatsby-plugin-image';

import { MDXProvider } from '@mdx-js/react';
import { MDXRenderer } from 'gatsby-plugin-mdx';

import { darkTheme, lightTheme } from '../components/UI/Theme';
import { darkModeContext } from '../components/UI/ThemeHandler';

import Container from '@material-ui/core/Container'
import Grid from '@material-ui/core/Grid'
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(({
  content: {
    fontSize: '16px',
    listStyleType: 'decimal',
    '& a': {
      color: theme.palette.success.main,
    }
  }
}))

export default function Template({
  data
}) {
  const classes = useStyles();

  const { mdx } = data;
  const { body } = mdx;
  return (
      <Container maxWidth='xl' className={classes.content}>
        <h1>Open Legend Community License</h1>
        <h2>Our Goal</h2>
        <p>One of the guiding philosophies of Open Legend is openness and a policy of zero hindrance in trying out our game. Our goal is to spread the joy of roleplaying games and share Open Legend as far and wide as possible. To that end, we want to encourage community use as broadly as possible, while still protecting our basic rights.</p>
        <p>Below, you’ll find everything you need to publish your own content for Open Legend. We don’t ask for you to pay any royalties back to us and we even allow you to use the designated Open Legend logo, but you’ll need to be sure not to break any of the rules of this license.</p>
        <h2>The Basics</h2>
        <p>We’ve made it very easy to publish Open Legend content in the hopes that many of you will. Doing so will help everyone as we add even more options for other Open Legend GMs and players. The Open Legend Community License allows for royalty-free usage of Open Legend rules, and requires only that 3rd party content creators follow a few rules. Let’s go over those rules in plain language:</p>
        <ol>
          <li>You can only use content in the Open Legend SRD. If it’s on the Open Legend website but not in the SRD, then it cannot be used.</li>
          <li>You must include the Open Legend Licensed Product logo prominently on the cover, front page, or packaging of your product.</li>
          <li>
            You must include the License Notice and the associated URL to the full license text of the Open Legend Community License in a clearly visible place. In the case of a physical or digital book it should appear in the opening pages.
            <br/>
            <br/>
            <strong>License Notice</strong>
            <br/>
            <br/>
            <em>“This product was created under the Open Legend Community License and contains material that is copyright to Seventh Sphere Entertainment. Such use of Seventh Sphere Entertainment materials in this product is in accordance with the Open Legend Community License and shall not be construed as a challenge to the intellectual property rights reserved by Seventh Sphere Entertainment. Seventh Sphere Entertainment and Open Legend RPG and their respective logos are trademarks of Seventh Sphere Entertainment in the U.S.A. and other countries.</em>
            <br/>
            <br/>
            <em>
              "The full-text Open Legend Community License can be found at &nbsp;  
              <a href="http://openlegendrpg.com/community-license">http://openlegendrpg.com/community-license</a>
              ."
            </em>
          </li>
          <li>Your content may not include anything illegal, slanderous, defamatory, fraudulent, obscene, pornographic, or abusive.</li>
          <li>If you publish something you shouldn’t, for example, a plagiarized work or something that violates the rules in #4 above, your license is automatically terminated.</li>
        </ol>
        <h2>The Open Legend SRC</h2>
        <p>To view the full extent of Open Legend content you can include via the Open Legend Community License, &nbsp; (coming soon).
        </p>
        <h2>Logos for the Open Legend Community License</h2>
        <p>The following logos are made available under the Open Legend Community License:</p>
        <p></p>
        <h3>Gold Logo</h3>
        <Grid container direction='column'>
          <Grid xs={12} item component='a' target='_blank' href={`open_legend_licensed_logo_gold.png`}>
            <StaticImage 
              loading='eager'
              src='../img/open_legend_licensed_logo_gold.png'
              alt='Licensed Gold Logo'
              maxWidth='100%'
            />
          </Grid>
          <p></p>
          <p></p>
          <h3>Silver Logo</h3>
          <Grid xs={12} item component='a' target='_blank' href={`open_legend_licensed_logo_silver.png`}>
          <StaticImage 
              loading='eager'
              src='../img/open_legend_licensed_logo_silver.png'
              alt='Licensed Gold Logo'
              maxWidth='100%'
            />
          </Grid>
        </Grid>

        <MDXProvider>
          <MDXRenderer>{body}</MDXRenderer>
        </MDXProvider>
      </Container>
  )
}

export const pageQuery = graphql`
  query {
    mdx(frontmatter: {slug: {eq: "/community-license"}}) {
      body
      frontmatter {
        slug
        title
      }
    }
  }
`
