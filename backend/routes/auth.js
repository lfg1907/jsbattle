// const express = require('express');
const router = require('express').Router();
const axios = require('axios');
const qs = require('querystring');

router.get('/login', (req, res, next) => {
  res.redirect(
    `https://github.com/login/oauth/authorize?client_id=${process.env.CLIENT_ID}`
  );
});

router.get('/github/callback', (req, res, next) => {
  axios
    .post('https://github.com/login/oauth/access_token', {
      code: req.query.code,
      client_id: process.env.CLIENT_ID,
      client_secret: process.env.CLIENT_SECRET
    })
    .then(resp => resp.data)
    .then(data => {
      const  {access_token}  = qs.parse(data);
      return axios
        .get('https://api.github.com/user', {
          headers: {
            authorization: `token ${access_token}`
          }
        })
        .then(response => response.data)
        .then(githubUser => {
          req.session.user = githubUser;
          // console.log(githubUser.login);
          res.redirect('/#/home');
        });
    })
    .catch(next);
});

module.exports = router;
