const dotenv = require('dotenv');
const jwt = require('jsonwebtoken');
dotenv.config();
module.exports = {
    verifyToken: (req, res, next) => {
        const authHeader = req.headers['authorization'];
        console.log(authHeader)

        const token = authHeader && authHeader.split(' ')[1];
        console.log(token)
        if (token == null) return res.sendStatus(401);
        jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
            if (err) return res.sendStatus(403)
            req.nama = decoded.nama
            next()
        })
    }
}
