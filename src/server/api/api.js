const log4js = require('log4js');
const logger = log4js.getLogger(require('path').basename(__filename).split(".")[0]);
logger.level = "debug";

const manager = require('../app/manager');

function init() {
    logger.debug("init ...");
    manager.init();
}

function getIpList() { return manager.getIpList(); }

module.exports.init = init;
module.exports.getIpList = getIpList;