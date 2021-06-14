import React from 'react';

import { makeStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import SvgIcon from '@material-ui/core/SvgIcon';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';

import FacebookIcon from '@material-ui/icons/Facebook';
import TwitterIcon from '@material-ui/icons/Twitter';
import YoutubeIcon from '@material-ui/icons/YouTube';
import RedditIcon from '@material-ui/icons/Reddit';

function TwitchIcon(props){
  return (
    <SvgIcon {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor"  viewBox="0 0 24 24">
      <path d="M11.64 5.93H13.07V10.21H11.64M15.57 5.93H17V10.21H15.57M7 2L3.43 5.57V18.43H7.71V22L11.29 18.43H14.14L20.57 12V2M19.14 11.29L16.29 14.14H13.43L10.93 16.64V14.14H7.71V3.43H19.14Z" />
    </SvgIcon>
  )
}

const useStyles = makeStyles((theme) => ({
  socialMediaContainer: {
    marginBottom: '8px',
  },
  title: {
    paddingBottom: '8px'
  },
  iconContainer: {
    borderRadius: '4px',
    boxShadow: '0px 2px 1px -1px rgba(0,0,0,0.2),0px 1px 1px 0px rgba(0,0,0,0.14),0px 1px 3px 0px rgba(0,0,0,0.12)',
    backgroundColor: 'rgba(255,255,255, 0.2)',
  },
  iconButton: {
    color: 'white',
    padding: '8px',
  },
  svgIcon: {
    height: '100%',
    marginTop: '4px',
  },
  
}));

export default function SocialMedia() {
  const classes = useStyles();

  return (
    <Grid container direction='column' alignItems='flex-start' justify='center' className={classes.socialMediaContainer}>
      <Typography variant='body1' className={classes.title}>Follow Us</Typography>
      <Grid container direction='row' justify='space-around' alignItems='center' className={classes.iconContainer}>
        <IconButton href='https://facebook.com/openlegendrpg' aria-label='Facebook' className={classes.iconButton} >
          <FacebookIcon />
        </IconButton>
        <IconButton href='https://twitter.com/OpenLegendRPG'  aria-label='Twitter' className={classes.iconButton} >
          <TwitterIcon />
        </IconButton>
        <IconButton href='https://twitch.tv/OpenLegendRPG' aria-label='Live on Twitch' className={classes.iconButton}>
          <TwitchIcon className={classes.svgIcon} />
        </IconButton>
        <IconButton href='https://www.youtube.com/openlegendrpg' aria-label='Youtube Archives' className={classes.iconButton} >
          <YoutubeIcon  />
        </IconButton>
        <IconButton href='https://reddit.com/r/openlegendrpg' aria-label='Subreddit Commentary' className={classes.iconButton}>
          <RedditIcon />
        </IconButton>
      </Grid>
    </Grid>
  )
}
