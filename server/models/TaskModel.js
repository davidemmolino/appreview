// v-- REPLACE THE EMPTY STRING WITH YOUR LOCAL/MLAB/ELEPHANTSQL URI
const myURI = 'postgres://vbtjkmas:0GApeITFFer7tD2DEJ9ZoRIRi6DPxvu9@salt.db.elephantsql.com:5432/vbtjkmas';

// table creation
// CREATE TABLE Task (id SERIAL PRIMARY KEY, item VARCHAR, created_at TIMESTAMP);
// id and timestamp automatically generate


// UNCOMMENT THE LINE BELOW IF USING MONGO
// const URI = process.env.MONGO_URI || myURI;

// UNCOMMENT THE LINE BELOW IF USING POSTGRESQL
const URI = process.env.PG_URI || myURI;

const { Pool } = require('pg');

const pool = new Pool({connectionString: URI})

module.exports = {
  query: function (text, params, callback) {
    return pool.query(text, params, callback);
  }
}; // <-- export your model
