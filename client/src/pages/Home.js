import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import hero from '../img/VNHero.png'
import { Container } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
    root: {
        display: 'flex',
    },
    hero: {
        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url('https://images.unsplash.com/photo-1511225070737-5af5ac9a690d?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80')`,
        height: "100vh",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        position: "relative",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        color: "#fff"
    },
    
    heading: {
        position: 'absolute',
        top: '30%',
        left: '15%',
        fontSize: '6rem',
        color: '#fff'
    }
}));

function Home() {
    const classes = useStyles();

    return (
        <div className={classes.root}>

            <Container disableGutters maxWidth={false} className={classes.Container}>
                <div className={classes.hero} />
                <h1 className={classes.heading}>Adventures Worth Noting</h1>
            </Container>
        </div>
    );
}

export default Home;

