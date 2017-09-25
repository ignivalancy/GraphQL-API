/*
 * @file: server.js
 * @description: main graphql configuration 
 * @date: 18.09.2017
 * @author: Lancy Goyal
 * */

import { Meteor } from 'meteor/meteor';
import { WebApp } from 'meteor/webapp';

import { createApolloServer, addCurrentUserToContext } from 'meteor/apollo';
import { SubscriptionServer } from 'subscriptions-transport-ws';
import { execute, subscribe } from 'graphql';

import logger from '/imports/utils/logger';
import schema from '/imports/api/schema';
// logger.log(schema);
import subscriptionManager from '/imports/api/subscriptions';
// the pubsub mechanism of your choice, for instance:
// - PubSub from graphql-subscriptions (not recommended for production)
// - RedisPubSub from graphql-redis-subscriptions
// - MQTTPubSub from graphql-mqtt-subscriptions

const customBuildOptions = (request, res) => {
    // logger.log('*** request method', request.method, '*** request headers', request.headers);
    return {
        context: { headers: request.headers }, // This context object is passed to all resolvers.
        schema,
    };
};

const customBuildConfig = {
    path: '/gql',
    graphiql: true,
    graphiqlPath: '/graphiql',
    graphiqlOptions: {
        endpointURL: '/gql',
        subscriptionsEndpoint: `ws://localhost:4000/subscriptions`
    }
};

// setup graphql server
createApolloServer(customBuildOptions, customBuildConfig);

// setup subscription server
const subscriptionServer = SubscriptionServer.create({
    execute,
    subscribe,
    schema,
    onConnect: (connectionParams, webSocket) => {
        logger.log('onConnect', connectionParams);
    },
    onDisconnect: (webSocket) => {
        logger.log('onDisconnect');
    }
}, {
    server: WebApp.httpServer,
    port: 4000,
    path: '/subscriptions',
}, );