import React from 'react';

import { fade, makeStyles } from '@material-ui/core/styles';

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography';
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
import { searchParams } from '../../utils/searchParams';

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
    root: {
      '&:focused': {
        color: theme.palette.common.white

      }
    }
  },
  formTitle: {
    marginRight: '16px',
  }
}));

export default function SearchBarFeats(props) {
  const classes = useStyles();
  const updateTextSearch = props.updateTextSearch, textSearchVal = props.textSearchVal, handleClearSearchText = props.handleClearSearchText;

  const [comparison, setComparison] = React.useState('');
  const [cost, setCost] = React.useState('');

  const handleChangeComparison = (event) => {
    setComparison(event.target.value);
  }
  
  const handleChangeCost = (event) => {
    setCost(event.target.value);
  }

  const handleMouseDown = (event) => {
    event.preventDefault();
  }

  const handleSubmitComparison = () => {
    if (cost !== '' && comparison !== '') {
      searchParams(comparison, cost, props.updateSearchParams)
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
          <Typography variant='h6' className={classes.formTitle}>Cost Is:    </Typography>
          <FormControl className={classes.formControl}>
            <InputLabel className={classes.inputLabel} shrink id="cost-select">
            </InputLabel>
            <Select
              labelId="cost-select"
              id="cost"
              value={cost}
              onChange={handleChangeCost}
              displayEmpty
              className={classes.selectEmpty}
            >
              <MenuItem value="">
                <em>All</em>
              </MenuItem>
              <MenuItem value={1}>1</MenuItem>
              <MenuItem value={2}>2</MenuItem>
              <MenuItem value={3}>3</MenuItem>
              <MenuItem value={4}>4</MenuItem>
            </Select>
            <FormHelperText>Attribute with Power</FormHelperText>
          </FormControl>

          <FormControl className={classes.formControl}>
            <InputLabel className={classes.inputLabel} shrink id="power-level-select">
            </InputLabel>
            <Select
              labelId="power-level-select"
              id="power-level"
              value={comparison}
              onChange={handleChangeComparison}
              displayEmpty
              className={classes.selectEmpty}
            >
              <MenuItem value="">
                <em>All</em>
              </MenuItem>
              <MenuItem value={'or Greater'}>or Greater</MenuItem>
              <MenuItem value={'Exactly'}>Exactly</MenuItem>
              <MenuItem value={'or Less'}>or Less</MenuItem>
            </Select>
            <FormHelperText>Feat Cost Comparison</FormHelperText>
          </FormControl>

          <IconButton
            className={classes.addIconButton}
            aria-label='submit attribute filter'
            onClick={handleSubmitComparison}
            onMouseDown={handleMouseDown}
          >
            <AddIcon /> 
          </IconButton>
          
        </Toolbar>
      </AppBar>
    </div>
  )

}
