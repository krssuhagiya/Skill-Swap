require('dotenv').config();
const express = require("express");
const app = express();
const connectToDB = require('./config/db')
const morgan = require('morgan'); 
const cookieParser = require("cookie-parser");


// Import Routes
const authRoutes = require("./routes/auth");


// middleware
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(morgan('dev')); 
app.use(cookieParser());
connectToDB();



// Use Routes
app.use("/api/auth", authRoutes);
 
app.listen(process.env.PORT , () => {
  console.log("server is running on 3000");
});
