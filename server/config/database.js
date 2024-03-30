const mongoose = require("mongoose");
require("dotenv").config();

exports.connect = ()=>{
    mongoose.connect(process.env.MONGODB_URL)
    .then(()=>console.log("Database Connected"))
    .catch((err)=>{
        console.log("Error"+err);
        console.log("Database connection issue");
        process.exit(1);
    })
};