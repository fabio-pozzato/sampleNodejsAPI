const errors = require('restify-errors');
const jwt = require('jsonwebtoken');

const config = require('../config/appConfig');
const auth = require('../auth/simpleAuth');

module.exports = server => {
    server.post('/auth', async (req, res, next) => {
        const {username, password}  = req.body;

        try {
            let isAuthenticated = await auth.authenticate(username, password);
            console.log('User authenticated:'+isAuthenticated);

            const token = jwt.sign({username: username}, config.JWT_SECRET, {
                expiresIn: '30m'
            });

            const {iat, exp} = jwt.decode(token);
            res.send({iat, exp, token});
            next();
        } catch (err) {
            return next(new errors.UnauthorizedError(err));
        }
    });
};