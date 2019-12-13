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
    let contactsFromFile = manager.readFile(filePath);
    if(!(null == manager.readFile(filePath))) {
        let contactUser = new manager.contact.Contact(manager.getIp,41234,lock,userName,null,null,'online');
        let ipList = manager.getIpList();
        for (let i = 0; i < ipList.length; i++) {
            const current = ipList[i];
            if(current.ip == contactUser.ip) {
                ipList.splice(i, 1, contactUser);
            }
        }
        let contactList = manager.getContacts();
        for (let i = 0; i < contactList.length; i++) {
            const current = contactList[i];
            if(current.ip == contactUser.ip) {
                ipList.splice(i, 1, contactUser);
            }
        }
        manager.setActualLoggedUser(new manager.contact.Contact(manager.getIp(), 41234, lock, userName, null, null, online));
        manager.sendDatagramMessage(lock+'[::@::]'+manager.messageTypeInfo.contactStatus+'[::@::]connected', manager.getIpList());
        return contactUser;
    } else {
        logger.error(arguments.callee.name, ' ... profile not found');
        return false;
    }
}

module.exports.loginUser = loginUser;