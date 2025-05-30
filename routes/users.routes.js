const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.send("all users");
});

router.get("/register", (req,res)=>{
    
})

module.exports = router;
