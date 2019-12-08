import React from 'react';

const Login = () => {
  return (
    <div>
      <h1>Hi there! Welcome to Goose Teeth JS Trivia</h1>
      <a href="/api/auth/login">
        <div id="login-button">Login with Github</div>
      </a>
    </div>
  );
};

export default Login;
