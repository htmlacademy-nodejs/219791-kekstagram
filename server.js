'use strict';

const ValidationError = require(`./error/validation-error`);
const MongoError = require(`mongodb`).MongoError;

const express = require(`express`);
const logger = require(`./logger`);

module.exports = {
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
  initServer(posts) {
    const app = express();

    app.use(express.static(`${__dirname}/../static`));
    app.use(`/api/posts`, posts);
    app.use(this.onCors);
    app.use(this.onNotFound);
    app.use(this.onError);

    return app;
  }
};
