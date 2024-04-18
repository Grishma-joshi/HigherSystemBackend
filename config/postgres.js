


const { Pool } = require("pg");

const host = 'dpg-cof4i30cmk4c73804mmg-a.singapore-postgres.render.com';
const database = 'higher_india_igzy'
const username = 'higher_india_igzy_user'
const password = 'xiNS7MaYth9krOrpR1YxXzw49cVZbjlr'
const port = 5432;
const ssl = true;

const pool = new Pool({
    host,
    database,
    user:username,
    password,
    port,
    ssl
});
console.log("database connection successfully");
module.exports = pool;