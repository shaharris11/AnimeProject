const express = require('express');
const router = express.Router();

const { register, login } = require('../db/sqlHelperFunctions/auth');

router.post('/register', async (req, res, next) => {
  try {
    const user = await register(req.body);
    res.send(user);
  } catch (error) {
    next(error);
  }
});

router.post('/login', async (req, res, next) => {
  try {
    const user = await login(req.body);
    res.send(user);
  } catch (error) {
    next(error);
  }
});

module.exports = router;