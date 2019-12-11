const log4js = require('log4js');

const logger = log4js.getLogger('['+process.pid+'] ' + require('path').basename(__filename).split(".")[0]);
logger.level = "debug";

const manager = require('../../manager');
const os = require('os');

function disconnectUser(userName) {
    let contactUser = new manager.contact.Contact(manager.getIp,41234,null,null,null,null,online);
    let ipList = manager.getIpList();
    let lock = null;
    for (let i = 0; i < ipList.length; i++) {
        const current = ipList[i];
        if(current.ip == contactUser.ip) {
            lock = current.id;
            ipList.splice(i, 1, contactUser);
        }
    }
    let contactList = manager.getContacts();
    for (let i = contactList.length; i >= 0; i--) {
        const current = contactList[i];
        ipList.splice(i, 1);
    }
    manager.setActualLoggedUser(null);
    if(lock == null) {
        manager.sendDatagramMessage(manager.messageTypeInfo.contactStatus+'[::@::]disconnect');
    } else {
        manager.sendDatagramMessage(lock+'[::@::]'+manager.messageTypeInfo.contactStatus+'[::@::]disconnect');
    }
}

module.exports.disconnectUser = disconnectUser;