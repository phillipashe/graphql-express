const express = require('express');
const app = express();
const { GraphQLObjectType, GraphQLSchema, GraphQLInt, GraphQLString, GraphQLList } = require('graphql');
const graphql = require('graphql');
const { graphqlHTTP } = require('express-graphql');
const userData = require('./mock_data.json');
const PORT = 8080;

const graphqlRouter = require('./routes/graphql');

const UserType = new GraphQLObjectType({
  name: "User",
  // fields must be passed a function
  fields: () => ({
    id: { type: GraphQLInt },
    firstName: { type: GraphQLString },
    lastName: { type: GraphQLString },
    email: { type: GraphQLString },
    password: { type: GraphQLString }
  })
})

const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: () => ({
    getAllUsers: {
      type: new GraphQLList(UserType),
      args: { id: { type: GraphQLInt } },
      resolve(parent, args) {
        // this is where you would make the select statement for a real DB
        return userData;
      }
    }
  })
});

// mutations are to create/update/delete (mutate the data)
const Mutation = new GraphQLObjectType({
  name: "Mutation",
  fields: {
    createUser: {
      type: UserType,
      // all mutations must have arguments
      args: {
        firstName: { type: GraphQLString },
        lastName: { type: GraphQLString },
        email: { type: GraphQLString },
        password: { type: GraphQLString },
      },
      resolve(parent, args) {
        // this is where you would modify data for a real DB  
        userData.push({ id: userData.length + 1, firstName: args.firstName, lastName: args.lastName, email: args.email, password: args.password })
        return args;
      }
    }
  }
});

const schema = new graphql.GraphQLSchema({ query: RootQuery, mutation: Mutation });

app.use('/graphql', graphqlHTTP({
  schema,
  graphiql: true
}));

app.listen(PORT);