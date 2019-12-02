class Contact {
    ip;
    port;
    id;
    userName;
    nickName;
    alias;

    constructor(ip, port, id, userName, nickName, alias) {
        this.ip = ip;
        this.port = port;
        this.id = id;
        this.userName = userName;
        this.nickName = nickName;
        this.alias = alias;
    }

    get ip()         {return this.ip;}
    get port()       {return this.port;}
    get id()         {return this.id;}
    get userName()   {return this.userName;}
    get nickName()   {return this.nickName;}
    get alias()      {return this.alias;}

    set ip(ip)               {this.ip = ip;}
    set port(port)           {this.port = port;}
    set id(id)               {this.id = id;}
    set userName(userName)   {this.userName = userName;}
    set nickName(nickName)   {this.nickName = nickName;}
    set alias(alias)         {this.alias = alias;}

    toString() {return this.ip + ':' + this.port + ', ' + this.id + ', ' + this.userName + ', ' + this.nickName + ', ' + this.alias;}
}

module.exports.Contact = Contact;