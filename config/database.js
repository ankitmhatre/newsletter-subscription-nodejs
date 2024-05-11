const mongoose = require('mongoose');
require('dotenv').config({ path: '.env' }); // Load environment variables


const { MongoClient } = require('mongodb');


const uri = `mongodb://${process.env.MONGO_HOST}:${process.env.MONGO_PORT}/${process.env.MONGO_DBNAME}`;

// Create a new Mongo client

 const d = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
const database = d.db(`${process.env.MONGO_DBNAME}`)

 module.exports = {
  database
 }