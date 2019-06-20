const { Authorize } = require('./../config/token');

module.exports = app => {

    
    app.use(require('./loginRoutes'))
    
    app.all('*', (req, res, next) => {
        req.method === "OPTIONS"
            ? next()
            : Authorize(req, res, next);
    });

    app.use(require('./feedRoutes'));
    app.use(require('./likeRoutes'));
}
