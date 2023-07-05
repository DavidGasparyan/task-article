const jsonServer = require('json-server');
const auth = require('json-server-auth');
const server = jsonServer.create()
const path = require('path')
const router = jsonServer.router(path.join(__dirname, '/data/db.json'));
const middlewares = jsonServer.defaults()

const rules = auth.rewriter({
  articles: 660,
  users: 600,
});

server.db = router.db;

server.use(rules)
server.use(auth);
server.use(router)


server.listen(3000, () => {
  console.log('JSON server listening on port 3000');
});
