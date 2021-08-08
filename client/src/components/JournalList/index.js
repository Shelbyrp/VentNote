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

const useStyles = makeStyles({
    root: {
        maxWidth: 600,
        
    },
    media: {
        height: 140,
    },
});

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
        <div className={classes.root}>
            {showTitle && <h3>{title}</h3>}
            {journals && journals.map((journal) => (
                <Card className={classes.root}>

                    <CardActionArea>
                        <CardMedia
                            className={classes.media}
                            image="/static/images/cards/contemplative-reptile.jpg"
                            title="Contemplative Reptile"
                        />
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
                                            had this journal on {journal.createdAt}
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
                                <Link
                                    className="btn btn-primary btn-block btn-squared"
                                    to={`/journals/${journal._id}`}
                                >
                                    Join the discussion on this journal.
                                </Link>
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
        </div>
    );
};

export default JournalList;


