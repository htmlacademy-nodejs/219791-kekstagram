'use strict';

const readline = require(`readline`);
const generator = require(`./generateEntity.js`);

const fs = require(`fs`);
const path = require(`path`);

module.exports = {
  create() {
    console.log(`path basename`, path.resolve(__dirname, `../`));

    const rl = readline.createInterface(process.stdin, process.stdout);
    rl.setPrompt(`Would you like to generate entities? (yes/no): `);
    rl.prompt();
    rl.on(`line`, (line) => {
      if (line === `no`) {
        rl.close();
        process.exit(0);
      } else if (line === `yes`) {
        rl.close();
        this.inputNumber();
      } else {
        rl.setPrompt(`Print "yes" or "no": `);
        rl.prompt();
      }
    }).on(`close`, () => {});
  },
  inputNumber() {
    const rl = readline.createInterface(process.stdin, process.stdout);
    rl.setPrompt(`How many entities? (integer): `);
    rl.prompt();
    rl.on(`line`, (line) => {
      line = parseInt(line, 10);
      if (Number.isInteger(line) && line > 0) {
        rl.close();
        this.generate(line);
      } else if (line === 0) {
        console.log(`Was generated 0 entities`);
        process.exit(0);
      } else {
        rl.setPrompt(`Input integer: `);
        rl.prompt();
      }
    }).on(`close`, () => {});
  },
  generate(number) {
    const entities = [];
    for (let i = 0; i < number; i++) {
      entities.push(generator());
    }
    this.getDir(JSON.stringify(entities));
  },
  getDir(data) {
    const rl = readline.createInterface(process.stdin, process.stdout);
    rl.setPrompt(`Choose directory to save file ${__dirname}: `);
    rl.prompt();
    rl.on(`line`, (line) => {
      const savePath = path.resolve(__dirname, line);
      fs.open(savePath, `r`, (err) => {
        if (err) {
          rl.setPrompt(`Choose correct directory to save file ${__dirname}: `);
          rl.prompt();
        } else {
          rl.close();
          this.getName(savePath, data);
        }
      });
    }).on(`close`, () => {});
  },
  getName(savePath, data) {
    const rl = readline.createInterface(process.stdin, process.stdout);
    rl.setPrompt(`Enter file name: `);
    rl.prompt();
    rl.on(`line`, (line) => {
      fs.open(`${savePath}/${line}.json`, (err) => {
        if (err.code === `EEXIST`) {
          rl.close();
          this.saveFile(savePath, line, data);
        } else {
          rl.close();
          this.reWrite(savePath, line, data);
        }
      });
    }).on(`close`, () => {});
  },
  reWrite(savePath, name, data) {
    const rl = readline.createInterface(process.stdin, process.stdout);
    rl.setPrompt(`File with name ${name}.json already exists. Would you like to re-write old file? (yes/no): `);
    rl.prompt();
    rl.on(`line`, (line) => {
      if (line === `yes`) {
        rl.close();
        this.saveFile(savePath, name, data);
      } else if (line === `no`) {
        rl.close();
        console.log(`Choose anoter file name.`);
        this.getName(savePath, data);
      } else {
        rl.setPrompt(`Print "yes" or "no": `);
        rl.prompt();
      }
    }).on(`close`, () => {});
  },
  saveFile(savePath, name, data) {
    fs.writeFileSync(`${savePath}/${name}.json`, data, `utf-8`);
    console.log(`${name}.json created at ${savePath}`);
    process.exit(0);
  }
};
