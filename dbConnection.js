const mongoose = require("mongoose");

// .env config
require("dotenv").config();

// DB URI
const DB_URL = process.env.DB_URL;

// Db connection
async function createDbConnection() {
    try {
        await mongoose.connect(DB_URL);
        console.log('connected to mongoDB successfully');
    } catch (err) {
        console.error(err.message);
    }
}

// Exports
module.exports = { createDbConnection };