const pool = require("../config/postgres");

const createTable = async () => {
    try {
        // Define SQL query to create the table
        const createTableQuery = `
            CREATE TABLE IF NOT EXISTS signup (
                id SERIAL PRIMARY KEY,
                g_id varchar(255),
                firstName VARCHAR(100) NOT NULL,
                lastName VARCHAR(100) NOT NULL,
                email VARCHAR(100) NOT NULL,
                phoneNumber BIGINT NOT NULL,
                password VARCHAR(100) NOT NULL,
                date TIMESTAMP DEFAULT NOW()
            )`;



        // Get a client from the pool
        const client = await pool.connect();

        // Execute the SQL query
        await client.query(createTableQuery);
        
        console.log("Tables created successfully.");
        
        // Release the client back to the pool
        client.release();
    } catch (error) {
        console.error("Error creating table:", error);
    }
};

module.exports = { createTable };
