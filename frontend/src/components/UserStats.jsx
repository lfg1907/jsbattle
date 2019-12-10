import React from 'react';

const UserStats = ({ name, gamesWon, gamesPlayed }) => {
  return (
    <div id="user-stats-container">
      <div id="user-stats">
        <h1>{`Hello ${name}`}</h1>
        <p>
          {`You've won ${gamesWon} games out of ${gamesPlayed} games played.`}
        </p>
        <p>Play more to win more!</p>
      </div>
    </div>
  );
};

export default UserStats;
