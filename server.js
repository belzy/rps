const http = require('http');
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const router = require('./routes');

let server = null;

const passServer = (req, res, next) => {
  req.server = server;
  next();
};

const middleware = [
  bodyParser.urlencoded({ extended: true }),
  passServer,
  router,
];

function createServer() {
  const app = express();
  app.use(middleware);
  app.use(express.static(path.join(__dirname, 'client/build/')));
  app.get('*', (req, res) => {
    res.redirect('http://localhost:8080/');
  });
  
  server = http.createServer(app);
  return server;
};

module.exports = {
  createServer,
};