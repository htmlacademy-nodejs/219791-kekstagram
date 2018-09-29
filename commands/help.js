'use strict';

module.exports = {
  name: `help`,
  description: `Shows program help`,
  execute() {
    console.log(`Available Commands:\n  --help    —view help;\n  --version —view app version;\n  --license —view app license;\n  --description —view app description;`);
  }
};
