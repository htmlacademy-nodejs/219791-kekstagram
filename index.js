let commandList = {
	'--version': 'v0.0.1',
	'--help': 'Доступные команды:\n--help    —view help;\n--version —view app version;',
};
let command = process.argv[2];


if (command) {
	if (commandList[command]) {
		console.log(commandList[command]);
		process.exit(0);
	} else {
		console.error(`Неизвестная команда ${command}. Чтобы прочитать правила использования приложения, наберите "--help"`);
		process.exit(1);
	}
} else  {
	console.log('Привет пользователь!\nЭта программа будет запускать сервер "Kekstagram".\nАвтор: Grigoriy Andrievskiy.');
	process.exit(0);
}
