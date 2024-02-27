const client = require('../client');
const util = require('util');

async function getPosts() {
  try {
    const { rows: posts } = await client.query('SELECT * FROM posts', []);

    return posts;
  } catch (error) {
    throw error;
  }
}

const getPostById = async (id) => {
  try {
      const {
          rows: [post]
      } = await client.query(
          `
              SELECT *
              FROM posts
              WHERE id =${id};
          `,
          [id]
      )
      return post;
  } catch (error) {
      throw error
  }
}

const createPost = async (body) => {
  try {
      const { rows: [post] } = await client.query(`

          INSERT INTO posts(title, userid, animeid, description)
          VALUES($1, $2, $3, $4)
          RETURNING *;
      `, [body.title, body.userid, body.animeid, body.description]);
      console.log(body.title, body.userid, body.description);
      return post;
  } catch (error) {
      throw error;
  }
}

const updatePost = async (id, fields) => {
  try {
    const toUpdate = {}
    for (let column in fields) {
      if (fields[column] !== undefined) toUpdate[column] = fields[column];
    }
    let post = {};

    if (util.dbFields(toUpdate).insert.length > 0) {
      const { rows } = await client.query(`
        UPDATE posts
        SET ${util.dbFields(toUpdate).insert}
        WHERE id=${id}
        RETURNING *;
      `, Object.values(toUpdate));

      post = rows[0];
    }

    return post;
  } catch (error) {
    throw error
  }
}

// async function updatePost(token, body) {
//   try {
//     const {
//       rows: [post],
//     } = await client.query('SELECT * FROM posts WHERE token = $1', [token]);

//     if (post.id !== body.id) {
//       throw new Error('Invalid post');
//     }

//     const {
//       rows: [updatedPost],
//     } = await client.query('UPDATE posts SET description = $1 WHERE id = $2 RETURNING *', [body.username, body.id]);
//     return updatedPost;
//   } catch (error) {
//     throw new Error('Unable to update username');
//   }
// }

async function deletePost(id) {
  try {
      const { rows: [rows] } = await client.query(`
          DELETE FROM posts
          WHERE id = ${id}
          RETURNING *;
      `, [id]);
      return rows[0];
  } catch (error) {
      throw error;
  }
}
async function getPostsByUserId(userid) {
  try {
    console.log(userid);
    const { rows: likes } = await client.query('SELECT * FROM posts WHERE userid=$1', [userid]);
    return likes;
  } catch (error) {
    throw error;
  }
}

const getPostsByAnimeId = async (id) => {
  try {
      const {
          rows: posts
      } = await client.query(
          `
              SELECT *
              FROM posts
              WHERE animeid=$1;
          `,
          [id]
      )
      return posts;
  } catch (error) {
      throw error
  }
}
const getPostAccountTable = async (postid) => {
  try {
    const { rows: [post]} = await client.query(`
    SELECT animes.name, posts.title, posts.description
    FROM animes
    INNER JOIN posts ON animes.name = posts.animeid
    WHERE postid = ${postid}
    `)
    return post
  } catch (error) {
    throw error
  }
}

module.exports = {
  getPosts,
  getPostById,
  createPost,
  updatePost,
  deletePost,
  getPostsByUserId,
  getPostsByAnimeId,
  getPostAccountTable,
};