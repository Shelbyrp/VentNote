import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Navbar from '../components/Navbar';
import hero from '../img/logo.png'
import { Container } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
    root: {
      display: 'flex',
    },
    Media: {
        height: '100%',
        width: '100%'
      }
  }));
  
  function Home() {
    const classes = useStyles();
  
    return (
      <div className={classes.root}>
        <Navbar />
        <Container>
        <img src={hero} alt="hero" className={classes.Media} />
        </Container>
      </div>
    );
  }
  
  export default Home;