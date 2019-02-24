const restify = require('restify');
const mongoose = require('mongoose');
const restifyJWT = require('restify-jwt-community');

const config = require('./config/appConfig');
const logger = require('./config/loggerConfig');

const server = restify.createServer();

server.use(restify.plugins.bodyParser());

server.use(restifyJWT({secret: config.JWT_SECRET}).unless({path: ['/auth']}));

server.listen(config.PORT, () => {
    mongoose.set('useFindAndModify', false);
    mongoose.connect(config.MONGO_DB_URI, {useNewUrlParser: true});
});

const db = mongoose.connection;

db.on('error', (err) => logger.error(err));

db.once('open', () => {
    require('./controller/customers')(server);
    require('./controller/auth')(server);
    logger.info(`server started on port: ${config.PORT}`);
});