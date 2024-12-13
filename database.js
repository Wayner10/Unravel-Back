const { Client } = require('pg');

//* - - - </> [DATA] </> - - - *//
const client = new Client({ user: "postgres", host: "localhost", database: "db_unravel", password: "kris0629", port: 5432 });

//* - - - </> [DATA] </> - - - *//
client.connect()
.then(() => console.log('Successfully connected to database'))
.catch(error => console.error('Error connecting to database', error.stack));

module.exports = client;