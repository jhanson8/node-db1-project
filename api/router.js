/* jshint esversion: 6 */

const express = require("express");

// database access using knex
const db = require("../data/dbConfig.js");

const router = express.Router();

//list all accounts
router.get("/", (req, res) => {
  db.select("*")
    .from("accounts")
    .then(posts => {
      res.status(200).json(posts);
    })
    .catch(error => {
      console.log(error);
      res.status(500).json({ error: "failed to get the list of accounts" });
    });
});

//POST account
router.post("/", (req, res) => {
  // const postInfo = req.body
  db("accounts")
    .insert(req.body) // will generate a warning on console when using sqlite. You can ignore
    .then(ids => {
      res.status(201).json(ids);
    })
    .catch(error => {
      console.log(error);
      res.status(500).json({ error: "failed to add the account" });
    });
});

//UPDATE
router.put("/:id", (req, res) => {
  const id = req.params.id;
  const changes = req.body;
  db("accounts")
    .where({ id })
    .update(changes)
    .then(count => {
      res.status(200).json(count);
    })
    .catch(error => {
      console.log(error);
      res.status(500).json({ error: "failed to update the account" });
    });
});

//DELETE
router.delete("/:id", (req, res) => {
  // removes a post
  const id = req.params.id;
  db("accounts")
    .where({ id }) // remember to filter or all records will be deleted (BAD PANDA!!)
    .del()
    .then(count => {
      res.status(200).json(count);
    })
    .catch(error => {
      console.log(error);

      res.status(500).json({ error: "failed to remove the account" });
    });
});

module.exports = router;
