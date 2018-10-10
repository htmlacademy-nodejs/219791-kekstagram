'use strict';

require(`colors`);

const version = require(`./commands/version.js`);
const help = require(`./commands/help.js`);
const error = require(`./commands/error.js`);
const empty = require(`./commands/empty.js`);
const license = require(`./commands/license.js`);
const description = require(`./commands/description.js`);
const server = require(`./commands/server.js`);

const fileCreator = require(`./fileCreator.js`);

const commandList = {version, help, license, description, server};
let command = process.argv[2];
command = (command && command.slice(0, 2) === `--`) ? command.slice(2) : command;

if (!command) {
  empty.execute();
  fileCreator.create();
} else if (commandList[command]) {
  commandList[command].execute();
} else {
  error.execute(process.argv[2]);
}
