const express = require('express');
const taskController = require('./controllers/taskController.js');
const router = express.Router();

// Post tasks router
router.post('/', taskController.postTask, (req, res) => {
  res.status(200).json(res.locals.addTask);
});

// Get all tasks router
router.get('/', taskController.getTasks, (req, res) => {
  res.status(200).json(res.locals.getAllTasks);
})

// Delete tasks router
router.delete('/:id', taskController.deleteTask, (req, res) => {
  res.status(200).json(res.locals.deleted);
}) 

module.exports = router;


