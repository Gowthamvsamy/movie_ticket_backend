const express = require('express');
const Wallet = require('../models/wallet.models');

const walletRouter = require("express").Router();

// post Wallet
walletRouter.post('/', async (req, res) => {
    try {
        const { user_id, balance } = req.body;

        const newWallet = new Wallet({ user_id, balance });
        await newWallet.save();

        return res.status(201).json({
            message: "Created the wallet",
            success: true,
            data: newWallet
        });
    } catch (err) {
        return res.status(500).json({
            message: "Error on creating wallet",
            error: err.message
        })
    }
})

// get Wallet
walletRouter.get('/getWallet', async (req, res) => {
    try {
        const walletBalance = await Wallet.find();
        res.json(walletBalance);
    } catch (err) {
        res.status(500).json({
            message: 'Something went wrong',
            error: err.message
        });
    }
});

// get method using user_id
walletRouter.get('/getWallet/:user_id', async (req, res) => {
    const {user_id} = req.params;

    try {
        const wallet = await Wallet.findOne({user_id});
        if (!wallet) {
          return res.status(404).json({ message: 'Wallet not found' });
        }
        res.json(wallet);
      } catch (err) {
        res.status(500).json({ message: 'Server error', error: err.message });
      }
})

// Patch wallet
walletRouter.patch('/updateWallet/:id', async (req, res) => {
    const { id } = req.params;
    const { balance } = req.body;

    try {
        const updateWallet = await Wallet.findByIdAndUpdate(
            id,
            { balance },
            { new: true }
        );

        res.status(200).json({
            message: "Wallet Balance updated successfully",
            success: true,
            data: updateWallet
        })
    } catch (err) {
        res.status(500).json({
            message: 'Error updating wallet balance',
            error: err.message
        });
    }
});

// Export
module.exports = walletRouter;
