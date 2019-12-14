const log4js = require('log4js');

const logger = log4js.getLogger('['+process.pid+'] ' + require('path').basename(__filename).split(".")[0]);
logger.level = "debug";

const manager = require('../../../manager');
const os = require('os');

function processGlobalMessage(msg) {
    let msgArray = msg.split('[::@::]');
    if(process.platform == 'win32'){
        filePath = os.homedir() + '\\chat-iruzo\\globalChatLog';
    }
    let globalChat = manager.readFile(filePath);
    if(msgArray.length == 5) {
        manager.writeFile(filePath, globalChat + '/n' + msgArray[0]+'[::@::]'+msgArray[2]+'[::@::]'+msgArray[4]);
        manager.addToGlobalChat(msgArray[0]+'[::@::]'+msgArray[2]+'[::@::]'+msgArray[4]);
    } else {
        manager.writeFile(filePath, globalChat + '/n' + msgArray[0]+'[::@::]'+msgArray[1]+'[::@::]'+msgArray[3]);
        manager.addToGlobalChat(msgArray[0]+'[::@::]'+msgArray[1]+'[::@::]'+msgArray[3]);
    }
}

module.exports.processGlobalMessage = processGlobalMessage;