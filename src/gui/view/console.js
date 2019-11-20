const log4js = require('log4js');

const logger = log4js.getLogger(require('path').basename(__filename).split(".")[0]);
logger.level = "debug";

const srvApi = require('../../server/api/api');

srvApi.init();

function send(consoleInput) {
    logger.debug(arguments.callee.name, '... ');
    document.getElementById('consoleOutput').innerHTML = consoleInput.value;
    consoleInput.value = '';
}

function getArp() {
    logger.debug(arguments.callee.name, '... ');
    logger.info(srvApi.getArp());
    document.getElementById('net').innerHTML = srvApi.getArp();
}

module.exports.getArp = getArp;