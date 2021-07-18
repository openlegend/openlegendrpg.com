import { createMuiTheme } from '@material-ui/core';

const darkTheme = createMuiTheme({
  palette: {
    type: 'dark',
  }
})

const lightTheme = createMuiTheme({
  palette: {
    type: 'light',
  },
})

export { darkTheme, lightTheme };
