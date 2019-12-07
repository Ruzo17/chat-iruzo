const log4js = require('log4js');
const exec = require('child_process').exec;
const ipLibrary = require("ip");

const manager = require('../../manager');

const logger = log4js.getLogger('['+process.pid+'] ' + require('path').basename(__filename).split(".")[0]);
logger.level = "debug";

const execSync = require('child_process').execSync;

function getLocalIPv4() {
  let ip = ipLibrary.address();
  logger.info(arguments.callee.name, ' ... ', ip);
  return ip;
}

function getSubnet() {
  let ip = getLocalIPv4();
  let subnet = ip.split(".")[0]+"."+ip.split(".")[1]+"."+ip.split(".")[2];
  logger.info(arguments.callee.name, ' ... ', subnet);
  return subnet;
}

function netScan() {
  logger.debug(arguments.callee.name, ' ... ');
  let subnet = getSubnet();
  let pingParams = process.platform == 'win32' ? " -w 1000 -f -n 1" :  " -A -c 1";
  for(let i = 0; i<256; i++) {
    try {
      exec("ping "+subnet+"."+i+pingParams, function(stderr, stdout){
        let ipOn;
        if(!(stdout.indexOf('undefined') > -1)){
          if(process.platform == 'win32' && !(stdout.indexOf('Destination host unreachable') > -1)) {
            ipOn = stdout.split('Reply from ')[1].split(':')[0];
            let containsIp = false;
            logger.debug(ipOn);
            for (const current in manager.getIpList()) {
              if(current.ip == ipOn){
                containsIp = true;
                break;
              }
            }
            if(!containsIp) manager.addToIpList(new manager.contact.Contact(ipOn, null, null, null, null, null, null));
          } else if(stdout.indexOf("ping statistics") > -1) {
            ipOn = stdout.split("(")[1].split(")")[0];
            let containsIp = false;
            for (const current in manager.getIpList()) {
              if(current.ip == ipOn){
                containsIp = true;
                break;
              }
            }
            if(!containsIp) manager.addToIpList(new manager.contact.Contact(ipOn, null, null, null, null, null, null));
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