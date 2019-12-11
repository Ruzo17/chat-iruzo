const log4js = require('log4js');

const logger = log4js.getLogger('['+process.pid+'] ' + require('path').basename(__filename).split(".")[0]);
logger.level = "debug";

const manager = require('../../manager');

function addFriend(contact) {
    logger.debug(arguments.callee.name, ' ... ', contact);
    // TODO
}

function removeFriend(contact) {
    logger.debug(arguments.callee.name, ' ... ', contact);
    // TODO
}