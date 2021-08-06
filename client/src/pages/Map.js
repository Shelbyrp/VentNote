import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import hero from '../img/VNHero.png'
import { Container } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
    root: {
        display: 'flex',
    },
    Media: {
        height: '100%',
        width: '100%',
        zIndex: -10,
    },
    Container: {
        position: 'relative',
        height: '100vh',
        width: '100%',
        padding: '0px',
    },
    heading: {
        position: 'absolute',
        top: '40%',
        left: '20%',
        fontSize: '6rem',
        color: '#fff'
    }
}));

function Map() {
    const classes = useStyles();

    return (
        <div className={classes.root}>
           
            <Container disableGutters maxWidth={false} className={classes.Container}>
                <img src={hero} alt="hero" className={classes.Media} />
                <h1 className={classes.heading}>Map</h1>
            </Container>
        </div>
    );
}

export default Map;