import React from 'react';
import { Link } from 'gatsby';

import useToggle from '../utils/useToggle';

import { makeStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import ArrowDropUpIcon from '@material-ui/icons/ArrowDropUp';



const useStyles = makeStyles((theme) => ({
  rightTocSidebar: {
    position: 'absolute',
    fontSize: '16px',
    top: '100px',
    right: '20px',
    minHeight: '293px',
    minWidth: '350px',
    maxWidth: '500px',
    paddingBottom: '100px',
    zIndex: '5',
    [theme.breakpoints.down('sm')]: {
      top: '12px',
      right: 0,
      left: '8px',
      paddingBottom: '20px',
      position: 'relative',
      display: 'block',
      width: '100%',
      minHeight: '84px',
      marginTop: '24px'
    }
  },
  innerWrap: {
    backgroundColor: theme.palette.background.paper,
    postion: 'relative',
    width: '100%',
    height: '100%',
    overflow: 'hidden',
    maxHeight: '48px',
    [theme.breakpoints.down('sm')]: {
      width: 'calc(100% - 25px)',
    }
  },
  innerWrap_expanded: {
    maxHeight: '2500px',
    backgroundColor: theme.palette.background.paper,
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
      backgroundColor: theme.palette.primary.dark,
    },
    backgroundColor: theme.palette.primary.dark,
    // color: theme.palette.primary.contrastText,
    margin: '4px',
    height: '40px',
    width: '40px',
    minWidth: 0,
    lineHeight: '24px',
    borderRadius: '50%',
    float: 'right',
    boxShadow: '0 2px 5px 0 rgba(0, 0, 0, 0.26)',
  },
  layoutPadding: {
    padding: '4px 8px!important',
    marginTop: '8px'
  }, 
  listContainer: {
    '& a': {
      color: theme.palette.success.main,
      textDecoration: 'none'
    },
    fontWeight: 700,
    listStyleType: 'none',
    marginTop: '8px',
  },
  pageHeadings: {
    paddingLeft: 0,
    '& li': {
      listStyleType: 'none',
      padding: '4px',
      listStylePosition: 'outside',
      '& li': {
        fontWeight: 400,
      },
    },
  }
}))


const slugger = require('github-slugger').slug;

const CoreTOC = ({ headings }) => {
  const classes = useStyles();

  const [expanded, setExpanded] = useToggle();

  return (
    <div className={classes.rightTocSidebar}>
      <div className={(expanded ? classes.innerWrap_expanded : classes.innerWrap)}>
        <IconButton className={classes.iconButton} onClick={setExpanded} >
          {expanded ? <ArrowDropUpIcon /> : <ArrowDropDownIcon />}
        </IconButton>
        <div className={classes.layoutPadding}>
          <ul className={classes.listContainer}>
          <h3 style={{ marginTop: 0 }} >Table of Contents</h3>
            <li>
              <ul className={classes.pageHeadings}>
                {
                  headings.map((heading, index) => {
                    const newHeading = heading.replace(/\(/, '!').split(' !')[0]
                    return (
                      <li key={index} >
                        <Link to={'#' + slugger(newHeading)}>{heading}</Link>
                      </li>
                    )
                  })
                }
              </ul>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default CoreTOC;
