import React  from 'react'
import {deleteEmployee, getEmployeesList, createEmployee, updateEmployee, addEmployee} from '../redux/actionsCreators.js';
import { store } from '../redux/store.js';
import {EmployeeComponent} from '../components/EmployeeComponent.jsx'
import {EmployeeChangeForm} from './EmployeeChangeForm.jsx'
import Employee from '../class/Employee.js';
export default class EmployeeContainer extends React.Component {

componentDidMount() {
  let id = this.props.match.params.id;
  const len = store.getState().list.length;
  let empl = store.getState().list[id];
  let idE = store.getState().list[id].id;
  if(idE != id) {
  const employee = new Employee(id, 'https://cdn0.iconfinder.com/data/icons/PRACTIKA/256/user.png', empl.firstName, empl.lastName, empl.position, empl.skills, empl.gender, empl.dateOfBirthday, empl.qualification);
  createEmployee(employee);
  deleteEmployee(idE);
   }
}
constructor() {
  super();
  this.state = {flag: true, employee: ''}
}
toChange(temp) {
  this.setState({flag: false, employee: temp});
}

onSave(temp) {
    this.setState({employee: temp});
    console.log("temp: ", temp);
    addEmployee(temp);
    console.log("temp: ", temp);
    store.getState();
    getEmployeesList();
    this.props.history.push(`/`)
    
}
toDelete(temp) {
    getEmployeesList();
    deleteEmployee(temp);
    console.log("temp: ", temp);
    store.getState();
    console.log("getEmployeesList(): ", store.getState());
    getEmployeesList();
    this.props.history.push(`/`)
    
}
onClose(temp) {
  updateEmployee(temp);
  this.props.history.push(`/`);
  }
 render() {


          let id = this.props.match.params.id;
          const len = store.getState().list.length;
          console.log(store.getState());
          let empl = store.getState().list[id];
          console.log("********: ", store.getState().list[id]);
          const component = <EmployeeComponent 
                                photo={empl.photo} 
                                firstName={empl.firstName} 
                                lastName={empl.lastName} 
                                position={empl.position} 
                                skills={empl.skills} 
                                gender={empl.gender} 
                                dateOfBirthday={empl.dateOfBirthday} 
                                qualification={empl.qualification} 
                                toChange={this.toChange.bind(this, empl)} toDelete={this.toDelete.bind(this, id)} onClose={this.onClose.bind(this)}/>;
          console.log('employee: ', empl);
          const form = <EmployeeChangeForm 
                          employee={this.state.employee} 
                          onSave={this.onSave.bind(this)} 
                          toDelete={this.toDelete.bind(this, id)} 
                          onClose={this.onClose.bind(this, empl)}
                          />
          let switchPage;
          (this.state.flag == true)?(switchPage = component):(switchPage = form);
          return <div className='form'>{switchPage}</div>
          
        
        }
    }
