const express = require("express");
 
// recordRoutes is an instance of the express router.
// We use it to define our routes.
// The router will be added as a middleware and will take control of requests starting with path /record.
const recordRoutes = express.Router();
 
// This will help us connect to the database
const dbo = require("../db/conn");
 
// This help convert the id from string to ObjectId for the _id.
const ObjectId = require("mongodb").ObjectId;
 
 
// This section will help you get a list of all the records.
recordRoutes.route("/record").get(async function (req, response) {
  let db_connect = dbo.getDb();

  db_connect
    .collection("records")
    .find({})
    .toArray()
    .then((data) => {
      console.log(data);
      response.json(data);
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


// LOGIN API Route
recordRoutes.route("/record/checkUsername").post(async function (req, res) 
{
  // Connect to MongoDB
  let db_connect = dbo.getDb();
  
  try 
  {
    // Check "Users" to see if user + pass exists
    const user =  await db_connect.collection('users').findOne({ username: req.body.username});

    // Case: Does Exists
    if(user) { res.json({ exists: "True"  }); }
    
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
   email: req.body.email
  };

  db_connect.collection("users").insertOne(myobj, function (err, res) {
   
    if (err) throw err;

  });

  response.json({status: "success"});

});
 


// This section will help you update a record by id.
recordRoutes.route("/update/:id").post(function (req, response) {
 let db_connect = dbo.getDb();
 let myquery = { _id: ObjectId(req.params.id) };
 let newvalues = {
   $set: {
     name: req.body.name,
     position: req.body.position,
     level: req.body.level,
   },
 };
 db_connect
   .collection("records")
   .updateOne(myquery, newvalues, function (err, res) {
     if (err) throw err;
     console.log("1 document updated");
     response.json(res);
   });
});
 
// This section will help you delete a record
recordRoutes.route("/:id").delete((req, response) => {
 let db_connect = dbo.getDb();
 let myquery = { _id: ObjectId(req.params.id) };
 
 db_connect.collection("records").deleteOne(myquery, function (err, obj) {
   if (err) throw err;
   console.log("1 document deleted");
   response.json(obj);
 });
});
 
module.exports = recordRoutes;