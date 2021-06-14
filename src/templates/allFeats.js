import React, { useState } from "react"

import {default as parseStrToHtml} from 'html-react-parser';
import * as queryString from 'query-string';

import NavLayout from '../layouts/nav-layout';
import SearchBarFeats from '../components/feats/searchbar-feats';
import YMLFeats from '../core-rules/feats/feats.yml';
import CoreTOC from '../components/core-toc';

import Tooltip from '@material-ui/core/Tooltip';
import { IconButton } from 'gatsby-theme-material-ui';
import ButtonBase from '@material-ui/core/ButtonBase';
import Divider from '@material-ui/core/Divider';
import { makeStyles } from '@material-ui/core/styles';

import RemoveIcon from '@material-ui/icons/Remove';
import AddIcon from '@material-ui/icons/Add';
import ReplyIcon from '@material-ui/icons/Reply';
import LinkIcon from '@material-ui/icons/Link';


const useStyles = makeStyles({
  featsContainer: {
    fontSize: '16px',
    margin: '0 24px'
  },
  divider: {
    marginTop: '16px'
  },
  accordBtnContainer: {
    display: 'inline-block',
    margin: '8px 0',
    fontSize: '16px'
  },
  accordionBtn: {
    justifyContent: 'start',
    left: 5,
    padding: '0 6px',
    margin: '6px 8px',
    lineHeight: '36px',
    minHeight: '36px',
    background: 'transparent',
    minWidth: '88px',
    fontWeight: '500',
    width: '100%',
    position: 'relative',
    alignItems: 'center',
    display: 'flex'
  },
  featsAccordion: {
    paddingTop: '16px',
    paddingBottom: '16px',
    fontSize: '16px',
    maxHeight: '9999px',
    display: 'block',
    transition: 'height .6s linear',
    overflow: 'hidden',
  },
  accordionExpanded: {
    maxHeight: 0,
    paddingTop: '16px',
    paddingBottom: '16px',
    fontSize: '16px',
    display: 'block',
    transition: 'height .6s linear',
    overflow: 'hidden',
  },
  individualFeatLink: {
    backgroundColor: 'rgba(89,65,160,0.7)',
    position: 'relative',
    marginLeft: '16px',
    height: '30px',
    width: '30px',
    minWidth: 0,
    lineHeight: '40px',
    borderRadius: '50%',
    boxShadow: '0 2px 5px 0 rgba(0, 0, 0, 0.26)',
  },
})

const FeatsPage = ({ location }) => {
  const classes = useStyles();

  const [searchParams, setSearchParams] = useState(queryString.parse(location.search));
  const [textSearchVal, setTextSearchVal] = useState('');
  const [visibility, setVisibility] = useState(true);

  const updateSearchParams = (currentLocation) => {
    setSearchParams(queryString.parse(currentLocation.search))
  }
  
  const updateTextSearch = (event) => {
    setTextSearchVal(event.target.value);
  }

  const handleClearSearchText = () => {
    setTextSearchVal('')
  }

  const handleVisibility = () => {
    setVisibility(!visibility);
  }

  const handleCopyToClipboard = param => e => {
    e.preventDefault();
    const path = `${location.pathname}/${param}`.replace('//', '/')
    const url = `${location.origin}${path}`;
    navigator.clipboard.writeText(url).then(() => {}, () => {})
  }

  let featHeadings = [];

  return (
    <div>
      <NavLayout>
      <SearchBarFeats
        textSearchVal={textSearchVal}
        updateTextSearch={updateTextSearch}
        updateSearchParams={updateSearchParams}
        handleClearSearchText={handleClearSearchText}
      />
      <CoreTOC headings={featHeadings} />
      <div className={classes.featsContainer}>
        <div className={classes.accordBtnContainer} >
          <ButtonBase onClick={handleVisibility} className={classes.accordionBtn} >
            {visibility ? <RemoveIcon /> : <AddIcon />}
            {visibility ? 'HIDE EXPLANATION' : 'SHOW EXPLANATION'}
          </ButtonBase>
        </div>
        <div className={`${visibility ? classes.featsAccordion : classes.accordionExpanded}`}>
          <h1>FEATS</h1>
          <h2>Reading a Feat Description</h2>
          <p>Below, each feat description includes the following elements.</p>
          <p><strong>Cost. </strong>This is the number of feat points required to take this feat. Characters get 6 feat points at 1st level, and 3 feat points each time they level up. If the feat has multiple tiers, the cost is the same for each tier and must be paid every time the feat is purchased at a new tier unless otherwise noted in the feat description. So, to access the Tier 5 ability of a feat, you must pay for the feat 5 times. If a feat does not have a noted exception it can only be purchased once.</p>
          <p><strong>Prerequisites. </strong>Feats can have prerequisites that you must meet when you select it. They can either require a minimum attribute score or they can sometimes require other feats.</p>
          <p><strong>Description. </strong>This entry simply provides a general idea of what the feat could look like in the story.</p>
          <p><strong>Effect. </strong>This entry indicates the mechanical effects of the feat on the rules of the game.</p>
          <p></p>
          <Divider />
        </div>
        {YMLFeats.map((data, index) => {

          if (textSearchVal !== '') {
            const regex = new RegExp(textSearchVal, 'gi');
            let show = false;
            show = data.name.match(regex) || data.description.match(regex) || data.effect.match(regex);
            if(!show) return null;
          }

          const matched = [];

          data.cost.forEach(item => {
            const paramKey = Object.keys(searchParams)?.map(item => item.replace(' ', ''))[0];
            const powerValue = Number(Object.values(searchParams)?.map(item => item)[0]);
            
            if(paramKey === 'exactly') {
              if (item !== powerValue) return null;
              return matched.push(item);
            } else if (paramKey === 'orgreater') {
              if (item < powerValue) return null;
              return matched.push(item)
            } else if (paramKey === 'orless') {
              if (item > powerValue) return null;
              return matched.push(item)
            }
          })

          
          if (Object.keys(searchParams)?.length > 0 && matched?.length < 1) return null;
          

          featHeadings.push(data.name);

          const slugName = data.name.toLowerCase().replace(/\(/, '!').split(' !')[0].replace(/\s+/g, '-');

          return (
            <div key={index} className='feats-section'>
              <h2 id={slugName} style={{ lineHeight: '40px', marginBottom: '36px'  }}>
                {data.name}
                <Tooltip title='View this Feat'>
                  <IconButton className={classes.individualFeatLink} to={`/feat/${slugName}`}>
                    <ReplyIcon />
                  </IconButton>
                </Tooltip>
                <Tooltip title='Copy Link'>
                  <IconButton className={classes.individualFeatLink} onClick={handleCopyToClipboard(slugName)}>
                    <LinkIcon />
                  </IconButton>
                </Tooltip>
              </h2>
              <p><strong>Cost: </strong>{data.cost.toString()} {data.cost.length > 1 ? 'points' : 'point'}</p>
              <p><strong>Prerequisites</strong></p>
              <ul>
                  <ul>
                    {
                      Object.entries(data.prerequisites).map((item, index) => {
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
              <p>{data.power}</p>
              <p><strong>Description:</strong></p>
              <p>{data.description}</p>
              <p><strong>Effect</strong></p>
              {parseStrToHtml(data.effect)}
              {data.special ? 
                <div>
                  <p><strong>Special</strong></p> 
                  {parseStrToHtml(data.special)} 
                </div>
              : null}
              <Divider className={classes.divider} /> 
            </div>
          )
        })
        }
      </div>
      </NavLayout>
    </div>
  )
}
export default FeatsPage;
