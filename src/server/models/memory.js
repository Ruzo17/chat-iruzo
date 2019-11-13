const log4js = require('log4js');

const logger = log4js.getLogger(require('path').basename(__filename).split(".")[0]);
logger.level = "debug";

var arpList = new Array();

function init() {
    logger.debug(arguments.callee.name, '... ');
}

module.exports.init = init;
module.exports.getArpList = function () {
    return arpList;
}
module.exports.setArpList = function (args) {
    arpList[0] = args;
}