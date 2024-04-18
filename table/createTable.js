// const createPoolWithRetry = require('../config/postgres');

// const createTable = async () => {
//     try {
//         // Call createPoolWithRetry to create a connection pool
//         const pool = await createPoolWithRetry({
//             host,
//             database,
//             user: username,
//             password,
//             port
//         });

//         // Define SQL query to create the tables
//         const createTableQuery = `
//             CREATE TABLE IF NOT EXISTS signup (
//                 id SERIAL PRIMARY KEY,
//                 g_id varchar(255),
//                 firstName VARCHAR(100) NOT NULL,
//                 lastName VARCHAR(100) NOT NULL,
//                 email VARCHAR(100) NOT NULL,
//                 phoneNumber BIGINT NOT NULL,
//                 password VARCHAR(100) NOT NULL,
//                 date TIMESTAMP DEFAULT NOW()
//             );

//             CREATE TABLE IF NOT EXISTS EMPLOYEE_DATA (
//                 Id SERIAL PRIMARY KEY,
//                 Name VARCHAR(100) NOT NULL, 
//                 Email VARCHAR(100) NOT NULL,
//                 PhoneNumber BIGINT NOT NULL,
//                 Designation VARCHAR(100),
//                 Date TIMESTAMP DEFAULT NOW()
//             );

//             CREATE TABLE IF NOT EXISTS SERVICES (
//                 ID SERIAL PRIMARY KEY,
//                 Name VARCHAR(100) NOT NULL, 
//                 Email VARCHAR(100) NOT NULL,
//                 PhoneNumber BIGINT NOT NULL,
//                 service VARCHAR(100),
//                 URL VARCHAR(100),
//                 enquery TEXT,
//                 Date TIMESTAMP DEFAULT NOW()
//             );
//         `;

//         // Get a client from the pool
//         const client = await pool.connect();

//         // Execute the SQL query
//         await client.query(createTableQuery);

//         // Log a message indicating successful table creation
//         console.log("Tables created successfully.");

//         // Release the client back to the pool
//         client.release();
//     } catch (error) {
//         // Handle any errors that occur during connection or query execution
//         console.error('Error:', error);
//     }
// };

// module.exports = { createTable };

const pool = require("../config/postgres");

const createTable = async () => {
  let client = await pool.connect();

  try {
    const queries = [`
    CREATE TABLE IF NOT EXISTS signup(
                id SERIAL PRIMARY KEY,
                g_id varchar(255),
                firstName VARCHAR(100) NOT NULL,
                lastName VARCHAR(100) NOT NULL,
                email VARCHAR(100) NOT NULL,
                phoneNumber BIGINT NOT NULL,
                password VARCHAR(100) NOT NULL,
                date TIMESTAMP DEFAULT NOW()
      )`,
            
     ` CREATE TABLE IF NOT EXISTS EMPLOYEE_DATA (
                Id SERIAL PRIMARY KEY,
                Name VARCHAR(100) NOT NULL, 
                Email VARCHAR(100) NOT NULL,
                PhoneNumber BIGINT NOT NULL,
                Designation VARCHAR(100),
                Date TIMESTAMP DEFAULT NOW()
                        )`,
            
    `CREATE TABLE IF NOT EXISTS SERVICES (
                ID SERIAL PRIMARY KEY,
                Name VARCHAR(100) NOT NULL, 
                Email VARCHAR(100) NOT NULL,
                PhoneNumber BIGINT NOT NULL,
                service VARCHAR(100),
                URL VARCHAR(100),
                enquery TEXT,
                Date TIMESTAMP DEFAULT NOW()
    )`];

    for (const query of queries) {
        await client.query(query);
      }
  
      console.log("Tables created successfully");
    } catch (err) {
      console.error(err);
    } finally {
      client.release();
    }
  };
  
  module.exports = { createTable };
