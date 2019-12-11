const log4js = require('log4js');

const logger = log4js.getLogger('['+process.pid+'] ' + require('path').basename(__filename).split(".")[0]);
logger.level = "debug";

const os = require('os');

const manager = require('../../../manager');

function processContactImage(msg) {
    logger.debug(arguments.callee.name, ' ... ', msg);

    let msgArray = msg.split('[::@::]');
    if(msgArray.length == 5) {
        let fileRoute = process.platform == 'win32' ? os.homedir()+'\\chat-iruzo\\' : os.homedir()+'/chat-iruzo/';
        manager.writeFile(fileRoute+'image[::@::]'+msgArray[2]+'.png', msgArray[4]);
    } else {
        let fileRoute = process.platform == 'win32' ? os.homedir()+'\\chat-iruzo\\' : os.homedir()+'/chat-iruzo/';
        manager.writeFile(fileRoute+'image[::@::]'+msgArray[2]+'.png', msgArray[4]);
    }
}

module.exports.processContactImage = processContactImage;