const express = require("express");
const { graphqlHTTP } = require("express-graphql");
const authorizationMiddleware = require('./middlewares/authorization');

const port = 3001;
const app = express();

const schema = require("./graphql");

app.use(
  "/graphql",
  authorizationMiddleware,
  graphqlHTTP({
    schema,
    graphql: true,
  })
);

app.listen(port, () => {
  console.log("Server started on", port);
});
