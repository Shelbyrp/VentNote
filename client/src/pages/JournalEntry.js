import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
// Import the `useParams()` hook
import { useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import Footer from '../components/Footer';
import { QUERY_SINGLE_JOURNAL } from '../utils/queries';
import { Container, Grid, Typography } from '@material-ui/core';
import Box from '@material-ui/core/Box';


const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    appBar: {
        backgroundColor: "#fff"
    },
    hero: {
        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url('https://images.unsplash.com/photo-1440778303588-435521a205bc?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80')`,
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
    container: {
        background: "#efefef"
    },
    textarea: {
        background: '#fff',
        padding: '2px'
    }
}));

const Singlejournal = () => {
    // Use `useParams()` to retrieve value of the route parameter `:profileId`
    const { journalId } = useParams();

    const { loading, data } = useQuery(QUERY_SINGLE_JOURNAL, {
        // pass URL parameter
        variables: { journalId: journalId },
    });

    const journal = data?.journal || {};
    const classes = useStyles();

    if (loading) {
        return <div>Loading...</div>;
    }
    return (
        <div className="my-3">
            <Container className={classes.background}>
            <Box className={classes.hero}>
                <Box>{journal.journalTitle}</Box>
            </Box>
                <Grid container spacing={3}>
                    <Grid item xs={12}>
                        <h2>
                            {journal.journalAuthor} <br />
                            <span style={{ fontSize: '1rem' }}>
                                added this journal on {journal.createdAt}
                            </span>
                        </h2>
                        <div className="bg-light py-4" style={{ wordWrap: 'break-word' }}>
                            <Typography
                                className={classes.textarea}
                                style={{
                                    fontSize: '1rem',
                                    fontStyle: 'italic',
                                    lineHeight: '1.5',
                                    border: '2px solid'
                                }}
                            >
                                {journal.journalText}
                            </Typography>
                        </div>
                    </Grid>
                </Grid>
          
            </Container>
            <Footer title="VentNote"/>
        </div>
    );
};

export default Singlejournal;
