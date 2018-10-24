'use strict';

const ValidationError = require(`../error/validation-error`);
const MongoError = require(`mongodb`).MongoError;

const posts = require(`../api/posts`);
const express = require(`express`);

const logger = require(`../logger`);

const {
  SERVER_PORT = 3000,
  SERVER_HOST = `127.0.0.1`,
} = process.env;

module.exports = {
  name: `server`,
  description: `Starts server`,
  onNotFound(req, res) {
    res.status(404).send(`Page was not found`);
  },
  onError(err, req, res, _next) {
    if (err) {
      logger.error(err.message, err);
      if (err instanceof ValidationError) {
        res.status(err.code).json(err.errors);
        return;
      } else if (err instanceof MongoError) {
        res.status(400).json(err.message);
        return;
      }
      res.status(err.code || 500).send(err.message);
    }
  },
  onCors(req, res, next) {
    res.set({
      'Access-Control-Allow-Origin': `*`,
      'Access-Control-Allow-Headers': `Origin, X-Requested-With, Content-Type, Accept`
    });
    next();
  },
  initServer(store, imageStore) {
    const app = express();

    app.use(express.static(`${__dirname}/../static`));
    app.use(`/api/posts`, posts(store, imageStore));
    app.use(this.onCors);
    app.use(this.onNotFound);
    app.use(this.onError);

    return app;
  },
  execute() {
    const inputPort = Number.parseInt(process.argv[3], 10);
    const port = inputPort ? inputPort : SERVER_PORT;

    this.initServer().listen(port, () => logger.info(`Server started at: ${SERVER_HOST}:${port}`));
  }
};
