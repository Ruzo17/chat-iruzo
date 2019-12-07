const log4js = require('log4js');

const logger = log4js.getLogger('['+process.pid+'] ' + require('path').basename(__filename).split(".")[0]);
logger.level = "debug";

const cryptojs = require('crypto-js');

function encrypt(key, text) {
    logger.debug(arguments.callee.name, ' ... ', text);
    return cryptojs.AES.encrypt(text, key).toString();
}

function decrypt(key, text) {
    logger.debug(arguments.callee.name, ' ... ');
    return cryptojs.AES.decrypt(text, key).toString(cryptojs.enc.Utf8);
}

module.exports = { decrypt, encrypt };