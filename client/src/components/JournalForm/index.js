import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import TextareaAutosize from '@material-ui/core/TextareaAutosize';
import { makeStyles } from '@material-ui/core/styles';

import { ADD_JOURNAL } from '../../utils/mutations';
import { QUERY_JOURNALS, QUERY_ME } from '../../utils/queries';

import Auth from '../../utils/auth';

const useStyles = makeStyles(theme => ({
  root: {
    errorMessage: {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center'
    }
  }
}));

const JournalForm = () => {
  const classes = useStyles();
  const [journalText, setJournalText] = useState('');
  // const [journalTitle, setJournalTitle] = useState('');
  const [characterCount, setCharacterCount] = useState(0);

  const [addJournal, { error }] = useMutation(ADD_JOURNAL, {
    update(cache, { data: { addJournal } }) {
      try {
        const { journals } = cache.readQuery({ query: QUERY_JOURNALS });

        cache.writeQuery({
          query: QUERY_JOURNALS,
          data: { journals: [addJournal, ...journals] },
        });
      } catch (e) {
        console.error(e);
      }

      // update me object's cache
      const { me } = cache.readQuery({ query: QUERY_ME });
      cache.writeQuery({
        query: QUERY_ME,
        data: { me: { ...me, journals: [...me.journals, addJournal] } },
      });
    },
  });

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    try {
      const { data } = await addJournal({
        variables: {
          // journalTitle,
          journalText,
          journalAuthor: Auth.getProfile().data.username,
        },
      });

      // setJournalTitle('');
      setJournalText('');
    } catch (err) {
      window.location.href = '/journal';
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;

    if (name === 'journalText' && value.length <= 500) {
      setJournalText(value);
      setCharacterCount(value.length);
    } 

    // if (name === 'journalTitle' && value.length <= 100) {
    //   setJournalTitle(value);
    //   setCharacterCount(value.length);
    // } 
  };

  return (
    <div>
      <h3>What latest experience do you want to record?</h3>

      {Auth.loggedIn() ? (
        <>
          <p
            className={`m-0 ${characterCount === 500 || error ? 'text-danger' : ''
              }`}
          >
            Character Count: {characterCount}/500
          </p>
          <form
            className={classes.root} onSubmit={handleFormSubmit}
          >
            {/* <TextareaAutosize
              name="journalTitle"
              placeholder="Here's a new journal entry"
              value={journalTitle}
              // required
              className="form-input w-200"
              style={{ lineHeight: '1.5', resize: 'vertical' }}
              onChange={handleChange}
            ></TextareaAutosize> */}
            <TextareaAutosize
              name="journalText"
              placeholder="Here's a new journal..."
              value={journalText}
              required
              className="form-input w-500"
              style={{ lineHeight: '1.5', resize: 'vertical' }}
              onChange={handleChange}
            ></TextareaAutosize>
            <div className="col-12 col-lg-3">
              <button className="btn btn-primary btn-block py-3" type="submit">
                Add Journal
              </button>
            </div>
            {/* {error && (
              <div className="col-12 my-3 bg-danger text-white p-3">
                {error.message}
              </div>
            )} */}
          </form>
        </>
      ) : (
        <p>
          You need to be logged in to share your journals. Please{' '}
          <Link to="/login">login</Link> or <Link to="/signup">signup.</Link>
        </p>
      )}
    </div>
  );
};

export default JournalForm;


