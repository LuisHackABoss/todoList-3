'use strict';

// Recuperamos los datos del localStorage
const localeStorageState = JSON.parse(localStorage.getItem('stateTodoList'));

export const state = localeStorageState
	? localeStorageState
	: {
			tasks: [],
			nigth: false,
			order: 'new',
			filter: 'all',
	  };

// Guardamos el estado en el localStorage
export const saveState = () => {
	localStorage.setItem('stateTodoList', JSON.stringify(state));
};

// Añadir una tarea
export const addTask = (task) => {
	const taskObject = {
		text: task,
		done: false,
		createdAt: new Date().getTime(),
	};

	// Guardar la tarea en el estado
	state.tasks.push(taskObject);

	// Guardar el estado en el localStorage
	saveState();
};

// Cambiar el estado de una tarea
export const toggleStateTask = (id) => {
	// Cambiar el estado de la tarea
	state.tasks[id].done = !state.tasks[id].done;

	// Guardar el estado en el localStorage
	saveState();
};

// Funcion para borrar las tareas completadas
export const deleteDoneTasks = () => {
	state.tasks = state.tasks.filter((task) => !task.done);

	// Guardar el estado en el localStorage
	saveState();
};

// Funcion para borrar todas las tareas
export const deleteAllTasks = () => {
	state.tasks = [];

	// Guardar el estado en el localStorage
	saveState();
};

// Funcion para ordenar las tareas
export const toggleOrder = () => {
	state.order = state.order === 'new' ? 'old' : 'new';

	// Guardar el estado en el localStorage
	saveState();
};

// Funcion para filtrar las tareas
export const toggleFilter = () => {
	if (state.filter === 'done') {
		state.filter = 'undone';
	} else if (state.filter === 'undone') {
		state.filter = 'all';
	} else {
		state.filter = 'done';
	}

	// Guardar el estado en el localStorage
	saveState();
};
