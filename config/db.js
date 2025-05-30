const mongoose = require('mongoose');

connectToDB = () =>{
    mongoose.connect(process.env.MONGO_URL).then(()=>{console.log('connected To DB');
    });
};

module.exports = connectToDB;