'use strict';

let jsonServer = require('json-server');
let bodyParser = require('body-parser');

module.exports = function startMockServer() {
    console.log("Starting JSON Server");

    let server = jsonServer.create();
    server.use(jsonServer.defaults());
    let db = require("./db.js");
    let router = jsonServer.router(db());

    server.use(bodyParser.json());
    server.use(bodyParser.urlencoded({ extended: true }));

    server.use(router);
    server.listen(3005);
};