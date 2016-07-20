var r = require('rethinkdb');

var fs = require('fs');

var creds = require('./creds');

r.connect(creds.creds)
    .then((conn) => {
        conn.use("spystuff")
        globalConn = conn;
        // without zipping
        // return r.table("agents").eqJoin("org_id", r.table("orgs")).run(globalConn);
        //
        // with zipping (loses id)
        //return r.table("agents").eqJoin("org_id", r.table("orgs")).zip().run(globalConn);
        //
        // with zipping and without
        return r.table("agents").eqJoin("org_id", r.table("orgs")).without({
            "right": {
                "id": true
            }
        }).zip().run(globalConn);
    }).then((result) => {
        return result.toArray();
    }).then((result) => {
        console.log(JSON.stringify(result, null, 2));
        globalConn.close();
    });
