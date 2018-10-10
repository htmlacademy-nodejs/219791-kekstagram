'use strict';

const http = require(`http`);
const url = require(`url`);
const fs = require(`fs`);
const {promisify} = require(`util`);

const path = require(`path`);
const contentTypes = {
  'css': `text/css`,
  'html': `text/html; charset=UTF-8`,
  'jpg': `image/jpeg`,
  'ico': `image/x-icon`
};

module.exports = {
  name: `server`,
  description: `Starts server`,
  execute() {
    const stat = promisify(fs.stat);
    const readdir = promisify(fs.readdir);
    const readfile = promisify(fs.readFile);

    const printDirectory = (dirPath, relativePath, files) => {
      return `<!DOCTYPE html>
      <html lang="en">
      <head>
          <meta charset="UTF-8">
          <title>Directory content</title>
      </head>
      <body>
      <ul>
          ${files.map((it) => `<li><a href="${relativePath}${it}/">${it}</a></li>`).join(``)}
      </ul>
      </body>
      </html>`;
    };

    const readFile = async (dirPath, res) => {
      const data = await readfile(dirPath);
      const type = path.extname(dirPath).slice(1);
      const header = contentTypes[type] ? contentTypes[type] : `text/plain`;
      res.setHeader(`content-type`, header);
      res.end(data);
    };

    const readDir = async (dirPath, relativePath, res) => {
      const files = await readdir(dirPath);
      res.setHeader(`content-type`, `text/html`);
      res.end(printDirectory(dirPath, relativePath, files));
    };

    const hostname = `127.0.0.1`;
    const port = process.argv[3] ? process.argv[3] : 3000;

    const server = http.createServer((req, res) => {
      const localPath = url.parse(req.url).pathname;
      const absolutePath = path.resolve(__dirname, `../static/${localPath}/`);
      (async () => {
        try {
          const pathStat = await stat(absolutePath);
          res.statusCode = 200;
          res.statusMessage = `OK`;

          if (pathStat.isDirectory()) {
            await readDir(absolutePath, localPath, res);
          } else {
            await readFile(absolutePath, res);
          }
        } catch (e) {
          res.writeHead(404, `Not Found`);
          res.end();
        }
      })().catch((e) => {
        res.writeHead(500, e.message, {
          'content-type': `text/plain`
        });
        res.end(e.message);
      });
    });

    const serverAddress = `http://${hostname}:${port}`;
    server.listen(port, hostname, () => {
      console.log(`Server running at ${serverAddress}/`);
    });
  }
};
