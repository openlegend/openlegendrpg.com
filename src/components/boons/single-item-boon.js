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

export default function SingleItemPageBoon({ boon }) {
const classes = useStyles();

  return (
    <div className={classes.container}>
      <Toolbar className={classes.toolbar}> 
        <IconButton disableRipple to='/boons' className={classes.backButton} >
          <ArrowBackIcon  className={classes.backIcon} />
        </IconButton>
          Back To Boon List
      </Toolbar>
      <div className={classes.baneSection}>
        <h2 id={boon.name} style={{ lineHeight: '40px' }}>
            {boon.name}
          </h2>
          <p><strong>Duration: </strong>{boon.duration}</p>
          <p><strong>Power Level: </strong>{boon.power.map((item, index) => {
              if (index < boon.power.length - 1) return `${item}/ `;
              return item;
            })}
          </p>
          <p><strong>Attributes: </strong>{boon.attribute.map((item, index) => {
              if (index < boon.attribute.length - 1) return `${item}, `;
              return item;
            })}
          </p>
          <p><strong>Description</strong></p>
          <p>{boon.description}</p>
          <p><strong>Effect</strong></p>
          <div>{parseStrToHtml(boon.effect)}</div>
          {boon.special ? 
              <div>
                <p><strong>Special</strong></p> 
                {parseStrToHtml(boon.special)} 
              </div>
            : null}
          <p></p> 
        </div>
      </div>
    )
}
