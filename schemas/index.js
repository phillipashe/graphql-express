const UserType = require('./TypeDefs/UserType');
const userData = require('../mock_data.json');
const { GraphQLSchema, GraphQLObjectType, GraphQLString, GraphQLInt, GraphQLList } = require("graphql");


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

module.exports = new GraphQLSchema({ query: RootQuery, mutation: Mutation });