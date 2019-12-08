import React from 'react';
import { connect } from 'react-redux';

const UserStats = ({ name }) => {
  return (
    <div id="user-stats-container">
      <div id="user-stats">
        <h1>{`Hello ${name ? `${name}!` : ''}`}</h1>
        <p>You&apos;ve won xx games out of xx.</p>
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
