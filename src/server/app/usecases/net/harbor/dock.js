const log4js = require('log4js');

const logger = log4js.getLogger(require('path').basename(__filename).split(".")[0]);
logger.level = "debug";

const dgram = require('dgram');
const datagramDock = dgram.createSocket('udp4');

//datagramDock

datagramDock.on("error", (err) => {
    logger.error("datagramDock ... ", err);
    server.close();
});

datagramDock.on("message", (msg, rinfo) => {
    logger.debug("datagramDock ... ", msg);
});

datagramDock.on("listening", () => {
    const address = server.address();
    logger.info("datagramDock ... listening");;
});

datagramDock.bind(41234);

function sendDatagramMessage(message) {
    datagramSocket.send(message, 0, message.length, 41234, SERVER_ADDRESS, onSend);
}

//tcpDock