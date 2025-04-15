//import 
const mongoose = require("mongoose");
const bcrypt = require('bcrypt');
const Counter = require('./Counter');

//schema
const userSchema = new mongoose.Schema({
    user_ID: {
        type: Number,
    },
    username: {
        type: 'String',
        required: true,
    },
    email: {
        type: 'string',
        required: true,
        unique: true,
        match: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
    },
    password: {
        type: 'string',
        required: true,
        minlength: 8,
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    },
});

//Hashing password before saving it to the database
userSchema.pre('save', async function (next) {
    const doc = this;

    if (doc.isNew && (doc.user_ID === undefined || doc.user_ID === null)) {
        try {
            const counter = await Counter.findByIdAndUpdate(
                { _id: 'user_ID' },
                { $inc: { sequence_value: 1 } },
                { new: true, upsert: true }
            );
            doc.user_ID = counter.sequence_value;
        } catch (err) {
            return next(err);
        }
    }

    if (doc.isModified('password')) {
        doc.password = await bcrypt.hash(doc.password, 10);
    }

    next();
});

//export
const userModels = mongoose.model('user', userSchema);

module.exports = userModels;