const log4js = require('log4js');

const logger = log4js.getLogger('['+process.pid+'] ' + require('path').basename(__filename).split(".")[0]);
logger.level = "debug";

const contact = require('./models/contact');
const messageTypeInfo = require('./models/messageTypeInfo');

function init() { logger.debug(arguments.callee.name, ' ... ');}
module.exports.init = init;

// * data
actualLoggedUser = null;

ipList = new Array();
contacts = new Array();
globalChat = new Array();
privateChat = new Array();

// * data
module.exports.getIpList = function getIpList() { logger.debug(arguments.callee.name, " ... ", JSON.stringify(ipList, null, 0)); return ipList; }
module.exports.setIpList = function setIpList(args) { logger.debug(arguments.callee.name, " ... ", JSON.stringify(args, null, 0)); ipList = args;}
module.exports.addToIpList = function addToIpList(args) { logger.debug(arguments.callee.name, " ... ", args.toString()); ipList.push(args);}

module.exports.getContacts = function getContacts() { logger.debug(arguments.callee.name, " ... ", JSON.stringify(contacts, null, 0)); return contacts;}
module.exports.setContacts = function setContacts(args) { logger.debug(arguments.callee.name, " ... ", JSON.stringify(args, null, 0)); contacts = args;}
module.exports.addToContacts = function addToContacts(args) { logger.debug(arguments.callee.name, " ... ", args.toString()); contacts.push(args);}

module.exports.getGlobalChat = function getGlobalChat() { logger.debug(arguments.callee.name, " ... ", JSON.stringify(globalChat, null, 0)); return globalChat;}
// module.exports.setGlobalChat = function setGlobalChat(args) {args.forEach(c => {logger.debug(arguments.callee.name, " ... ", c.toString());}); globalChat = args;}
module.exports.addToGlobalChat = function addToGlobalChat(args) { logger.debug(arguments.callee.name, " ... ", JSON.stringify(args, null, 0)); globalChat.push(args);}

module.exports.getPrivateChat = function getPrivateChat() { logger.debug(arguments.callee.name, " ... ", JSON.stringify(privateChat, null, 0)); return privateChat;}
// module.exports.setPrivateChat = function setPrivateChat(args) {args.forEach(c => {logger.debug(arguments.callee.name, " ... ", c.toString());}); privateChat = args;}
module.exports.addToPrivateChat = function addToPrivateChat(args) { logger.debug(arguments.callee.name, " ... ", JSON.stringify(args, null, 0)); privateChat.push(args);}

module.exports.getActualLoggedUser = function getActualLoggedUser() { logger.debug(arguments.callee.name, ' ... ', JSON.stringify(actualLoggedUser, null, 0)); return actualLoggedUser; }
module.exports.setActualLoggedUser = function setActualLoggedUser(userId) { logger.debug(arguments.callee.name, " ... ", userId); actualLoggedUser = userId;}

// * models
module.exports.contact = contact;
module.exports.messageTypeInfo = messageTypeInfo;