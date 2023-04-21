const express = require("express");
 
// recordRoutes is an instance of the express router.
// We use it to define our routes.
// The router will be added as a middleware and will take control of requests starting with path /record.
const recordRoutes = express.Router();
 
// This will help us connect to the database
const dbo = require("../db/conn");
 
// This help convert the id from string to ObjectId for the _id.
const ObjectId = require("mongodb").ObjectId;
 
 
// Gets the Userlist associated with the logged in User
recordRoutes.route("/userlist/:username").get(async function (req, response) {
  let db_connect = dbo.getDb("movieknightdb");

  let query = {username: req.params.username.toString};


  db_connect
    .collection("user")
    .find(query)
    .toArray()
    .then((data) => {
      console.log(data.userlist);
      response.json(data);
    });
});

// USERCOLOR API ROUTE
// grabs the value of the stored color
// might require base case if not found
recordRoutes.route("/usercolor").get(async function(req, response) {
  let db_connect = dbo.getDb("movieknightdb");

  let query = {_id:  req.body._id};

  db_connect
    .colletion("users")
    .find(query)
    .then((data) => {
      console.log(data.color);
      response.json(data.color);
    });
});

// CHANGECOLOR API ROUTE
// changes the stored color field in the given user
recordRoutes.route("/usercolor/changecolor").put(async function(req, response) {
  let db_connect = dbo.getDb("movieknightdb");

  let query = {};
  query._id= req.body._id;
  query.color - req.body.color;

  try
  {
    var userQuery = {_id: req.body._id};
    const newColor = req.body.color;

    console.log(req.body.color);

    db_connect.collection('users').updateOne(userquery, color = newColor, function(err, res) {});
    res.json({message:"Updated Color Scheme"});
  }
  // some kind of server error
  catch (error)
  {
    console.log(error);
    res.status(500).jscon({message: 'server error'});
  }
});

recordRoutes.route("/userlist/add").post(async function (req, response) {
  // Connect to MongoDB
  let db_connect = dbo.getDb("movieknightdb");
    
  try 
  {
    // Check "Users" to see if user + pass exists
    const user =  await db_connect.collection('users').findOne({ username: req.body.username, password: req.body.password });

    const movie = await db_connect.collection('masterlist').findOne({ _id: req.body._id});


    db_connect.collection("users").updateOne(query,{ $push: { userlist: req.params.moviename}}, function (err, res) 
    {
      console.log(res);
      response.json(res);
    });
  } 

  // Some kind of Server Error
  catch (error) 
  {
    console.log(error);
    res.status(500).json({ message: 'Server error' });
  }
});


// Deletes a movie from the logged in User's list
recordRoutes.route("/delete/:username").delete((req, response) => {
  let db_connect = dbo.getDb("movieknightdb");

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


// LOGIN API Route
recordRoutes.route("/record/login").post(async function (req, res) 
{
  // Connect to MongoDB
  let db_connect = dbo.getDb();
  
  try 
  {
    // Check "Users" to see if user + pass exists
    const user =  await db_connect.collection('users').findOne({ username: req.body.username, password: req.body.password });

    // Case: Does Exists
    if(user) { res.json({ exists: "True", firstname: user.firstname, lastname: user.lastname, id: user._id}); }
    
    // Case: Does NOT Exist
    else { res.json({ exists: "False" }); }
  } 

  // Some kind of Server Error
  catch (error) 
  {
    console.log(error);
    res.status(500).json({ message: 'Server error' });
  }

});
 


// SIGNUP API Route
recordRoutes.route("/record/signup").post(function (req, response) {
 let db_connect = dbo.getDb();
 
 let myobj =
  {
   username: req.body.username,
   password: req.body.password,   
   firstname: req.body.firstname,
   lastname: req.body.lastname,
   email: req.body.email,
   color: 0
  };

  db_connect.collection("users").insertOne(myobj, function (err, res) {
   
    if (err) throw err;

  });

  response.json({status: "success"});

});


 
 
 
module.exports = recordRoutes;