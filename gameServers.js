
let gameServers = {};

function addGameServer(gameServer) {
  gameServers = {
    ...gameServers,
    ...gameServer,
  };
};

function getGameServers() {
  return { ...gameServers };
}

function getGameServer(gameName) {
  return gameServers[gameName];
}

function startServer(gameName) {
  const server = gameServers[gameName].server;

  if (!server.started) {
    try {
      gameServers[gameName].started = true;
      console.log(`[server] ${ gameName }: Server started`);

      server.on(`connection`, (socket) => {
        console.log(`[socket] ${ gameName }: Connection received`);

        const channels = {
          playerJoined: `${ gameName }: player joined`
        };

        socket.on(channels['playerJoined'], (username) => {
          console.log(`[socket] ${ channels['playerJoined'] } ${ username }`);
          server.emit(channels['playerJoined'], username);
        });

        // socket.on()
      });

    } catch (e) {
      console.log(e);
      gameServers.started = false
    }
  }
};

function addPlayer(gameName, username) {
  const game = gameServers[gameName];
  if (game.players.length >= 2) return false;
  game.players.push(username);
  return true;
}

module.exports = {
  addGameServer,
  getGameServers,
  getGameServer,
  startServer,
  addPlayer,
};