const client = require('../client');
const util = require('util');

async function getAllAnimes() {
  try {
    const { rows: animes } = await client.query('SELECT * FROM animes ORDER BY name');
    return animes;
  } catch (error) {
    throw new Error('Unable to retrieve animes');
  }
}

async function getAnimeById(id) {
  try {
    const {
      rows: [anime],
    } = await client.query(
      `
            SELECT * FROM animes
            WHERE id = ${id};
        `,
    );
    return anime;
  } catch (error) {
    throw error;
  }
}

const createAnimes = async ({name, creator, description, image, link}) => {
  try {
      const {
          rows: [anime],
      } = await client.query (`
          INSERT INTO characters(name, creator, description, image, link)
          VALUES($1, $2, $3, $4, $5)
          RETURNING *;
      `, [name, creator, description, image, link])
      return anime
  } catch (error) {
      throw error
  }
}

module.exports = {
  getAnimeById,
  getAllAnimes,
  createAnimes,
};