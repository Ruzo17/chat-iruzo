const log4js = require('log4js');

const logger = log4js.getLogger('['+process.pid+'] ' + require('path').basename(__filename).split(".")[0]);
logger.level = "debug";

const srvApi = require('../../server/api/api');
const {remote} = require('electron');
const {Menu, MenuItem} = remote;

const ip = new Menu();

const signOut = document.getElementById("signout");
const choose = document.getElementById("choose");
const log = document.getElementById("log");
const nombre = document.getElementById("nombre");
const pass = document.getElementById("pass");
const ava = document.getElementById("ava");
const userE = document.getElementById("userE");
const lisContac = document.getElementById("contac");
var term = document.querySelector(".term");
var general;
var contactos;
var usuarios;
var usu;
var cr;

srvApi.init();
window.onload = init;

function init() {
    logger.debug(arguments.callee.name, ' ... ');
    document.getElementById("text").addEventListener("keyup", (e) => { e.keyCode == 13 ? enviar() : false });
    document.getElementById("btnColap").addEventListener("click", girar);
    document.getElementById("logIn").addEventListener("click", pasarFormE);
    document.getElementById("signUp").addEventListener("click", pasarFormR);
    setInterval(getIpList, 5000);
    setInterval(actualizarCont, 5000);
    setInterval(actualizarChatG, 5000);
    logger.debug(document.getElementById("sectionc").getAttribute("data"));
    
}

function send(consoleInput) {
    logger.debug(arguments.callee.name, ' ... ');
    document.getElementById('consoleOutput').innerHTML = consoleInput.value;
    consoleInput.value = '';
}
module.exports.getIpList = getIpList;

//------------------------------------------------------front-end

ip.append(new MenuItem({
    label: "Añadir a contactos",
    click(){anadirContacto();}
}));
function desplazar(){choose.style.display = "none"; log.style.display = "flex"; signOut.style.display = "block";}
function atras(){log.style.display = "none"; signOut.style.display = "none"; choose.classList.remove("logV"); choose.style.display = "block"; choose.removeEventListener("transitionend", desplazar);}
function actualizarCont(){
    let indice = 0;
    let contD = document.querySelectorAll("#contac > div");
    contD.forEach( e => lisContac.removeChild(e));
    contactos = srvApi.getContacts();
    contactos.forEach(e => {
        
        let cont = document.createElement("div");
        cont.classList.add("user");
        cont.setAttribute("user", indice);
        cont.innerHTML = `

            <div><img class="avatar" src="../img/generico.PNG" alt="ruzo" height="40px"></div>
            <div>
                <p class="userName">${e.userName}</p>
                <p class="userStat">${e.status}</p>
            </div>

        `;
        lisContac.appendChild(cont);
        indice++;
    });
}
function getIpList() {
    logger.debug(arguments.callee.name, '... ');
    let indice = 0;
    let sectionl = document.getElementById("sectionl");
    let ips = document.querySelectorAll("#sectionl p");
    ips.forEach(e => sectionl.removeChild(e));
    usuarios = srvApi.getIpList();
    usuarios.forEach( e => {
        console.log(e.id);
        
        let ipP = document.createElement("p");
        ipP.innerHTML = e.ip;
        ipP.setAttribute("user", indice);
        ipP.addEventListener('contextmenu', (e) => {
            cr = e.target;
            e.preventDefault();
            ip.popup(remote.getCurrentWindow());
        }, false);
        sectionl.appendChild(ipP);
        indice++;
    });
}
function anadirContacto(){
    srvApi.addFriend(usuarios[cr.getAttribute("user")]);
}
var colap = false;
function enviar(){
    logger.debug(arguments.callee.name, " ... ");
    let text = document.getElementById("text");
    if(text.value.trim() != ""){
        srvApi.sendGlobalMessage(text.value);
        text.value   = "";
    }
}
function esContacto(ipM){
    srvApi.getContacts().forEach( e => {
        if(ipM == e.ip){
            return e.userName;
        }
    }
    );
    return false;
}
function actualizarChatG(){
    logger.debug(arguments.callee.name, " ... ");
    let mensajes = document.querySelectorAll(".term div");
    mensajes.forEach(e => e.parentElement.removeChild(e));
    general = srvApi.getGlobalChat();
    general.forEach( e => {
        let mensaje = document.createElement("div");
        let nombreContac = esContacto(e.split("[::@::]")[1]);
        mensaje.innerHTML = text.value;
        mensaje.classList.add("men");
        if(e.split("[::@::]")[1] == srvApi.getIp()){

            mensaje.classList.add("sub");
            mensaje.innerHTML = e.split("[::@::]")[2];

        }else if(nombreContac){
            mensaje.classList.add("rec");
            mensaje.innerHTML = `

                <i>${nombreContac} :</i>${e.split("[::@::]")[2]}
            
            `;
        }else{
            mensaje.classList.add("rec");
            mensaje.innerHTML = `

                <i>${e.split("[::@::]")[1]} :</i>${e.split("[::@::]")[2]}
            
            `;
        }
        term.appendChild(mensaje);
        term.scrollTo(0,term.scrollHeight);

    });
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
    choose.classList.add("logV");
    choose.addEventListener("transitionend", desplazar);
    signOut.addEventListener("click", atras);
    document.getElementById("nombre").addEventListener("keyup", (e) => { e.keyCode == 13 ? logIn() : false });
    document.getElementById("pass").addEventListener("keyup", (e) => { e.keyCode == 13 ? logIn() : false });

}
function pasarFormR(e){
    logger.debug(arguments.callee.name, " ... ");
    choose.classList.add("logV");
    choose.addEventListener("transitionend", desplazar);
    signOut.addEventListener("click", atras);
    document.getElementById("nombre").addEventListener("keyup", (e) => { e.keyCode == 13 ? signUp() : false });
    document.getElementById("pass").addEventListener("keyup", (e) => { e.keyCode == 13 ? signUp() : false });
}
function cerrarSession(){
    logger.debug(arguments.callee.name, " ... ");
    nombre.removeEventListener("transitionend", avanzarForm);
    nombre.classList.remove("formV");
    pass.classList.remove("formV");
    userE.style.display = "none";
    ava.style.display = "none";
    srvApi.disconnectUser(usu);
    atras();
    nombre.value = "";
    pass.value = "";
}
function avanzarForm(){
    log.style.display ="none";ava.style.display = "block";userE.style.display = "block";
}
function logIn(){
    logger.debug(arguments.callee.name, " ... ");
    if((usu = srvApi.loginUser(nombre.value, pass.value)) != false){
        
        nombre.classList.remove("invalid");
        pass.classList.remove("invalid");
        document.querySelector("#userE .userName").innerHTML = usu.userName;
        document.querySelector("#userE .userStat").innerHTML = usu.status;
        nombre.classList.add("formV");
        pass.classList.add("formV");    
        nombre.addEventListener("transitionend", avanzarForm);
        signOut.removeEventListener("click", atras);
        signOut.addEventListener("click", cerrarSession);

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

let address = document.querySelectorAll("#sectionl p");

address.forEach((ele) => {

    ele.addEventListener('contextmenu', (e) => {
        e.preventDefault();
        ip.popup(remote.getCurrentWindow());
    }, false);

});