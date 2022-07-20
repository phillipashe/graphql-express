const express = require('express');
const { graphqlHTTP } = require('express-graphql');
const app = express();
const schema = require('./schemas')
const PORT = 8080;


const graphqlRouter = require('./routes/graphql');


// const schema = new graphql.GraphQLSchema({ query: RootQuery, mutation: Mutation });

app.use('/graphql', graphqlHTTP({
  schema,
  graphiql: true
}));

app.listen(PORT);