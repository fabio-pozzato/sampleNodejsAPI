const restify = require('restify');
const mongoose = require('mongoose');
const config = require('./config');

const server = restify.createServer();
server.use(restify.plugins.bodyParser());
server.listen(config.PORT, () => {
    mongoose.connect(config.MONGO_DB_URI, {useNewUrlParser: true});
});

const db = mongoose.connection;

// todo: log it
db.on('error', (err) => console.log(err));

db.once('open', () => {
    require('./controller/customers')(server);
    console.log('server started on port: '+config.PORT);
});