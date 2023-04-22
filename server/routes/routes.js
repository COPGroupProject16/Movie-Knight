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
recordRoutes.route("/userlist").get(async function (req, res) {
  let db_connect = dbo.getDb("movieknightdb");

  try
  {
    const user = await db_connect.collection('users').findOne({ _id: req.body._id});

    console.log(user);
    res.json(user.);
  }
  
  catch(error)
  {
    console.log(error);
    res.status(500).json({ message: 'Server error' });
  }
});

recordRoutes.route("/userlist/add").post(async function (req, res) {
  // Connect to MongoDB
  let db_connect = dbo.getDb("movieknightdb");
    
  try 
  {
   
    const movie = await db_connect.collection('masterlist').findOne({ title: req.body.title});

    var userQuery = { _id: req.body._id};

    console.log(movie.title);

    db_connect.collection('users').updateOne(userQuery,{ $push: { userlist: movie}}, function (err, res){ });
    res.json({message:"Added to list."});
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
 

//TESTING A NEW LOGIN ROUTE FORMAT (using JWT)
/* recordRoutes.route("/record/newlogin",async (req, res) => {
  try {
    const{ error } = validate(req.body);
    if (error)
      return res.status(400).send({message:error.details[0].message});

    const user = await User.findOne({username: req.body.username});
    if(!user)
      return res.status(401).send({message : "Invalid Username/Password Cobination"});

    const validPassword = await bcrypt.compare(req.body.password,user.password);
    if(!validPassword)
      return res.status(401).send({message : "Invalid Username/Password Cobination"});

   const token = user.generateAuthToken();
   res.status(200).send({data:token,message : "Authentication successful"});   

  } catch (error) {
    res.status(500).send({message:"Internal Server Error"});
  }
}); */ 

// LOGIN API Route
recordRoutes.route("/login").post(async function (req, res) 
{
  // Connect to MongoDB
  let db_connect = dbo.getDb();


  try 
  {
    // Check if username is already taken
    const user = await db_connect.collection('users').findOne({username: req.body.username, password: req.body.password});

    // Return 409 if username is taken
    if (user) { return res.status(409).send({message:"Username is Already Taken"}); }

    // Hash and update the password --> *** SALT == 10 ***

    // Insert the new user data into the database
    const user1 = await db_connect.collection("users").insertOne(myobj);
    id = user1.insertedId;

    // Send the user a valid JWT token with the userID
    const token = jwt.sign({_id:id},process.env.JWTPRIVATEKEY,{expiresIn: "1h"});

    // Return 200 if everything works out
    res.status(200).send({data:token, message:"User Created successfully"});
  } 
  catch (error) { res.status(500).send({message:"Internal Server Error"}); }

});

// SIGNUP API Route
recordRoutes.route("/signup").post(async function (req, res) 
{
  // Connect to MongoDB
  let db_connect = dbo.getDb();
 
 // Input from the User
 let myobj =
  {
   username: req.body.username,
   password: req.body.password,   
   firstname: req.body.firstname,
   lastname: req.body.lastname,
   email: req.body.email,
   color : 0
  };

  try 
  {
    // Check if username is already taken
    const user = await db_connect.collection('users').findOne({username: req.body.username});

    // Return 409 if username is taken
    if (user) { return res.status(409).send({message:"Username is Already Taken"}); }

    // Hash and update the password --> *** SALT == 10 ***
    const hashPassword = await bcrypt.hash(req.body.password,10);
    myobj.password = hashPassword;

    // Insert the new user data into the database
    const user1 = await db_connect.collection("users").insertOne(myobj);
    id = user1.insertedId;

    // Send the user a valid JWT token with the userID
    const token = jwt.sign({_id:id},process.env.JWTPRIVATEKEY,{expiresIn: "1d"});

    // Return 200 if everything works out
    res.status(200).send({data:token, message:"User Created successfully"});
  } 
  catch (error) { res.status(500).send({message:"Internal Server Error"}); }

});

// GETALLMOVIES api call
recordRoutes.route("/getallmovies").get(async function(req, res) {
  
  let db_connect  = dbo.getDb("movieknightdb");

  try
  {
    const movies = await db_connect.collection('masterlist').find({});

    console.log(movies);
    res.json(movies);
  }
  catch(error)
  {
    console.log(error);
    res.status(500).json({message: 'Server error'});
  }

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


 
module.exports = recordRoutes;