'use strict';

const logger = require(`../logger`);
const packageJSON = require(`../package.json`);

module.exports = {
  name: `license`,
  description: `Shows program license`,
  execute() {
    logger.info(`${packageJSON.license}`.grey);
    process.exit(0);
  }
};
