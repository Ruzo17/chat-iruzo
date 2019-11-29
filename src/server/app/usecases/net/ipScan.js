const log4js = require('log4js');
const exec = require('child_process').exec;
const manager = require('../../manager');

const logger = log4js.getLogger(require('path').basename(__filename).split(".")[0]);
logger.level = "debug";

const execSync = require('child_process').execSync;

function getLocalIPv4() {
  logger.debug(arguments.callee.name, '... ');
  try {
    var stdout = process.platform == 'win32' ? execSync('ipconfig', { encoding: 'utf-8' }) : execSync('hostname -I', { encoding: 'utf-8' });
    logger.info(arguments.callee.name, '... ',stdout);
  } catch (error) {
    logger.error(arguments.callee.name, '... ',error);
    return;
  }

  return process.platform == 'win32' ? stdout.split('adapter Ethernet')[1].split('IPv4 Address')[1].split(': ')[1].split(' ')[0].trim() : stdout.trim(); 
}

function netScan() {
  logger.debug(arguments.callee.name, '... ');
  try {
    let ip = getLocalIPv4();
    let subnet = ip.split(".")[0]+"."+ip.split(".")[1]+"."+ip.split(".")[2];
    for(let i = 0; i<256; i++)
      exec("ping "+subnet+"."+i+" -A -c 1", (stderr, stdout) =>{
        // ? Se deberian de imprimir los errores
        if (stderr) {
          // logger.error('netScan ... ' + stderr);
          return;
        }
        if(stdout.indexOf("ping statistics") > -1){
          let ipOn = stdout.split("(")[1].split(")")[0];
          logger.info(ipOn);
          manager.addToIpList(stdout.split("(")[1].split(")")[0]);
        }
      });

    return;
  } catch (error) {
    logger.error(arguments.callee.name, '... ', error);
    return;
  }
}

module.exports.netScan = netScan;