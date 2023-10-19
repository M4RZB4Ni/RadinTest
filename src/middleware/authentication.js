const jwt = require('jsonwebtoken');

const secretKey = 'c8c3a8b1d1e04ef2a899e8e7a574f40555b62a371bd8f4e9b0a558d599de4fa5';
const verifyToken = (req, res, next) =>
{
    // Extract the token from the request headers
    const token = req.headers['authorization'];

    if (!token)
    {
        return res.status(403).json({ success: false, message: 'No token provided.' });
    }

    // Verify the token
    jwt.verify(token, secretKey, (err, decoded) =>
    {
        if (err)
        {
            return res.status(401).json({ success: false, message: 'Failed to authenticate token.' });
        }

        // Save the decoded user information for further use in the request
        req.user = decoded;
        next();
    });
};


module.exports = {
    verifyToken
};
