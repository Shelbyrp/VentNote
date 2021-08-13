import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Footer from '../components/Footer';

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    appBar: {
        backgroundColor: "#fff"
    },
    hero: {
        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url('https://images.unsplash.com/photo-1504317083653-6843c8aa144f?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1189&q=80')`,
        height: "400px",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        position: "relative",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        color: "#fff",
        fontSize: "4rem",
        [theme.breakpoints.down("sm")]: {
            height: 300,
            fontSize: "3em"
        }
    },
    blogsContainer: {
        paddingTop: theme.spacing(3)
    },
    blogTitle: {
        fontWeight: 800,
        paddingBottom: theme.spacing(3)
    },
    card: {
        maxWidth: "100%",
    },
    media: {
        height: 240
    },
    cardActions: {
        display: "flex",
        margin: "0 10px",
        justifyContent: "space-between"
    },
    author: {
        display: "flex"
    },
    paginationContainer: {
        display: "flex",
        justifyContent: "center"
    },
    Typography: {
        padding: theme.spacing(2),
        textAlign: 'center',
        color: theme.palette.text.secondary,
    },
}));

function About() {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <Box className={classes.hero}>
                <Box>About VentNote</Box>
            </Box>
            <Container maxWidth="lg" className={classes.blogsContainer}>
                <Grid container spacing={3}>
                    {/* <Grid item xs={6}>
                    <img src='https://images.unsplash.com/photo-1523240795612-9a054b0db644?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80' width="600" height="372" />
                    </Grid> */}
                    <Grid item xs={12}>
                         <h2 className={classes.paper}>What is VentNote?</h2>
                        <Typography className={classes.paper}>
                        VentNote allows users to capture experiences on the go. <br /><br />Once opened and logged in, VentNote will find your location, whether you’re offline or in service, allow you to enter the details of the adventure, add an image and save it to be reviewed at a later date or shared with others. VentNote, allows adventurers to view their entries in a timeline format or on a map view that shows all the pins of the previous experiences. <br /><br />Wander Out Yonder Inc have also incorporated a game to help pass the hours travelling that might be involved in your next adventure.
                        </Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <h2 className={classes.paper}>
                          About Wander Out Yonder Inc.
                        </h2>
                    </Grid>
                    <Grid item xs={12}>
                        <Typography className={classes.paper}>
                        Wander Out Yonder Inc is a Western Australian based agency of developers passionate about encouraging new experiences and promoting a community of like minded people. VentNote is their flagship product which will fit into a larger adventuring framework.
                        </Typography>
                    </Grid>
                </Grid>
            </Container>
            <Footer title="VentNote"/>
        </div >
    );
}

export default About;

