import React from 'react';
import { Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';


const useStyles = makeStyles((theme) => ({
    appBar: {
        backgroundColor: "#fff"
    },
    blogsContainer: {
        paddingTop: theme.spacing(3),
    },
    blogTitle: {
        fontWeight: 800,
        paddingBottom: theme.spacing(3)
    },
    card: {
        maxWidth: "100%",
        margin: "10px 10px",
        background: "#efefef"
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
    journalText: {
        display: "flex",
        flex: 'wrap'
    }
}));

const JournalList = ({
    journals,
    title,
    showTitle = true,
    showUsername = true,
}) => {

    const classes = useStyles();

    return (
        <div>
            <Container maxWidth="lg" className={classes.blogsContainer}>
                <Typography variant="h4" className={classes.blogTitle}>
                    Your Experiences
                </Typography>
                <Grid container spacing={3}>
                    {/* <Grid item xs={12} sm={6} md={4}> */}
                    {journals && journals.map((journal) => (
                        <Card className={classes.card}>
                            <CardActionArea>
                                <CardMedia
                                    className={classes.media}
                                    image="https://images.unsplash.com/photo-1440778303588-435521a205bc?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
                                    title="Holiday"
                                />
                                <CardContent>
                                    <Typography variant="body2" color="textSecondary" component="p">
                                        {showUsername ? (
                                            <Link
                                                to={`/profiles/${journal.journalAuthor}`}
                                                style={{ color: '#000', textDecoration: 'none' }}
                                            >
                                                {journal.journalAuthor} <br />
                                                <span style={{ fontSize: '1rem' }}>
                                                    {journal.createdAt}
                                                </span>
                                            </Link>
                                        ) : (
                                            <>
                                                <span style={{ fontSize: '1rem' }}>
                                                    You had this journal on {journal.createdAt}
                                                </span>
                                            </>
                                        )}
                                    </Typography>
                                    <Typography >
                                        <div>
                                        <h4>Location: {journal.journalAddress}</h4>
                                         <h4>{journal.journalTitle}</h4>
                                        </div>
                                        <div className={classes.journalText} style={{ overflow: "hidden", textOverflow: "ellipsis", width: '16rem' }}>
                                            <p>{journal.journalText}</p>
                                        </div>
                                    </Typography>
                                </CardContent>
                            </CardActionArea>
                            <CardActions    style={{ background: '#000' }}>
                                <Link
                                    size="small" 
                                    to={`/journals/${journal._id}`}
                                    style={{ color: '#fff', textDecoration: 'none' }}
                                >
                                    Read More
                                </Link>
                            </CardActions>
                        </Card>
                    ))}
                </Grid>
                {/* </Grid> */}
            </Container>
        </div>
    );
};

export default JournalList;


