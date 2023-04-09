const express = require("express");
 
// recordRoutes is an instance of the express router.
// We use it to define our routes.
const recordRoutes = express.Router();
 
// This will help us connect to the database
const dbo = require("../db/conn");
 
// This help convert the id from string to ObjectId for the _id.
const ObjectId = require("mongodb").ObjectId;

// Used to grab the masterlist
const axios = require("axios");

 
// This section will get you the users list
recordRoutes.route("/:id/userlist").get(async function (req, response) {
  let db_connect = dbo.getDb("movieknightdb");

  let query = {};

  query.userID = parseInt(req.params.id);

  db_connect
    .collection("usermovies")
    .find(query)
    .toArray()
    .then((data) => {
      console.log(data);
      response.json(data);
    });
});

// This route will let you add a movie to your list
recordRoutes.route("/:id/masterlist/add").post(function (req, response) {
  let db_connect = dbo.getDb();

  let myobj = {
    name: req.body.name,
    userID: parseInt(req.params.id),
  };

  db_connect
    .collection("usermovies")
    .insertOne(myobj, function (err, res) {
    if (err) throw err;
    response.json(res);
  });
});

// This route will let you delete a movie from your list
recordRoutes.route("/:id/userlist").delete((req, response) => {
  let db_connect = dbo.getDb();

  let query = {};

  query.ObjectId = req.params.ObjectId;
  query.userID = parseInt(req.params.id)

  db_connect
    .collection("usermovies")
    .deleteOne(query, function (err, obj) {
    if (err) throw err;
    console.log("1 movie deleted");
    response.json(obj);
  });
});



// Movie Master list API calls
const options = {
  method: 'GET',
  params: {limit: '10', page: '1'},
  url: 'https://moviesdatabase.p.rapidapi.com/titles',
  headers: {
    'X-RapidAPI-Key': '25647343e7mshd62007ed51a599fp1d2aedjsna130dadb1651',
    'X-RapidAPI-Host': 'moviesdatabase.p.rapidapi.com'
  }
};

recordRoutes.route("/:id/masterlist").get(async function (req, response) {
  axios.request(options).then(function (response) {
    console.log(response.data);
  }).catch(function (error) {
    console.error(error);
  });
});



module.exports = recordRoutes;