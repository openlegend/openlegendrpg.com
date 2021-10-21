import React, { useContext } from "react";
import { graphql } from "gatsby";
import { Link } from 'gatsby';

import {
  Container
} from '@material-ui/core'

import { MDXProvider } from '@mdx-js/react';
import { MDXRenderer } from 'gatsby-plugin-mdx';

import { darkTheme, lightTheme } from '../components/UI/Theme';
import { darkModeContext } from '../components/UI/ThemeHandler';

import { makeStyles } from '@material-ui/core/styles';
import { fade } from '@material-ui/core/styles/colorManipulator';

const useStyles = makeStyles(({
  content: {
    fontSize: '16px', 
    paddingBottom: '16px',
    '& p': {
      '& a': {
//        color: theme => theme.palette.info.dark, Was this, changing to below, seeing if this fixes ToC colors in dark mode
        color: theme => theme.palette.success.main,
      }
    },
    '& h2': {
      background: theme => theme.palette.type === 'light' ? fade(theme.palette.secondary.main, .15) : theme.palette.secondary.main,
      padding: '8px'
    },
    '& blockquote': {
      backgroundColor: theme => theme.palette.background.paper,
      margin: '8px',
      padding: '15px',
    },
    '& .sticky-sidebar': {
      '& h3': {
        margin: '0'
      },
      '& p': {
        margin: '0',
        // adding this in to see if fix ToC color dark mode
        '& a': {
          color: theme => theme.palette.success.main,
         }
      },
      '& blockquote': {
        background: 'inherit',
        margin: '0',
        padding: '0'
      },
      float: 'right',
      width: '43%',
      padding: '12px',
      margin: '0 0 0 16px',
      background: theme => theme.palette.background.paper,
    },
    '& table': {
      width: '100%!important',
      background: '0 0!important',
      borderCollapse: 'collapse',
      borderSpacing: '0',
      tableLayout: 'fixed',
      display: 'table',
      '& .table-no-body': {
          '& th:first-of-type': {
            width: '25%',
          },
          '& th:nth-of-type(2)': {
            width: '25%',
          },
          '& th:nth-of-type(3)': {
            width: '50%',
          },
    },
      },
    '& thead': {
      display: 'table-header-group',
      verticalAlign: 'middle',
      '& tr': {
        '& th': {
          padding: '0',
        }
      }
    },
    '& th': {
      padding: '7px',
      borderWidth: '0',
      textAlign: 'center'
    },
    '& tr': {
      display: 'table-row',
      verticalAlign: 'inherit',
      borderColor: 'inherit',
      border: '0',
      '& td': {
        padding: '7px',
        borderWidth: '0',
        textAlign: 'center',
      },
    },
    '& tbody': {
      display: 'table-row-group',
      verticalAlign: 'middle',
      borderSpacing: '0',
      '& tr:nth-child(odd)': {
        // background: theme => theme.palette.background.paper,
        background: theme => theme.palette.warning.light,
        textAlign: 'center',
      },
      '& tr:nth-child(even)': {
        background: theme => theme.palette.warning.main, 
        textAlign: 'center',
      }
    },
    '& .table-no-body-heading': {
      marginBottom: '0',
      textAlign: 'center',
    },
    '& .table-even-header': {
      textTransform: 'uppercase',
      background: theme => theme.palette.warning.dark,
      padding: '4px 0',
    },
  },
  'navDiv': {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    '& > a': {
      margin: '0 8px',
//        color: theme => theme.palette.info.dark, Was this, changing to below, seeing if this fixes ToC colors in dark mode
      color: theme => theme.palette.success.main,
    }
  }
}))


export default function Template({
  data,
  pageContext,
}) {
  const DarkModeContext = useContext(darkModeContext);
  const { darkMode } = DarkModeContext;

  const theme = darkMode ? darkTheme : lightTheme
  const classes = useStyles(theme);

  const prev = pageContext.prev 
    ? {
        url: `${pageContext.prev.frontmatter.slug}`,
        title: pageContext.prev.frontmatter.title
      }
    : null;

  const next = pageContext.next
    ? {
        url: `${pageContext.next.frontmatter.slug}`,
        title: pageContext.next.frontmatter.title
      }
    : null; 

  const { mdx } = data;
  const { body, headings } = mdx;
  return (
      <Container maxWidth='xl' className={classes.content}>
        <MDXProvider>
          <MDXRenderer headings={headings}>{body}</MDXRenderer>
        </MDXProvider>
        <div className={classes.navDiv}>
          {prev && (
            <Link to={prev.url}>
              <h4> &lt; Previous Chapter </h4>
            </Link>
          )}
          {next && (
            <Link to={next.url}>
              <h4>Next Chapter &gt;</h4>
            </Link>
          )}
        </div>
      </Container>
  )
}

export const pageQuery = graphql`
  query($slug: String!) {
    mdx(frontmatter: { slug: { eq: $slug } }) {
      body
      headings {
        depth
        value
      }
      tableOfContents
      frontmatter {
        slug
        title
      }
    }
  }
`

