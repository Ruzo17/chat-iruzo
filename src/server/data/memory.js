const log4js = require('log4js');
const contact = require('./models/contact');

const logger = log4js.getLogger('['+process.pid+'] ' + require('path').basename(__filename).split(".")[0]);
logger.level = "debug";

function init() { logger.debug(arguments.callee.name, ' ... ');}
module.exports.init = init;

// data
ipList = new Array();

// data
module.exports.getIpList = function getIpList() {logger.debug(arguments.callee.name, " ... ", ipList); return ipList;}
module.exports.setIpList = function setIpList(args) {logger.debug(arguments.callee.name, " ... ", args); ipList = args;}
module.exports.addToIpList = function addToIpList(args) {logger.debug(arguments.callee.name, " ... ", args); ipList.push(args);}
// models
module.exports.contact = contact;