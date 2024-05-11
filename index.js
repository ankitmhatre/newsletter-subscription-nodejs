require('dotenv').config({ path: '.env' }); // Load environment variables


const mongoose = require('mongoose');

const http = require("http");
const app = require('./app'); // Import your Express application
const port = process.env.PORT || 3001; // Use environment variable or default to 3000


const uri = `mongodb://${process.env.MONGO_HOST}:${process.env.MONGO_PORT}/${process.env.MONGO_DBNAME}`;



mongoose.connect(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('Connected to MongoDB'))
.catch(err => console.error('Error connecting to MongoDB:', err));




http.createServer(app).listen(port, () => {
    console.log(`Example app listening on port ${port}`);   
  });


