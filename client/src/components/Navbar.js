import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import { MenuItem } from '@material-ui/core';
import logo from '../img/logo.png';
import { Link } from 'react-router-dom';

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
        color: '#fff',
        textDecoration: 'none',
        fontSize: '1rem',
        marginRight: theme.spacing(2),
    },
    logo: {
        maxWidth: 160,
    },
    MuiAppBar: {
        color: '#fff',
        background:'#03313d',
},
}));

function Navbar() {
    const classes = useStyles();

    return (
        <AppBar className={classes.MuiAppBar}>
            <Toolbar>
                <img src={logo} alt="logo" className={classes.logo} />
                <MenuItem>
                <Link variant='h6' className={classes.title} to="/">
                        Home
                    </Link>
                </MenuItem>
                <MenuItem>
                    <Link variant='h6' className={classes.title} to="/about">
                        About
                    </Link>
                </MenuItem>
                <MenuItem>
                <Link variant='h6' className={classes.title} to="/journal">
                        Journal
                    </Link>
                </MenuItem>
                <MenuItem>
                <Link variant='h6' className={classes.title} to="/map">
                        Map
                    </Link>
                </MenuItem>
                <MenuItem>
                <Link variant='h6' className={classes.title} to="/play">
                        Play
                    </Link>
                </MenuItem>
            </Toolbar>
        </AppBar>
    );
}

export default Navbar;