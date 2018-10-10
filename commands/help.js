'use strict';

module.exports = {
  name: `help`,
  description: `Shows program help`,
  text: {
    help: `  --help    —view help;\n`,
    version: `  --version —view app version;\n`,
    license: `  --license —view app license;\n`,
    description: `  --description —view app description;`,
    server: `  --server —starts server;`
  },
  execute() {
    console.log(`Available Commands:\n`);
    for (let key in this.text) {
      if (this.text.hasOwnProperty(key)) {
        console.log(key.grey, this.text[key].green);
      }
    }
    process.exit(0);
  }
};
