'use strict';

const packageJSON = require(`../package.json`);

module.exports = {
  name: `description`,
  description: `Shows program description`,
  execute() {
    console.log(`${packageJSON.description}`.green);
  }
};
