/*
 * @file: setup.js
 * @description: server configration file
 * @date: 22.09.2017
 * @author: Lancy Goyal
 * */

import { Meteor } from 'meteor/meteor';

import logger from '/imports/utils/logger';

import db from '/imports/configs/db';
import host from '/imports/configs/host';
import smtp from '/imports/configs/smtp';

const instance = process.env.NODE_ENV === 'development' ? 'dev' : 'staging';
const db_instance = db[instance];
const host_instance = host[instance];
const smtp_instance = smtp[instance];

process.env.MONGO_URL = `mongodb://${db_instance.username}:${db_instance.password}@${db_instance.host}:${db_instance.port}/${db_instance.name}`;
process.env.MAIL_URL = `smtp://${encodeURIComponent(smtp_instance.username)}:${encodeURIComponent(smtp_instance.password)}@${encodeURIComponent(smtp_instance.server)}:${smtp_instance.port}`;
process.env.PORT = host_instance.port;
process.env.HTTP_FORWARDED_COUNT = 1;

Meteor.startup(function() {

    logger.info('Listening', host_instance.port);

});