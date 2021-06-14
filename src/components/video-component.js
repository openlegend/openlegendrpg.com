import React, { useState, useRef } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';

import PlayArrowIcon from '@material-ui/icons/PlayArrow';

const useStyles = makeStyles({
  root: {
    maxWidth: '90%',
    // height: 'auto',
    padding: 0,
    position: 'relative',
    height: 'auto',
  },
  video: {
    objectFit: 'cover',
    height: '100%',
    width: '100%',
    '&:focus': {
      outline: 'none'
    }
  },
  playBtnContainer: {
    width: 'auto',
    height: 'auto',
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    margin: 'auto',
  }
});

export default function VideoComponent(props) {
  const classes = useStyles();

  const [played, setPlayed] = useState(false);
  const vidRef = useRef(null);

  const handleClick = () => {
    vidRef.current.play();
    setPlayed(true);
    
  }

  return (
    <Card className={classes.root}>
      <CardMedia
        className={classes.video}
        component='video'
        width='500'
        height='auto'
        src={props.videoSrc}
        type={props.type}
        autoPlay=''
        muted=''
        controls={played}
        ref={vidRef}
        poster={props.imgSrc}
      >
        
      </CardMedia>
      <div className={classes.playBtnContainer} style={{ display: played ? `none` : `block` }}  > 
      <Button variant='contained' onClick={handleClick} >
         <PlayArrowIcon />  Play
      </Button>
      </div>
    </Card>
  );
}