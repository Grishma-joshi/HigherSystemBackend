// const { Pool } = require('pg');

// // const host = 'localhost'
// // const database = 'postgres'
// // const username = 'postgres'
// // const password = 'new_password'
// // const port = 5432; 

// const host ="dpg-cof4i30cmk4c73804mmg-a.singapore-postgres.render.com"
// const database = 'higher_india_igzy'
// const username = 'higher_india_igzy_user'
// const password = 'xiNS7MaYth9krOrpR1YxXzw49cVZbjlr'
// const port = 5432; 
// const pool = new Pool({
//   host,
//   database,
//   user: username,
//   password,
//   port,
// })
// const host = 'ec2-3-110-220-80.ap-south-1.compute.amazonaws.com'
// const database = 'higherdb'
// const username = 'higherdb1'
// const password = 'higherIndia'
// const port = 5432; 
// const pool = new Pool({
//   host,
//   database,
//   user: username,
//   password,
//   port,
// })


const { Pool } = require('pg');
const retry = require('../retry');

const host = "dpg-cof4i30cmk4c73804mmg-a.singapore-postgres.render.com";
const database = 'higher_india_igzy';
const username = 'higher_india_igzy_user';
const password = 'xiNS7MaYth9krOrpR1YxXzw49cVZbjlr';
const port = 5432;   

function createPoolWithRetry(options, retries = 3, factor = 2) {
    const operation = retry.operation({
        retries: retries,
        factor: factor,
        minTimeout: 1000,
        maxTimeout: 30000,
        randomize: true,
    });

    return new Promise((resolve, reject) => {
        operation.attempt(currentAttempt => {
            const pool = new Pool(options);
            pool.connect((err, client, release) => {
                if (operation.retry(err)) {
                    release();
                    return;
                }

                if (err) {
                    reject(err);
                } else {
                    resolve(pool);
                }
            });
        });
    });
}

createPoolWithRetry({ host, database, user: username, password, port })
    .then(pool => {
        console.log('Connected to the database successfully!');
        // Do something with the pool
    })
    .catch(err => {
        console.error('Failed to connect to the database:', err);
    });

    console.log("connection Successfully!!")
module.exports = pool;
