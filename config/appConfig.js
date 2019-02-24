module.exports = {
    //App
    ENV : process.env.NODE_ENV || 'dev',
    PORT : process.env.PORT || 5000,
    URL : process.env.BASE_URL || 'http://localhost:3000',
    LOG_LEVEL : process.env.LOG_LEVEL || 'debug',

    // Database
    MONGO_DB_URI : process.env.MONGODB_URI || 'mongodb+srv://admin:CnMRqBp35F37AyDY@customer-rpv2u.mongodb.net/test?retryWrites=true',

    // Authentication
    JWT_SECRET: process.env.JWT_SECRET || 'app_default_dev_secret',
    ADMIN_USERNAME: process.env.ADMIN_USERNAME || 'admin',
    ADMIN_PASSWORD: process.env.ADMIN_PASSWORD || 'password'
};