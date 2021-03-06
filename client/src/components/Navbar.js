import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import { MenuItem } from '@material-ui/core';
import logo from '../img/logo.png';
import { Link } from 'react-router-dom';

import Auth from '../utils/auth';

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
        background: '#03313d',
        position: 'sticky'
    },
    button: {
        color: '#fff',
        background: '#03313d',
    }
}));

const NavBar = () => {

    const logout = (event) => {
        event.preventDefault();
        Auth.logout();
    };

    const classes = useStyles();
    return (
        <header>
            <AppBar className={classes.MuiAppBar}>
                <Toolbar>
                    <div>
                        <Link to="/">
                            <img src={logo} alt="logo" className={classes.logo} />
                        </Link>
                    </div>
                    <div>
                        {Auth.loggedIn() ? (
                            <>
                                <MenuItem>
                                    <Link variant='h6' className={classes.title} to="/">
                                        Home
                                    </Link>
                                    <Link variant='h6' className={classes.title} to="/about">
                                        About
                                    </Link>
                                    <Link variant='h6' className={classes.title} to="/journal">
                                        Journal
                                    </Link>
                                    <Link variant='h6' className={classes.title} to="/map">
                                        Map
                                    </Link>
                                    {/* <Link variant='h6' className={classes.title} to="/play">
                                        Play
                                    </Link> */}
                                    <button color="primary" onClick={logout}>
                                        Logout

                                    </button>
                                </MenuItem>
                            </>
                        ) : (
                            <>
                                <MenuItem>
                                    <Link className={classes.title} to="/login">
                                        Login
                                    </Link>
                                    <Link className={classes.title} to="/signup">
                                        Signup
                                    </Link>
                                </MenuItem>
                            </>
                        )}

                    </div>
                </Toolbar>
            </AppBar>
        </header>
    );
};

export default NavBar;

