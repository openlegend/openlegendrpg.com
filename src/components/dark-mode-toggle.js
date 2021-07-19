import React, { useContext } from 'react';

import { darkModeContext } from '../components/UI/ThemeHandler';

import { makeStyles, withStyles } from '@material-ui/core/styles';
import FormContolLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import Brightness7Icon from '@material-ui/icons/Brightness7';
import Brightness2Icon from '@material-ui/icons/Brightness2';

const useStyles = makeStyles(({
  container: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: '16px',
  },
  icons: {
  },
  formControl: {
    marginRight: 0,
    marginLeft: '4px',
  }
}));

const PurpleSwitch = withStyles({
  switchBase: {
    color: '#5941a0',
    '&$checked': {
      color: '#5941a0',
    },
    '&$checked + $track': {
      backgroundColor: '#8a6dd2',
    },
  },
  checked: {},
  track: {},
})(Switch);


export default function DarkModeToggle() {
  const classes = useStyles();

  const DarkModeContext = useContext(darkModeContext);
  const { darkMode, setDarkMode } = DarkModeContext;

  const handleThemeChange = () => {
    if (darkMode) {
      localStorage.setItem('preferred-theme', 'light');
      setDarkMode(false);
    } else {
      localStorage.setItem('preferred-theme', 'dark');
      setDarkMode(true);
    }
  }

  return (
    <div className={classes.container}>
      <Brightness7Icon className={classes.icons} /> 
      <FormContolLabel 
        className={classes.formControl}
        control={
          <PurpleSwitch 
            checked={darkMode}
            onChange={handleThemeChange}
            color='default'
            name='darkMode'
            inputProps={{ 'aria-label': 'Dark Mode Toggle'}}
          />
        }
      />
      <Brightness2Icon className={classes.icons} style={{ color: `${darkMode ? '#6b4ec1' : 'white'}` }}  /> 
    </div>
  )
}
