const jwt = require('jsonwebtoken');
const User = require('./models/User'); // Assuming your User model is defined here

const authenticateUser = async (req, res, next) => {
    // Check if Authorization header is present
    const authHeader = req.headers.authorization;
    if (!authHeader) {
        return res.status(401).json({ message: 'Authorization header is missing' });
    }

    try {
        // Extract token from Authorization header (Bearer token)
        const token = authHeader.split(' ')[1];
        if (!token) {
            return res.status(401).json({ message: 'Bearer token is missing' });
        }

        // Verify JWT token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findById(decoded.id);

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        
        // Attach user object to request for further middleware or route handlers
        // console.log(user);
        req.userId = decoded.id;
        next(); // Proceed to next middleware or route handler
    } catch (error) {
        console.error('Error authenticating user:', error);
        return res.status(401).json({ message: 'Invalid or expired token' });
    }
};


// Login endpoint
const generateJwtToken = (payload) => {
    return jwt.sign(payload, process.env.JWT_SECRET); // expires in 30 sec {expiresIn: 3000} agar man ho ye daalne ka
}

module.exports = {generateJwtToken,authenticateUser};
