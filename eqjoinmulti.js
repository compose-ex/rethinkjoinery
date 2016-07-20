var r = require('rethinkdb');

var fs = require('fs');

var creds = require('./creds');

r.connect(creds.creds)
    .then((conn) => {
        conn.use("spystuff")
        globalConn = conn;
        return r.table('agents').eqJoin(r.row("skill")(0), r.table("assets"), {
            index: "use"
        }).zip().run(globalConn);
    }).then((result) => {
        return result.toArray();
    }).then((result) => {
        console.log(JSON.stringify(result, null, 2));
        globalConn.close();
    });
