const express = require('express');
const router = express.Router();
const newRouter = require('./new.route');
const gamesRouter = require('./games.route');

module.exports = router.use('/api', [
  newRouter,
  gamesRouter,
]);