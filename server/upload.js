/*
 * @file: upload.js
 * @description: multiple file upload api
 * @date: 18.09.2017
 * @author: Lancy Goyal
 * */

import { Meteor } from 'meteor/meteor';
import { WebApp } from 'meteor/webapp';
import Express from 'express';
import Busboy from 'busboy';

import response from '/imports/utils/response';
import rest from '/imports/utils/rest';

const app = Express();

app.use('/upload', function(req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');

    if (req.method === "POST") {

        let files = [],
            filesUrls = []; // Store files in an array and then pass them to request.

        let busboy = new Busboy({ headers: req.headers });

        busboy.on("file", (fieldname, file, filename, encoding, mimetype) => {

            let fileObj = {}; // crate an fileObj object

            fileObj.mimeType = mimetype;
            fileObj.encoding = encoding;
            fileObj.filename = filename;

            // buffer the read chunks
            let buffers = [];

            file.on('data', (data) => {
                buffers.push(data);
            });

            file.on('end', () => {
                // concat the chunks
                fileObj.data = Buffer.concat(buffers);
                // push the image object to the file array
                files.push(fileObj);
            });

        });

        busboy.on("field", (fieldname, value) => {
            req.body[fieldname] = value;
        });

        busboy.on("finish", Meteor.bindEnvironment(() => {

            // save files data on server and pass urls to client.

            _.each(files, (file) => {

                rest.response(res, response.success());

            });

        }));

        // Pass request to busboy
        req.pipe(busboy);

    } else {
        res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
        res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
        res.end('Set OPTIONS.');
    }

});

WebApp.connectHandlers.use(Meteor.bindEnvironment(app));