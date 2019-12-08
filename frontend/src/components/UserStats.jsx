import React from 'react';
import { connect } from 'react-redux';

const UserStats = ({ name }) => {
  return (
    <div id="user-stats-container">
      <div id="user-stats">
        <h2>{`Hello ${name}!`}</h2>
        <p>You&apos;ve won 0 games out of 0.</p>
      </div>
    </div>
  );
};

const mapStateToProps = ({ user }) => ({
  name:
    user.firstName && user.lastName
      ? `${user.firstName} ${user.lastName}`
      : user.username
});

export default connect(mapStateToProps)(UserStats);
