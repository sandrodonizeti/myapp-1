var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
  console.log(req.session)

  const { user } = req.session;
  res.render('index', { user });
});

module.exports = router;
