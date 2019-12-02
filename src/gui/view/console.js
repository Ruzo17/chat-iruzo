const log4js = require('log4js');


const logger = log4js.getLogger('['+process.pid+'] ' + require('path').basename(__filename).split(".")[0]);
logger.level = "debug";

const srvApi = require('../../server/api/api');

srvApi.init();
window.onload = init;

function init() {
    logger.debug(arguments.callee.name, ' ... ');
    setInterval(getIpList, 12000);
    document.getElementById('consoleInput').addEventListener('keydown', (e) => {if (event.key=='Enter') send(e.target)});
}

function send(consoleInput) {
    logger.debug(arguments.callee.name, ' ... ');
    document.getElementById('consoleOutput').innerHTML = consoleInput.value;
    consoleInput.value = '';
}

function getIpList() {
    logger.debug(arguments.callee.name, '... ');
    let ips = new Array();
    srvApi.getIpList().forEach(current => {
        ips.push(current.ip);
    });
    document.getElementById('net').innerHTML = ips;
}

module.exports.getIpList = getIpList;