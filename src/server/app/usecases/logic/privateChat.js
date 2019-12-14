const log4js = require('log4js');

const logger = log4js.getLogger('['+process.pid+'] ' + require('path').basename(__filename).split(".")[0]);
logger.level = "debug";

const manager = require('../../manager');

function getPrivateMessages(contact) {
    logger.debug(arguments.callee.name, ' ... ', contact);

    let privateChat = manager.getPrivateChat();
    let privateChatFiltered = new Array();
    let contactAdded = contact.id != null;
    for (let i = 0; i < privateChat.length; i++) {
        const current = privateChat[i];
        if(contactAdded) {
            if(current.indexOf(contact.id)) {
                privateChatFiltered.push(current);
            }
        } else {
            if(current.indexOf(contact.ip)) {
                privateChatFiltered.push(current);
            }
        }
        
    }
    return privateChatFiltered;
}

function sendPrivateMessage(msg, contact) {
    logger.debug(arguments.callee.name, ' ... ', contact, ' > ', msg);

    let contacts = new Array();
    contacts.push(contact);
    manager.sendDatagramMessage(manager.messageTypeInfo.privateMessage+'[::@::]'+msg, contacts);
}

module.exports.getPrivateMessages = getPrivateMessages;
module.exports.sendPrivateMessage = sendPrivateMessage;