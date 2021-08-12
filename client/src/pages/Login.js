import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import { LOGIN_USER } from '../utils/mutations';
import { TextField } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Footer from '../components/Footer';
import Auth from '../utils/auth';

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


const Login = (props) => {
    const classes = useStyles();
  const [formState, setFormState] = useState({ email: '', password: '' });
  const [login, { error, data }] = useMutation(LOGIN_USER);

  // update state based on form input changes
  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormState({
      ...formState,
      [name]: value,
    });
  };

  // submit form
  const handleFormSubmit = async (event) => {
    event.preventDefault();
    console.log(formState);
    try {
      const { data } = await login({
        variables: { ...formState },
      });

      Auth.login(data.login.token);
    } catch (e) {
      console.error(e);
    }

    // clear form values
    setFormState({
      email: '',
      password: '',
    });
  };

 

  return (
    <main className="flex-row justify-center mb-4">
      <div className="col-12 col-lg-10">
        <div className="card">
          <div className="card-body">
            {data ? (
              <p>
                Success! You may now head{' '}
                <Link to="/">back to the homepage.</Link>
              </p>
            ) : (
                <form className={classes.root} onSubmit={handleFormSubmit}>
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

            {error && (
              <div className="my-3 p-3 bg-danger text-white">
                {error.message}
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
};

export default Login;
