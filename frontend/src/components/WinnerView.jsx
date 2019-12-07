import React from 'react';
import { connect } from 'react-redux';

const WinnerView = () => {
  return (
    <div>
      <h1>Congrats you've won this game</h1>
    </div>
  );
};

export default connect()(WinnerView);
