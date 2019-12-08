import React from 'react';

import GamesCPanel from './GamesCPanel';
import UserStats from './UserStats';

const Home = () => {
  return (
    <div id="home">
      <UserStats />
      <GamesCPanel />
    </div>
  );
};

export default Home;
