'use strict';

const express = require(`express`);
const posts = require(`../api/posts`);

module.exports = {
  name: `server`,
  description: `Starts server`,
  onNotFound(req, res) {
    res.status(404).send(`Page was not found`);
  },
  onError(err, req, res, _next) {
    if (err) {
      console.error(err);
      res.status(err.code || 500).send(err.message);
    }
  },
  initServer() {
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
    this.initServer().listen(port, () => console.log(`Server started at: ${hostname}:${port}`));
  }
};
