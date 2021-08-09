import React, { useState } from 'react';
import { graphql } from 'gatsby';

import {default as parseStrToHtml} from 'html-react-parser';
import * as queryString from 'query-string';

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


const baneAttributes = [
  'Creation',
  'Energy',
  'Entropy',
  'Influence',
  'Might',
  'Persuasion',
  'Presence',
  'Alteration',
  'Agility',
  'Movement',
  'Prescience',
  'Protection',
  'Deception'
]

const useStyles = makeStyles((theme) => ({
  baneSection: {
    fontSize: '16px',
    '& p strong': {
      lineHeight: '200%',
    }
  },
  baneContainer: {
    margin: '0 24px',
  },
  banesAccordion: {
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
    display: 'flex'
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
  individualBaneLink: {
    backgroundColor: 'rgba(100,69,190,0.9)',
    position: 'relative',
    marginLeft: '16px',
    height: '30px',
    width: '30px',
    minWidth: 0,
    lineHeight: '40px',
    borderRadius: '50%',
    boxShadow: '0 2px 5px 0 rgba(0, 0, 0, 0.26)',
  },
}))

const BanesPageContent = ({ location, data }) => {
  const classes = useStyles();
  const banes = data.allBanesBanesYaml.nodes
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


  let baneHeadings = [];

  return (

    <div>
      <SearchBarBanesBoons 
        attributeList={baneAttributes} 
        textSearchVal={textSearchVal} 
        updateTextSearch={updateTextSearch} 
        updateSearchParams={updateSearchParams} 
        handleClearSearchText={handleClearSearchText}
      /> 
      <CoreTOC headings={baneHeadings} />
      <div className={classes.baneContainer}>
        <div className={classes.accordBtnContainer} >
          <ButtonBase onClick={handleVisibility} className={classes.accordionBtn} >
            {visibility ? <RemoveIcon /> : <AddIcon />}
            {visibility ? 'HIDE EXPLANATION' : 'SHOW EXPLANATION'}
          </ButtonBase>
        </div>
        <div className={`${visibility ? classes.banesAccordion : classes.accordionExpanded}`}>
          <h1>BANES</h1>
          <h2>Reading a Bane Description</h2>
          <p>Below, each bane description includes the following elements.</p>
          <p><strong>Power Level. </strong>This number indicates the required attribute score needed to inflict the bane. If multiple power levels are listed (such as 2 / 4 / 6), then the bane can be inflicted at multiple tiers of power. The Persistent Damage bane, for example, deals increased damage as you inflict it at higher power levels.</p>
          <p><strong>Attack Attributes. </strong>This is a list of the attribute or attributes that can be used to inflict the bane. As long as you possess at least one of the listed attributes at a score greater than or equal to the Power Level, then you can inflict the bane.</p>
          <p><strong>Attack. </strong>This list indicates what type of attack roll to make when inflicting the bane. Each entry consists of an attribute that the attacking player should roll and the defense score targeted by the attack. If the attacker’s roll equals or exceeds the target’s defense score, then the bane is inflicted.</p>
          <p><strong>Duration. </strong>A bane typically remains in effect until the target resists it using a resist action, hence most banes have a duration of “resist ends”. If a target fails three resist rolls against a bane, the bane can no longer be resisted. It persists for an extended duration indicated in parentheses.</p>
          <p><strong>Description. </strong>This entry simply provides a general idea of what the bane could look like in the story.</p>
          <p><strong>Effect. </strong>This entry indicates the mechanical effects of the bane on the rules of the game.</p>
          <p></p>
          <Divider />
        </div>

        
        {banes.map((data, index) => {
          if (textSearchVal !== '') {
            const regex = new RegExp(textSearchVal, 'gi');
            let show = false;
            show = data.name.match(regex) || data.description.match(regex) || data.effect.match(regex);
            if(!show) return null;
          }

          const matched = [];
          data.attackAttributes.forEach(item => {
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

          

          baneHeadings.push(data.name);

          const slugName = data.name.toLowerCase().replace(/\s+/, '-')

          return (
            <div className={classes.baneSection} key={index}>
              <h2 id={slugName} style={{ lineHeight: '40px', marginBottom: '36px'  }}>
                {data.name}
                <Tooltip title='View this Bane'>
                  <IconButton className={classes.individualBaneLink} to={`/bane/${slugName}`}>
                    <ReplyIcon />
                  </IconButton>
                </Tooltip>
                <Tooltip title='Copy Link'>
                  <IconButton className={classes.individualBaneLink} onClick={handleCopyToClipboard(slugName)}>
                    <LinkIcon />
                  </IconButton>
                </Tooltip>
              </h2>
              <p></p>
              <p></p>
              <p><strong>Duration: </strong>{data.duration}</p>
              <p><strong>Invocation Time: </strong>{data.invocationTime}</p>
              <p><strong>Power Level: </strong>{data.power.map((item, index) => {
                  if (index < data.power.length - 1) return `${item}/ `;
                  return item;
                })}
              </p>
              <p><strong>Attack Attributes: </strong>{data.attackAttributes.map((item, index) => {
                  if (index < data.attackAttributes.length - 1) return `${item}, `;
                  return item;
                })}
              </p>
              <p><strong>Attack: </strong></p>
              <p></p>
              <ul>
                {data.attack.map((item, index) => {
                  return (
                    <li key={index}>{item}</li>
                  )
                })}
              </ul>
              <p><strong>Description</strong></p>
              <p>{data.description}</p>
              <p><strong>Effect</strong></p>
              <div className={classes.effect}>{parseStrToHtml(data.effect)}</div>
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
        })
        }
      </div>
    </div>
  ) 
}

export const query = graphql`
  query BanesQuery {
    allBanesBanesYaml {
      nodes {
        attack
        attackAttributes
        description
        duration
        effect
        id
        invocationTime
        name
        power
        special
      }
    }
  }
`

export default BanesPageContent;
