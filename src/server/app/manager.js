const log4js = require('log4js');

const logger = log4js.getLogger('['+process.pid+'] ' + require('path').basename(__filename).split(".")[0]);
logger.level = "debug";

const controller = require('../controllers/controller');
const ipScan = require('./usecases/net/ipScan');
const memory = require('../data/memory');

function init() {
    logger.debug("init ...");
    let oController = new controller.Controller();
    memory.init();
}
module.exports.init = init;

//useCases
function netScan() { return ipScan.netScan(); }
function notifyInitialLocalNetConnection() {

}

//memory
function setContact(contact) {}
function getIpList() { return memory.getIpList(); }
function setIpList(args) { memory.setIpList(args); }
function addToIpList(args) { memory.addToIpList(args); }

//model


//useCases
module.exports.netScan = netScan;
//memory
module.exports.setContact = setContact;
module.exports.getIpList = getIpList;
module.exports.setIpList = setIpList;
module.exports.addToIpList = addToIpList;
//model
module.exports.contact = memory.contact;