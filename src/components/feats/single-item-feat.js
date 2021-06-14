import React from 'react';

import YMLFeats from "../../core-rules/feats/feats.yml";
import {default as parseStrToHtml} from 'html-react-parser';

import Toolbar from '@material-ui/core/Toolbar';
import { IconButton } from 'gatsby-theme-material-ui';
import { makeStyles } from '@material-ui/core/styles';

import ArrowBackIcon from '@material-ui/icons/ArrowBack';

const useStyles = makeStyles(({
  featSection: {
    fontSize: '16px',
    margin: '24px'
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
}));




export default function SingleItemPageFeat(props) {
  const classes = useStyles();

  const feat = YMLFeats.filter(feat => feat.name === props.feat.name)[0];

    return (
      <div className={classes.container}>
        <Toolbar className={classes.toolbar}> 
          <IconButton disableRipple to='/feats' className={classes.backButton} >
            <ArrowBackIcon  className={classes.backIcon} />
          </IconButton>
            Back To Feats List
        </Toolbar>
        <div className={classes.featSection}>
                  <h2 id={feat.name} style={{ lineHeight: '40px' }}>
                    {feat.name}
                  </h2>
                  <p><strong>Cost: </strong>
                    {feat.cost.toString()} {feat.cost.length > 1 ? 'points' : 'point'}
                  </p>
                  <p><strong>Prerequisites: </strong></p>
                  <ul>
                    <ul>
                    {
                      Object.entries(feat.prerequisites).map((item, index) => {
                        const capTier = item[0].charAt(0).toUpperCase() + item[0].slice(1,4);
                        const tierNum = item[0].slice(4);
                        if(Object.keys(item[1])[0] === 'Other') {
                          return (
                            <li key={index}>
                              <strong>{`${capTier} ${tierNum}:`} </strong> 
                              {`${Object.values(item[1])[0]}`}
                            </li>
                          )
                        } 
                        else if(Object.entries(item[1])[0][0] === 'Feat' ) {
                          return (
                            <li key={`${capTier}${index}`}>
                              <strong>{`${capTier} ${tierNum}:`} </strong> 
                              {`Feat: ${item[1]['Feat'].reduce((acc, currentVal) => {
                                  return acc +` ${currentVal},` 
                                }, '').slice(0, -1)}`}
                            </li>
                          )
                        } else if (Object.entries(item[1])[0][0] === 'Attribute'){
                          if (Object.entries(item[1])[1] !== undefined) {
                            // Get attr values for thos with feats
                            let attrs = '';
                            Object.entries(Object.values(item[1])[0]).forEach(item => {
                              attrs += Object.keys(item[1])[0] + ' ' + Object.values(item[1])[0] +', or ' 
                            })
                            // Get feat values
                            let feat = 'Feat: '+ Object.entries(Object.values(item[1])[1])[0][1]
                            return (
                                <li key={index + capTier}>
                                  <strong>{`${capTier} ${tierNum}:`} </strong> 
                                  <ul>
                                    <li>
                                      {attrs.slice(0, -5)}
                                    </li>
                                    <li key={`${index}${capTier}Feat`}>
                                      {feat}
                                    </li>
                                  </ul>
                                </li>
                            )
                          } else {
                            const singleAttr = ' ' + Object.keys(Object.entries(Object.values(item[1])[0])[0][1])[0] 
                              + ' ' + Object.values(Object.entries(Object.values(item[1])[0])[0][1])[0];
                            return (
                              <li key={index}>
                                <strong>{`${capTier} ${tierNum}:`} </strong> 
                                  {singleAttr}
                              </li>
                            )
                          }
                        } else {
                          const multiAttrs = item[1]['any']['Attribute'].reduce((acc, currentVal) => {
                            return acc += `${Object.keys(currentVal)[0]} ${Object.values(currentVal)[0]}, or `;
                          }, '').slice(0, -5);
                            return (
                              <li key={index + item}>
                                <strong>{`${capTier} ${tierNum}:`} </strong> 
                                {`${multiAttrs}`}
                              </li>
                            )
                        } 
                      })
                    }
                    </ul>
                  </ul>
                  <p><strong>Description</strong></p>
                  <p>{feat.description}</p>
                  <p><strong>Effect</strong></p>
                  <div>{parseStrToHtml(feat.effect)}</div>
                  <p></p> 
                </div>
      </div>
    )
}
