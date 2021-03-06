import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Container } from '@material-ui/core';
import Footer from '../components/Footer';

const useStyles = makeStyles(theme => ({

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
        color: '#fff',
        width: '50%',
        '@media (max-width: 780px)' : {
            fontSize: '3rem',
          }
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
            <Footer title="VentNote"/>
        </div>

    );
}

export default Home;

