import React from 'react';

import { Link } from 'gatsby';

import { makeStyles, createStyles } from '@material-ui/core/styles'

import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import Divider from '@material-ui/core/Divider'
import Collapse from '@material-ui/core/Collapse'

import IconExpandLess from '@material-ui/icons/ExpandLess'
import IconExpandMore from '@material-ui/icons/ExpandMore'

const useStyles = makeStyles(theme =>
  createStyles({
    menuItem: {
      paddingTop: theme.spacing(0),
    },
    menuItemIcon: {
      color: 'white',
    },
    linkWrapper: {
      backgroundColor: 'rgb(66,66,66)',
      textDecoration: 'inherit',
      color: 'inherit',
      display: 'flex',
    },
  }),
);

const AppMenuItem = props => {
  const { name, Icon, link, linkType, items = [], menuOpen } = props;
  const classes = useStyles()
  const isExpandable = items && items.length > 0 
  const [open, setOpen] = React.useState(false);

  function handleClick(){
    setOpen(!open);
    menuOpen(name);
  }  

  let MenuItemRoot;

  if(linkType !== undefined && linkType === 'internal') {
    MenuItemRoot = (
      <ListItem button className={classes.menuItem} component={Link} to={link}>
        {/* Display an icon if any */}
        {!!Icon && (
          <ListItemIcon className={classes.menuItemIcon}>
            <Icon />
          </ListItemIcon>
        )}
        <ListItemText primary={name} inset={!Icon} />
        {/* Display the expand menu if the item has children */}
        {isExpandable && !open && <IconExpandMore />}
        {isExpandable && open && <IconExpandLess />}
      </ListItem>
    )
  } else if(linkType !== undefined && linkType === 'external') {
    MenuItemRoot = (
      <a href={link} className={classes.linkWrapper}>
        <ListItem button className={classes.menuItem}>
          {/* Display an icon if any */}
          {!!Icon && (
            <ListItemIcon className={classes.menuItemIcon}>
              <Icon />
            </ListItemIcon>
          )}
          <ListItemText primary={name} inset={!Icon} />
          {/* Display the expand menu if the item has children */}
          {isExpandable && !open && <IconExpandMore />}
          {isExpandable && open && <IconExpandLess />}
        </ListItem>
      </a>
    )
  } else {
    MenuItemRoot = (
      <ListItem button className={classes.menuItem} onClick={handleClick}>
        {/* Display an icon if any */}
        {!!Icon && (
          <ListItemIcon className={classes.menuItemIcon}>
            <Icon />
          </ListItemIcon>
        )}
        <ListItemText primary={name} inset={!Icon} />
        {/* Display the expand menu if the item has children */}
        {isExpandable && !open && <IconExpandMore />}
        {isExpandable && open && <IconExpandLess />}
      </ListItem>
    )
  }

  const MenuItemChildren = isExpandable ? (
    <Collapse in={open} timeout="auto" unmountOnExit>
      <Divider />
      <List component="div" disablePadding>
        {items.map((item, index) => (
          <AppMenuItem {...item} key={index} />
        ))}
      </List>
    </Collapse>
  ) : null


  return (
    <>
      {MenuItemRoot}
      {MenuItemChildren}
    </>
  )
}

export default AppMenuItem
