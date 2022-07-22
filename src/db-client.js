const Client = require("pg").Client;

const pgClient = new Client({
    host: "db",
    user: "postgres",
    password: "postgres",
    database: "postgres"
});

module.exports = { pgClient }