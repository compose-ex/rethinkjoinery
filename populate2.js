var r = require('rethinkdb');

var fs = require('fs');


var assets = [{
    "type": "Laser Pen",
    "use": ["management", "combat"],
    "designer": "USA"
}, {
    "type": "Larch",
    "use": ["stealth"],
    "designer": "UK"
}, {
    "type": "K9 Rifle",
    "use": ["combat", "assassination"],
    "designer": "USA"
}, {
    "type": "Black Helicopter",
    "use": ["stealth", "investigation"],
    "designer": "UN"
}, {
    "type": "Microdrone",
    "use": ["investigation", "stealth", "assassination"],
    "designer": "Global"
}];

var creds = require('./creds');

r.connect(creds.creds).then((conn) => {
    globalConn = conn;
    conn.use("spystuff");
    return r.table("assets").insert(assets).run(globalConn);
}).then((result) => {
    return r.table("assets").indexCreate("use", {
        multi: true
    }).run(globalConn);
}).then((result) => {
    globalConn.close();
});
