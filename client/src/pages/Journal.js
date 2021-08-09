import React from 'react';
import { useQuery } from '@apollo/client';

import JournalList from '../components/JournalList';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';

import { QUERY_JOURNALS } from '../utils/queries';

const useStyles = makeStyles((theme) => ({
    gridContainer: {
        paddingLeft: "40px",
        paddingRight: "40px",
        // marginTop: '150px'
    },
    blogsContainer: {
        paddingTop: theme.spacing(3)
    },
}));

const Journal = () => {
    const classes = useStyles();
    const { loading, data } = useQuery(QUERY_JOURNALS);
    const journals = data?.journals || [];

    return (
        <main>
               <Container maxWidth="lg" className={classes.blogsContainer}>
            <Button variant="contained" color="primary" href="/addjournal">
                Add Journal
            </Button>
            {loading ? (
                <div>Loading...</div>
            ) : (
                <JournalList
                    journals={journals}
                    title="Some Journals"
                />
            )}
            </Container>
        </main>
    );
};

export default Journal;


// {loading ? (
//     <div>Loading...</div>
//   ) : (
//     <JournalList
//       journals={journals}
//       title="Some Journals"
//     />
//   )}

//   <div>
//   <Link className="text-light" to="/addjournal">
//      Add Journal
//   </Link>
// </div>
