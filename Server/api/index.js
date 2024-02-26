const express = require('express');
const router = express.Router();

router.get('/health', (req, res, next) => {
  res.send('OK');
});

router.use('/anime', require('./anime'));

router.use('/auth', require('./auth'));

router.use('/likes', require('./likes'));

router.use('/user', require('./user'));

router.use('/posts', require('./posts'))
module.exports = router;