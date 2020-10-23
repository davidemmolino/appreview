// Require Pool from pg in order to create a new pool
const { Pool } = require('pg'); 

// v-- REPLACE THE EMPTY STRING WITH YOUR LOCAL/MLAB/ELEPHANTSQL URI
const myURI = 'postgres://vbtjkmas:0GApeITFFer7tD2DEJ9ZoRIRi6DPxvu9@salt.db.elephantsql.com:5432/vbtjkmas';

// UNCOMMENT THE LINE BELOW IF USING MONGO
// const URI = process.env.MONGO_URI || myURI;

// UNCOMMENT THE LINE BELOW IF USING POSTGRESQL
const URI = process.env.PG_URI || myURI;

// create a pool
const pool = new Pool({ connectionString: URI });


// commands to create the table 
// CREATE TABLE Task (id SERIAL PRIMARY KEY, item VARCHAR, created_at TIMESTAMP)

module.exports = {
    query: function(text, params, func) {
        return pool.query(text, params, func);
    }
}; // <-- export your model
