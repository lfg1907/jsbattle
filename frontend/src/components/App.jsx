import React from 'react';
import { connect } from 'react-redux';
import {
  HashRouter,
  Route,
  Switch,
  Redirect
} from 'react-router-dom';
import { actions } from '../store';

// Components
import Home from './Home';
import WaitingRoom from './WaitingRoom';
import EditorView from './EditorView';

const App = () => {
  return (
    <HashRouter>
      <Switch>
        <Route path="/home" component={Home} />
        <Route path="/editor" component={EditorView} />
        <Route
          path="/waiting/:id"
          component={WaitingRoom}
        />
        <Redirect to="/editor" />
      </Switch>
    </HashRouter>
  );
};

// const mapStateToProps = ({ questions }) => {
//   return {
//     questions
//   };
// };

// const mapDispatchToProps = dispatch => {
//   return {
//     getAllQuestions: () =>
//       dispatch(actions.getAllQuestions())
//   };
// };

export default connect(null, null)(App);
