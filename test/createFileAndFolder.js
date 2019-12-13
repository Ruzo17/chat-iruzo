var fs = require('fs');

console.log(require('os').homedir());
console.log(process.platform);
let folderPath = require('os').homedir() + '\\chat-iruzo';
let filePath = require('os').homedir() + '\\chat-iruzo\\test';

if (!fs.existsSync(folderPath)){
    console.log('la carpeta no existe');
    fs.mkdirSync(folderPath);
}
console.log('la carpeta existe');
fs.writeFile(filePath, 'test file for chat-iruzo app', (err) => {
    if(err) {
        console.error('writeFile ... ', err);
    } else {
        console.log('writeFile ... The File was succesfully writed.');
    }
});
fs.rename(filePath, filePath + '.png', function (error) {
    if (error) console.error('ERROR EN EL RENOMBRE: ' + error);
});
console.log('llega hasta la linea 23');
var buffer = fs.readFileSync(filePath+'.png');
console.log('READED file: ' + buffer.toString());
try {
    buffer = fs.readFile(filePath+'.pngasdasdasd');
    console.log(buffer);
} catch (error) {
    console.error('no lo ha encontrado');
}

// console.log('ha llegado hasta la linea 33');
let files = require('../src/server/app/usecases/accessData/files');
// let testArray = JSON.parse('[{"ip":"192.168.0.23","port":null,"id":null,"userName":null,"nickName":null,"alias":null,"status":"online"},{"ip":"192.168.0.14","port":null,"id":null,"userName":null,"nickName":null,"alias":null,"status":null},{"ip":"192.168.0.12","port":null,"id":null,"userName":null,"nickName":null,"alias":null,"status":null},{"ip":"192.168.0.16","port":null,"id":null,"userName":null,"nickName":null,"alias":null,"status":null},{"ip":"192.168.0.11","port":null,"id":null,"userName":null,"nickName":null,"alias":null,"status":null},{"ip":"192.168.0.1","port":null,"id":null,"userName":null,"nickName":null,"alias":null,"status":null}]');
// console.log('ha llegado hasta la linea 35');
// console.log('ha llegado hasta la linea 37');
// files.writeFile(folderPath+'\\parseJSON.txt', JSON.stringify(testArray, null, 0));
console.error(JSON.parse(files.readFile(folderPath+'\\parseJSON.txt')));