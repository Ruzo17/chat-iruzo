const log4js = require('log4js');

const logger = log4js.getLogger('['+process.pid+'] ' + require('path').basename(__filename).split(".")[0]);
logger.level = "debug";

const manager = require('../../manager');
const os = require('os');

function addFriend(contact) {
    logger.debug(arguments.callee.name, ' ... ', contact);
    manager.addToContacts(contact);
    let actualLoggedUser = manager.getActualLoggedUser();
    let filePath = os.homedir() + '/chat-iruzo/loginProfiles/'+actualLoggedUser.userName+'[@]'+lock;
    if(process.platform == 'win32'){
        filePath = os.homedir() + '\\chat-iruzo\\loginProfiles\\'+actualLoggedUser.userName+'[@]'+lock;
    }
    let contactsFromFile = JSON.parse(manager.readFile(filePath));
    contactsFromFile.push(contact);
    manager.writeFile(filePath, JSON.stringify(contactsFromFile, null, 0));
}

function removeFriend(contact) {
    logger.debug(arguments.callee.name, ' ... ', contact);
    // TODO
}

module.exports = { addFriend, removeFriend };