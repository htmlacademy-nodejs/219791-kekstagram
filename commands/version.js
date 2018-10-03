'use strict';

const packageJSON = require(`../package.json`);

module.exports = {
  name: `version`,
  description: `Shows program version`,
  execute() {
    const version = packageJSON.version.split(`.`);
    console.log(`${version[0].red}.${version[1].green}.${version[2].blue}`);
  }
};
