const { response } = require("express");

// get handle on the add task button
const addTaskButton = document.querySelector('#task-button');
// event listener to click button
addTask.addEventListener('click', () => addTask());

// define the add task function
// should grab all tasks in the db
const addTask = () => {
    // fetch info from database
    fetch('/api')
    .then(response => response.json)
    // iterate through the data and assign an li for each item 
    // that will be retrieved
    .then(data => {
        data.map((task, i) => {
            document.createElement('li')
                    .appendChild('task');
        })
    })
    .catch(err = console.log(err))
};

