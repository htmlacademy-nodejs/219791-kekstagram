'use strict';

const commandList = {
  '--version': `v0.0.2`,
  '--help': `Доступные команды:\n--help    —view help;\n--version —view app version;`,
};

const errorMessage = (msg) => `Неизвестная команда ${msg}. Чтобы прочитать правила использования приложения, наберите "--help"`;
const command = process.argv[2];

if (!command) {
  console.log(`Привет пользователь!\nЭта программа будет запускать сервер "Kekstagram".\nАвтор: Grigoriy Andrievskiy.`);
  process.exit(0);
} else if (commandList[command]) {
  console.log(commandList[command]);
  process.exit(0);
} else {
  console.error(errorMessage(command));
  process.exit(1);
}

