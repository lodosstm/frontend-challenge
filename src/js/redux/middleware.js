import {getEmployeesList, updateEmployee, createEmployee, deleteEmployee, addEmployee, updateEmployeeList } from './actionsCreators.js';
import { store } from './store.js';
import { reducer } from './reducer.js';

export	const middleware = (store) => (next) => (action) => {
	console.log('action: ', action);
	let result = next(action);
	console.log('next state', store.getState());
	return result;
};
