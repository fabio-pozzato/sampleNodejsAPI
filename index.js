const restify = require('restify');
const mongoose = require('mongoose');
const config = require('./config/config');
const restifyJWT = require('restify-jwt-community');

const server = restify.createServer();

server.use(restify.plugins.bodyParser());

server.use(restifyJWT({secret: config.JWT_SECRET}).unless({path: ['/auth']}));

server.listen(config.PORT, () => {
    mongoose.set('useFindAndModify', false);
    mongoose.connect(config.MONGO_DB_URI, {useNewUrlParser: true});
});

const db = mongoose.connection;

// todo: log it
db.on('error', (err) => console.log(err));

db.once('open', () => {
    require('./controller/customers')(server);
    require('./controller/auth')(server);
    console.log('server started on port: '+config.PORT);
});