import React from 'react';
import { connect } from 'react-redux';

const UserStats = ({ name, gamesWon, gamesPlayed }) => {
  return (
    <div id="user-stats-container">
      <div id="user-stats">
        <h1>{`Hello ${name ? `${name}!` : ''}`}</h1>
        <p>
          {`You've won ${gamesWon} games out of ${gamesPlayed} games played.`}
        </p>
        <p>Play more to win more!</p>
      </div>
    </div>
  );
};

const mapStateToProps = ({ user }) => ({
  name:
    user.firstName && user.lastName
      ? `${user.firstName} ${user.lastName}`
      : user.username,
  gamesWon: user.gamesWon,
  gamesPlayed: user.gamesPlayed
});

export default connect(mapStateToProps)(UserStats);
