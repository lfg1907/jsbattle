import React from 'react';
import { connect } from 'react-redux';
import { HashRouter, Route } from 'react-router-dom';

// Components
import EditorView from './EditorView';

const App = () => {
  return (
    <HashRouter>
      <Route path="/editor" component={EditorView} />
    </HashRouter>
  );
};

export default connect(null, null)(App);
