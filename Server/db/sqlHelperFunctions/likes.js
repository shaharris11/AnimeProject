const client = require('../client');
const util = require('util');

async function like(userid, animeid) {
  try {
    const {
      rows: [dblike],
    } = await client.query('INSERT INTO likes (userid, animeid) VALUES ($1, $2) RETURNING *', [userid, animeid]);
    return dblike;
  } catch (error) {
    throw error;
  }
}

async function unlike(userid, animeid) {
  try {
    const {
      rows: [like],
    } = await client.query('DELETE FROM likes WHERE userid=$1 AND animeid=$2 RETURNING *', [userid, animeid]);
    return like;
  } catch (error) {
    throw error;
  }
}

async function getLikes() {
  try {
    const { rows: likes } = await client.query('SELECT * FROM likes', []);

    const returnList = [];

    for (const like of likes) {
      if (returnList.find((it) => it.animeid === like.gameid) === undefined) {
        returnList.push({ animeid: vote.animeid, likes: likes.filter((it) => it.animeid === like.animeid).length });
      }
    }

    return returnList;
  } catch (error) {
    throw error;
  }
}

async function getLikesByUserId(userid) {
  try {
    const { rows: likes } = await client.query('SELECT * FROM likes WHERE userid=$1', [userid]);
    const { rows: animes } = await client.query('SELECT * FROM animes', []);
    const info = []
    for (const like of likes) {
      info.push(animes.find(it => it.id === like.animeid))
    }
    return info;
  } catch (error) {
    throw error;
  }
}


module.exports = {
  like,
  unlike,
  getLikes,
  getLikesByUserId,
};