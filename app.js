let addMessage = document.querySelector('.write-task'),
  add = document.querySelector('.add'),
  todoContainer = document.querySelector('.todo-container');

let todoList = [];
showDataFromLocalStorage();

// Events

add.addEventListener('click', () => {
  if (!addMessage.value) {
    return;
  }
  let newTodo = {
    todo: addMessage.value,
    checked: false,
    important: false,
  };

  todoList.push(newTodo);
  displayMessages();
  localStorage.setItem('todo', JSON.stringify(todoList));
  addMessage.value = '';
});

todoContainer.addEventListener('change', (e) => {
  let inputId = e.target.getAttribute('id');
  let forLabel = todoContainer.querySelector(`[for='${inputId}']`);
  let textInsideLabel = forLabel.innerHTML;

  todoList.forEach((item) => {
    if (item.todo === textInsideLabel) {
      item.checked = !item.checked;
      localStorage.setItem('todo', JSON.stringify(todoList));
    }
  });
});

todoContainer.addEventListener('contextmenu', (e) => {
  e.preventDefault();

  todoList.forEach((item, index) => {
    if (item.todo === e.target.innerHTML) {
      if (e.ctrlKey || e.metaKey) {
        todoList.splice(index, 1);
      } else {
        item.important = !item.important;
      }

      displayMessages();
      localStorage.setItem('todo', JSON.stringify(todoList));
    }
  });
});

function displayMessages() {
  let template = '';
  if (!todoList.length) {
    todoContainer.innerHTML = 'Список дел пуст!';
  }
  todoList.forEach((todoItem, index) => {
    template += renderElement(todoItem, index);
    todoContainer.innerHTML = template;
  });
}

function renderElement({ todo, checked, important } = {}, index) {
  return `
        <li>
          <input type='checkbox' id='item-${index}' ${checked ? 'checked' : ''}>
          <label class="${
            important ? 'important' : ''
          }" for='item-${index}'>${todo}</label>
        </li>
      `;
}

function showDataFromLocalStorage() {
  if (!localStorage.getItem('todo')) {
    return;
  }

  todoList = JSON.parse(localStorage.getItem('todo'));
  displayMessages();

  return todoList;
}
