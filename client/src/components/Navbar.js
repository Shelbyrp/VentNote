import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { MenuItem } from '@material-ui/core';
import logo from '../img/logo.png';


const drawerWidth = 240;

const useStyles = makeStyles(theme => ({
  appBar: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  logo: {
    maxWidth: 160,
  },
}));

function Navbar() {
  const classes = useStyles();

  return (
    <AppBar>
      <Toolbar>
         <img src={logo} alt="logo" className={classes.logo} />
        <MenuItem>
          <Typography variant='h6' className={classes.title}>
            Home
          </Typography>
        </MenuItem>
        <MenuItem>
          <Typography variant='h6' className={classes.title}>
            About
          </Typography>
        </MenuItem>
        <MenuItem>
          <Typography variant='h6' className={classes.title}>
            Map
          </Typography>
                  </MenuItem>
                  <MenuItem>
          <Typography variant='h6' className={classes.title}>
            Journal
          </Typography>
          </MenuItem>
          <MenuItem>
          <Typography variant='h6' className={classes.title}>
            Play
          </Typography>
        </MenuItem>
      </Toolbar>
    </AppBar>
  );
}

export default Navbar;