const jsonServer = require('json-server');
const server = jsonServer.create()
const path = require('path')
const router = jsonServer.router(path.join(__dirname, '/data/db.json'));
const middlewares = jsonServer.defaults()

server.use(middlewares);
server.use('/api', router)

server.listen(3000, () => {
  console.log('JSON server listening on port 3000');
});
