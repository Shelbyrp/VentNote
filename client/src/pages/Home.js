import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Navbar from '../components/Navbar';
// import SideMenu from '../components/SideMenu';
// import Footer from '../components/Footer';
// import MainContent from '../components/MainContent';

const useStyles = makeStyles(theme => ({
    root: {
      display: 'flex',
    },
  }));
  
  function Home() {
    const classes = useStyles();
  
    return (
      <div className={classes.root}>
        <Navbar />
 
      </div>
    );
  }
  
  export default Home;