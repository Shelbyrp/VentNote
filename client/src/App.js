import React from 'react';
import './App.css';
import {ApolloProvider} from '@apollo/react-hooks';
import ApolloClient from 'apollo-boost';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Navbar from './components/Navbar';

import Home from './pages/Home';
import About from './pages/About';
import MapView from './pages/Map';
import Journal from './pages/Journal';
import Play from './pages/Play';

const client = new ApolloClient({
  request: operation =>{
    const token = localStorage.getItem('id_token');
    operation.setContext({
      headers:{
        authorization: token ? `Bearer ${token}`  : ''
      }
    });
  },
  uri:'/graphql'
});

function App() {
  return (
    <ApolloProvider client={client}>
    <Router>
      <>
        <Navbar />
        <Switch>
          <Route exact path='/' component={Home} />
          <Route exact path='/About' component={About} />
          <Route exact path='/MapView' component={MapView} />
          <Route exact path='/Journal' component={Journal} />
          <Route exact path='/Play' component={Play} />
          <Route render={() => <h1 className='display-2'>Wrong page!</h1>} />
        </Switch>
      </>
    </Router>
    </ApolloProvider>
  );
}

export default App;
