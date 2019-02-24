const winston = require('winston');

const config = require('../config/appConfig');

const logger = winston.createLogger({
    format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.json(),
        winston.format.prettyPrint()
    ),
    level: config.LOG_LEVEL,
    transports: [
        new winston.transports.Console(),
        new winston.transports.File({filename: './logs/app.log'})
    ]
});

module.exports = logger;