import React from 'react';

import { Timeline } from 'react-twitter-widgets';

import SocialMedia from '../components/social-media';
import CompanyInfoFooter from '../components/company-info-footer';

import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';


const useStyles = makeStyles({
  footer: {
    color: 'white',
    padding: '16px',
    '& > *': {
      marginTop: '16px'
    },
  },
  divider: {
    backgroundColor: 'rgba(255, 255, 255, 0.4)',
    color: 'white',
    height: '2px',
    width: '100%',
    margin: '16px 24px',
  },
})


const OpenLegendFooter = (props) => {
  const classes = useStyles();
  const isIndexPage = props.isIndexPage;

  return (
    <Grid container item direction='row' justify='space-around'  className={classes.footer} style={{ background: `${isIndexPage ? 'rgba(0, 0, 0, 0.4)' : 'rgb(66,66,66)' }` }} >
      <div  className={classes.divider} style={{ display: `${isIndexPage ? 'block' : 'none' }` }} />
      <Grid item xs={12} sm={5}>
        <SocialMedia />
        <CompanyInfoFooter />
      </Grid>
      <Grid item xs={12} sm={5}>
        <Timeline 
          className={classes.twitterWidget}
          dataSource={{
            sourceType: 'profile',
            screenName: 'OpenLegendRPG'
          }}
          options={{
            height: '400'
          }}
        />
      </Grid>
    </Grid>
  )
}

export default OpenLegendFooter;

