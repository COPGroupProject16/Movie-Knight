const express = require("express");

const env = require("dotenv").config({ path: "./config.env" });
 
// recordRoutes is an instance of the express router.
// We use it to define our routes.
// The router will be added as a middleware and will take control of requests starting with path /record.
const recordRoutes = express.Router();
 
// This will help us connect to the database
const dbo = require("../db/conn");
 
// This help convert the id from string to ObjectId for the _id.
const ObjectId = require("mongodb").ObjectId;

//used for hasing passwords
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");


//TESTING A NEW LOGIN ROUTE FORMAT (using JWT)
recordRoutes.route("/record/newlogin",async (req, res) => {
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
});  

 
 
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
   email: req.body.email
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