const jwt = require('jsonwebtoken');

module.exports = {

    async GenerateToken({ id, name, email }) {

        return jwt.sign({ id, name, email }, process.env.SALT_KEY_JWT, {
            expiresIn: '1d' // expires in 24 hours
        });
    },


    async DecodedToken(token, res) {

        if (!token) {
            return false;
        } else {
            jwt.verify(token, process.env.SALT_KEY_JWT, (err, decoded) => {
                if (err) {
                    res.status(200).json({ token: false });
                } else {

                    if (decoded) {
                        res.status(200).json( decoded );
                    } else {
                        res.status(200).json({ token: false });
                    }
                }

            });
    }
},


    async Authorize(req, res, next) {
    let token = req.headers['authorization'] || req.body.token || req.query.token;

    if (!token) {
        res.status(401).json({
            message: 'Token inválido'
        });
    } else {

        jwt.verify(token, process.env.SALT_KEY_JWT, (err, decoded) => {
            if (err) {
                res.status(401).json({
                    success: false,
                    message: 'Token inválido'
                });
            } else {
                req.body.token = decoded;
                next();
            }
        });
    }
},

}