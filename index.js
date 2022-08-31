const {
  createServer
} = require('./server');

// const PORT = 443;
// const PORT = 80;
const PORT = 8080;

const server = createServer();

server.listen(PORT, () => {
  console.log(`[server] Server listening on port ${ PORT }...`);
});