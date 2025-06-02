const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const { JWT_SECRET } = process.env; 
const {JWT_EXPIRATION} = process.env;

const loginHandler = async (req, res) => {
    const { email, password} = req.body;
    try {
        
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }

        
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }

        
        const token = jwt.sign({ id: user._id , isAdmin: user.isAdmin }, JWT_SECRET, {
            expiresIn: JWT_EXPIRATION || '1h' 
        });
        res.status(200).json({message:'Successfully logged in',token:token });

    }
    catch (error) {
        console.error('Error logging in:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
}

module.exports = { loginHandler };
