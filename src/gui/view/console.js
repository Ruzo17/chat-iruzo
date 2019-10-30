var log4js = require('log4js');
var logger = log4js.getLogger(require('path').basename(__filename).split(".")[0]);
function send(consoleInput) {
    logger.debug(arguments.callee.name);
    document.getElementById('consoleOutput').innerHTML = consoleInput.value;
    consoleInput.value = '';
}