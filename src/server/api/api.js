const log4js = require('log4js');
const logger = log4js.getLogger('['+process.pid+'] ' + require('path').basename(__filename).split(".")[0]);
logger.level = "debug";

const manager = require('../app/manager');

function init() {
    logger.debug("init ...");
    manager.init();
}

function getIpList() { return manager.getIpList(); }
/**
 * * El mensaje debe de ir formateado de la siguiente manera: messageTypeInfo[::@::]mensaje
 * ! No saltarse bajo ningun concepto la estructura de formateo de los mensajes mencionada con anterioridad.
 */
function sendPrivateMessage(msg, contact) { manager.sendPrivateMessage(msg, contact); }
function sendGlobalMessage(msg) { manager.sendGlobalMessage(msg); }
function getGlobalChat() { manager.getGlobalChat(); }
function getPrivateMessages(contact) { return manager.getPrivateMessages(contact); }

function registerUser(userName, password) { return manager.processRegisterUser(userName, password); }
function loginUser(userName, password) { return manager.processLoginUser(userName, password); }
function disconnectUser(userName) { return manager.processDisconnectUser(userName); }

function getContacts() { return manager.getContacts(); }


module.exports.init = init;
module.exports.getIpList = getIpList;
module.exports.sendPrivateMessage = sendPrivateMessage;
module.exports.sendGlobalMessage = sendGlobalMessage;
module.exports.getPrivateMessages = getPrivateMessages;
module.exports.getGlobalChat = getGlobalChat;

module.exports.registerUser = registerUser;
module.exports.loginUser = loginUser;
module.exports.disconnectUser = disconnectUser;

module.exports.getContacts = getContacts;