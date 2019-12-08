import React from 'react';
import { connect } from 'react-redux';

const Login = () => {
  return (
    <>
      <h1>Hi there! Welcome to Goose Teeth JS Trivia</h1>
      <button>
        <a href="/api/auth/login">Login with Github</a>
      </button>
    </>
  );
};

export default connect()(Login);
