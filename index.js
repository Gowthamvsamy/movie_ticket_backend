const express = require("express");
const { createDbConnection } = require("./dbConnection");
const cors = require("cors");
const mongoose = require('mongoose');
const registerControll = require('./controller/user.controller');
const loginController = require('./controller/login.controll')
const movieController = require('./controller/movies.controll')
const bookingController = require('./controller/booking.controll')
const WalletController = require('./controller/wallet.controll')

const API_SERVER = express();

require('dotenv').config();

// Middleware
API_SERVER.use(cors());
API_SERVER.use(express.json());

//controllers injections
API_SERVER.use('/register', registerControll);
API_SERVER.use('/login', loginController);
API_SERVER.use('/movies', movieController)
API_SERVER.use('/booking', bookingController)
API_SERVER.use('/wallet', WalletController)


// DB connection
createDbConnection()
    .then(() => console.log('Connected to MongoDB'))
    .catch((error) => console.error('Error connecting to MongoDB:', error));


API_SERVER.listen(process.env.PORT, process.env.HOSTNAME, function () {
    console.log("server start");
    console.log(`http://${process.env.HOSTNAME}:${process.env.PORT}`);
})