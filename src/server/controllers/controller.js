const log4js = require('log4js');

const manager = require('../app/manager');

const logger = log4js.getLogger(require('path').basename(__filename).split(".")[0]);
logger.level = "debug";

class Controller{
    updateIps() {
        manager.setMemoryArpList(manager.getArp());
        logger.debug('updateIps ... ', manager.getMemoryArpList())
    }
    constructor(){
        logger.debug('constructor ... ');
        this.updateIps();
    }
}

module.exports.Controller = Controller;