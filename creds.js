var fs = require('fs');

caCert = fs.readFileSync('./cacert');

credentials={
        host: 'YourComposeRethinkDB.com',
        port: 10000,
        user: 'admin',
        password: 'APassword',
        ssl: {
            ca: caCert
        }
    };

    
module.exports.creds=creds;
