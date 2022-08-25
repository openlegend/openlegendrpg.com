import React from 'react';

import { makeStyles } from '@material-ui/core/styles';

import Card from '@material-ui/core/Card';
import Typography from '@material-ui/core/Typography';
import { yellow } from '@material-ui/core/colors';

const useStyles = makeStyles({
  root: {
    padding: '4px',
    backgroundColor: 'rgba(255,255,255, 0.2)',
    color: 'white',
    '& a': {
      color: yellow[400],
    }
  },
})

export default function CompanyInfoFooter() {
  const classes = useStyles();
  const copyrightEndDate = new Date().getFullYear();

  return (
    <Card className={classes.root}>
      <Typography variant='caption'>
        Copyright © 2012 - {copyrightEndDate} <br/>
        Seventh Sphere Entertainment.<br/>
        <a href="/community-license">Open Legend Community License.</a> 
        <br/>
        Artwork by <a href="http://saryth.deviantart.com/gallery/">Saryth</a> &
        Website by <a href="https://github.com/Brandon-G-Tripp">Brandon Tripp</a>
        <br/>
        Last updated: March 25th, 2021.
      </Typography>
    </Card>
  )
}
