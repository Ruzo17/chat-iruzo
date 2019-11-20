const log4js = require('log4js');

const logger = log4js.getLogger(require('path').basename(__filename).split(".")[0]);
logger.level = "debug";

const execSync = require('child_process').execSync;

function getLocalIPv4() {
  logger.debug(arguments.callee.name, '... ');
  try {
    var stdout = process.platform == 'win32' ? execSync('ipconfig', { encoding: 'utf-8' }) : execSync('ifconfig', { encoding: 'utf-8' });
    logger.info(arguments.callee.name, '... ',stdout);
  } catch (error) {
    logger.error(arguments.callee.name, '... ',error);
    return null;
  }
  
  return stdout.split('adapter Ethernet')[1].split('IPv4 Address')[1].split(': ')[1].split(' ')[0].trim();
}

function arp() {
  logger.debug(arguments.callee.name, '... ');
  try {
    var stdout = process.platform == 'win32' ? execSync('arp -a', { encoding: 'utf-8' }) : execSync('ip neigh | grep -v FAILED | sort -V', { encoding: 'utf-8' });
    
    logger.info(arguments.callee.name, '... ',stdout);
  } catch (error) {
    logger.error(arguments.callee.name, '... ', error);
    return null;
  }
  return stdout.split(getLocalIPv4())[1].split('Type')[1];
}

function netScan() {
  logger.debug(arguments.callee.name, '... ');
  try {
    const nmap = require('libnmap');
    
    // nmap.discover(function(err, report) {
    //   if (err) throw new Error(err);
    
    //   for (let item in report) {
    //     console.log(JSON.stringify(report[item]));
    //   }
    // });

    // logger.info(arguments.callee.name, '... ',stdout);
  } catch (error) {
    logger.error(arguments.callee.name, '... ', error);
    return null;
  }
  // return st
}

module.exports.arp = arp;
module.exports.netScan = netScan;