const express = require('express');

const router = express.Router();
const axios = require('axios');
const qs = require('querystring');

const { User } = require('../db/models');

router.get('/login', (req, res, next) => {
  try {
    res.redirect(
      `https://github.com/login/oauth/authorize?client_id=${process.env.CLIENT_ID}`
    );
  } catch (err) {
    next(err);
  }
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
      // eslint-disable-next-line camelcase
      const { access_token } = qs.parse(data);
      return axios
        .get('https://api.github.com/user', {
          headers: {
            // eslint-disable-next-line camelcase
            authorization: `token ${access_token}`
          }
        })
        .then(response => response.data)
        .then(async githubUser => {
          req.session.user = githubUser;
          let user = await User.findOne({
            where: {
              username: githubUser.login,
              githubId: githubUser.id
            }
          });
          if (user) {
            req.session.user = user;
            res.redirect('/#/home');
          } else {
            user = await User.create({
              firstName: '',
              lastName: '',
              username: githubUser.login,
              githubId: githubUser.id
            });
            req.session.user = user;
            res.redirect('/#/home');
          }
        });
    })
    .catch(next);
});

router.get('/login/github_user', (req, res) => {
  if (req.session.user) {
    res.send(req.session.user);
  } else {
    res.send({});
  }
});

module.exports = router;
