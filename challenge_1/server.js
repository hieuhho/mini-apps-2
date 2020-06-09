const jsonServer = require('json-server');
const path = require('path');
const server = require('./client/app.jsx')
const a = require('')

const server = jsonServer.create();
const router = jsonServer.router(path.join(__dirname, 'data', 'db.json'));
const middlewares = jsonServer.defaults();

const port = 3000;

server.use(middlewares);
server.use(router);

server.listen(port, () => console.log(`json-listening on ${port}`))
