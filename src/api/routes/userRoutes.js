const { Router } = require('express');
const router = Router();

/* GET users listing. */
router.get('/', function (req, res, next) {
  res.json('respond with a resource');
});

/* GET user profile. */
router.get('/profile', function (req, res, next) {
  res.send(req.user);
});

module.exports = router;
