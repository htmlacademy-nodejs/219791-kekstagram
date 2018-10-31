'use strict';

module.exports = {
  name: `author`,
  description: `Shows program help`,
  execute() {
    console.log(`Author: Grigoriy Andrievskiy.`.green);
    process.exit(0);
  }
};
