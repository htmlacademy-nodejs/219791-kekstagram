'use strict';

module.exports = {
  name: `helloUser`,
  description: `Shows program help`,
  execute() {
    console.log(`Hello user!\n${`This program will start "Kekstagram" server.\nAuthor: Grigoriy Andrievskiy.`.green}`);
    process.exit(0);
  }
};
