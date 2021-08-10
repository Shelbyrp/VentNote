import React from 'react';

// Import the `useParams()` hook
import { useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';

import { QUERY_SINGLE_JOURNAL } from '../utils/queries';
import { Container, Grid, Typography } from '@material-ui/core';

const Singlejournal = () => {
    // Use `useParams()` to retrieve value of the route parameter `:profileId`
    const { journalId } = useParams();

    const { loading, data } = useQuery(QUERY_SINGLE_JOURNAL, {
        // pass URL parameter
        variables: { journalId: journalId },
    });

    const journal = data?.journal || {};

    if (loading) {
        return <div>Loading...</div>;
    }
    return (
        <div className="my-3">
            <Container>

                <Grid container spacing={3}>
                    <Grid item xs={12}>
                        <h3 className="card-header bg-dark text-light p-2 m-0">
                            {journal.journalAuthor} <br />
                            <span style={{ fontSize: '1rem' }}>
                                had this journal on {journal.createdAt}
                            </span>
                        </h3>
                        <div className="bg-light py-4" style={{ wordWrap: 'break-word' }}>
                            <Typography
                                className="p-4"
                                style={{
                                    fontSize: '1rem',
                                    fontStyle: 'italic',
                                    border: '2px dotted #1a1a1a',
                                    lineHeight: '1.5',
                                }}
                            >
                                {journal.journalText}
                            </Typography>
                        </div>
                    </Grid>
                </Grid>

            </Container>
        </div>
    );
};

export default Singlejournal;
