const log4js = require('log4js');

const logger = log4js.getLogger('['+process.pid+'] ' + require('path').basename(__filename).split(".")[0]);
logger.level = "debug";

const manager = require('../../../manager');
const dgram = require('dgram');
const datagramDock = dgram.createSocket('udp4');

function init(localhost) {
    logger.debug(arguments.callee.name + ' ... ');
    //  * datagramDock
    datagramDock.bind(41234);
    datagramDock.on("error", (err) => {logger.error("datagramDock ... ", err);server.close();});
    datagramDock.on("message", (msg, rinfo) => {
        logger.info('datagramDock:onReceive ... ' + new Date().toJSON()+'[::@::]'+rinfo.address+'[::@::]'+msg.toString('utf-8'));
        manager.processIncomingMessage(new Date().toJSON()+'[::@::]'+rinfo.address+'[::@::]'+msg.toString('utf-8'));
    });
    datagramDock.on("listening", () => {
        logger.info("datagramDock ... " + datagramDock.address().address + ':' + datagramDock.address().port);
        let ipList = new Array();
        let subnet = manager.getSubnet()+'.';
        for (let i = 0; i < 256; i++) ipList.push(new manager.contact.Contact(subnet+i,41234,null,null,null,null));
        sendDatagramMessage(manager.messageTypeInfo.contactStatus+'[::@::]online', ipList);
    });
}
    
//datagramDock
function sendDatagramMessage(msg, contacts) {
    logger.debug(arguments.callee.name, ' ... ', msg);
    contacts.forEach(c => {
        datagramDock.send(msg, 0, msg.length, 41234, c.ip, (stderr, stdout) => {
            if(stderr) logger.error('sendDatagramMessage:onSend ... ' + stderr);
            logger.info('sendDatagramMessage:onSend ... ' + c.ip + ':' + c.port + '@' + c.id + ' => ' + stdout);
        });
    });
}

module.exports.init = init;
module.exports.sendDatagramMessage = sendDatagramMessage;