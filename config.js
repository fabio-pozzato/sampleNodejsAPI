module.exports = {
    ENV : process.env.NODE_ENV || 'dev',
    PORT : process.env.PORT || 5000, exports,
    URL : process.env.BASE_URL || 'http://localhost:3000',
    MONGO_DB_URI : process.env.MONGODB_URI || 'mongodb+srv://admin:CnMRqBp35F37AyDY@customer-rpv2u.mongodb.net/test?retryWrites=true'
};