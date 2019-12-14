const log4js = require('log4js');

const logger = log4js.getLogger('['+process.pid+'] ' + require('path').basename(__filename).split(".")[0]);
logger.level = "debug";

const manager = require('../../manager');
const os = require('os');

function disconnectUser(userName) {
    let actualLoggedUser = manager.getActualLoggedUser();
    let contactList = manager.getContacts();
    for (let i = contactList.length; i >= 0; i--) {
        const current = contactList[i];
        if(current != undefined && current.id == actualLoggedUser.id) {
            contactList.splice(i, 1);
        }
    }
    manager.setContacts(contactList);
    manager.sendDatagramMessage(actualLoggedUser.id+'[::@::]'+manager.messageTypeInfo.contactStatus+'[::@::]disconnect', manager.getIpList());
    manager.setActualLoggedUser(null);
}

module.exports.disconnectUser = disconnectUser;