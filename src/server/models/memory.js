const log4js = require('log4js');

const logger = log4js.getLogger(require('path').basename(__filename).split(".")[0]);
logger.level = "debug";

ipList = new Array();

function init() {
    logger.debug(arguments.callee.name, ' ... ');
}

module.exports.init = init;
module.exports.getIpList = function getIrpList() {
    logger.debug(arguments.callee.name, " ... ", args);
    return ipList;
}
module.exports.setIpList = function setIrpList(args) {
    logger.debug(arguments.callee.name, " ... ", args);
    ipList = args;
}
module.exports.addToIpList = function addToIpList(args) {
    logger.debug(arguments.callee.name, " ... ", args);
    ipList.push(args);
}