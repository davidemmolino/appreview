const db = require('../models/TaskModel.js');
const taskController = {};

// postTask - create new item in db
taskController.postTask = async (req, res, next) => {
  // don't use backticks (possible SQL injection)
  try {
    const queryText = 'INSERT INTO Task (item) VALUES ($1) RETURNING *';
    const { item } = req.body;
    const values = [item]; // OR const values = req.body.item
  
    await db.query(queryText, values,
      (err, response) => {
        res.locals.addTask = response.rows[0];
        return next();
      })
  } catch(err) {
    return next(err);
  }
}

// Async method
taskController.getTasks = async (req, res, next) => {
  try {
    const queryText = 'SELECT * FROM Task';
    await db.query(queryText,
      (err, response) => {
        res.locals.getAllTasks = response.rows;
        return next();
      })
  } catch(err) {
    return next(err);
  }
}


// .then method
// getTasks - retrieve all itesm from db
// taskController.getTasks = (req, res, next) => {
//   const queryText = 'SELECT * FROM Task';
//   db.query(queryText)
//     .then((data) => {
//       res.locals.getAllTasks = data;
//       return next();
//     })
//     .catch((err) => {
//       return next(err);
//     })
// }

// deleteTask - find item in db and delete
taskController.deleteTask = async (req, res, next) => {

  const queryText = 'DELETE FROM Task WHERE id = $1 RETURNING id;';
  const { id } = req.params;
  const values = [id];
  console.log(req.params);
  
  try {
      await db.query(queryText, values,
      (err, response) => {
        res.locals.deleted = response.rows[0];
        return next();
      })
  } catch(err) {
    return next(err);
  }
}


module.exports = taskController;
