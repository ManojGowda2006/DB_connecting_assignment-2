const express = require('express');
const { resolve } = require('path');
const User  = require("./schema");
const app = express();
const port = 3010;
const mongoose = require("mongoose");
require('dotenv').config()


mongoose.connect(process.env.db_URL)
.then(console.log("Connected to Database"))
.catch((err) => console.log("Error connecting to database"));

app.use(express.static('static'));
app.use(express.json());

app.get('/', (req, res) => {
  res.sendFile(resolve(__dirname, 'pages/index.html'));
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});

app.post("/api/users", async(req,res) => {
  try{
  const {name,email,password} = req.body;
  
  if(!name || !email || !password){
    res.status(400).send("All fields are required");
  }
  const newUser = new User({name,email,password})
  await newUser.save();

  console.log(newUser);
  }
  catch{
    res.status(500).send("Internal server error");
  }
  res.status(201).send("data stored successfully");
  
})