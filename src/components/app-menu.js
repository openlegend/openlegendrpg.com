import React from 'react';
import { useStaticQuery, graphql } from 'gatsby';
import { StaticImage } from 'gatsby-plugin-image';

import DarkModeToggle from './dark-mode-toggle';
import useWindowSize from '../utils/useWindowSize';
import AppMenuItem from './app-menu-item';
import SocialMedia from './social-media';
import CompanyInfoFooter from './company-info-footer';

import Grid from '@material-ui/core/Grid';
import List from '@material-ui/core/List';
import { makeStyles, createStyles } from '@material-ui/core';

import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import HomeIcon from '@material-ui/icons/Home';
import PeopleIcon from '@material-ui/icons/People';
import CreateIcon from '@material-ui/icons/Create';
import LibraryBooksIcon from '@material-ui/icons/LibraryBooks';
import ImportContactsIcon from '@material-ui/icons/ImportContacts';
import TrendingUpIcon from '@material-ui/icons/TrendingUp';
import ControlPointIcon from '@material-ui/icons/ControlPoint';
import DoNotDisturbOnIcon from '@material-ui/icons/DoNotDisturbOn';




const appMenuItems = [
  {
    'name': 'Home',
    'Icon': HomeIcon,
    'link': '/',
    'linkType': 'internal'
  },
  {
    'name': 'Store',
    'Icon': ShoppingCartIcon,
    'link': 'http://store.openlegendrpg.com/',
    'linkType': 'external'
  },
  {
    'name': 'Community',
    'Icon': PeopleIcon,
    'link': 'http://community.openlegendrpg.com/',
    'linkType': 'external'
  },
  {
    'name': 'Blog',
    'Icon': CreateIcon,
    'link': 'http://blog.openlegendrpg.com/',
    'linkType': 'external'
  },
  {
    'name': 'Resources',
    'Icon': LibraryBooksIcon,
    'linkType': undefined,
    'items': [
      {
        'name': 'FREE INTRO ADVENTURE',
        'link': 'http://www.drivethrurpg.com/product/190330/A-Star-Once-Fallen',
        'linkType': 'external'
      },
      {
        'name': 'CHARACTER SHEET',
        'link': 'http://www.drivethrurpg.com/product/192536/Open-Legend-Printable-Character-Sheet',
        'linkType': 'external'
      },
      {
        'name': 'EXAMPLE CHARACTERS',
        'link': 'https://drive.google.com/drive/folders/0Bx_UrXHMi3wmUlJjbDZiaGtIX00?resourcekey=0-xjZXrB5pSASVlYDvxvQR9A&usp=sharing',
        'linkType': 'external'
      },
      {
        'name': 'D&D CONVERSION GUIDE',
        'link': 'http://blog.openlegendrpg.com/5th-edition-dd-to-open-legend-character-conversion-guide',
        'linkType': 'external'
      },
      {
        'name': 'DISCORD SERVER',
        'link': 'https://discord.gg/J27ZbYP',
        'linkType': 'external'
      },
      {
        'name': 'OL COMMUNITY LICENSE',
        'link': 'https://openlegendrpg.com/community-license',
        'linkType': 'external'
      },
    ]
  },
  {
    'name': "Core Rules",
    'Icon': ImportContactsIcon,
    'linkType': undefined,
    'items': undefined
  },
  {
    'name': 'Banes',
    'Icon': DoNotDisturbOnIcon,
    'link': '/banes',
    'linkType': 'internal'
  },
  {
    'name': 'Boons',
    'Icon': ControlPointIcon,
    'link': '/boons',
    'linkType': 'internal'
  },
  {
    'name': 'Feats',
    'Icon': TrendingUpIcon,
    'link': '/feats',
    'linkType': 'internal'
  },
];

const useStyles = makeStyles((theme) => {
  createStyles({
    container: {
      alignItems: 'space-between',
      overflowY: 'auto'
    },
    appMenu: {
      width: '100%',
      paddingTop: '16px',
    },
    socialMedia: {
      width: '90%',
      zIndex: 1200
    },
    darkModeContainer: {
      width: '50%',
    },
    divider: {
      backgroundColor: 'rgba(255, 255, 255, 0.4)',
      color: 'white',
      height: '2px',
      width: '100%',
      margin: '16px 24px',
      display: 'block',
    }
  })
});

const AppMenu = (props) => {
  const classes = useStyles()
  const size = useWindowSize()

  const setDarkMode = props.setDarkMode
  const darkMode = props.darkMode

  const [openStatusCore, setOpenStatusCore] = React.useState(false);
  const [openStatusRes, setOpenStatusRes] = React.useState(false);

  function menuOpenCallback(name) {
    name === 'Resources' ? setOpenStatusRes(!openStatusRes) : setOpenStatusCore(!openStatusCore);
  }

  const data = useStaticQuery(graphql`
    query coreRuleQuery {
      allMdx (
        sort: { order: ASC, fields: [frontmatter___index] }
        limit: 1000
      ) {
        edges {
          node {
            frontmatter {
              slug
              title
              }
            }
          }
        }
      }
  `)

  const filteredMdxMenuItems = data.allMdx.edges.filter(item => item.node.frontmatter.slug === '/community-license' ? false : true);
  const coreRulesTitles = filteredMdxMenuItems.map(item => {
    const nodeValues = item.node.frontmatter;
    return {'name': nodeValues.title, 'link': nodeValues.slug, 'linkType': 'internal'}
  })

  appMenuItems[5].items = coreRulesTitles

  let footerVisibility = (openStatusCore || openStatusRes || size.height < 650) ? 'hidden' : 'visible'  
  let footerOpacity = (openStatusCore || openStatusRes || size.height < 650) ? 0 : 1  
  let footerTransition = (openStatusCore || openStatusRes || size.height < 650) ? 'opacity 0ms, visibility 0ms' : 'opacity 1000ms'  


  return (
    <Grid container direction='column' className={classes.container}>
      <Grid item>
        <StaticImage 
          src='../img/open_legend_lg_logo.png'
          alt='Open Legend Logo'
          tag='section' 
          style={{ margin: '8px' }}
        />
      </Grid>
      <Grid item>
        <List component="nav" className={classes.appMenu} disablePadding>
          {appMenuItems.map((item, index) => (
            <AppMenuItem menuOpen={menuOpenCallback} {...item} key={index} />
          ))}
        </List>
      </Grid>
      <Grid item className={classes.darkModeContainer}>
      <div className={classes.divider} />
        <DarkModeToggle darkMode={darkMode} setDarkMode={setDarkMode} /> 
      </Grid>
      <Grid container item direction='column' 
        className={classes.socialMedia} 
        style={{ padding: '8px', bottom: 0, position: 'fixed', width: '316px', visibility: `${footerVisibility}`, transition: `${footerTransition}`, opacity: `${footerOpacity}`  }}
      >
        <Grid item>
          <SocialMedia />
        </Grid>
        <Grid item>
          <CompanyInfoFooter style={{ zIndex: '-1', marginTop: '8px' }} />
        </Grid>
      </Grid>
    </Grid>
  )
}

export default AppMenu;
