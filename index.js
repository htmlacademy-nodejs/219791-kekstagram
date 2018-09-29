'use strict';

const version = require(`./commands/version.js`);
const help = require(`./commands/help.js`);
const error = require(`./commands/error.js`);
const empty = require(`./commands/empty.js`);
const license = require(`./commands/license.js`);
const description = require(`./commands/description.js`);

const commandList = [version, help, license, description].reduce((accum, module) => {
  accum[`--${module.name}`] = module;
  return accum;
}, {});

const command = process.argv[2];

if (!command) {
  empty.execute(command);
  process.exit(0);
} else if (commandList[command]) {
  commandList[command].execute();
  process.exit(0);
} else {
  error.execute(command);
  process.exit(1);
}
