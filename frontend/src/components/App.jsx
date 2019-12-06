import React from 'react';
import { HashRouter, Route } from 'react-router-dom';

// Components
import Home from './Home';
import WaitingRoom from './WaitingRoom';
import GameView from './GameView';
import EditorView from './EditorView';

const App = () => {
  return (
    <HashRouter>
      <Route path="/home" component={Home} />
      <Route path="/editor" component={EditorView} />
      <Route path="/waiting/:id" component={WaitingRoom} />
      <Route path="/game/:id" component={GameView} />
    </HashRouter>
  );
};

export default App;
