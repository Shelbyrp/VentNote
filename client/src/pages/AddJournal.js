import React from 'react';
import JournalForm from '../components/JournalForm';
import { makeStyles } from '@material-ui/core/styles';
import { Grid } from "@material-ui/core";
import Footer from '../components/Footer';

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
                className={classes.gridContainer}
                justify="center"
            >
                <Grid item xs={12} sm={6} md={4}>
                    <JournalForm />
                </Grid>
            </Grid>
            <Footer title="VentNote"/>
            </div>
        </main>
    );
};

export default AddJournal;