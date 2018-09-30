'use strict';

const packageJSON = require(`../package.json`);

module.exports = {
  name: `version`,
  description: `Shows program version`,
  execute() {
    console.log(`${packageJSON.version.slice(0, 1).red}.${packageJSON.version.slice(2, 3).green}.${packageJSON.version.slice(4, 5).blue}`);
  }
};
