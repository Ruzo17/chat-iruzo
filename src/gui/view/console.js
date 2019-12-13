const log4js = require('log4js');

const logger = log4js.getLogger('['+process.pid+'] ' + require('path').basename(__filename).split(".")[0]);
logger.level = "debug";

const srvApi = require('../../server/api/api');
const {remote} = require('electron');
const {Menu, MenuItem} = remote;

const usuario = new Menu();
const ip = new Menu();

srvApi.init();
window.onload = init;

function init() {
    logger.debug(arguments.callee.name, ' ... ');
    document.getElementById("text").addEventListener("keyup", (e) => { e.keyCode == 13 ? enviar() : false });
    document.getElementById("btnColap").addEventListener("click", girar);
    document.getElementById("logIn").addEventListener("click", pasarFormE);
    document.getElementById("signUp").addEventListener("click", pasarFormR);
    setTimeout(getIpList, 5000);
}

function send(consoleInput) {
    logger.debug(arguments.callee.name, ' ... ');
    document.getElementById('consoleOutput').innerHTML = consoleInput.value;
    consoleInput.value = '';
}
module.exports.getIpList = getIpList;

//------------------------------------------------------front end

ip.append(new MenuItem({
    label: "Añadir a contactos",
    click(){console.log("Contacto añadido.");}
}));
usuario.append(new MenuItem({
    label: "Cambiar imagen de perfil",
    click(){console.log("Imagen Cambiada.");
    }
}));
usuario.append(new MenuItem({
    label: "Cambiar nombre",
    click(){console.log("Nombre Cambiado.");
    }
}));
usuario.append(new MenuItem({
    label: "Cambiar contraseña",
    click(){console.log("Contraseña Cambiada.");
    }
}));
usuario.append(new MenuItem({
    label: "Cerrar Sesion",
    click(){console.log("Sesion cerrada.");
    }
}));
function getIpList() {
    logger.debug(arguments.callee.name, '... ');
    let sectionl = document.getElementById("sectionl");
    srvApi.getIpList().forEach( e => {
        logger.debug("ite");
        let ipP = document.createElement("p");
        ipP.innerHTML = e.ip;
        ipP.addEventListener('contextmenu', (e) => {
            e.preventDefault();
            ip.popup(remote.getCurrentWindow());
        }, false);
        sectionl.appendChild(ipP);
    });
}
var colap = false;
function enviar(){
    logger.debug(arguments.callee.name, " ... ");
    let text = document.getElementById("text");
    if(text.value.trim() != ""){
        let mensaje = document.createElement("div");
        mensaje.innerHTML = text.value;
        mensaje.classList.add("sub");
        mensaje.classList.add("men");
        text.value   = "";
        let term = document.getElementById("term");
        term.appendChild(mensaje);
        term.scrollTo(0,term.scrollHeight);
    }
}
function girar(e){
    logger.debug(arguments.callee.name, " ... ");
    let flecha = document.querySelector(".colap");
    let sectionR = document.getElementById("sectionr");
    let contactos = document.querySelector("#cabecera p");
    if(colap){
        sectionR.classList.remove("colapsar");
        flecha.classList.remove("der");
        contactos.style.display = "block";
        colap = false;
    }else{
        sectionR.classList.add("colapsar");
        flecha.classList.add("der");
        contactos.style.display = "none";
        colap = true;
    }
}
function pasarFormE(e){
    logger.debug(arguments.callee.name, " ... ");
    let choose = document.getElementById("choose");
    let log = document.getElementById("log");
    choose.classList.add("logV");
    choose.addEventListener("transitionend", () => {choose.style.display = "none"; log.style.display = "flex"});
    document.getElementById("nombre").addEventListener("keyup", (e) => { e.keyCode == 13 ? logIn() : false });
    document.getElementById("pass").addEventListener("keyup", (e) => { e.keyCode == 13 ? logIn() : false });
}
function pasarFormR(e){
    logger.debug(arguments.callee.name, " ... ");
    let choose = document.getElementById("choose");
    let log = document.getElementById("log");
    choose.classList.add("logV");
    choose.addEventListener("transitionend", () => {choose.style.display = "none"; log.style.display = "flex"});
    document.getElementById("nombre").addEventListener("keyup", (e) => { e.keyCode == 13 ? signUp() : false });
    document.getElementById("pass").addEventListener("keyup", (e) => { e.keyCode == 13 ? signUp() : false });
}
function logIn(){
    logger.debug(arguments.callee.name, " ... ");
    let nombre = document.getElementById("nombre");
    let pass = document.getElementById("pass");
    let ava = document.getElementById("ava");
    let userE = document.getElementById("userE");
    let usu;
    if((usu = srvApi.loginUser(nombre.value, pass.value)) != false){
        document.querySelector("#userE .userName").innerHTML = usu.userName;
        document.querySelector("#userE .userStat").innerHTML = usu.status;
        nombre.classList.add("formV");
        pass.classList.add("formV");
        nombre.addEventListener("transitionend", () => {nombre.style.display = "none";pass.style.display ="none";ava.style.display = "block";userE.style.display = "block";});
    }else{
        nombre.classList.add("invalid");
        pass.classList.add("invalid");
        console.log("invalido");
        
    }
}
function signUp(){
    logger.debug(arguments.callee.name, " ... ");
    let nombre = document.getElementById("nombre");
    let pass = document.getElementById("pass");
    srvApi.registerUser(nombre.value, pass.value);
    logIn();
}

document.getElementById("userE").addEventListener('contextmenu', (e) => {
    e.preventDefault();
    usuario.popup(remote.getCurrentWindow());
}, false);
document.getElementById("ava").addEventListener('contextmenu', (e) => {
    e.preventDefault();
    usuario.popup(remote.getCurrentWindow());
}, false);

let address = document.querySelectorAll("#sectionl p");

address.forEach((ele) => {

    ele.addEventListener('contextmenu', (e) => {
        e.preventDefault();
        ip.popup(remote.getCurrentWindow());
    }, false);

});