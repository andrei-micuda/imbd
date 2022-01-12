const express = require("express");
const { createServer } = require("http");
const ws = require("ws");
const { useServer } = require("graphql-ws/lib/use/ws");
const { execute, subscribe } = require("graphql");
const { graphqlHTTP } = require("express-graphql");
const authorizationMiddleware = require('./middlewares/authorization');

const port = 3001;
const app = express();

const schema = require("./graphql");

const server = createServer(app);

require("./pubsub");

app.use(
  "/graphql",
  authorizationMiddleware,
  graphqlHTTP({
    schema,
    graphql: true,
  })
);

const wsServer = new ws.Server({
  server,
  path: '/subscriptions'
});

server.listen(port, () => {
  useServer({
    schema,
    execute,
    subscribe,
  }, wsServer);
  console.log("Server started on", port);
});
