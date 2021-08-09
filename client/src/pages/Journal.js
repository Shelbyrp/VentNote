import React from 'react';
import { useQuery } from '@apollo/client';

import JournalList from '../components/JournalList';
import { Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

import { QUERY_JOURNALS } from '../utils/queries';

const useStyles = makeStyles({
    gridContainer: {
        paddingLeft: "40px",
        paddingRight: "40px",
        // marginTop: '150px'
    }
});

const Journal = () => {
    const classes = useStyles();
    const { loading, data } = useQuery(QUERY_JOURNALS);
    const journals = data?.journals || [];

    return (
        <main>
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
