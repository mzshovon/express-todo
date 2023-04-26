const jwt = require('jsonwebtoken');
const userVerificationMiddleware = (req, res, next) => {
    const {authorization} = req.headers;

    try {
        const token = authorization.split(" ")[1];
        const decodedValue = jwt.verify(token, process.env.JWT_TOKEN);
        const {username, userId} = decodedValue;
        req.username = username;
        req.userId = userId;
        next();
    } catch (err) {
        next("Authentication error! Probably token expired!");
    }
}

module.exports = userVerificationMiddleware;