import React from 'react';

import PropTypes from 'prop-types';

import AppMenu from '../components/app-menu';
import Image from '../img/paper_bg.png';
import OpenLegendFooter from '../components/open-legend-footer';

import Drawer from '@material-ui/core/Drawer';
import Hidden from '@material-ui/core/Hidden';
import IconButton from '@material-ui/core/IconButton';

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { makeStyles, useTheme } from '@material-ui/core/styles';

import MenuIcon from '@material-ui/icons/Menu';

const drawerWidthSm = 316;

const useStyles = makeStyles((theme) => ({
  root: { 
    [theme.breakpoints.up('lg')]: {
      display: 'flex',
    }
  },
  drawer: {
    [theme.breakpoints.up('md')]: {
      width: drawerWidthSm,
      flexShrink: 0,
    },
  },
  appBar: {
    position: 'fixed',
    backgroundColor: 'rgb(81,45,168)',
    margin: 0,
    [theme.breakpoints.up('lg')]: {
      display: 'none',
    },
  },
  menuButton: {
    marginRight: theme.spacing(2),
    [theme.breakpoints.up('lg')]: {
      display: 'none',
    },
  },
  toolbarTypography:{
    [theme.breakpoints.up('lg')]: {
      display: 'none',
    },
  },
  // necessary for content to be below app bar
  toolbar: theme.mixins.toolbar,
  drawerPaper: {
    width: drawerWidthSm,
    whiteSpace: 'nowrap',
    paddingTop: theme.spacing(1),
    paddingBottom: theme.spacing(1),
    color: 'rgba(255,255,255,1.0)',
    backgroundColor: 'rgb(66,66,66)',
  },
  content: {
    flexGrow: 1,
    display: 'block',
    minHeight: '100%',
    position: 'relative',
    backgroundImage: `url(${Image})`,
    [theme.breakpoints.down('md')]: {
      marginTop: '56px',
    },
  },
  appMenu: {
    height: 'auto'
  }
}));

function ResponsiveNavBar(props) {
  const { window } = props;
  const footerForIndex = props.footerForIndex;
  const classes = useStyles();
  const theme = useTheme();
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const container = window !== undefined ? () => window().document.body : undefined;

  return (
    <div className={classes.root} >
      <AppBar className={classes.appBar}>
        <Toolbar className={classes.toolbar}>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            className={classes.menuButton}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap className={classes.toolbarTypography}>
            Open Legend
          </Typography>
        </Toolbar> 
      </AppBar>
      <nav className={classes.drawer} aria-label='links'>
        <Hidden mdUp implementation="css">
          <Drawer
            container={container}
            variant="temporary"
            anchor={theme.direction === 'rtl' ? 'right' : 'left'}
            open={mobileOpen}
            onClose={handleDrawerToggle}
            classes={{
              paper: classes.drawerPaper,
            }}
            ModalProps={{
              keepMounted: true, // Better open performance on mobile.
            }}
          >
            <AppMenu className={classes.appMenu} /> 
          </Drawer>
        </Hidden>
        <Hidden mdDown implementation="css">
          <Drawer
            classes={{
              paper: classes.drawerPaper,
            }}
            variant="permanent"
            open
          >
            <AppMenu className={classes.appMenu}  />  
          </Drawer>
        </Hidden>
      </nav>
      <main className={classes.content}>
        {props.children}
        {!footerForIndex ? <OpenLegendFooter /> : null}
      </main>
    </div>
  );
}

ResponsiveNavBar.propTypes = {
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window: PropTypes.func,
};

export default ResponsiveNavBar;
