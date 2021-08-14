import React from 'react';
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import Home from './pages/Home';
import About from './pages/About';
import Journal from './pages/Journal';
import Map from './pages/Map';
// import Play from './pages/Play';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Navbar from './components/Navbar';
import Header from './components/Header';
import AddJournal from './pages/AddJournal';
import JournalEntry from './pages/JournalEntry';

// Construct our main GraphQL API endpoint
const httpLink = createHttpLink({
  uri: '/graphql',
});

// Construct request middleware that will attach the JWT token to every request as an `authorization` header
const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  const token = localStorage.getItem('id_token');
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  };
});

const client = new ApolloClient({
  // Set up our client to execute the `authLink` middleware prior to making the request to our GraphQL API
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

function App() {
  return (
    <ApolloProvider client={client}>
      <Router>
        <Header />
        <Switch>
          <Route exact path='/' component={Home} />
          <Route exact path='/about' component={About} />
          <Route exact path='/journal' component={Journal} />
          <Route exact path='/addjournal' component={AddJournal} />
          <Route exact path='/journalentry' component={JournalEntry} />
          <Route exact path='/map' component={Map} />
          {/* <Route exact path='/play' component={Play} /> */}
          <Route exact path='/login' component={Login} />
          <Route exact path='/signup' component={Signup} />
          <Route exact path="/journals/:journalId">
            <JournalEntry />
          </Route>
          <Route render={() => <h1 className='display-2'>Wrong page!</h1>} />
        </Switch>
      </Router>
    </ApolloProvider >
  );
}

export default App;




