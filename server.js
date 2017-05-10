const express = require('express');
const app = express();
const expressGraphQL = require('express-graphql');
const schema = require('./schema/schema');

app.listen(4000, () => {
  console.log('listening');
});

app.use('/graphql', expressGraphQL({
  schema,
  graphiql: true
}));
