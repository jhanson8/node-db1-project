/* jshint esversion: 6 */

const express = require("express");

// database access using knex
const db = require("../data/dbConfig.js");

const router = express.Router();

router.get("/", (req, res) => {
  //list of posts
  //select from posts
  //all database operations return a promise
  db.select("*")
    .from("posts")
    .first()
    .then(posts => {
      res.status(200).json(posts);
    })
    .catch(error => {
      console.log(error);
      res.status(500).json({ error: "failed to get the list of posts" });
    });
});
