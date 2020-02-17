/* jshint esversion: 6 */

const express = require("express");

const db = require("./data/dbConfig.js");
const Router = require("./api/router.js");

const server = express();

server.use(express.json());

server.use("/api/accounts", Router);

server.get("/", (req, res) => {
  res.send("<h3>Node DB Project 1</h3>");
});

module.exports = server;
