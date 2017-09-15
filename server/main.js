import { Meteor } from 'meteor/meteor';
import { createApolloServer } from 'meteor/apollo';

import schema from '/imports/api/schema';

// console.log(schema);

createApolloServer({ schema, context: { user: null } }, { path: '/gql', graphiql: true, graphiqlPath: '/igql' });