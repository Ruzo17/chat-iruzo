var log4js = require('log4js');
var logger = log4js.getLogger(require('path').basename(__filename).split(".")[0]);
class Controller{
    constructor(){
        logger.debug(constructor.name);
    }

    
}

module.exports.Controller = Controller;