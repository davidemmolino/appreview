
// Need input from id = "task"
const inputText = document.getElementById('task');

// button to add tasks
const addButton = document.getElementById('task-button');

addButton.addEventListener('click', (input) => {
  console.log('inside post task button');
  console.log(inputText);
  postTask();
})

const getTaskButton = document.getElementById('retrieve');

// GET ALL TASKS 
// add event listener to get all tasks
getTaskButton.addEventListener('click', () => {
  console.log('inside event listener get task: ');
    getAllTasks();
});
const taskList = document.getElementById('task-list');

const getAllTasks = () => {
  console.log('inside getTasks: ');
  // fetch to get all tasks
  fetch('/api')
    .then((response) => response.json())
    .then((data) => {
      //iterate through the data
        taskList.innerHTML = '';
          data.map((task) => {
          // creating a list element
          const list = document.createElement('li')
          // appending our task to the list element
          list.innerHTML = task.item;
          // adding a button
          const deleteButton = document.createElement('button');
          // add X into button
          deleteButton.innerText = 'X';
          // add event listener
          deleteButton.addEventListener('click', () => deleteTask(task.id));
          // appending our new list element with task, to the task-list
          document.getElementById('task-list').appendChild(list).appendChild(deleteButton);
        } )

       // For loop with rendering functionality above
      //  taskList.innerHTML = '';
      // for(let el of data) {
      //   const list = document.createElement('li')
      //   // appending our task to the list element
      //     list.innerHTML = el.item;
      //     // adding a button
      //     const deleteButton = document.createElement('button');
      //     // add X into button
      //     deleteButton.innerText = 'X';
      //     // add event listener
      //     deleteButton.addEventListener('click', () => deleteTask(el.id));
      //     // appending our new list element with task, to the task-list
      //     document.getElementById('task-list').appendChild(list).appendChild(deleteButton);
      // }
        
        //  // For loop method:
        //  taskList.innerHTML = '';
        //  for(let el of data) {
        //    const div = document.createElement('div');
        //    for(let key in el) {
        //      const inner = document.createElement('p');
        //      inner.innerText = el[key];
        //      div.appendChild(inner);
        //    }
        //    const deleteButton = document.createElement('button');
        //    deleteButton.innerText = 'X';
        //    deleteButton.addEventListener('click', (event) => deleteTask(el._id));
        //    div.appendChild(deleteButton);
        //    taskList.appendChild(div);
        //  }
      })
    
}

// ********* POST NEW TASK *********
const postTask = () => {
  const newTask = inputText.value;
  const postObj = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      item: newTask
    }),
  }

  fetch('/api', postObj)
    .then((res) => res.json())
    .then((result) => console.log(result))
    .then(() => getAllTasks())
}


const deleteTask = (id) => {
  const deleteObj = {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json'
    }
  }
  fetch(`/api/${id}`, deleteObj)
    .then((res) => res.json())
    .then(() => getAllTasks())
}


