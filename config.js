exports.DATABASE_URL = process.env.DATABASE_URL || global.DATABASE_URL || 'mongodb://admin:administrator1@ds115971.mlab.com:15971/where-is-it';
exports.TEST_DATABASE_URL = process.env.TEST_DATABASE_URL || 'mongodb://admin:administrator1@ds115971.mlab.com:15971/where-is-it';
exports.PORT = process.env.PORT || 3000;
