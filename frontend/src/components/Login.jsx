import React from 'react';

const Login = () => {
  return (
    <div id="login-container">
      <div id="login">
        <h1>Hi there! Welcome to Goose Teeth JS Trivia</h1>
        <p>
          Some description about the game here etc etc etc.
          Some description about the game here etc etc etc.
          Some description about the game here etc etc etc
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
