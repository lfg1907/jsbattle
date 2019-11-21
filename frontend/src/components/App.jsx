import React from 'react';
import { connect } from 'react-redux';
import { HashRouter, Route } from 'react-router-dom';

// Components
import EditorPage from './EditorPage';

const App = () => {
  return (
    <HashRouter>
      <Route path="/editor" component={EditorPage} />
    </HashRouter>
  );
};

export default connect(null, null)(App);
