import React from "react";
import {
    AppBar,
    Toolbar,
    useMediaQuery,
    useScrollTrigger,
    Slide,
    Menu,
    MenuItem,
    ListItemIcon,
} from "@material-ui/core";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import { BrowserRouter, Route, Switch, Link } from "react-router-dom";
import logo from '../img/logo.png';
import Auth from '../utils/auth';
import MenuIcon from "@material-ui/icons/Menu";
import Home from '../pages/Home';
import About from '../pages/About';
import Journal from '../pages/Journal';
import Map from '../pages/Map';
// import Play from './pages/Play';
import Login from '../pages/Login';
import Signup from '../pages/Signup';
import AddJournal from '../pages/AddJournal';
import JournalEntry from '../pages/JournalEntry';

const drawerWidth = 240;

// LOCAL-STYLING
const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    appBar: {
        width: `calc(100% - ${drawerWidth}px)`,
        marginLeft: drawerWidth,
    },
    menuButton: {
        marginRight: theme.spacing(2),
        color: "#fff"
    },
    titleMobile: {
        flexGrow: 1,
        color: '#000',
        textDecoration: 'none',
        fontSize: '1rem',
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
    },
    menuToggle: {
        color: '#efefef'
    }
}));

function HideOnScroll(props) {
    const { children } = props;
    const trigger = useScrollTrigger();

    return (
        <Slide appear={false} direction={"down"} in={!trigger}>
            {children}
        </Slide>
    );
}

const Header = (props) => {
    const classes = useStyles();
    const [selected, setSelected] = React.useState(false);
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
    const handleMenu = (event) => {
        setAnchorEl(event.currentTarget);
    };
       const logout = (event) => {
        event.preventDefault();
        Auth.logout();
    };
    return (
        <div className={classes.root}>
            <HideOnScroll {...props}>
                <BrowserRouter>
                    <AppBar className={classes.MuiAppBar}>
                        <Toolbar>
                            <Link variant="h5"
                                component="p"
                                color="textSecondary"
                                className={classes.title} to="/">
                                <img src={logo} alt="logo" className={classes.logo} />
                            </Link>
                            {isMobile ? (
                                <>
                                    <iconButton
                                        color="textWhite"
                                        className={classes.menuButton}
                                        edge="start"
                                        aria-label="menu"
                                        value='checked'
                                        selected ={selected}
                                        onClick={handleMenu}
                                        onChange={() =>{
                                            setSelected(!selected);
                                        }}
                                    >
                                        <MenuIcon />
                                    </iconButton>
                                    <Menu
                                        id="menu-appbar"
                                        anchorEl={anchorEl}
                                        anchorOrigin={{
                                            vertical: "top",
                                            horizontal: "right",
                                        }}
                                        KeepMounted
                                        transformOrigin={{
                                            vertical: "top",
                                            horizontal: "right",
                                        }}
                                        open={open}
                                        className={classes.menuToggle}
                                    >
                                        <MenuItem
                                        >
                                            <ListItemIcon>
                                            </ListItemIcon>
                                            <Link variant='h6' className={classes.titleMobile} to="/">
                                                Home
                                            </Link>
                                        </MenuItem>
                                        <MenuItem
                                        >
                                            <ListItemIcon>
                                            </ListItemIcon>
                                            <Link variant='h6' className={classes.titleMobile} to="/about">
                                                About
                                            </Link>
                                        </MenuItem>
                                        <MenuItem
                                        >
                                            <ListItemIcon>
                                            </ListItemIcon>
                                            <Link variant='h6' className={classes.titleMobile} to="/journal">
                                                Journal
                                            </Link>
                                        </MenuItem>
                                        <MenuItem
                                        >
                                            <ListItemIcon>
                                            </ListItemIcon>
                                            <Link variant='h6' className={classes.titleMobile} to="/map">
                                                Map
                                            </Link>
                                        </MenuItem>
                                        <MenuItem
                                        >
                                            <ListItemIcon>
                                            </ListItemIcon>
                                            <button color="primary" onClick={logout}>
                                                Logout
                                            </button>
                                        </MenuItem>
                                    </Menu>
                                </>
                            ) : (
                                <MenuItem>
                                    <div style={{ marginRight: "2rem" }}>
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
                                        <button color="primary" onClick={logout}>
                                            Logout
                                        </button>
                                    </div>
                                </MenuItem>
                            )}
                        </Toolbar>
                    </AppBar>
                    <Switch>
                        <Route exact path='/' component={Home} />
                        <Route exact path='/about' component={About} />
                        <Route exact path='/journal' component={Journal} />
                        <Route exact path='/addjournal' component={AddJournal} />
                        <Route exact path='/journalentry' component={JournalEntry} />
                        <Route exact path='/map' component={Map} />
                        {/* <Route exact path='/play' component={Play} /> */}
                        <Route exact path='/login' component={Login} />
                        <Route exact path='/signup' component={Signup} />
                        <Route exact path="/journals/:journalId">
                            <JournalEntry />
                        </Route>
                        <Route render={() => <h1 className='display-2'>Wrong page!</h1>} />
                    </Switch>
                </BrowserRouter>
            </HideOnScroll>
        </div>
    );
};

export default Header;


// <Router>
// <Header />
// <Switch>
//   <Route exact path='/' component={Home} />
//   <Route exact path='/about' component={About} />
//   <Route exact path='/journal' component={Journal} />
//   <Route exact path='/addjournal' component={AddJournal} />
//   <Route exact path='/journalentry' component={JournalEntry} />
//   <Route exact path='/map' component={Map} />
//   <Route exact path='/play' component={Play} />
//   <Route exact path='/login' component={Login} />
//   <Route exact path='/signup' component={Signup} />
//   <Route exact path="/journals/:journalId">
//       <JournalEntry />
//     </Route>
//   <Route render={() => <h1 className='display-2'>Wrong page!</h1>} />
// </Switch>
// </Router>