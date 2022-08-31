const express = require('express');
const router = express.Router();
const { 
  addPlayer,
  getGameServers,
  getGameServer,
} = require('../gameServers');

router
  .route('/games/:gameName/join')
  .get((req, res) => {
    try {
      const gameName = req.params.gameName;
      const username = req.query.username;

      const success = addPlayer(gameName, username);
      const message = success 
        ? `You joined ${ gameName }.`
        : `Game is full.`
  
      res.json({ success, message });
    } catch (e) {
      console.log(e);
      res.status(500).end();
    }
  });

router
  .route('/games')
  .get((req, res) => {
    try {
      const gameServers = getGameServers();
      const games = Object.keys(gameServers)
        .map((key, i) => {
          const game = { ...gameServers[key] };
          delete game.server;
          delete game.password;
          return game;
        });
  
      res.json(games);
    } catch (e) {
      console.log(e);
      res.status(500);
    }
  });

router
  .route('/games/:gameName')
  .get((req, res) => {
    try {
      const gameName = req.params.gameName;
      const game = getGameServer(gameName);

      delete game.server;
      delete game.password;

      res.json(game);
    } catch (e) {
      console.log(e);
      res.status(500);
    }
  });

module.exports = router;