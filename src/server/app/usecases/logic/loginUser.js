const log4js = require('log4js');

const logger = log4js.getLogger('['+process.pid+'] ' + require('path').basename(__filename).split(".")[0]);
logger.level = "debug";

const manager = require('../../manager');
const os = require('os');

function loginUser(userName, password) {
    let lock = manager.encrypt(userName+'[::@::]'+password);
    let filePath = os.homedir() + '/chat-iruzo/loginProfiles/'+userName+'[@]'+lock;
    
    if(process.platform == 'win32'){
        filePath = os.homedir() + '\\chat-iruzo\\loginProfiles\\'+userName+'[@]'+lock;
    }
    if(!(null == manager.readFile(filePath))) {
        let contactsFromFile = new Array();
        let fileContent = manager.readFile(filePath);
        if(!(fileContent == lock)){
            contactsFromFile = JSON.parse(fileContent);
        }
        let contactUser = new manager.contact.Contact(manager.getIp(),41234,lock,userName,null,null,'online');
        let ipList = manager.getIpList();
        for (let i = 0; i < ipList.length; i++) {
            const current = ipList[i];
            if(current.ip == contactUser.ip) {
                ipList.splice(i, 1, contactUser);
            }
        }
        manager.setActualLoggedUser(new manager.contact.Contact(manager.getIp(), 41234, lock, userName, null, null, 'online'));
        manager.setContacts(contactsFromFile);
        manager.setIpList(ipList);
        manager.sendDatagramMessage(lock+'[::@::]'+manager.messageTypeInfo.contactStatus+'[::@::]connected', manager.getIpList());
        return contactUser;
    } else {
        logger.error(arguments.callee.name, ' ... profile not found');
        return false;
    }
}

module.exports.loginUser = loginUser;