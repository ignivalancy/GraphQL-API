/*
 * @file: server.js
 * @description: main graphql configuration 
 * @date: 18.09.2017
 * @author: Lancy Goyal
 * */

import { Meteor } from 'meteor/meteor';
import { WebApp } from 'meteor/webapp';
import cors from 'cors';

import { createApolloServer, getUserForContext, addCurrentUserToContext } from 'meteor/apollo';
import { SubscriptionServer } from 'subscriptions-transport-ws';
import { execute, subscribe } from 'graphql';

import logger from '/imports/utils/logger';
import schema from '/imports/api/schema';
// logger.log(schema);

// the pubsub mechanism
// import subscriptionManager from '/imports/api/subscriptions';
// - PubSub from graphql-subscriptions (not recommended for production)
// - RedisPubSub from graphql-redis-subscriptions
// - MQTTPubSub from graphql-mqtt-subscriptions

import db from '/imports/configs/db';
import host from '/imports/configs/host';
import smtp from '/imports/configs/smtp';

const instance = Meteor.isDevelopment ? 'dev' : 'staging';
const db_instance = db[instance];
const host_instance = host[instance];
const smtp_instance = smtp[instance];

const HOST = host_instance.host;
const PORT = host_instance.port;
const WS_GQL_PATH = '/subscriptions';

process.env.MONGO_URL = `mongodb://${db_instance.username}:${db_instance.password}@${db_instance.host}:${db_instance.port}/${db_instance.name}`;
process.env.MAIL_URL = `smtp://${encodeURIComponent(smtp_instance.username)}:${encodeURIComponent(smtp_instance.password)}@${encodeURIComponent(smtp_instance.server)}:${smtp_instance.port}`;
process.env.HTTP_FORWARDED_COUNT = 1;

Meteor.startup(function() {

    logger.info(`Listening @ ${HOST}:${PORT}`);

});

const subscriptionsEndpoint = `ws://${HOST}:${PORT}${WS_GQL_PATH}`;

const customBuildOptions = (request, res) => {
    // logger.log('*** request method', request.method, '*** request headers', request.headers);
    return {
        context: { headers: request.headers }, // This context object is passed to all resolvers.
        schema,
    };
};

const customBuildConfig = {
    path: '/gql',
    configServer: expressServer => expressServer.use(cors()),
    graphiql: true, // Meteor.isDevelopment
    graphiqlPath: '/graphiql',
    graphiqlOptions: {
        endpointURL: '/gql',
        subscriptionsEndpoint
    }
};

// setup graphql server
createApolloServer(customBuildOptions, customBuildConfig);

// setup subscription server
const subscriptionServer = SubscriptionServer.create({
    execute,
    subscribe,
    schema,
    // onOperation: (message, params, webSocket) => {
    //     logger.log('onOperation');
    // },
    // onOperationComplete: (webSocket, opId) => {
    //     logger.log('onOperationComplete');
    // },
    onConnect: async(params, webSocket) => {
        // logger.log('Subscription Connected', params);
        
        // if a login token is passed to the connection params from the client, 
        // add the current user to the subscription context
        const userContext = params.loginToken ?
            await getUserForContext(params.loginToken) : { user: null };
        return { ...userContext };
    },
    // onDisconnect: (webSocket) => {
    //    logger.log('Subscription Disconnected');
    // }
}, {
    server: WebApp.httpServer,
    path: WS_GQL_PATH
});