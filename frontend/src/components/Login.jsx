import React from 'react';
import { connect } from 'react-redux';

const Login = () => {
  return <button><a href="/api/auth/login">Login with Github</a></button>;
};

export default connect()(Login);
