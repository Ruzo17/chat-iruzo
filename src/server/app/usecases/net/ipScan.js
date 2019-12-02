const log4js = require('log4js');
const exec = require('child_process').exec;
const manager = require('../../manager');

const logger = log4js.getLogger('['+process.pid+'] ' + require('path').basename(__filename).split(".")[0]);
logger.level = "debug";

const execSync = require('child_process').execSync;

function getLocalIPv4() {
  logger.debug(arguments.callee.name, '... ');
  try {
    var stdout = process.platform == 'win32' ? execSync('ipconfig', { encoding: 'utf-8' }) : execSync('hostname -I', { encoding: 'utf-8' });
    let result =  process.platform == 'win32' ? stdout.split('adapter Ethernet')[1].split('IPv4 Address')[1].split(': ')[1].split(' ')[0].trim() : stdout.trim(); 
    logger.info(arguments.callee.name, '... ',result);
    return result;
  } catch (error) {
    logger.error(arguments.callee.name, '... ',error);
    return;
  }
}

function getSubnet() {
  let ip = getLocalIPv4();
  return ip.split(".")[0]+"."+ip.split(".")[1]+"."+ip.split(".")[2];
}

function netScan() {
  logger.debug(arguments.callee.name, '... ');
  let subnet = getSubnet();
  let pingParams = process.platform == 'win32' ? " -w 1000 -f -n 1" :  " -A -c 1";
  for(let i = 0; i<256; i++) {
    try {
      exec("ping "+subnet+"."+i+pingParams, function(stderr, stdout){
        let ipOn;
        if(!(stdout.indexOf('undefined') > -1)){
          if(process.platform == 'win32' && !(stdout.indexOf('Destination host unreachable') > -1)) {
            ipOn = stdout.split('Reply from ')[1].split(':')[0];
            manager.addToIpList(new manager.contact.Contact(ipOn, null, null, null, null, null));
          } else if(stdout.indexOf("ping statistics") > -1) {
            ipOn = stdout.split("(")[1].split(")")[0];
            manager.addToIpList(new manager.contact.Contact(ipOn, null, null, null, null, null));
          }
        }
      });
    } catch (error) {
      // * print only when debugging
      // logger.error(error);
    }
  }
}

module.exports.getLocalIPv4 = getLocalIPv4;
module.exports.getSubnet = getSubnet;
module.exports.netScan = netScan;