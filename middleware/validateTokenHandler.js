const expressAsyncHandler = require('express-async-handler');
const jwt = require('jsonwebtoken');

const validateToken = expressAsyncHandler(async (req, res, next) => {
    let token;
    let authHeader = req.headers.Authorization || req.headers.authorization;
    
    if (authHeader && authHeader.startsWith("Bearer ")) {
        token = authHeader.split(" ")[1];
        jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
            if (err) {
                res.status(401);
                throw new Error("User is not authorized");
            }
            console.log(decoded);
            req.user = decoded.user;
            next();
        });
    } else {
        res.status(401);
        throw new Error("Authentication token must be provided");
    }
});

module.exports = validateToken;
