import React from 'react';
import { connect } from 'react-redux';
import { HashRouter, Route } from 'react-router-dom';

// Components
import EditorContainer from './EditorContainer';

const App = () => {
  return (
    <HashRouter>
      <Route path="/editor" component={EditorContainer} />
    </HashRouter>
  );
};

export default connect(null, null)(App);
