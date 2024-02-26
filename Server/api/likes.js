const express = require('express');
const router = express.Router();

const { like, unlike, getLikes, getLikesByUserId } = require('../db/sqlHelperFunctions/likes');

router.post('/:id/like', async (req, res, next) => {
  try {
    const dblike = await like(req.body.userid, req.params.id);
    res.send(dblike);
  } catch (error) {
    next(error);
  }
});

router.delete('/:id/unlike', async (req, res, next) => {
    try {
      const like = await unlike(req.body.userid, req.params.id);
      res.send(like);
    } catch (error) {
      next(error);
    }
  });

  router.get('/', async (req, res, next) => {
    try {
      const likes = await getLikes(req.params.id);
      res.send(likes);
    } catch (error) {
      next(error);
    }
  });

  router.get('/mine/:id', async (req, res, next) => {
    try {
      const likes = await getLikesByUserId(req.params.id);
      res.send(likes);
    } catch (error) {
      next(error);
    }
  });

module.exports = router;