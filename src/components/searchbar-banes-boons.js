import React from 'react';

import SearchChip from './search-chip';

import { fade, makeStyles } from '@material-ui/core/styles';

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar'
import IconButton from '@material-ui/core/IconButton';
import InputBase from '@material-ui/core/InputBase';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import InputAdornment from '@material-ui/core/InputAdornment';

import SearchIcon from '@material-ui/icons/Search';
import ClearIcon from '@material-ui/icons/Clear';
import AddIcon from '@material-ui/icons/Add';

const useStyles = makeStyles((theme) => ({
  root: {
    boxShadow: 'none',
    flexGrow: 1,
    backgroundColor: 'rgb(81,45,168)',
    display: 'block',
    [theme.breakpoints.down('md')]: {
      display: 'none'
    }
  },
  appBar: {
    boxShadow: 'none', 
    backgroundColor: 'rgb(81,45,168)'
  },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(5),
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(3),
      width: 'auto',
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputRoot: {
    color: 'inherit',
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
    '& *': {
      color: theme.palette.common.white,
    },
    '&:focused': {
      color: theme.palette.common.white,
    }
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
    '&:not(.Mui-disabled):hover::before': {
      borderColor: theme.palette.common.white,
    },
    '&.MuiInput-underline:after': {
      borderColor: theme.palette.common.white,
    },
    '&.MuiInput-underline:before': {
      borderColor: theme.palette.common.white,
    },
  },
  clearIconButton: {
    color: theme.palette.common.white,
  },
  addIconButton: {
    color: theme.palette.common.white,
  },
  inputLabel: {
      '&.MuiFormLabel-root.Mui-focused': {
        color: theme.palette.common.white
      },
  },
  underline: {
    color: theme.palette.common.white,
  }
}));

export default function SearchBarBanesBoons(props) {
  const classes = useStyles();
  const updateTextSearch = props.updateTextSearch, textSearchVal = props.textSearchVal, handleClearSearchText = props.handleClearSearchText;

  const [powerLevel, setPowerLevel] = React.useState('');
  const [attribute, setAttribute] = React.useState('');
  const [chipData, setChipData] = React.useState([]);

  const handleChangePower = (event) => {
    setPowerLevel(event.target.value);
  }
  
  const handleChangeAttribute = (event) => {
    setAttribute(event.target.value);
  }

  const handleMouseDown = (event) => {
    event.preventDefault();
  }

  const handleSubmitAttrs = () => {
    if (attribute !== '' && powerLevel !== '') {
      setChipData([attribute, powerLevel]);
    }
  }

  

  return (
    <div className={classes.root}>
      <AppBar position='static' className={classes.appBar}>
        <Toolbar disableGutters >
          <div className={classes.search}>
            <div className={classes.searchIcon}>
              <SearchIcon />
            </div>
            <InputBase
              placeholder="Search…"
              value={textSearchVal}
              classes={{
                root: classes.inputRoot,
                input: classes.inputInput,
              }}
              inputProps={{ 'aria-label': 'search' }}
              onChange={updateTextSearch}
              endAdornment={
                <InputAdornment position='end'  >
                  <IconButton
                    className={classes.clearIconButton}
                    aria-label='clear search field'
                    onClick={handleClearSearchText}
                    onMouseDown={handleMouseDown}
                  >
                    {textSearchVal.length > 0 ? <ClearIcon />  : null}
                  </IconButton>
                </InputAdornment>
              }
            />
          </div>

          <FormControl className={classes.formControl}>
            <InputLabel className={classes.inputLabel} shrink id="attribute-select">
              Attribute
            </InputLabel>
            <Select
              labelId="attribute-select"
              id="attribute"
              value={attribute}
              onChange={handleChangeAttribute}
              displayEmpty
              className={classes.selectEmpty}
            >
              <MenuItem value="">
                <em>All</em>
              </MenuItem>
              {
                props.attributeList.map((item, index )=> {
                  return (
                    <MenuItem key={index} value={item}>{item}</MenuItem>
                  )
                })
              }
            </Select>
            <FormHelperText>Attribute with Power</FormHelperText>
          </FormControl>

          <FormControl className={classes.formControl}>
            <InputLabel className={classes.inputLabel} shrink id="power-level-select">
              Power Level
            </InputLabel>
            <Select
              labelId="power-level-select"
              id="power-level"
              value={powerLevel}
              onChange={handleChangePower}
              displayEmpty
              className={classes.selectEmpty}
            >
              <MenuItem value="">
                <em>All</em>
              </MenuItem>
              <MenuItem value={9}>9</MenuItem>
              <MenuItem value={8}>8</MenuItem>
              <MenuItem value={7}>7</MenuItem>
              <MenuItem value={6}>6</MenuItem>
              <MenuItem value={5}>5</MenuItem>
              <MenuItem value={4}>4</MenuItem>
              <MenuItem value={3}>3</MenuItem>
              <MenuItem value={2}>2</MenuItem>
              <MenuItem value={1}>1</MenuItem>
            </Select>
            <FormHelperText>Equal to or Less Than</FormHelperText>
          </FormControl>

          <IconButton
            className={classes.addIconButton}
            aria-label='submit attribute filter'
            onClick={handleSubmitAttrs}
            onMouseDown={handleMouseDown}
          >
            <AddIcon /> 
          </IconButton>

          <SearchChip 
            chipData={chipData}
            attribute={attribute} 
            powerLevel={powerLevel} 
            updateSearchParams={props.updateSearchParams}
          /> 
          
        </Toolbar>
      </AppBar>
    </div>
  )
}
