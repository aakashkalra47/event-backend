const express = require('express');
const jwt = require('jsonwebtoken');
const User = require('../models/user');

const router = express.Router();

const SECRET = 'secret';

router.post('/signup', async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.create({ email, password });

    const token = jwt.sign({ id: user._id }, SECRET, {
      expiresIn: 864000 //  expires in 10 days
    });

    return res.status(200).json({ auth: true, token, user });
  } catch (error) {
    return res.status(500).json({ message: 'There was a problem registering the user', error });
  }
});

router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email, password });
    console.log('1. user = ', user);

    if (!user) return res.status(404).json({ message: 'email or password not found' });

    const token = jwt.sign({ id: user._id }, SECRET, {
      expiresIn: 864000 // expires in 10 days
    });
    console.log('2. token = ', token);

    return res.status(200).json({ auth: true, token, user });
  } catch (error) {
    return res.status(500).json({ message: 'There was a problem registering the user', error });
  }
});

module.exports = router;
