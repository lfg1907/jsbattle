import React from 'react';

const Login = () => {
  return (
    <div id="login-container">
      <div id="login">
        <h1>
          Hi there!
          <br />
          <span className="light">Welcome to JSBattle</span>
        </h1>
        <p>
          JSBattle is a multiplayer game where players
          compete against each other by completing
          JavaScript coding challenges. To start playing,
          log in with Github below!
        </p>
        <a href="/api/auth/login">
          <div id="login-button">
            <span id="login-text">Login with Github</span>
          </div>
        </a>
      </div>
    </div>
  );
};

export default Login;
