const pool = require("../config/postgres");
const bcrypt = require('bcrypt');
const generateNumericValue = require('../generate/numeric');


const register = async (req, res) => {
    let connection;
    try {
        const { firstName, lastName, email, phone, password } = req.body;

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        connection = await pool.connect();
        const check = 'SELECT * FROM signup WHERE g_id = $1';
        let aid = 'G-' + generateNumericValue(8);
        let result = await connection.query(check, [aid]);
  
        while (result.rowCount > 0) {
          aid = 'G-' + generateNumericValue(8);
          result = await connection.query(check, [aid]);
        }

        // Check if email already exists
        const emailCheckQuery = 'SELECT * FROM signup WHERE email = $1';
        const emailCheckResult = await connection.query(emailCheckQuery, [email]);

        if (emailCheckResult.rows.length > 0) {
            // Email already exists, return error response
            return res.status(409).send({ message: 'Email already exists' });
        }

        const query = 'INSERT INTO signup(g_id,firstName, lastName, email, phoneNumber, password) VALUES ($1, $2, $3, $4, $5,$6)';
        const values = [aid,firstName, lastName, email, phone, hashedPassword];
        await connection.query(query, values);

        return res.status(201).send({ message: 'User created successfully' });
    } catch (error) {
        console.error('Error during registration:', error);
        return res.status(500).send({ message: 'Error creating user' });
    } finally {
        if (connection) {
            await connection.release();
        }
    }
}


const login = async (req, res) => {
    let connection;
    try {
        const { email, password } = req.body;

        connection = await pool.connect();

        // Check if user with the given email exists
        const userQuery = 'SELECT * FROM signup WHERE email = $1';
        const userResult = await connection.query(userQuery, [email]);

        if (userResult.rows.length === 0) {
            // User with the given email does not exist
            return res.status(404).send({ message: 'User not found' });
        }

        const user = userResult.rows[0];

        // Check if the provided password matches the hashed password in the database
        const passwordMatch = await bcrypt.compare(password, user.password);

        if (!passwordMatch) {
            // Passwords do not match
            return res.status(401).send({ message: 'Invalid password' });
        }

        // Passwords match, user is authenticated
        return res.status(200).send({ message: 'Login successful', user: { id: user.id, firstName: user.firstName, lastName: user.lastName, email: user.email } });
    } catch (error) {
        console.error('Error during login:', error);
        return res.status(500).send({ message: 'Error logging in' });
    } finally {
        if (connection) {
            await connection.release();
        }
    }
}
const service= async (req, res) => {
    try {
      const { name, email, phoneNumber, service, url, enquery } = req.body;
  
      // Insert data into the SERVICES table
      const queryText = 'INSERT INTO SERVICES (Name, Email, PhoneNumber, Service, URL, enquery) VALUES ($1, $2, $3, $4, $5, $6)';
      await pool.query(queryText, [name, email, phoneNumber, service, url, enquery]);
  
      res.status(201).json({ message: 'Service added successfully' });
    } catch (error) {
      console.error('Error inserting data:', error);
      res.status(500).json({ error: 'Error inserting data' });
    }
  }

module.exports = { register,login,service };

