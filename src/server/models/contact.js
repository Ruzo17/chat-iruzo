class Contact {
    ip;
    ipConnectionType;
    id;
    name;

    constructor(ip, ipConnectionType, id, name) {
        this.ip = ip;
        this.ipConnectionType = ipConnectionType;
        this.id = id;
        this.name = name;
    }
}

module.exports.Contact = Contact;