const log4js = require('log4js');

const logger = log4js.getLogger('['+process.pid+'] ' + require('path').basename(__filename).split(".")[0]);
logger.level = "debug";

const crypto = require('crypto');
const algorithm = 'aes-256-cbc';
const key = Buffer.from('Hr5CfuE5WbCxfXDjPlGm5wAZ3Q3KPQLR', 'utf-8'); // const key = crypto.randomBytes(32);
const iv = Buffer.from('00Tg5/tcRajzsAx%', 'utf-8'); // const iv = crypto.randomBytes(16);

const manager = require('../../manager');

function encrypt(text) {
    logger.debug(arguments.callee.name, ' ... ', text);
    let cipher = crypto.createCipheriv('aes-256-cbc', Buffer.from(key), iv);
    let encrypted = cipher.update(text);
    encrypted = Buffer.concat([encrypted, cipher.final()]);
    return encrypted.toString('hex');
}

function decrypt(text) {
    logger.debug(arguments.callee.name, ' ... ', text);
    let iv = Buffer.from(text.iv, 'hex');
    let encryptedText = Buffer.from(text.encryptedData, 'hex');
    let decipher = crypto.createDecipheriv('aes-256-cbc', Buffer.from(key), iv);
    let decrypted = decipher.update(encryptedText);
    decrypted = Buffer.concat([decrypted, decipher.final()]);
    return decrypted.toString();
}

module.exports = { decrypt, encrypt };