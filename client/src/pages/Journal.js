import React from 'react';
import { useQuery } from '@apollo/client';
import Footer from '../components/Footer';
import JournalList from '../components/JournalList';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';

import { QUERY_JOURNALS } from '../utils/queries';

const useStyles = makeStyles((theme) => ({
    gridContainer: {
        paddingLeft: "40px",
        paddingRight: "40px",
    },
    blogsContainer: {
        paddingTop: theme.spacing(3),
        marginBottom: '50px'
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
            <Footer title="VentNote" />
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
