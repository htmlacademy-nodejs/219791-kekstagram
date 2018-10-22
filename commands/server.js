'use strict';

const ValidationError = require(`../error/validation-error`);
const MongoError = require(`mongodb`).MongoError;

module.exports = {
  name: `server`,
  description: `Starts server`,
  onNotFound(req, res) {
    res.status(404).send(`Page was not found`);
  },
  onError(err, req, res, _next) {
    if (err) {
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
  initServer(store, imageStore) {
    const posts = require(`../api/posts`)(store, imageStore);
    const express = require(`express`);
    const app = express();

    app.use(express.static(`${__dirname}/../static`));
    app.use(`/api/posts`, posts);
    app.use(this.onNotFound);
    app.use(this.onError);

    return app;
  },
  execute() {
    const hostname = `127.0.0.1`;
    const inputPort = Number.parseInt(process.argv[3], 10);
    const port = inputPort ? inputPort : 3000;
    const store = require(`../store.js`);
    const imageStore = require(`../imageStore.js`);
    this.initServer(store, imageStore).listen(port, () => console.log(`Server started at: ${hostname}:${port}`));
  }
};
