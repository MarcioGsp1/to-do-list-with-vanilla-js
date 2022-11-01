//Elements

const todoForm = document.querySelector('#todo-form');
const todoInput = document.querySelector('#todo-input');
const todoList = document.querySelector('#todo-list');
const editForm = document.querySelector('#edit-form');
const editInput = document.querySelector('#edit-input');
const cancelEditBtn = document.querySelector('#cancel-edit-btn');

let oldInputValue;

// functions
const saveTodo = (text) => {
    const todo = document.createElement('div');
    todo.classList.add('todo')

    const todoTitle = document.createElement('h3');
    todoTitle.innerText = text;
    todo.appendChild(todoTitle);
    
    const doneBtn = document.createElement('button');
    doneBtn.classList.add('finish-todo');
    doneBtn.innerHTML = '<i class="bi bi-check-circle"></i>';
    todo.appendChild(doneBtn);

    const editBtn = document.createElement('button');
    editBtn.classList.add('edit-todo');
    editBtn.innerHTML = '<i class="bi bi-pencil-fill"></i>';
    todo.appendChild(editBtn);

    const deleteBtn = document.createElement('button');
    deleteBtn.classList.add('remove-todo');
    deleteBtn.innerHTML = '<i class="bi bi-x-circle"></i>';
    todo.appendChild(deleteBtn);

    todoList.appendChild(todo);
    todoInput.value = '';
    todoInput.focus();
};

const toggleForms = () => {
    editForm.classList.toggle('hide');
    todoForm.classList.toggle('hide');
    todoList.classList.toggle('hide');
}

const updateTodo = (editInputValue) => {
    const todos = document.querySelectorAll('.todo');

    todos.forEach((todo) => {
        let todoTitle = todo.querySelector('h3')

        if(todoTitle.innerText === oldInputValue) {
            todoTitle.innerText = editInputValue;
        };
    });
};

//Events

todoForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const inputValue = todoInput.value;

    if(inputValue) {
        saveTodo(inputValue)
    }
});

document.addEventListener('click', (e) => {
   const targetEl = e.target;
   const partentEl = targetEl.closest('div');
   let todoTitle;

   if(partentEl && partentEl.querySelector('h3')) {
    todoTitle = partentEl.querySelector('h3').innerText;
   }

   if(targetEl.classList.contains('finish-todo')) {
    partentEl.classList.toggle('done');
   }

   if(targetEl.classList.contains('remove-todo')) {
    partentEl.remove();
   }
   if(targetEl.classList.contains('edit-todo')) {
        toggleForms();

        editInput.value = todoTitle;
        oldInputValue = todoTitle;
   }
});


cancelEditBtn.addEventListener('click', (e) => {
    e.preventDefault();

    toggleForms();
});

editForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const editInputValue = editInput.value

    if(editInputValue) {
        updateTodo(editInputValue);
    }

    toggleForms();

});

