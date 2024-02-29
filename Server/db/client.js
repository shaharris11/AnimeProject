const { Client } = require('pg');

const client = new Client(`postgres://anime_xotu_user:DphHJK5DyG5x4tA9tnmSqdpJRLT4JFe5@dpg-cnge71ed3nmc739o4n0g-a/anime_xotu`);

module.exports = client;