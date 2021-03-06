import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import TextareaAutosize from '@material-ui/core/TextareaAutosize';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { ADD_JOURNAL } from '../../utils/mutations';
import { QUERY_JOURNALS, QUERY_ME } from '../../utils/queries';
import { TextField } from '@material-ui/core';
import Auth from '../../utils/auth';
import Button from '@material-ui/core/Button';
import Geocode from "react-geocode";

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'left',
    alignItems: 'left',
    padding: theme.spacing(2),
    '& .MuiTextField-root': {
      margin: theme.spacing(1),
      width: '90%',
    },
    '& .MuiButtonBase-root': {
      margin: theme.spacing(2),
    }
  },
  input: {
    width: '90%',
    fontSize: '1rem',
    fontStyle: 'italic'
  },
  blogsContainer: {
    paddingTop: theme.spacing(3),
    marginBottom: '80px'
  },
  hiddenScroll: {
    overflow: 'hidden'
  }

}));

const JournalForm = () => {
  const classes = useStyles();
  const [journalText, setJournalText] = useState('');
  const [journalTitle, setJournalTitle] = useState('');
  const [journalAddress, setQuery] = useState('');
  const [journalLatLng, setJournalLatLng] = useState({ lat: 0, lng: 0 });
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
      await addJournal({
        variables: {
          journalTitle,
          journalAddress,
          journalLatLng,
          journalText,
          journalAuthor: Auth.getProfile().data.username,
        },
      });
      setJournalTitle('');
      setQuery('');
      setJournalLatLng('');
      setJournalText('');
    } catch (err) {
      window.location.href = '/journal';
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;

    if (name === 'journalTitle') {
      setJournalTitle(value);
    }

    if (name === 'journalText' && value.length <= 500) {
      setJournalText(value);
      setCharacterCount(value.length);
    }

  };

  let autoComplete;

  const loadScript = (url, callback) => {
    let script = document.createElement("script");
    script.type = "text/javascript";

    if (script.readyState) {
      script.onreadystatechange = function () {
        if (script.readyState === "loaded" || script.readyState === "complete") {
          script.onreadystatechange = null;
          callback();
        }
      };
    } else {
      script.onload = () => callback();
    }

    script.src = url;
    document.getElementsByTagName("head")[0].appendChild(script);
  };

  function handleScriptLoad(updateQuery, updateJournalLatLng, autoCompleteRef) {
    autoComplete = new window.google.maps.places.Autocomplete(
      autoCompleteRef.current,
      { types: ["(cities)"] }
    );
    autoComplete.setFields(["address_components", "formatted_address"]);
    autoComplete.addListener("place_changed", () =>
      handlePlaceSelect(updateQuery, updateJournalLatLng)
    )
  }

  async function handlePlaceSelect(updateQuery, updateJournalLatLng) {
    const addressObject = autoComplete.getPlace();
    const query = addressObject.formatted_address;
    updateQuery(query);
    getCoordinates(updateJournalLatLng, query);
  }

  async function getCoordinates(updateJournalLatLng, query) {
    Geocode.setApiKey("AIzaSyCLD89y6zAJjP2lxnmtni5-ck-311J_Rk4");
    Geocode.setLanguage("en");
    Geocode.setRegion("es");
    Geocode.setLocationType("ROOFTOP");
    Geocode.enableDebug();
    await Geocode.fromAddress(query).then(
      (response) => {
        const { lat, lng } = response.results[0].geometry.location;
        document.getElementById("latitude").innerHTML = "Lat: " + lat;
        document.getElementById("longitude").innerHTML = "Lng: " + lng;
        setJournalLatLng({ lat: lat, lng: lng });
        return response;
      },
      (error) => {
        console.error(error);
      },
    )
  }

  const autoCompleteRef = useRef(null);

  useEffect(() => {
    loadScript(
      `https://maps.googleapis.com/maps/api/js?key=AIzaSyCLD89y6zAJjP2lxnmtni5-ck-311J_Rk4&libraries=places`,
      () => handleScriptLoad(setQuery, setJournalLatLng, autoCompleteRef)
    );
  });

  return (
    <main >
      <div>
        <Container maxWidth="lg" className={classes.blogsContainer}>
          {Auth.loggedIn() ? (
            <>
              <h2>What latest experience do you want to record?</h2>
              <p
                className={`m-0 ${characterCount === 500 || error ? 'text-danger' : ''
                  }`}
              >
                Character Count: {characterCount}/500
              </p>
              <form
                className={classes.root} onSubmit={handleFormSubmit}
              >
                <TextField
                  name="journalTitle"
                  placeholder="Journal Title"
                  value={journalTitle}
                  style={{ lineHeight: '1.5', resize: 'vertical' }}
                  onChange={handleChange}
                ></TextField>
                <br />
                <div className="search-location-input">
                  <input
                    name="journalAddress"
                    ref={autoCompleteRef}
                    onChange={event => setQuery(event.target.value)}
                    style={{ lineHeight: '1.5', resize: 'vertical' }}
                    placeholder="Enter a City"
                    value={journalAddress}
                    className={classes.input}
                  />
                </div>
                <div>
                  <p id="latitude" name="latitude" value={journalLatLng.lat}>Lat: </p>
                  <p id="longitude" name="longitude" value={journalLatLng.lng}>Lng: </p>
                </div>
                <TextareaAutosize
                  name="journalText"
                  placeholder="Write your experience here...."
                  value={journalText}
                  required
                  className="text"
                  style={{ lineHeight: '1.5', width: '90%', height: "200px", resize: 'vertical', marginTop: '10px' }}
                  onChange={handleChange}
                ></TextareaAutosize>
                <div>
                  <Button variant="contained" color="primary"
                    style={{ cursor: 'pointer', marginTop: '10px' }} type="submit">
                    Add Journal
                  </Button>
                </div>
              </form>
            </>
          ) : (
            <p>
              You need to be logged in to share your journals. Please{' '}
              <Link to="/login">Login</Link> or <Link to="/signup">Signup.</Link>
            </p>
          )}
        </Container>
      </div>
    </main>
  );
};

export default JournalForm;


