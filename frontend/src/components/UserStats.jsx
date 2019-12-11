import React from 'react';

const UserStats = ({ name }) => {
  return (
    <div id="user-stats-container">
      <div id="user-stats">
        <h1>
          <span className="light">Hello </span>
          {name}
        </h1>
        <p>Play more to win more!</p>
      </div>
    </div>
  );
};

export default UserStats;
