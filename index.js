const express = require("express");
const { graphqlHTTP } = require("express-graphql");
const port = 3001;
const app = express();

const schema = require("./graphql");

app.use(
  "/graphql",
  graphqlHTTP({
    schema,
    graphql: true,
  })
);

app.listen(port, () => {
  console.log("Server started on", port);
});
