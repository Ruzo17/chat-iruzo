const log4js = require('log4js');

const logger = log4js.getLogger('['+process.pid+'] ' + require('path').basename(__filename).split(".")[0]);
logger.level = "debug";

const fs = require('fs');
const os = require('os');

function init() {
    logger.debug(arguments.callee.name, ' ... ');

    let folderPath = os.homedir() + '/chat-iruzo';
    let profilesFolderPath = folderPath + '/loginProfiles';
    let filePath = os.homedir() + '/chat-iruzo/chat-iruzo.init';
    
    if(process.platform == 'win32'){
        folderPath = os.homedir() + '\\chat-iruzo';
        profilesFolderPath = folderPath + '\\loginProfiles';
        filePath = os.homedir() + '\\chat-iruzo\\chat-iruzo.init';
    }
    
    if (!fs.existsSync(folderPath)){
        fs.mkdirSync(folderPath);
    }
    if (!fs.existsSync(profilesFolderPath)){
        fs.mkdirSync(profilesFolderPath);
    }

    fs.writeFile(filePath, 'chat-iruzo.init', (err) => {
        if(err) {
            console.error('init ... ', err);
        } else {
            // fs.rename(filePath, filePath + '.png', function(error){
            //     if(error) console.error('ERROR EN EL RENOMBRE: ' + error);
            // });
            logger.info('init ... The File was succesfully writed > '+filePath);
        }
    });

    fs.writeFile(filePath, 'globalChatLog', (err) => {
        if(err) {
            console.error('init ... ', err);
        } else {
            logger.info('init ... The File was succesfully writed > '+filePath);
        }
    });
}

function writeFile(filePath, info) {
    logger.debug(arguments.callee.name, ' ... ', filePath);
    fs.writeFile(filePath, info, (err) => {
        if(err) {
            logger.error('writeFile ... ', err);
        } else {
            logger.info('writeFile ... The File was succesfully writed > '+filePath);
        }
    });
}

function readFile(filePath) {
    logger.debug(arguments.callee.name, ' ... ', filePath);
    try {
        return fs.readFileSync(filePath).toString();
    } catch (error) {
        return null;
    }
}

// function readDir() {
//     fs.readDir(directoryPath, (err, files) => {
//         if(err) {
//             logger.error(arguments.callee.name, ' ... ', err);
//         } else {
//             files.forEach(current => {
//                 logger.debug(current);
//             });
//         }
//     });
// }

module.exports = { init, writeFile, readFile };