const dotenv = require('dotenv');
dotenv.config();
module.exports = {

    authKey: (req, res, next) => {
        const authHeader = req.headers['authorization'];
        console.log(authHeader)
        if (authHeader == undefined) return res.sendStatus(401);
        const token = authHeader.split(' ')[1];
        console.log(token)
        if (token == null) return res.sendStatus(401);
        try {
            req.token = token
            next()
        } catch (error) {
            res.sendStatus(401)
        }


    }
}
