var r = require('rethinkdb');

var fs = require('fs');

var orgs = [{
    "org": "MI6",
    "alignment": {
        country: "UK",
        "side": "west",
    }
}, {
    "org": "UNCLE",
    "alignment": {
        country: "UN",
        "side": "none",
    }
}, {
    "org": "SHIELD",
    "alignment": {
        country: "Global",
        "side": "none",
    }
}, {
    "org": "CIA",
    "alignment": {
        country: "USA",
        "side": "west",
    }
}, {
    "org": "M9",
    "alignment": {
        country: "UK",
        "side": "west",
    }
}, {
    "org": "The Figgis Agency",
    "alignment": {
        "country": "USA",
        "side": "unknown"
    }
}];

var agents = [{
    "name": "James Bond",
    "org": "MI6",
    "skill": ["assasination"]
}, {
    "name": "Napoleon Solo",
    "org": "UNCLE",
    "skill": ["stealth"]
}, {
    "name": "Illya Kuryakin",
    "org": "UNCLE",
    "skill": ["combat"]
}, {
    "name": "George Smiley",
    "org": "MI6",
    "skill": ["investigation", "management"]
}, {
    "name": "Phil Coulson",
    "org": "SHIELD",
    "skill": ["management"]
}, {
    "name": "Chuck Bartowski",
    "org": "CIA",
    "skill": ["investigation", "stealth"]
}, {
    "name": "John Drake",
    "org": "M9",
    "skill": ["investigation"]
}, {
    "name ": "Jason Bourne",
    "org": "CIA",
    "skill": ["combat", "assassination"]
}, {
    "name": "Sterling Archer",
    "org": "The Figgis Agency",
    "skill": ["combat", "firearms", "phrasing"]
}];

var org_ids = new Map();

var creds = require('./creds');

r.connect(creds.creds).then((conn) => {
    globalConn = conn;
    conn.use("spystuff");
    return r.table("orgs").insert(orgs).run(globalConn);
}).then((result) => {
    return r.table("orgs").pluck("org", "id").run(globalConn);
}).then((result) => {
    return result.toArray();
}).then((result) => {
    for (org of result) {
        org_ids[org.org] = org.id;
    }
    for (agent of agents) {
        agent.org_id = org_ids[agent.org];
        delete(agent.org);
    }
    return r.table("agents").insert(agents).run(globalConn);
}).then((result) => {
    globalConn.close();
});
