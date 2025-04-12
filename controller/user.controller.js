const userModel = require('../models/user.models');

//Router
const userRouter = require("express").Router();

//Register user
userRouter.post('/', async (req, res) => {
    try {
        const { user_ID, username, email, password, createdAt, updatedAt } = req.body;

        const newUser = new userModel({ user_ID, username, email, password, createdAt, updatedAt });
        await newUser.save();

        return res.status(201).json({
            message: 'User registered successfully',
            success: true,
            data: newUser
        });
    } catch (err) {
        console.error('Error:', err);
        return res.status(500).json({
            message: 'Error registering user',
            error: err.message
        });
    }
});

//exports
module.exports = userRouter;