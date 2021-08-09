import React from 'react';

import {default as parseStrToHtml} from 'html-react-parser';

import Toolbar from '@material-ui/core/Toolbar';
import { IconButton } from 'gatsby-theme-material-ui';
import { makeStyles } from '@material-ui/core/styles';

import ArrowBackIcon from '@material-ui/icons/ArrowBack';

const useStyles = makeStyles(({
  baneSection: {
    fontSize: '16px',
    margin: '24px',
    paddingBottom: '24px'
  },
  toolbar: {
    backgroundColor: 'rgba(81,45,168, 0.9)',
    color: 'rgba(255,255,255,0.87)',
    fontSize: '20px',
  },
  backButton: {
    '&:hover': {
      backgroundColor: 'transparent'
    }
  },
  backIcon: {
    color: 'rgba(255,255,255,0.87)',
  }
}))


function SingleItemPageBane({ bane }) {
  const classes = useStyles();

    return (
      <div className={classes.container}>
        <Toolbar className={classes.toolbar}> 
          <IconButton disableRipple to='/banes' className={classes.backButton} >
            <ArrowBackIcon  className={classes.backIcon} />
          </IconButton>
            Back To Bane List
        </Toolbar>
        <div className={classes.baneSection}>
          <h2 style={{ lineHeight: '40px' }}>
            {bane.name}
          </h2>
          <p><strong>Duration: </strong>{bane.duration}</p>
          <p><strong>Invocation Time: </strong>{bane.invocationTime}</p>
          <p><strong>Power Level: </strong>{bane.power.map((item, index) => {
              if (index < bane.power.length - 1) return `${item}/ `;
              return item;
            })}
          </p>
          <p><strong>Attack Attributes: </strong>{bane.attackAttributes.map((item, index) => {
              if (index < bane.attackAttributes.length - 1) return `${item}, `;
              return item;
            })}
          </p>
          <p><strong>Attack: </strong></p>
          <p></p>
          <ul>
            {bane.attack.map((item, index) => {
              return (
                <li key={index}>{item}</li>
              )
            })}
          </ul>
          <p><strong>Description</strong></p>
          <p>{bane.description}</p>
          <p><strong>Effect</strong></p>
          <div>{parseStrToHtml(bane.effect)}</div>
          {bane.special ? 
              <div>
                <p><strong>Special</strong></p> 
                {parseStrToHtml(bane.special)} 
              </div>
            : null}
          <p></p> 
        </div>
      </div>
    )
}

export default SingleItemPageBane;
