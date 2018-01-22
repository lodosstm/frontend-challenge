import {CREATE_NEW_EMPLOYEE, DELETE_EMPLOYEE, GET_EMPLOYEES_LIST, UPDATE_EMPLOYEES_LIST, SAVE_EMPLOYEE, UPDATE_EMPLOYEE} from './actionsTypes.js';
	const initialState = {
	list : [],
	employee: {}
};
export  function reducer(state = initialState, action) {
	switch(action.type) {
		case GET_EMPLOYEES_LIST:
			return Object.assign(...state, {list: action.list});
		case UPDATE_EMPLOYEES_LIST:
			return Object.assign(...state, {list: action.list});
		case DELETE_EMPLOYEE:
			return Object.assign({}, state, action.employee );
		case UPDATE_EMPLOYEE:
			return Object.assign({}, state, action.employee );
		case CREATE_NEW_EMPLOYEE:
			return Object.assign({}, state, action.id );
		default:
      		return state;
	}
}