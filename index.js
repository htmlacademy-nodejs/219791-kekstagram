'use strict';

require(`colors`);

const version = require(`./commands/version.js`);
const help = require(`./commands/help.js`);
const error = require(`./commands/error.js`);
const empty = require(`./commands/empty.js`);
const license = require(`./commands/license.js`);
const description = require(`./commands/description.js`);

const commandList = {version, help, license, description};
const command = process.argv[2].slice(2);

if (!command) {
  empty.execute();
  process.exit(0);
} else if (commandList[command] && `--${command}` === process.argv[2]) {
  commandList[command].execute();
  process.exit(0);
} else {
  error.execute(process.argv[2]);
  process.exit(1);
}
