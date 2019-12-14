const log4js = require('log4js');

const logger = log4js.getLogger('['+process.pid+'] ' + require('path').basename(__filename).split(".")[0]);
logger.level = "debug";

const manager = require('../../manager');
const os = require('os');

function addFriend(contact) {
    logger.debug(arguments.callee.name, ' ... ', JSON.stringify(contact, null, 0));
    if(!(contact.id == null)){
        let actualLoggedUser = manager.getActualLoggedUser();
        let filePath = os.homedir() + '/chat-iruzo/loginProfiles/'+actualLoggedUser.userName+'[@]'+actualLoggedUser.id;
        if(process.platform == 'win32'){
            filePath = os.homedir() + '\\chat-iruzo\\loginProfiles\\'+actualLoggedUser.userName+'[@]'+actualLoggedUser.id;
        }
        let fileContent = manager.readFile(filePath);
        logger.error(fileContent);
        if(fileContent == actualLoggedUser.id){
            let contactsToFile = new Array();
            contactsToFile.push(contact);
            manager.writeFile(filePath, JSON.stringify(contactsToFile, null, 0));
            manager.addToContacts(contact);
        } else {
            let contactsFromFile = JSON.parse(fileContent);
            let existContact = false;
            for (let i = 0; i < contactsFromFile.length; i++) {
                const current = contactsFromFile[i];
                if(current.id == contact.id) {
                    contactsFromFile.splice(i, 1, contact);
                    existContact = true;
                }
            }
            if(!existContact) {
                contactsFromFile.push(contact);
            }
            manager.setContacts(contactsFromFile);
            manager.writeFile(filePath, JSON.stringify(contactsFromFile, null, 0));
        }
    }
}

function removeFriend(contact) {
    logger.debug(arguments.callee.name, ' ... ', JSON.stringify(contact, null, 0));
    let actualLoggedUser = manager.getActualLoggedUser();
    let filePath = os.homedir() + '/chat-iruzo/loginProfiles/'+actualLoggedUser.userName+'[@]'+actualLoggedUser.id;
    if(process.platform == 'win32'){
        filePath = os.homedir() + '\\chat-iruzo\\loginProfiles\\'+actualLoggedUser.userName+'[@]'+actualLoggedUser.id;
    }
    let contactsFromMemory = manager.getContacts();
    for (let i = 0; i < contactsFromMemory.length; i++) {
        const current = contactsFromMemory[i];
        if(current.id = contact.id) {
            contactsFromMemory.splice(i, 1);
        }
    }
    manager.setContacts(contactsFromMemory);
    if(contactsFromMemory.length == 0) {
        manager.writeFile(filePath, actualLoggedUser.id);
    } else {
        manager.writeFile(filePath, contactsFromMemory);
    }
}

module.exports = { addFriend, removeFriend };