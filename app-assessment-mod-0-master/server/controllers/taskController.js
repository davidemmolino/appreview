const db = require('../models/TaskModel.js');

// create a controller object
const controller = {};

// create a handler for post requests 
controller.postTask = async (req, res, next) => {
    // destructure item to add to db from req.body
    const { item } = req.body;
    // this value will take place of the $1 sign in the query string
    const value = [ item ];
    // no need to pass in created_at if we set in DB created_at to timestamp
    const queryString = 'INSERT INTO Task (item) VALUES ($1) RETURNING *';
    // query the database to insert the data and go on to next middleware or error
    // using async await
    // best for readability and declaretiveness to use async await + try catch
    try {
        await db.query(queryString, value, (err, response) => {
            res.locals.addTask = response.rows[0];
            return next();
        });
    } catch (error) {
        return next(error);
    }
};

// create a handler for get requests
controller.getTasks = async (req, res, next) => {
    // create e string to query the database
    const query = "SELECT * FROM Task";
    try {
        await db.query(query, (err, response) => {
            // save all the tasks to res.locals obj
            res.locals.getAllTasks = response.rows;
            return next();
        });
    } catch (err) {
        return next(err);
    }
};

// create a handler to handle delete tasks
controller.deleteTask = async (req, res, next) => {
    const { id }  = req.params;
    const value = [ id ];
    // create query string to delete from db
    const query = "DELETE FROM Task WHERE id = $1 RETURNING id";
    try {
        await db.query(query, value, (err, response) => {
            res.locals.deleted = response.rows[0];
        });
    } catch (err) {
        return next(err)
    };
};

module.exports = controller;

