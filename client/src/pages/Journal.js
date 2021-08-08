import React from 'react';
import { useQuery } from '@apollo/client';

import JournalList from '../components/JournalList';
import { Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import { Grid } from "@material-ui/core";

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

            <Grid
                container
                spacing={4}
                className={classes.gridContainer}
                justify="center"
            >
                <Grid item xs={12} sm={6} md={4}>
                    <Link className="text-light" to="/addjournal">
                        Add Journal
                    </Link>
                    {loading ? (
                        <div>Loading...</div>
                    ) : (
                        <JournalList
                            journals={journals}
                            title="Some Journals"
                        />
                    )}
                </Grid>
            </Grid>
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