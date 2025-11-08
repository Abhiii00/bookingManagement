const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');


const router = express.Router();


// POST /auth/signup
router.post('/signup', async (req, res) => {
const { name, email, password } = req.body;
if (!name || !email || !password) return res.status(400).json({ error: 'All fields required' });
const existing = await User.findOne({ email });
if (existing) return res.status(400).json({ error: 'Email already registered' });
const salt = await bcrypt.genSalt(10);
const hashed = await bcrypt.hash(password, salt);
const user = await User.create({ name, email, password: hashed });
res.status(201).json({ message: 'User created', userId: user._id });
});


// POST /auth/login
router.post('/login', async (req, res) => {
const { email, password } = req.body;
if (!email || !password) return res.status(400).json({ error: 'Email and password required' });
const user = await User.findOne({ email });
if (!user) return res.status(400).json({ error: 'Invalid credentials' });
const match = await bcrypt.compare(password, user.password);
if (!match) return res.status(400).json({ error: 'Invalid credentials' });
const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '7d' });
res.json({ token });
});


module.exports = router;