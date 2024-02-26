const client = require('../client');
const util = require('util');
const bcrypt = require('bcrypt');

async function register(body) {
  try {
    const token = await bcrypt.hash(body.password, 10);
    const {
      rows: [user],
    } = await client.query('INSERT INTO users (username, email, token) VALUES ($1, $2, $3) RETURNING *', [
      body.username,
      body.email,
      token,
    ]);
    return user;
  } catch (error) {
    if (error.detail.includes('already exists')) {
      return 'Username already exists.';
    }
    throw new Error('Unable to create User');
  }
}

async function login(body) {
  try {
    const {
      rows: [user],
    } = await client.query(`SELECT * from users WHERE username = '${body.username}'`);
    if (!user) {
      return 'Unable to login';
    }
    const itMatches = await bcrypt.compare(body.password, user.token);

    if (itMatches) {
      return user;
    }

    return 'Unable to login';
  } catch (error) {
    throw new Error('Unable to login User');
  }
}

module.exports = {
  register,
  login,
};