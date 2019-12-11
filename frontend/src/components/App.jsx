import React, { useEffect } from 'react';
import {
  HashRouter,
  Route,
  Redirect,
  Switch
} from 'react-router-dom';
import { connect } from 'react-redux';

import { actions } from '../store';

// Components
import Home from './Home';
import WaitingRoom from './WaitingRoom';
import GameView from './GameView';
import EditorView from './EditorView';
import Login from './Login';
import JoinFromLink from './JoinFromLink';
import WinnerView from './WinnerView';

const App = ({ loggedIn, attemptGetUser }) => {
  useEffect(() => {
    attemptGetUser();
  }, []);

  return (
    <HashRouter>
      <Switch>
        <Route exact path="/">
          {loggedIn ? <Redirect to="/home" /> : <Login />}
        </Route>
        <Route path="/home" component={Home} />
        <Route path="/editor" component={EditorView} />
        <Route
          path="/waiting/:id"
          component={WaitingRoom}
        />
        <Route path="/game/:id" component={GameView} />
        <Route path="/join/:id" component={JoinFromLink} />
        <Route path="/winner/:id" component={WinnerView} />
      </Switch>
    </HashRouter>
  );
};

const mapStateToProps = ({ user }) => ({
  loggedIn: !!user.id
});

const mapDispatchToProps = dispatch => ({
  attemptGetUser() {
    const userId = localStorage.getItem('jsBattleUserId');
    dispatch(actions.attemptGetUser(userId));
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
