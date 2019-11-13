const log4js = require('log4js');

const logger = log4js.getLogger(require('path').basename(__filename).split(".")[0]);
logger.level = "debug";

const execSync = require('child_process').execSync;

function getLocalIPv4() {
  try {
    var stdout = execSync('ipconfig', { encoding: 'utf-8' });
    logger.info(arguments.callee.name, '... ',stdout);
  } catch (error) {
    logger.error(arguments.callee.name, '... ',error);
    return null;
  }

  return stdout.split('adapter Ethernet')[1].split('IPv4 Address')[1].split(': ')[1].split(' ')[0].trim();
}

function arp() {
  try {
    var stdout = execSync('arp -a', { encoding: 'utf-8' });
    logger.info(arguments.callee.name, '... ',stdout);
  } catch (error) {
    logger.error(arguments.callee.name, '... ', error);
    return null;
  }
  return stdout.split(getLocalIPv4())[1].split('Type')[1];
}

module.exports.arp = arp;