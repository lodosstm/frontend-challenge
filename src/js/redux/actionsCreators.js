import {CREATE_NEW_EMPLOYEE, DELETE_EMPLOYEE, GET_EMPLOYEES_LIST, UPDATE_EMPLOYEES_LIST, SAVE_EMPLOYEE, UPDATE_EMPLOYEE} from './actionsTypes.js';
import axios from 'axios';
import { store } from './store.js';
const initialState = {
	list : [],
	employee: {}
};


export function getEmployeesList() {
	
		axios.get('http://localhost:3000/employees').then(responce => {
			store.dispatch({type: GET_EMPLOYEES_LIST, list: responce.data});
			console.log('State: ', store.getState());
			}).catch(error => {
				console.log('error');
			});

}
export function deleteEmployee(id) {
    axios.delete(`http://localhost:3000/employees/${id}`).then(responce => {
      store.dispatch({type: DELETE_EMPLOYEE, employee: responce.data});
			});
    
}
export function updateEmployee(employee) {
    axios.put(`http://localhost:3000/employees/${employee.id}`, employee).then(responce => {
      store.dispatch({type: UPDATE_EMPLOYEE, employee: responce.data});
  	  console.log('StateE: ', store.getState());
			}).catch(error => {
				console.log('error');
			});
	
}
export function updateEmployeeList(list) {
    axios.delete(`http://localhost:3000/employees`, list).then(responce => {
    	axios.post(`http://localhost:3000/employees`, list).then(responce => {
     	 store.dispatch({type: UPDATE_EMPLOYEES_LIST, list: responce.data});
  	  		console.log('StateE: ', store.getState());
			}).catch(error => {
				console.log('error');
			});
	});
}
export function addEmployee(employee) {
    axios.put(`http://localhost:3000/employees/${employee.id}`, employee).then(responce => {
      store.dispatch({type: UPDATE_EMPLOYEE, employee: responce.data});
  	  console.log('StateE: ', store.getState());
			}).catch(error => {
				console.log('error');
			});
	axios.get('http://localhost:3000/employees').then(responce => {
			store.dispatch({type: GET_EMPLOYEES_LIST, list: responce.data});
	});
}
export function createEmployee(employee) {
	axios.post(`http://localhost:3000/employees`, employee).then(responce => {
		const empl = responce.data;
      	store.dispatch({type: CREATE_NEW_EMPLOYEE, id: empl.id});
          console.log('State1: ', store.getState());
        });
      }






