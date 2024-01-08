'use strict';

import {
	addTask,
	deleteAllTasks,
	deleteDoneTasks,
	state,
	toggleFilter,
	toggleOrder,
	toggleStateTask,
} from './state.js';

// Seleccionar el formulario
const form = document.forms.formTodo;

// Seleccionar la ul
const ul = document.querySelector('#todoList');

// Seleccionar el p que muestra el error
const error = document.querySelector('#error');

// Seleccionar el modal
const modal = document.querySelector('.modal-ext');

// Seleccionar los botones
const btnTheme = document.querySelector('#btnTheme');
const btnClear = document.querySelector('#btnClear');
const btnDelete = document.querySelector('#btnDelete');
const btnOrder = document.querySelector('#btnOrder');
const btnFilter = document.querySelector('#btnFilter');
const deleteOk = document.querySelector('#deleteOk');

// Funcion para renderizar las tareas
const render = () => {
	// Contador de tareas
	let counter = 0;

	// Fragment para añadir las tareas
	const fragment = document.createDocumentFragment();

	// Ordenar las tareas
	const sortedTasks = state.tasks.sort((a, b) => {
		if (state.order === 'new') {
			return b.createdAt - a.createdAt;
		} else {
			return a.createdAt - b.createdAt;
		}
	});

	// Filtrar las tareas
	const filteredTasks = sortedTasks.filter((task) => {
		if (state.filter === 'done') {
			return task.done;
		} else if (state.filter === 'undone') {
			return !task.done;
		} else {
			return true;
		}
	});

	// Recorrer las tareas
	for (const task of filteredTasks) {
		const li = document.createElement('li');
		const input = document.createElement('input');
		const span = document.createElement('span');
		span.textContent = task.text;

		// Agregar atributos al li
		li.dataset.counter = counter++;
		li.setAttribute('name', 'task');

		// Agregar atributos al input
		input.setAttribute('type', 'checkbox');
		input.setAttribute('name', 'check');
		if (task.done) {
			input.setAttribute('checked', '');
			span.classList.add('done');
		} else {
			input.removeAttribute('checked');
			span.classList.remove('done');
		}

		// Insertar el input y el span en el li
		li.append(input);
		li.append(span);

		// Agregar el li al fragment
		fragment.append(li);
	}

	// Limpiar el ul
	ul.innerHTML = '';
	// Agregar el fragment al ul
	ul.append(fragment);

	//  Modificar los botones
	btnOrder.textContent = state.order === 'new' ? '⬇️' : '⬆️';
	if (state.filter === 'done') {
		btnFilter.innerHTML = '<img src="../img/done.png" alt="Done" />';
	} else if (state.filter === 'undone') {
		btnFilter.innerHTML = '<img src="../img/undone.png" alt="Undone" />';
	} else {
		btnFilter.innerHTML = '<img src="../img/all.png" alt="All" />';
	}
};

// FUncion para añadir una tarea
const handleSubmit = (event) => {
	event.preventDefault();

	// Guaradamos el valor del input
	const newTask = form.elements.newTask;
	// Limpiar la tarea
	const taskText = newTask.value.trim();

	// Si la tarea no está vacía
	if (taskText !== '') {
		// Añadir la tarea
		addTask(taskText);
		// Limpiar  error
		showError('');
	} else {
		// Mostrar el error
		showError('La tarea esta vacía');
	}

	// Limpiar el formulario
	form.reset();

	// Renderizar las tareas
	render();
};

// Añadir el evento submit al formulario
form.addEventListener('submit', handleSubmit);

// Cambiar el estado de una tarea
ul.addEventListener('click', (event) => {
	const target = event.target;

	// Si el target es un input
	if (target.matches('input')) {
		// Cambiar el estado de la tarea
		const id = parseInt(target.parentElement.dataset.counter);
		toggleStateTask(id);
		// Renderizar las tareas
		render();
	}
});

// Evento para borrar las tareas completadas
btnClear.addEventListener('click', (event) => {
	// Mostrar el modal
	modal.classList.toggle('hide');
	deleteOk.addEventListener('click', () => {
		// Borrar las tareas completadas
		deleteDoneTasks();
		// Renderizar las tareas
		render();
	});
});

// Evento para borrar todas las tareas
btnDelete.addEventListener('click', (event) => {
	// Mostrar el modal
	modal.classList.toggle('hide');
	deleteOk.addEventListener('click', () => {
		// Borrar todas las tareas
		deleteAllTasks();
		// Renderizar las tareas
		render();
	});
});

// Evento para mostrar el modal
modal.addEventListener('click', (event) => {
	modal.classList.toggle('hide');
});

// Evento para cambiar el orden de las tareas
btnOrder.addEventListener('click', (event) => {
	// Cambiar el orden de las tareas
	toggleOrder();
	// Renderizar las tareas
	render();
});

// Evento para filtrar las tareas
btnFilter.addEventListener('click', (event) => {
	// Filtrar las tareas
	toggleFilter();
	// Renderizar las tareas
	render();
});

const showError = (message) => {
	error.textContent = message;
};

render();
