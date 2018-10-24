'use strict';

const {MongoClient} = require(`mongodb`);
const logger = require(`../logger`);

const {DB_HOST = `localhost:27017`} = process.env;
const url = `mongodb://${DB_HOST}`;

module.exports = MongoClient.connect(url, {useNewUrlParser: true}).then((client) => client.db(`kekstagramPost`)).catch((e) => {
  logger.error(`Failed to connect to MongoDB`, e);
  process.exit(1);
});
