'use strict';

module.exports = {
  name: `help`,
  description: `Shows program help`,
  text: {
    help: `  --help    —view help;\n`,
    version: `  --version —view app version;\n`,
    license: `  --license —view app license;\n`,
    description: `  --description —view app description;\n`,
    server: `  --server —starts server;\n`,
    fill: `  --fill —fills database with 25 generated objects;`
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
