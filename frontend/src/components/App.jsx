import React from 'react';
import { HashRouter, Route } from 'react-router-dom';

// Components
import Home from './Home';
import WaitingRoom from './WaitingRoom';
import GameView from './GameView';
import EditorView from './EditorView';
import Login from './Login';
import WinnerView from './WinnerView';

const App = () => {
  return (
    <HashRouter>
      <Route exact path="/" component={Login} />
      <Route path="/home" component={Home} />
      <Route path="/editor" component={EditorView} />
      <Route path="/waiting/:id" component={WaitingRoom} />
      <Route path="/game/:id" component={GameView} />
      <Route
        path="/game/:id/winner"
        component={WinnerView}
      />
    </HashRouter>
  );
};

export default App;
