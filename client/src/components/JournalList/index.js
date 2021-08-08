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
    }
}));

const JournalList = ({
    journals,
    title,
    showTitle = true,
    showUsername = true,
}) => {

    const classes = useStyles();
    if (!journals.length) {
        return <h3>No Journals Yet</h3>;
    }

    return (
        <div className="App">
            <Container maxWidth="lg" className={classes.blogsContainer}>
                <Typography variant="h4" className={classes.blogTitle}>
                    Your Experiences
                </Typography>
                <Grid container spacing={3}>
                    <Grid item xs={12} sm={6} md={4}>
                        {journals && journals.map((journal) => (
                            <Card className={classes.root}>
                                <CardActionArea>
                                    {/* <CardMedia
                                        className={classes.media}
                                        image="/static/images/cards/contemplative-reptile.jpg"
                                        title="Contemplative Reptile"
                                    /> */}
                                    <CardContent>
                                        <Typography gutterBottom variant="h5" component="h2">
                                        </Typography>
                                        <Typography variant="body2" color="textSecondary" component="p">
                                            {showUsername ? (
                                                <Link
                                                    className="text-light"
                                                    to={`/profiles/${journal.journalAuthor}`}
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
                                        <Typography>
                                            <div className="card-body bg-light p-2">
                                                <p>{journal.journalText}</p>
                                            </div>
                                        </Typography>
                                    </CardContent>
                                </CardActionArea>
                                <CardActions>
                                    <Button size="small" color="primary">
                                        Share
                                    </Button>
                                    <Button size="small" color="primary">
                                        Learn More
                                    </Button>
                                </CardActions>
                            </Card>
                        ))}
                    </Grid>
                </Grid>
            </Container>
        </div>
    );
};

export default JournalList;


