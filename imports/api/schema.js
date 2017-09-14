import { makeExecutableSchema } from 'graphql-tools';
import { loadSchema, getSchema } from 'graphql-loader';
import { mergeModules, loadModules } from 'graphql-schema-modules';
import { initAccounts } from 'meteor/nicolaslopezj:apollo-accounts'

initAccounts();

import date from './gql/date';
import json from './gql/json';

import user from './gql/user';

const accounts = getSchema()

const { typeDefs, resolvers } = mergeModules([date, json, user, accounts]);

const schema = makeExecutableSchema({ typeDefs, resolvers });

export default schema;