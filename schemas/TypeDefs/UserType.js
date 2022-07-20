const { GraphQLObjectType, GraphQLInt, GraphQLString } = require('graphql');

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

module.exports = UserType;