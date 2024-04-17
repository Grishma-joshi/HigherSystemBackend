const { Pool } = require('pg');

const host = 'localhost'
const database = 'postgres'
const username = 'postgres'
const password = 'new_password'
const port = 5432; 
const pool = new Pool({
  host,
  database,
  user: username,
  password,
  port,
})
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
console.log("connection Successfully!!")
module.exports = pool;