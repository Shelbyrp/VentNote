import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
// import hero from '../img/VNHero.png'
import { TextField } from '@material-ui/core';


import { Link } from 'react-router-dom';

import { useMutation } from '@apollo/client';
import { ADD_USER } from '../utils/mutations';

import Auth from '../utils/auth';
// import Typography from '@material-ui/core/Typography';




const useStyles = makeStyles(theme => ({
    root: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        paddingTop: '150px',
        padding: theme.spacing(6),
        '& .MuiTextField-root': {
            margin: theme.spacing(1),
            width: '300px',
        },
        '& .MuiButtonBase-root': {
            margin: theme.spacing(2),
        },
        errorMessage: {
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center'
        }
    }
}));

function Signup() {
    const classes = useStyles();

    const [formState, setFormState] = useState({
        username: '',
        email: '',
        password: '',
    });
    const [addUser, { error, data }] = useMutation(ADD_USER);

    const handleChange = (event) => {
        const { name, value } = event.target;

        setFormState({
            ...formState,
            [name]: value,
        });
    };

    const handleFormSubmit = async (event) => {
        event.preventDefault();
        console.log(formState);

        try {
            const { data } = await addUser({
                variables: { ...formState },
            });

            Auth.login(data.addUser.token);
        } catch (e) {
            console.error(e);
        }
    };


    return (
        <main className="flex-row justify-center mb-4">
      <div className="col-12 col-lg-10">
        <div className="card">
          <h4 >Sign Up</h4>
          <div className="card-body">
            {data ? (
              <p>
                Success! You may now head{' '}
                <Link to="/">back to the homepage.</Link>
              </p>
            ) : (
        <form className={classes.root} onSubmit={handleFormSubmit}>
            <TextField
                label="Username"
                variant="filled"
                name="username"
                type="text"
                value={formState.name}
                onChange={handleChange} />
            <TextField
                label="Email"
                variant="filled"
                name="email"
                type="email"
                value={formState.email}
                onChange={handleChange} />
            <TextField
                placeholder="******"
                label="Password"
                name="password"
                type="password"
                value={formState.password}
                onChange={handleChange} />
            <div>
            <button
                  className="btn btn-block btn-primary"
                  style={{ cursor: 'pointer' }}
                  type="submit"
                >
                  Submit
                </button>
            </div>
        </form>
        )}
<div className={classes.root}>{error && (
          <div >
            {error.message}
          </div>
        )}</div>
        </div>
      </div>
    </div>
</main>
    );
}

export default Signup;