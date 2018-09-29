'use strict';

const packageJSON = require(`../package.json`);

module.exports = {
  name: `version`,
  description: `Shows program version`,
  execute() {
    console.log(`v${packageJSON.version}`);
  }
};
