const express = require('express');
const router = express.Router();
const { Server } = require('socket.io');
const {
  addGameServer,
  getGameServers,
  getGameServer,
  startServer,
} = require('../gameServers');

router
  .route('/new')
  .post((req, res) => {
    const {
      hostUsername,
      gameName,
      gameType,
      gameRounds,
      gamePassword,
    } = req.body;

    try {
      if (getGameServers()[gameName]) {
        res.json({ 
          success: false, 
          message: 'A game with that name already exists.'
        });
        return;
      }

      addGameServer({
        [gameName]: {
          server: new Server(req.server),
          started: false,
          name: gameName,
          host: hostUsername,
          type: gameType,
          rounds: gameRounds,
          password: gameType === 'public' ? null : gamePassword,
          players: [],
      }});

      startServer(gameName);

      res.json({ success: true, message: 'Game created' });
    } catch (e) {
      console.log(e);
      res.status(500).send();
    }
  });

  module.exports = router;