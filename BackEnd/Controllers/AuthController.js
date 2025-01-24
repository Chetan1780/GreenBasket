const User = require('../models/UserAuth');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
require('dotenv').config();
const register = async (req, res) => {
    try {
        const { email, password, name, mobileNo } = req.body;
        if (!email || !password || !name || !mobileNo) {
            return res.status(400).json({ error: 'All fields are required' });
        }
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ error: 'email already taken' });
        }
        // const generateOTP = () => Math.floor(100000 + Math.random() * 900000).toString();
        // sendMail(email,generateOTP);
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = new User({ email, password: hashedPassword, name, mobileNo });
        user.lastlogin = Date();
        await user.save();
        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET);
        res.status(201).json({ message: 'User registered successfully', token });
    } catch (error) {
        res.status(500).json({ error: 'Registration failed' });
    }
}
const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ error: 'email and password are required' });
        }
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).json({ error: 'User Not Found!!' });
        }
        const passwordMatch = await bcrypt.compare(password, user.password);
        if (!passwordMatch) {
            return res.status(401).json({ error: 'Wrong Password!!' });
        }
        user.lastlogin = Date();
        const token = jwt.sign({ userId: user._id, email: user.email }, process.env.JWT_SECRET, {expiresIn: '24h'});
        res.status(200).json({ message:"Login successfully",token,id: user._id,name:user.name });
    } catch (error) {
        res.status(500).json({ error: 'Login failed' });
    }
}

module.exports = {
    login,
    register
};