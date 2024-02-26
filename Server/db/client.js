const { Client } = require('pg');

const client = new Client(`postgres://localhost:3546/anime`);

module.exports = client;