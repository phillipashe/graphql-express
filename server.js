const express = require('express');
const app = express();
const graphql = require('graphql');
const { graphqlHTTP } = require('express-graphql');
const PORT = 8080;

const graphqlRouter = require('./routes/graphql');

const RootQuery = "query";
const Mutation = "mutation";

const schema = new graphql.GraphQLSchema({query: RootQuery, mutation: Mutation});

app.use(express.urlencoded({ extended: true }));

app.use('/graphql', graphqlHTTP({
  schema,
  graphql: true
}));

app.listen(PORT);