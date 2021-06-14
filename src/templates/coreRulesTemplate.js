import React from "react";
import { graphql } from "gatsby";
import { Link } from 'gatsby';

import {
  Container
} from '@material-ui/core'

import { MDXProvider } from '@mdx-js/react';
import { MDXRenderer } from 'gatsby-plugin-mdx';

import NavLayout from '../layouts/nav-layout';

import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(({
  content: {
    fontSize: '16px', 
    paddingBottom: '16px',
    '& h2': {
      background: 'rgba(50,39,176,.15)',
      padding: '8px'
    },
    '& blockquote': {
      backgroundColor: '#fbf9ff',
      margin: '8px',
      padding: '15px',
    },
    '& .sticky-sidebar': {
      '& h3': {
        margin: '0'
      },
      '& p': {
        margin: '0',
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
      background: 'white',
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
        background: '#fbf9ff',
        textAlign: 'center',
      },
      '& tr:nth-child(even)': {
        background: '#ffe6cc',
        textAlign: 'center',
      }
    },
    '& .table-no-body-heading': {
      marginBottom: '0',
      textAlign: 'center',
    },
    '& .table-even-header': {
        textTransform: 'uppercase',
        background: '#f9cb9c',
        padding: '4px 0',
    },
  },
  'navDiv': {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    '& > a': {
      margin: '0 8px',
    }
  }
}))


export default function Template({
  data,
  pageContext
}) {
  const classes = useStyles();

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
    <NavLayout>
      <Container maxWidth='xl' className={classes.content}>
        <MDXProvider>
          <MDXRenderer  headings={headings}>{body}</MDXRenderer>
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
    </NavLayout>
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

