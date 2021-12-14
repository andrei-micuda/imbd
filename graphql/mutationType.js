const {
  GraphQLObjectType, GraphQLString, GraphQLNonNull
} = require('graphql');
const loginHandler = require('../repository/login');
const loginInputType = require('./inputTypes/loginInputType');

const loginResultType = require('./types/loginResultType');
const userType = require('./types/userType');
const db = require('../models');
const { createUser, updateUser } = require('../repository/users');

const mutationType = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    login: {
      type: loginResultType,
      args: {
        loginInput: {
          type: loginInputType,
        }
      },
      resolve: (source, args) => {
        const { email, password } = args.loginInput;

        const token = loginHandler(email, password);

        return {
          token,
        }
      }
    },
  },
})

module.exports = mutationType;