const toDoInpt = document.querySelector('.todo__input');
const toDoList = document.querySelector('.todo__list');
const addBtn = document.querySelector('.todo__form');
const template = document.querySelector('#tasktmpl');
const dltAllBtn = document.querySelector('.todo__dlt-all-btn');
const sortBtn = document.querySelector('.todo__sort');

const addTask = (task) => {
    todoArr.push({
        id: todoArr.length !== 0 ? todoArr.length : 0,
        task,
        status: 'progress',
    })
};

const changeTask = (id, taskNode) => {
    let currentStatus = todoArr.find(task => task.id === id).status;
    if (currentStatus === 'completed') {
        todoArr.find(task => task.id === id).status = 'progress';
        taskNode.classList.remove('task_green');
    } else {
        todoArr.find(task => task.id === id).status = 'completed';
        taskNode.classList.add('task_green');
    }
};

const deleteTask = (id) => {
    todoArr.forEach((task, index) => {
      if (task.id === id) {
        todoArr.splice(index, 1);
      }
    })
};

const filterBy = (status) => {
    return todoArr.filter(task => task.status === status);
};

const renderTasks = (todoArr) => {
    todoArr.forEach((task) => {
        const elem = template.content.cloneNode(true);
        const currentTask = elem.querySelector('.task');
        const comleteCheckbox = elem.querySelector('.task__completed');
        elem.querySelector('.task__name').textContent = task.task;

        elem.querySelector('.todo__dlt-btn').addEventListener('click', () => {
            deleteTask(task.id);
            currentTask.remove();
        });

        comleteCheckbox.addEventListener('click', () => {
            changeTask(task.id, currentTask);
        });

        if (task.status === 'completed') {
            comleteCheckbox.checked = true;
            currentTask.classList.add('task_green');
        };

        toDoList.append(elem);
        toDoInpt.value = '';
    })
};

const todoArr = [];

dltAllBtn.addEventListener('click', (e) => {
    e.preventDefault();
    todoArr.splice(0, todoArr.length);
    toDoList.innerHTML = '';
});

addBtn.addEventListener('submit', (e) => {
    e.preventDefault();
    if (toDoInpt.value) {
        toDoList.innerHTML = '';
        addTask(toDoInpt.value);
        renderTasks(todoArr);
    }
});

sortBtn.addEventListener('change', (e) => {
    toDoList.innerHTML = '';
    if (e.target.value === "all") {
        renderTasks(todoArr);
    } else if (e.target.value === "completed") {
        renderTasks(filterBy('completed'));
    } else {
        renderTasks(filterBy('progress'));
    }
});
