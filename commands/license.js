'use strict';

const packageJSON = require(`../package.json`);

module.exports = {
  name: `license`,
  description: `Shows program license`,
  execute() {
    console.log(`${packageJSON.license}`);
  }
};
