var r = require('rethinkdb');

var fs = require('fs');

var creds = require('./creds');

r.connect(creds.creds)
    .then((conn) => {
        conn.use("spystuff")
        globalConn = conn;
        return r.table("orgs").eqJoin(r.row("alignment")("country"), r.table("assets"),{ index:"designer"}).without({
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
