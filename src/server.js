const dotenv = require('dotenv');
dotenv.config();
const express = require('express');
const logger = require('morgan');
const passport = require('passport');
const app = express();

// DB
require('./config/db')();

//passport
require('./config/passport');

/**
 * Define Routes
 */
const authRoutes = require('./api/routes/authRoutes');
const userRoutes = require('./api/routes/userRoutes');
const adminRoutes = require('./api/routes/adminRoutes');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use('/auth', authRoutes);
app.use('/admin', adminRoutes);
app.use('/user', passport.authenticate('jwt', { session: false }), userRoutes);

app.use((req, res, next) => {
  res.status = 404;
  res.json({
    error: 'end point not found ...',
  });
});

app.use((error, req, res, next) => {
  // error.statusCode = 500;
  // res.status(error.statusCode).json({
  //   message: error.message,
  // });
  console.log(error);
});

const PORT = process.env.PORT || 2020;
app.listen(PORT, () => {
  console.log(`✅ SERVER RUNNING ON ${PORT}`);
});
