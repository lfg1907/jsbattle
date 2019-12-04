const express = require('express');
const router = require('express').Router();
const axios = require('axios');

router.get('/login', (req, res, next) => {
  res.redirect(
    `https://github.com/login/oauth/authorize?client_id=${process.env.CLIENT_ID}`
  );
});

router.get('/github/callback', (req, res, next) => {
  console.log(req.query.code);
  res.send('hello');
  // axios.post(
  //   'https://github.com/login/oauth/access_token',
  //   {
  //     code: req.query.code,
  //     client_id: process.env.CLIENT_ID,
  //     client_secret: process.env.CLIENT_SECRET
  //   }
  // );
});

module.exports = router;
