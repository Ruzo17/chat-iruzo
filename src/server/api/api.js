const log4js = require('log4js');
const logger = log4js.getLogger('['+process.pid+'] ' + require('path').basename(__filename).split(".")[0]);
logger.level = "debug";

const manager = require('../app/manager');

function init() {
    logger.debug("init ...");
    manager.init();
}

function getIp() { return manager.getIp(); }
function getIpList() { return manager.getIpList(); }
function sendPrivateMessage(msg, contact) { manager.sendPrivateMessage(msg, contact); }
function sendGlobalMessage(msg) { manager.sendGlobalMessage(msg); }
function getGlobalChat() { return manager.getGlobalChat(); }
function getPrivateMessages(contact) { return manager.getPrivateMessages(contact); }

function registerUser(userName, password) { return manager.processRegisterUser(userName, password); }
function loginUser(userName, password) { return manager.processLoginUser(userName, password); }
function disconnectUser(userName) { return manager.processDisconnectUser(userName); }

function addFriend(contact) { manager.addFriend(contact); }
function getContacts() { return manager.getContacts(); }


module.exports.init = init;
module.exports.getIp = getIp;
module.exports.getIpList = getIpList;
module.exports.sendPrivateMessage = sendPrivateMessage;
module.exports.sendGlobalMessage = sendGlobalMessage;
module.exports.getPrivateMessages = getPrivateMessages;
module.exports.getGlobalChat = getGlobalChat;

module.exports.registerUser = registerUser;
module.exports.loginUser = loginUser;
module.exports.disconnectUser = disconnectUser;

module.exports.addFriend = addFriend;

module.exports.getContacts = getContacts;