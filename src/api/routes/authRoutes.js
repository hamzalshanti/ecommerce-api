const { Router } = require('express');
const router = Router();
const passport = require('passport');
const jwt = require('jsonwebtoken');

/* POST login. */
router.post('/login', function (req, res, next) {
  passport.authenticate(
    'local-signin',
    { session: false },
    (err, user, info) => {
      if (err || !user) {
        return res.status(400).json({
          message: 'Something is not right',
          user: user,
        });
      }
      req.login(user, { session: false }, (err) => {
        if (err) {
          res.send(err);
        }
        // generate a signed son web token with the contents of user object and return it in the response
        const token = jwt.sign(user.toObject(), process.env.JWT_SECRET);
        return res.json({ user, token });
      });
    }
  )(req, res);
});
router.get(
  '/google',
  passport.authenticate('google', { scope: ['profile', 'email'] })
);

router.get('/google/redirect', function (req, res, next) {
  passport.authenticate('google', { session: false }, (err, user, info) => {
    if (err || !user) {
      console.log(err);
      return res.status(400).json({
        message: 'Something is not right',
        user: user,
      });
    }
    req.login(user, { session: false }, (err) => {
      if (err) {
        res.send(err);
      }
      const token = jwt.sign(user.toObject(), process.env.JWT_SECRET);
      return res.json({ user, token });
    });
  })(req, res);
});

module.exports = router;
