const log4js = require('log4js');
const contact = require('./models/contact');

const logger = log4js.getLogger('['+process.pid+'] ' + require('path').basename(__filename).split(".")[0]);
logger.level = "debug";

function init() { logger.debug(arguments.callee.name, ' ... ');}
module.exports.init = init;

// data
ipList = new Array();

// data
module.exports.getIpList = function getIpList() {ipList.forEach(c => {logger.debug(arguments.callee.name, " ... ", c.toString());}); return ipList;}
module.exports.setIpList = function setIpList(args) {args.forEach(c => {logger.debug(arguments.callee.name, " ... ", c.toString());}); ipList = args;}
module.exports.addToIpList = function addToIpList(args) {logger.debug(arguments.callee.name, " ... ", args.toString()); ipList.push(args);}
// models
module.exports.contact = contact;