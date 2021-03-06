const log4js = require('log4js');

const manager = require('../app/manager');

const logger = log4js.getLogger('['+process.pid+'] ' + require('path').basename(__filename).split(".")[0]);
logger.level = "debug";

class Controller{
    updateIps() {
        logger.debug('updateIps ... ');
        setInterval(()=>{
            manager.netScan();
        }, 10000);
    }
    constructor(){
        logger.debug('constructor ... ');
        this.updateIps();
    }
}

module.exports.Controller = Controller;