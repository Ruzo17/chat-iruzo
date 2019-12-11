const log4js = require('log4js');

const logger = log4js.getLogger('['+process.pid+'] ' + require('path').basename(__filename).split(".")[0]);
logger.level = "debug";

const manager = require('../../manager');

const contactImage = require('./processType/contactImage');
const contactStatus = require('./processType/contactStatus');
const globalMessage = require('./processType/globalMessage');
const privateMessage = require('./processType/privateMessage');

function processMessage(msg) {
    logger.debug(arguments.callee.name, ' ... ', msg);

    let msgArray = msg.split('[::@::]');
    let processMessageTypeInfo = msgArray.length == 5 ? msgArray[3] : msgArray[2];
    switch(processMessageTypeInfo) {
        case manager.messageTypeInfo.contactImage:      contactImage.processContactImage(msg); break;
        case manager.messageTypeInfo.contactStatus:     contactStatus.processContactStatus(msg); break;
        case manager.messageTypeInfo.file:              /* TODO */ break;
        case manager.messageTypeInfo.globalMessage:     globalMessage.processGlobalMessage(msg);    break;
        case manager.messageTypeInfo.privateMessage:    privateMessage.processPrivateMessage(msg); break;
        default: logger.error(arguments.callee.name, ' ... Wrong messageTypeInfo > ', msg);
    }
    
}

module.exports.processMessage = processMessage;