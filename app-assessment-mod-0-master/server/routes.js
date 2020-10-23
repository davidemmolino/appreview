const express = require('express');
const controller = require('./controllers/taskController');
//  express.Router()
const router = express.Router();

// set up routes to handle api request
// CRUD

// handle post request
router.post('/', controller.postTask, (req, res) => {
    // send response back to client with what we added to db
    res.status(200).json(res.locals.addTask);
});
// handle get request
router.get('/', controller.getTasks, (req, res) => {
    res.status(200).json(res.locals.getAllTasks);
});
// handle delete reqs
router.delete('/:id', controller.deleteTask, (req, res) => {
    res.status(200).json(res.locals.deleted);
});

module.exports = router;