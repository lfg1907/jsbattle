import React from 'react';

const UserStats = ({ name, gamesWon, gamesPlayed }) => {
  return (
    <div id="user-stats-container">
      <div id="user-stats">
<<<<<<< HEAD
        <h2>{`Hello ${name}!`}</h2>
        <p>You&apos;ve won 0 games out of 0.</p>
=======
        <h1>
          <span className="light">Hello </span>
          {name}
        </h1>
        <p>
          {`You've won ${gamesWon} games out of ${gamesPlayed} games played.`}
        </p>
        <p>Play more to win more!</p>
>>>>>>> cba51f9fd7cef809b74b5963fa3088c2b22e037b
      </div>
    </div>
  );
};

export default UserStats;
