const log4js = require('log4js');

const logger = log4js.getLogger('['+process.pid+'] ' + require('path').basename(__filename).split(".")[0]);
logger.level = "debug";

const manager = require('../../../manager');

function processContactStatus(msg) {
    logger.debug(arguments.callee.name, ' ... ', msg);

    let msgArray = msg.split('[::@::]');
    if(msgArray.length == 5) {
        let contacts = manager.getContacts();
        let existContact = false;
        for (let i = 0; i < contacts.length; i++) {
            const current = contacts[i];
            if(current.id == msgArray[2]) {
                let contactAux = new manager.contact.Contact(current.ip, current.port, current.id, current.userName, current.nickName, current.alias, msgArray[3]);
                if(msgArray[3] == 'disconnect') {
                    contacts.splice(i, 1);
                } else {
                    contacts.splice(i, 1, contactAux);
                }
                existContact = true;
            }
        }
        if(!existContact) {
            let ipList = manager.getIpList();
            ipList.push(new manager.contact.Contact(msgArray[1], 41234, msgArray[2], null, null, null, msgArray[3]));
            manager.setIpList(ipList);
        }
    } else {
        let ipList = manager.getIpList();
        let existIp = false;
        for (let i = 0; i < ipList.length; i++) {
            const current = ipList[i];
            if(current.ip == msgArray[1]) {
                let contactAux = new manager.contact.Contact(current.ip, current.port, current.id, current.userName, current.nickName, current.alias, msgArray[3]);
                ipList.splice(i, 1, contactAux);
                existIp = true;
            }
        }
        if(!existIp){
            ipList.push(new manager.contact.Contact(msgArray[1], 41234, null, null, null, null, msgArray[3]));
        }
        manager.setIpList(ipList);
    }
}

module.exports.processContactStatus = processContactStatus;