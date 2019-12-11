const log4js = require('log4js');

const logger = log4js.getLogger('['+process.pid+'] ' + require('path').basename(__filename).split(".")[0]);
logger.level = "debug";

const contact = require('./models/contact');
const messageTypeInfo = require('./models/messageTypeInfo');

function init() { logger.debug(arguments.callee.name, ' ... ');}
module.exports.init = init;

// data
actualLoggedUser = null;

ipList = new Array();
contacts = new Array();
globalChat = new Array();
privateChat = new Array();

// data
module.exports.getIpList = function getIpList() {ipList.forEach(c => {logger.debug(arguments.callee.name, " ... ", c.toString());}); return ipList;}
module.exports.setIpList = function setIpList(args) {args.forEach(c => {logger.debug(arguments.callee.name, " ... ", c.toString());}); ipList = args;}
module.exports.addToIpList = function addToIpList(args) {logger.debug(arguments.callee.name, " ... ", args.toString()); ipList.push(args);}

module.exports.getContacts = function getContacts() {contacts.forEach(c => {logger.debug(arguments.callee.name, " ... ", c.toString());}); return contacts;}
module.exports.setContacts = function setContacts(args) {args.forEach(c => {logger.debug(arguments.callee.name, " ... ", c.toString());}); contacts = args;}
module.exports.addToContacts = function addToContacts(args) {logger.debug(arguments.callee.name, " ... ", args.toString()); contacts.push(args);}

module.exports.getGlobalChat = function getGlobalChat() {contacts.forEach(c => {logger.debug(arguments.callee.name, " ... ", c.toString());}); return globalChat;}
// module.exports.setGlobalChat = function setGlobalChat(args) {args.forEach(c => {logger.debug(arguments.callee.name, " ... ", c.toString());}); globalChat = args;}
module.exports.addToGlobalChat = function addToGlobalChat(args) {logger.debug(arguments.callee.name, " ... ", args.toString()); globalChat.push(args);}

module.exports.getPrivateChat = function getPrivateChat() {contacts.forEach(c => {logger.debug(arguments.callee.name, " ... ", c.toString());}); return privateChat;}
// module.exports.setPrivateChat = function setPrivateChat(args) {args.forEach(c => {logger.debug(arguments.callee.name, " ... ", c.toString());}); privateChat = args;}
module.exports.addToPrivateChat = function addToPrivateChat(args) {logger.debug(arguments.callee.name, " ... ", args.toString()); privateChat.push(args);}

module.exports.setActualLoggedUser = function setActualLoggedUser(userId) {logger.debug(arguments.callee.name, " ... ", args.toString()); actualLoggedUser = userId;}

// models
module.exports.contact = contact;
module.exports.messageTypeInfo = messageTypeInfo;