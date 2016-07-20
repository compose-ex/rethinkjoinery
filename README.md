# RethinkJoinery

These scripts complement an article on compose.com/articles.

Before starting, deploy RethinkDB on Compose and make a note of the admin user password/credential.
Also take the SSL Public Certificate from the Compose console for the RethinkDB deployment and save its contents in a file names `cacert`.

Then, go to the RethinkDB admin console and get your connection string. Go to the file `creds.js` and set the host, port and password fields to those of your deployment. Now all the programs will import that file and use it for connection credentials.

On RethinkDB, create a new database called "spystuff" and then create tables in that database called agents, orgs and assets.

Run `npm install` to download required packages - These examples need Node 6.x.
Now you can run the programs:

* `populate.js` - will create the first two tables and required index.
* `eqjoin.js` - performs an eqJoin on those tables.
* `populate2.js` - will add and index a third table.
* `eqjoinmulti.js` - performs a join with a multi-index field
