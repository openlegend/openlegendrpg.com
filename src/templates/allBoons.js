import React, { useState } from 'react';

import {default as parseStrToHtml} from 'html-react-parser';
import * as queryString from 'query-string';

import YMLBoons from '../core-rules/boons/boons.yml';
import SearchBarBanesBoons from '../components/searchbar-banes-boons';
import CoreTOC from '../components/core-toc';

import Divider from '@material-ui/core/Divider';
import Tooltip from '@material-ui/core/Tooltip';
import ButtonBase from '@material-ui/core/ButtonBase';
import { IconButton } from 'gatsby-theme-material-ui';
import { makeStyles } from '@material-ui/core/styles';

import AddIcon from '@material-ui/icons/Add';
import RemoveIcon from '@material-ui/icons/Remove';
import ReplyIcon from '@material-ui/icons/Reply';
import LinkIcon from '@material-ui/icons/Link';

const boonAttributes = [
  'Alteration',
  'Creation',
  'Learning',
  'Movement',
  'Entropy',
  'Logic',
  'Energy',
  'Influence',
  'Presence',
  'Prescience',
  'Protection',
  'Perception',
  'Learning'
]

const useStyles = makeStyles({
  boonSection: {
    fontSize: '16px',
    '& p strong': {
      lineHeight: '200%'
    }
  },
  boonsContainer: {
    margin: '0 24px'
  },
  boonsAccordian: {
    paddingTop: '16px',
    paddingBottom: '16px',
    fontSize: '16px',
    maxHeight: '9999px',
    display: 'block',
    transition: 'height .6s linear',
    overflow: 'hidden',
  },
  accordBtnContainer: {
    display: 'inline-block',
    margin: '8px 0',
    
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
    display: 'flex',
    
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
  individualBoonLink: {
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


const BoonsPage = ({ location }) => {
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
    const path = `${location.pathname.replace(/s/, '')}/${param}`.replace('//', '/')
    const url = `${location.origin}${path}`;
    navigator.clipboard.writeText(url).then(() => {}, () => {})
  }

  let boonHeadings = [];

  return (
    <div>
      <SearchBarBanesBoons 
        attributeList={boonAttributes} 
        textSearchVal={textSearchVal} 
        updateTextSearch={updateTextSearch} 
        updateSearchParams={updateSearchParams} 
        handleClearSearchText={handleClearSearchText}
      />
      <CoreTOC headings={boonHeadings} />
      <div className={classes.boonsContainer} style={{ marginLeft: `24px`}}>
        <div className={classes.accordBtnContainer} >
          <ButtonBase onClick={handleVisibility} className={classes.accordionBtn} >
            {visibility ? <RemoveIcon /> : <AddIcon />}
            {visibility ? 'HIDE EXPLANATION' : 'SHOW EXPLANATION'}
          </ButtonBase>
        </div>
        <div className={`${visibility ? classes.boonsAccordian : classes.accordionExpanded}`}>
          <h1>BOONS</h1>
          <h2>Reading a Boon Description</h2>
          <p>Below, each boon description includes the following elements.</p>
          <p><strong>Power Level. </strong>This number indicates the required attribute score needed to invoke the boon. If multiple power levels are listed (such as 2 / 4 / 6), then the boon can be invoked at multiple tiers of power. The Heal boon, for example, heals more damage as you invoke it at higher power levels. The power level of a boon also determines the Challenge Rating of the attribute roll to invoke the boon. The CR equals 10 + 2 x Power Level.</p>
          <p><strong>Attributes. </strong>This is a list of the attribute or attributes that can be used to invoke the boon. As long as you possess at least one of the listed attributes at a score greater than or equal to the Power Level, then you can invoke the boon.</p>
          <p><strong>Invocation Time. </strong>The required time that it takes to invoke the boon. Most boons have an invocation time of 1 normal action. For boons that have a longer time, you must spend the entire invocation time concentrating on nothing other than invoking the boon. If you are interrupted, you must start the casting over.</p>
          <p><strong>Duration. </strong>Most boons have a duration of “sustain persists”, which indicates that the caster must use a sustain action every round in order to keep the boon in effect. If you have a boon in effect and don’t sustain it, the boon is dispelled at the end of your turn. Because sustaining a boon is a minor action, which can only be taken once per turn, you can typically sustain only one boon at a time.</p>
          <p><strong>Description. </strong>This entry simply provides a general idea of what the boon could look like in the story.</p>
          <p><strong>Effect. </strong>This entry indicates the mechanical effects of the boon on the rules of the game.</p>
          <p></p>
          <Divider />
        </div>


        {YMLBoons.map((data, index) => {
          if (textSearchVal !== '') {
            const regex = new RegExp(textSearchVal, 'gi');
            let show = false;
            show = data.name.match(regex) || data.description.match(regex) || data.effect.match(regex);
            if(!show) return null;
          }

          const matched = [];
          data.attribute.forEach(item => {
            const paramKeys = Object.keys(searchParams)?.map(item => item.toLowerCase());
            if (paramKeys.indexOf(item.toLowerCase()) > -1) matched.push(item);
          });
          const powerLevels = Object.values(searchParams)?.map(powerParam => {
            for (let i = 0; i < powerParam.length; i++) {
              if (data.power[i] <= powerParam ) return true;
            }
            return false;
          });

          if (Object.keys(searchParams)?.length > 0 && matched?.length < 1) return null;
          if (powerLevels[0] === false) return null;

          boonHeadings.push(data.name);

          const slugName = data.name.toLowerCase().replace(/\s+/, '-')

          return (
            <div className={classes.boonSection} key={index}> 
              <h2 id={slugName} style={{ lineHeight: '40px', marginBottom: '36px'  }}>
                {data.name}
                <Tooltip title='View this Boon'>
                  <IconButton className={classes.individualBoonLink} to={`/boon/${slugName}`}>
                    <ReplyIcon />
                  </IconButton>
                </Tooltip>
                <Tooltip title='Copy Link'>
                  <IconButton className={classes.individualBoonLink} onClick={handleCopyToClipboard(slugName)}>
                    <LinkIcon />
                  </IconButton>
                </Tooltip>
              </h2>
              <p><strong>Duration: </strong>{data.duration}</p>
              <p><strong>Invocation Time: </strong>{data.invocationTime}</p>
              <p><strong>Power Level: </strong>{data.power.map((item, index) => {
                  if (index < data.power.length - 1) return `${item}/ `;
                  return item;
                })}
              </p>
              <p><strong>Attributes: </strong></p>{data.attribute.map((item, index) => {
                  if (index < data.attribute.length - 1) return `${item}, `;
                  return item;
                })}
              
              <p><strong>Description</strong></p>
              <p>{data.description}</p>
              <p><strong>Effect</strong></p>
              {parseStrToHtml(data.effect)}
              {data.special ? 
                <div>
                  <p><strong>Special</strong></p> 
                  {parseStrToHtml(data.special)} 
                </div>
              : null}
              <p></p>
              <Divider /> 
            </div>
          )
        })}
      </div>
    </div>
  );
}


export default BoonsPage;

