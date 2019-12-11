const log4js = require('log4js');

const logger = log4js.getLogger('['+process.pid+'] ' + require('path').basename(__filename).split(".")[0]);
logger.level = "debug";

const manager = require('../../manager');

function sendGlobalMessage(msg) {
    logger.debug(arguments.callee.name, ' ... ', msg);

    manager.addToGlobalChat(new Date().toJSON()+'[::@::]'+manager.getIp()+'[::@::]'+msg);
    manager.sendDatagramMessage(manager.messageTypeInfo.globalMessage+'[::@::]'+msg, manager.getIpList());
}

module.exports.sendGlobalMessage = sendGlobalMessage;