require('dotenv').config();
const express = require("express");
const app = express();
const connectToDB = require('./config/db')
connectToDB();

// Import Routes
const userRoute = require("./routes/users.routes");

// middleware
app.use(express.json());

// Use Routes
app.use('/user',userRoute);
 
app.listen(process.env.PORT , () => {
  console.log("server is running on 3000");
});
