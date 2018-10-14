'use strict';

module.exports = {
  name: `error`,
  description: `Shows error message`,
  execute(msg) {
    console.log(`Unknown command: ${msg.red}. Try "--help" to view available commands`);
    process.exit(1);
  }
};
