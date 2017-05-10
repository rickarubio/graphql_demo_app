const graphql = require('graphql');
const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLSchema
} = graphql;
//const _ = require('lodash');
const axios = require('axios');

// some hardcoded data to avoid using a DB at this time
const users = [
  { id: '23', firstName: 'Bill', age: 20 },
  { id: '47', firstName: 'Samantha', age: 21 }
];

// instructs graphql what a user object looks like
// by convention name (table name) is capitalized/singular
const UserType = new GraphQLObjectType({
  name: 'User',
  fields: {
    id: { type: GraphQLString },
    firstName: { type: GraphQLString },
    age: { type: GraphQLInt }
  }
});

// defines the entry point to our graph of data
const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    user: {
      type: UserType,
      args: { id: { type: GraphQLString } },
      resolve(parentValue, args) {
        // this is where we would connect to the DB to retrieve info
        //return _.find(users, { id: args.id }); // used for retrieving from fixture
        //graphql will wait for the promise returned by axios to resolve
        //once the promise is resolved, the result will be returned to the client
        return axios.get(`http://localhost:3000/users/${args.id}`)
          .then(resp => resp.data);
      }
    }
  }
});

module.exports = new GraphQLSchema({
    query: RootQuery
});
