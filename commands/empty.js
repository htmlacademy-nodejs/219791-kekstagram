'use strict';

const readline = require(`readline`);
const version = require(`./version.js`);
const help = require(`./help.js`);
const author = require(`./author.js`);
const license = require(`./license.js`);
const description = require(`./description.js`);
const server = require(`./server.js`);
const fill = require(`./fill.js`);
const fileCreator = require(`../file-creator.js`);

const commandList = {version, help, author, license, description, server, fill};

module.exports = {
  name: `helloUser`,
  description: `Shows program help`,
  execute() {
    console.log(`Hello user!\n${`This program will start "Kekstagram" server.\nAuthor: Grigoriy Andrievskiy.`.green}`);

    const rl = readline.createInterface(process.stdin, process.stdout);
    rl.setPrompt(`Print "help" or to view avaliable command list,\n"generate" to generate and save json file with random post data\nor just leave empty message to close application: `);
    rl.prompt();
    rl.on(`line`, (line) => {
      if (line === `help`) {
        rl.close();
        this.viewHelp();
      } else if (line === `generate`) {
        rl.close();
        fileCreator.create();
      } else if (line.trim() === ``) {
        rl.close();
        process.exit(0);
      } else {
        rl.setPrompt(`Print "help" or "generate" or leave empty message: `);
        rl.prompt();
      }
    }).on(`close`, () => {});
  },
  viewHelp() {
    const helpText = help.text;
    console.log(`Available Commands:\n`);
    for (let key in helpText) {
      if (helpText.hasOwnProperty(key)) {
        console.log(key.grey, helpText[key].green);
      }
    }
    this.askNext();
  },
  askNext() {
    const rl = readline.createInterface(process.stdin, process.stdout);
    rl.setPrompt(`Would you like to execute one of commands above?\nPrint command's name to execute it or leave empty message to close application: `);
    rl.prompt();
    rl.on(`line`, (line) => {
      if (commandList[line]) {
        rl.close();
        commandList[line].execute();
      } else if (line.trim() === ``) {
        rl.close();
        process.exit(0);
      } else {
        rl.setPrompt(`Print on of commands name or leave empty message: `);
        rl.prompt();
      }
    }).on(`close`, () => {});
  }
};
