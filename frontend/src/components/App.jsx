import React from 'react';
import { connect } from 'react-redux';
import { HashRouter, Route } from 'react-router-dom';

// Components
import Home from './Home';
import WaitingRoom from './WaitingRoom';
import EditorView from './EditorView';
import Login from './Login';
const App = () => {
  return (
    <HashRouter>
      <Route exact path="/" component={Login} />
      <Route path="/home" component={Home} />
      <Route path="/editor" component={EditorView} />
      <Route path="/waiting/:id" component={WaitingRoom} />
    </HashRouter>
  );
};

export default connect(null, null)(App);
