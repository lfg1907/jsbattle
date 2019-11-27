

const router = require('express').Router()

router.get('/login', (req,res,next) => {
  res.redirect("https://github.com/login/oauth/authorize?client_id=${process.env.CLIENT_ID}");
})

module.exports = router