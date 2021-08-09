import React from 'react';
import JournalForm from '../components/JournalForm';
import { makeStyles } from '@material-ui/core/styles';
import { Grid } from "@material-ui/core";

const useStyles = makeStyles({
    gridContainer: {

    }
});


const AddJournal = () => {

    const classes = useStyles();

    return (

        <main>
            <div>
            <Grid
                container
                spacing={4}
                className={classes.gridContainer}
                justify="center"
            >
                <Grid item xs={12} sm={6} md={4}>
                    <JournalForm />
                </Grid>
            </Grid>
            </div>
        </main>
    );
};

export default AddJournal;