const log4js = require('log4js');

const logger = log4js.getLogger(require('path').basename(__filename).split(".")[0]);
logger.level = "debug";

const controller = require('../controllers/controller');
const ipScan = require('./usecases/ipScan');
const memory = require('../models/memory');

function init() {
    logger.debug("init ...");
    let oController = new controller.Controller();
    memory.init();
}


//useCases
function netScan() { ipScan.netScan(); }
function getArp()    { return ipScan.arp(); }
function notifyInitialLocalNetConnection() {

}

//memory
function getMemoryArpList() { return memory.getArpList(); }
function setMemoryArpList(args) { memory.setArpList(args); }

module.exports.init = init;

//useCases
module.exports.netScan = netScan;
module.exports.getArp = getArp;

//memory
module.exports.getMemoryArpList = getMemoryArpList;
module.exports.setMemoryArpList = setMemoryArpList;