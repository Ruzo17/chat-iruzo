const log4js = require('log4js');

const logger = log4js.getLogger('['+process.pid+'] ' + require('path').basename(__filename).split(".")[0]);
logger.level = "debug";

const manager = require('../../../manager');

function processGlobalMessage(msg) {
    let msgArray = msg.split('[::@::]');
    if(msgArray.length == 5) {
        manager.addToGlobalChat(msgArray[0]+'[::@::]'+msgArray[2]+'[::@::]'+msgArray[4]);
    } else {
        manager.addToGlobalChat(msgArray[0]+'[::@::]'+msgArray[1]+'[::@::]'+msgArray[3]);
    }
}

module.exports.processGlobalMessage = processGlobalMessage;