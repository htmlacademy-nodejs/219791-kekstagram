'use strict';

const packageJSON = require(`../package.json`);

module.exports = {
  name: `author`,
  description: `Shows program help`,
  execute() {
    console.log(`Author: ${packageJSON.author}.`.green);
    process.exit(0);
  }
};
