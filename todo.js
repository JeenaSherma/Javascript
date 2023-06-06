const taskInput = document.getElementById('taskInput');
const todoTableBody = document.getElementById('tbody');
const button = document.getElementById('button');

let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

function saveTasksToLocalStorage() {
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function createTableCell(value) {
    const cell = document.createElement('td');
    cell.innerText = value;
    return cell;
}

function createActionButton(action, taskId) {
    const button = document.createElement('button');
    button.innerText = action;
    button.className = 'btn btn-secondary btn-sm';
    button.style.marginRight = '5px';
    button.addEventListener('click', function () {
        performAction(action, taskId);
    });
    return button;
}

function performAction(action, taskId) {
    if (action === 'edit') {
        // Handle edit action
        const newTask = prompt('Enter the updated task:');
        if (newTask !== null && newTask.trim() !== '') {
            tasks[taskId].name = newTask.trim();
        }
    } else if (action === 'delete') {
        // Handle delete action
        tasks.splice(taskId, 1);
    }
    saveTasksToLocalStorage();
    updateTable();
}

function updateTable() {
    todoTableBody.innerHTML = '';

    tasks.forEach(function (task, index) {
        const tableRow = document.createElement('tr');
        tableRow.appendChild(createTableCell(index + 1));
        tableRow.appendChild(createTableCell(task.name));

        const actionCell = document.createElement('td');
        const editButton = createActionButton('edit', index);
        const deleteButton = createActionButton('delete', index);
        actionCell.appendChild(editButton);
        actionCell.appendChild(deleteButton);

        tableRow.appendChild(actionCell);

        todoTableBody.appendChild(tableRow);
    });
}

button.addEventListener('click', function (event) {
    event.preventDefault();
    const task = taskInput.value.trim();

    if (task !== '') {
        tasks.push({ name: task });
        saveTasksToLocalStorage();
        updateTable();
        taskInput.value = '';
    }
});

updateTable();
