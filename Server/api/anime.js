const express = require('express');
const router = express.Router();

const { getAllAnimes, getAnimeById } = require('../db/sqlHelperFunctions/anime');

router.get('/', async (req, res, next) => {
  try {
    const anime = await getAllAnimes();
    res.send(anime);
  } catch (error) {
    next(error);
  }
});

router.get('/:id', async (req, res, next) => {
  try {
    const anime = await getAnimeById(req.params.id);
    res.send(anime);
  } catch (error) {
    next(error);
  }
});

module.exports = router;