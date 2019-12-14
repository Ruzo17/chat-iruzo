const log4js = require('log4js');

const logger = log4js.getLogger('['+process.pid+'] ' + require('path').basename(__filename).split(".")[0]);
logger.level = "debug";

//#region requires
const controller = require('../controllers/controller');
const ipScan = require('./usecases/net/ipScan');
const dock = require('./usecases/net/harbor/dock');
const crypt = require('./usecases/certs/crypt');
const files = require('./usecases/accessData/files');
const processMessage = require('./usecases/logic/processMessage');
const registerUser = require('./usecases/logic/registerUser');
const loginUser = require('./usecases/logic/loginUser');
const disconnectUser = require('./usecases/logic/disconnectUser');
const friends = require('./usecases/logic/friends');
const privateChat = require('./usecases/logic/privateChat');
const globalChat = require('./usecases/logic/globalChat');
const memory = require('../data/memory');
//#endregion

function init() {
    logger.debug("init ...");
    // let oController = new controller.Controller();
    files.init();
    memory.init();
    netScan();
    dock.init();
}
module.exports.init = init;

// * useCases
function getIp(){ return ipScan.getLocalIPv4(); }
function getSubnet(){ return ipScan.getSubnet(); }
function netScan() { ipScan.netScan(); }

function sendDatagramMessage(msg, contacts) { dock.sendDatagramMessage(msg, contacts); }

function encrypt(args) { return crypt.encrypt(args); }
function decrypt(args) { return crypt.decrypt(args); }

function readFile(filePath) { return files.readFile(filePath); }
function writeFile(filePath, info) { files.writeFile(filePath, info); }

function processIncomingMessage(msg) { processMessage.processMessage(msg); }

function processRegisterUser(userName, password) { return registerUser.registerUser(userName, password); }
function processLoginUser(userName, password) { return loginUser.loginUser(userName, password); }
function processDisconnectUser(userName) { return disconnectUser.disconnectUser(userName); }

function addFriend(contact) { friends.addFriend(contact); }
function removeFriend(contact) { friends.removeFriend(contact); }

function sendPrivateMessage(msg, contact) { privateChat.sendPrivateMessage(msg, contact); }
function getPrivateMessages(contact) { return privateChat.getPrivateMessages(contact); }

function sendGlobalMessage(msg) { globalChat.sendGlobalMessage(msg); }

// * memory
function getIpList()                { return memory.getIpList(); }
function setIpList(ipList)            { memory.setIpList(ipList); }
function addToIpList(contact)          { memory.addToIpList(contact); }

function getContacts ()             { return memory.getContacts(); }
function setContacts (contacts)         { memory.setContacts(contacts); }
function addToContacts(contact)        { memory.addToContacts(contact); }

function getGlobalChat ()           { return memory.getGlobalChat(); }
// function setGlobalChat(args)     { memory.setGlobalChat(args); }
function addToGlobalChat(msg)      { memory.addToGlobalChat(msg); }

function getPrivateChat ()          { return memory.getPrivateChat(); }
// function setPrivateChat(args)    { memory.setPrivateChat(args); }
function addToPrivateChat(msg)     { memory.addToPrivateChat(msg); }

function getActualLoggedUser()     { return memory.getActualLoggedUser(); }
function setActualLoggedUser(userId)     { memory.setActualLoggedUser(userId); }

// * model


// * useCases
module.exports.getIp =                  getIp;
module.exports.getSubnet =              getSubnet;
module.exports.netScan =                netScan;
module.exports.sendDatagramMessage =    sendDatagramMessage;
module.exports.encrypt =                encrypt;
module.exports.decrypt =                decrypt;
module.exports.readFile =               readFile;
module.exports.writeFile =              writeFile;
module.exports.processIncomingMessage = processIncomingMessage;

module.exports.processRegisterUser =    processRegisterUser;
module.exports.processLoginUser =       processLoginUser;
module.exports.processDisconnectUser =  processDisconnectUser;

module.exports.addFriend =              addFriend;
module.exports.removeFriend =           removeFriend;

module.exports.sendPrivateMessage =     sendPrivateMessage;
module.exports.sendGlobalMessage =      sendGlobalMessage;
module.exports.getPrivateMessages =     getPrivateMessages;

// * memory
module.exports.getIpList = getIpList;
module.exports.setIpList = setIpList;
module.exports.addToIpList = addToIpList;

module.exports.getContacts = getContacts;
module.exports.setContacts = setContacts;
module.exports.addToContacts = addToContacts;

module.exports.getGlobalChat = getGlobalChat;
// module.exports.setGlobalChat = setGlobalChat;
module.exports.addToGlobalChat = addToGlobalChat;

module.exports.getPrivateChat = getPrivateChat;
// module.exports.setPrivateChat = setPrivateChat;
module.exports.addToPrivateChat = addToPrivateChat;

module.exports.getActualLoggedUser = getActualLoggedUser;
module.exports.setActualLoggedUser = setActualLoggedUser;

// * model
module.exports.contact = memory.contact;
module.exports.messageTypeInfo = memory.messageTypeInfo;