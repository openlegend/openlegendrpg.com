import { createMuiTheme } from '@material-ui/core/styles';

const darkTheme = createMuiTheme({
  palette: {
    type: 'dark',
    primary: {
      light: '#8a6dd2',
      main: '#5941a0',
//      dark: '#6b4ec1', was this, changed to below to try and fix ToC of the Core Rules to be liek Banes/Boons/Feats
      dark: '#b388ff',
    },
    secondary: {
      main: '#8a6dd2'
    },
    info: {
      main: '#ee98fb',
      dark: '#8a6dd2'
    },
    warning: {
      light: '#757575',
      // was #ffb74d, changed to 70% transparant
      main: 'rgba(255,183,77,0.70)',
      dark: 'rgba(255,183,77,0.70)'
    },
    success: {
      main: '#b388ff',
    }
  }
})

const lightTheme = createMuiTheme({
  palette: {
    type: 'light',
    // Purples for main color scheme
    primary: {
      light: '#8a6dd2',
      main: '#5941a0',
      dark: '#522da8',
    },
    secondary: {
      // Purple for background of h2s
      main: '#3227b0'
    },
    warning: {
      // Color for odd table rows
      light: '#fafafa',
      // Yellow color for tables
      main: '#ffe6cc',
      // Yellow for darker single line tables
      dark: '#f9cb9c',
    },
    info: {
      //Color for the page links in core rules
      main: '#9e7bf4',
    },
      // Color for table of contents links
    success: {
      main: '#522da8',
    }
  },
})

export { darkTheme, lightTheme };
