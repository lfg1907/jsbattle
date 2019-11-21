import React from 'react';
import { connect } from 'react-redux';
import { HashRouter, Route } from 'react-router-dom';

// Components
import Editor from './Editor';

const App = () => {
  return (
    <HashRouter>
      <Route path="/editor" component={Editor} />
    </HashRouter>
  );
};

export default connect(null, null)(App);
