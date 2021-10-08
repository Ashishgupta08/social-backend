const jwt = require('jsonwebtoken')
const secret = process.env['SECRET'];

function authorizedUser(req, res, next) {
    const token = req.headers.authorization;
    try {
        const decode = jwt.verify(token, secret);
        req.body = { ...req.body, username: decode.username, userId: decode.userId };
        return next();
    } catch (e) {
        return res.status(401).json({
        success: false,
        error: e.message,
        result: "Login to proceed further."
        })
    }
}

module.exports = { authorizedUser }