const commandList = {
	'--version': 'v0.0.2',
	'--help': 'Доступные команды:\n--help    —view help;\n--version —view app version;',
};

const errorMessage = msg => `Неизвестная команда ${msg}. Чтобы прочитать правила использования приложения, наберите "--help"`;
const command = process.argv[2];

let responseMessage, responseCode = 0, response = console.log;

if (!command) {
  responseMessage = 'Привет пользователь!\nЭта программа будет запускать сервер "Kekstagram".\nАвтор: Grigoriy Andrievskiy.';
} else if (commandList[command]) {
  responseMessage = commandList[command];
} else {
  response = console.error;
  responseMessage = errorMessage(command);
  responseCode = 1;
}

response(responseMessage);
process.exit(responseCode);