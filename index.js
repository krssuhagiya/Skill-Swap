require('dotenv').config();
const express = require("express");
const app = express();
const connectToDB = require('./config/db')
const morgan = require('morgan'); 
const cookieParser = require("cookie-parser");


// Import Routes
const authRoutes = require("./routes/auth.routes");
const userProfile = require('./routes/userProfile.routes');
const skillOfferRoutes = require('./routes/skillOffer.routes');

// middleware
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(morgan('dev')); 
app.use(cookieParser());
connectToDB();



// Use Routes
app.use("/api/auth", authRoutes);
app.use("/api/profile", userProfile);
app.use('/api/skill-offers', skillOfferRoutes);
 
app.listen(process.env.PORT , () => {
  console.log("server is running on 3000");
});
