/*
 * @file: server.js
 * @description: main graphql configuration 
 * @date: 18.09.2017
 * @author: Lancy Goyal
 * */

import { Meteor } from 'meteor/meteor';
import { createApolloServer } from 'meteor/apollo';

import schema from '/imports/api/schema';

// console.log(schema);

const customBuildOptions = (request, res) => {

    console.log('*** request method', request.method, '*** request headers', request.headers);

    const user = null;

    return {
        context: { user }, // This context object is passed to all resolvers.
        schema,
    };
};

const customBuildConfig = () => {
    return { path: '/gql', graphiql: true, graphiqlPath: '/graphiql' };
};

createApolloServer(customBuildOptions, customBuildConfig());