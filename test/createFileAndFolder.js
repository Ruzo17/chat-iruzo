var fs = require('fs');

console.log(require('os').homedir());
console.log(process.platform);
let folderPath = require('os').homedir() + '\\lume';
let filePath = require('os').homedir() + '\\lume\\test';

if (!fs.existsSync(folderPath)){
    // console.log
    fs.mkdirSync(folderPath);
}
fs.writeFile(filePath, 'test file for Lume app', (err) => {
    if(err) {
        console.error('writeFile ... ', err);
    } else {
        fs.rename(filePath, filePath + '.png', function(error){
            if(error) console.error('ERROR EN EL RENOMBRE: ' + error);
        });
        console.log('writeFile ... The File was succesfully writed.');
    }
});
var buffer = fs.readFileSync(filePath+'.png');
console.log('READED file: ' + buffer.toString());
try {
    buffer = fs.readFile(filePath+'.pngasdasdasd');
    console.log(buffer);
} catch (error) {
    console.error('no lo ha encontrado');
}