const log4js = require('log4js');

const logger = log4js.getLogger('['+process.pid+'] ' + require('path').basename(__filename).split(".")[0]);
logger.level = "debug";

const controller = require('../controllers/controller');
const ipScan = require('./usecases/net/ipScan');
const dock = require('./usecases/net/harbor/dock');
const crypt = require('./usecases/certs/crypt');
const files = require('./usecases/accessData/files');
const memory = require('../data/memory');

function init() {
    logger.debug("init ...");
    let oController = new controller.Controller();
    dock.init();
    memory.init();
}
module.exports.init = init;

//useCases
function getIp(){ return ipScan.getLocalIPv4(); }
function getSubnet(){ return ipScan.getSubnet(); }
function netScan() { ipScan.netScan(); }
function sendDatagramMessage(args) {

}
function encrypt(key, args) { return crypt.encrypt(key, args); }
function decrypt(key, args) { return crypt.decrypt(key, args); }

//memory
function setContact(contact) {}
function getIpList() { return memory.getIpList(); }
function setIpList(args) { memory.setIpList(args); }
function addToIpList(args) { memory.addToIpList(args); }

//model


//useCases
module.exports.getIp = getIp;
module.exports.getSubnet = getSubnet;
module.exports.netScan = netScan;
//memory
module.exports.setContact = setContact;
module.exports.getIpList = getIpList;
module.exports.setIpList = setIpList;
module.exports.addToIpList = addToIpList;
//model
module.exports.contact = memory.contact;