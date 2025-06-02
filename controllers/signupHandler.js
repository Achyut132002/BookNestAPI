
const User = require('../models/User');
const bcrypt = require('bcrypt');

const jwt = require('jsonwebtoken');

const signupHandler = async (req, res) => {
    const { name, email, password, isAdmin } = req.body;
    try {
        
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists' });
        }

        
        const hashedPassword = await bcrypt.hash(password, 10);

        
        const newUser = new User({
            name,
            email,
            password: hashedPassword,
            isAdmin: isAdmin || false,

        });

        await newUser.save();
        res.status(201).json({ message: 'User created successfully',user:newUser });
    } catch (error) {
        console.error('Error signing up:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
}

module.exports = { signupHandler };