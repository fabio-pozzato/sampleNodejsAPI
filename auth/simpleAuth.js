const config = require('../config/config');

const adminUsername = config.ADMIN_USERNAME;
const adminPassword = config.ADMIN_PASSWORD;

if (typeof adminUsername === 'undefined' || !adminUsername) {
    throw new Error("ADMIN_USERNAME not defined in environment variables");
}

if (typeof adminPassword === 'undefined' || !adminPassword) {
    throw new Error("ADMIN_PASSWORD not defined in environment variables");
}

exports.authenticate = (username, password) => {
    return new Promise(async (resolve, reject) => {

        if (username === adminUsername && password === adminPassword) {
            resolve(true);
        } else {
            reject(`Could not authenticate user: ${username}`);
        }
    });
};
