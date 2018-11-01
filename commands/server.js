'use strict';

const defaultStore = require(`../store.js`);
const defaultImageStore = require(`../image-store.js`);

const posts = require(`../api/posts`)(defaultStore, defaultImageStore);
const server = require(`../server`);
const logger = require(`../logger`);

const {
  SERVER_PORT = 3000,
  SERVER_HOST = `127.0.0.1`,
} = process.env;

module.exports = {
  name: `server`,
  description: `Starts server`,
  execute() {
    const inputPort = Number.parseInt(process.argv[3], 10);
    const port = inputPort ? inputPort : SERVER_PORT;

    server.initServer(posts).listen(port, () => logger.info(`Server started at: ${SERVER_HOST}:${port}`));
  }
};
