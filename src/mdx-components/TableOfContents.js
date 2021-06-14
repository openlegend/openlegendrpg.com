import React from 'react';
import { Link } from 'gatsby';

import useToggle from '../utils/useToggle';

import { makeStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import ArrowDropUpIcon from '@material-ui/icons/ArrowDropUp';



const useStyles = makeStyles((theme) => ({
  rightShim: {
    marginTop: '8px',
    postion: 'relative',
    float: 'right',
    display: 'block',
    minHeight: '335px',
    minWidth: '555px',
    [theme.breakpoints.down('sm')]: {
      float: 'none',
      width: 'calc(100% - 75px)',
      display: 'none',
    },
  },
  rightTocSidebar: {
    position: 'absolute',
    top: '12x',
    right: '20px',
    minHeight: '293px',
    minWidth: '350px',
    maxWidth: '500px',
    marginTop: '8px',
    paddingBottom: '100px',
    [theme.breakpoints.down('sm')]: {
      top: '16px',
      right: 0,
      left: '8px',
      paddingBottom: '20px',
      position: 'relative',
      display: 'block',
      minWidth: '84px',
      marginTop: '24px',
    }
  },
  innerWrap: {
    backgroundColor: '#fbf9ff',
    postion: 'relative',
    width: '100%',
    height: '100%',
    marginTop: '8px',
    maxHeight: '273px',
    [theme.breakpoints.down('sm')]: {
      width: 'calc(100% - 25px)',
    }
  },
  innerWrap_expanded: {
    maxHeight: '2200px',
    backgroundColor: '#fbf9ff',
    postion: 'relative',
    width: '100%',
    height: '100%',
    [theme.breakpoints.down('sm')]: {
      maxHeight: '9999px',
      width: 'calc(100% - 25px)',
    }
  },
  iconButton: {
    '&:hover': {
      backgroundColor: 'rgb(81,45,168)',
    },
    backgroundColor: 'rgb(81,45,168)',
    color: 'rgba(255,255,255,0.87)',
    margin: '6px',
    height: '40px',
    minWidth: 0,
    lineHeight: '24px',
    width: '40px',
    borderRadius: '50%',
    float: 'right',
    boxShadow: '0 2px 5px 0 rgba(0, 0, 0, 0.26)',
  },
  layoutPadding: {
    padding: '20px!important',
    [theme.breakpoints.down('sm')]: {
      width: 'calc(100% - 25px)',
    }
  }, 
  listContainer: {
    [theme.breakpoints.down('sm')]: {
      marginLeft: '-36px'
    },
    '& ul': {
      textTransform: 'none',
      paddingInlineStart: '8px',
    },
    '& a': {
      color: '#5941a0',
      textDecoration: 'none'
    },
    fontWeight: 700,
    listStyleType: 'none'
  },
  pageHeadings: {
    '& li': {
      listStyleType: 'none',
      padding: '4px',
      listStylePosition: 'outside',
      '& li': {
        fontWeight: 400,
      },
    },
  },
}))


const slugger = require('github-slugger').slug;

export function TableOfContents({ headings }) {
  const classes = useStyles();

  const [expanded, setExpanded] = useToggle();


  function buildTocNodes(heading, index) {
    const liArray = [];
    let j = index + 1;


    if (index === headings.length - 1) {
      return (
        <li> 
          <Link to={`#${slugger(heading.value)}`}>{heading.value}</Link>
        </li>
      )
    }
    
    while (headings[j].depth === 3 && j < headings.length - 1 ) {
      liArray.push(headings[j].value);
      j++;
    }
    
    return (
      <li>
        <Link to={'#' + slugger(heading.value)}>{heading.value}</Link>
        <ul>
          {
            liArray.map(subheading => (
              <li key={subheading}>
                <Link to={'#' + slugger(subheading)}>{subheading}</Link>
              </li>
            ))
          }
        </ul>
      </li>
    )
  }

  return (
    <div>
      <div className={classes.rightShim}></div>
      <div className={classes.rightTocSidebar}>
        <div className={(expanded ? classes.innerWrap_expanded : classes.innerWrap)}>
          <IconButton className={classes.iconButton} onClick={setExpanded} >
            {expanded ? <ArrowDropUpIcon /> : <ArrowDropDownIcon />}
          </IconButton>
          <div className={classes.layoutPadding}>
            <ul className={classes.listContainer}>
              <li>
                <Link to={'#' + slugger(headings[0].value)}>{headings[0].value}</Link>
                <ul className={classes.pageHeadings}>
                  {
                  headings.filter(heading => heading.depth === 2)
                    .map((heading) => (
                      buildTocNodes(heading, headings.indexOf(heading))
                    ))
                  }
                </ul>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
