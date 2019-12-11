const log4js = require('log4js');

const logger = log4js.getLogger('['+process.pid+'] ' + require('path').basename(__filename).split(".")[0]);
logger.level = "debug";

const manager = require('../../manager');
const os = require('os');

function registerUser(userName, password) {
    let lock = manager.encrypt(userName+'[::@::]'+password, userName+'[::@::]'+password);
    let filePath = os.homedir() + '/chat-iruzo/loginProfiles/'+userName+'[::@::]'+lock;
    
    if(process.platform == 'win32'){
        filePath = os.homedir() + '\\chat-iruzo\\loginProfiles\\'+userName+'[::@::]'+lock;
    }

    manager.writeFile(filePath, lock);
}

module.exports.registerUser = registerUser;