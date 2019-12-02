const log4js = require('log4js');
const manager = require('../../../manager');

const logger = log4js.getLogger('['+process.pid+'] ' + require('path').basename(__filename).split(".")[0]);
logger.level = "debug";

const dgram = require('dgram');
const datagramDock = dgram.createSocket('udp4');

function init(localhost) {
    logger.debug(arguments.callee.name + ' ... ');
    //  * datagramDock
    datagramDock.bind(41234);
    datagramDock.on("error", (err) => {logger.error("datagramDock ... ", err);server.close();});
    datagramDock.on("message", (msg, rinfo) => {logger.info('datagramDock:onReceive ... ' + rinfo.address + ':' + rinfo.port + ' => ' +msg.toString('utf-8'));});
    datagramDock.on("listening", () => {
        logger.info("datagramDock ... " + datagramDock.address().address + ':' + datagramDock.address().port);
        sendDatagramMessage('im online !', new Array(new manager.contact.Contact(manager.getIp(),41234,null,null,null,null)));
    });
}
    
//datagramDock
function sendDatagramMessage(msg, contacts) {
    logger.debug(arguments.callee.name, ' ... ');
    contacts.forEach(c => {
        datagramDock.send(msg, 0, msg.length, 41234, c.ip, (stderr, stdout) => {
            if(stderr) logger.error('sendDatagramMessage:onSend ... ' + stderr);
            logger.info('sendDatagramMessage:onSend ... ' + c.ip + ':' + c.port + '@' + c.id + ' => ' + stdout.toString('utf-8'));
        });
    });
}

//tcpDock

module.exports.init = init;