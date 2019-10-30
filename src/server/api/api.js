
const controller = require('../controllers/controller');

function init() {
    var log4js = require('log4js');
    var logger = log4js.getLogger(require('path').basename(__filename).split(".")[0]);
    console.log('aaa');
    logger.debug('aaaaaaaaaaaaaaa');
    setTimeout(() => {new controller.Controller();}, 500);
}

module.exports.init = init;