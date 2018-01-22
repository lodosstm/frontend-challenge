import React  from 'react';
import ReactDOM from 'react-dom';
import {deleteEmployee, getEmployeesList, createEmployee, addEmployee} from '../redux/actionsCreators.js';
import { store } from '../redux/store.js';
import Employee from '../class/Employee.js';
import Form from '../components/Form.jsx';
import AutoComplete from 'material-ui/AutoComplete';
import SelectField from 'material-ui/SelectField';
import Dialog from 'material-ui/Dialog';
import Chip from 'material-ui/Chip';
import FlatButton from 'material-ui/FlatButton';
import { BrowserRouter, Route} from 'react-router-dom';
import '../../assets/styles/App.scss';





export default class Add extends React.Component {
componentWillMount() {
	let id = store.getState().list.length;
	var employee = new Employee(id, 'https://cdn0.iconfinder.com/data/icons/PRACTIKA/256/user.png', "firstName", "lastName", "some text", ["react"], null, new Date(2000, 0, 7, +5), "qualification");
 	createEmployee(employee);
 	console.log("store.getState(): ", store.getState());

}
constructor() {
  super()
  this.state = {
          id: store.getState().list.length,
          photo: 'https://cdn0.iconfinder.com/data/icons/PRACTIKA/256/user.png',
                  firstName: null, 
                  lastName: null, 
                  position: "some text",
                  skills: [],
                  gender: null,
                  dateOfBirthday: null,
                  qualification: null,
                  
                     }

    }
onSave(temp) {
      console.log("temp: ", temp);
      addEmployee(temp);
      console.log("temp: ", temp);
      store.getState();
      getEmployeesList();
      this.props.history.push(`/`);
    
}

closeForm(id) {
  deleteEmployee(id);
  this.props.history.push(`/`);
  }
 
render() {
   return <div className='form'>
            <Form id={this.state.id} photo={this.state.photo} firstName={this.state.firstName} lastName={this.state.lastName}  position={this.state.position}  skills={this.state.skills}  gender={this.state.gender}  dateOfBirthday={this.state.dateOfBirthday} qualification={this.state.qualification} closeForm={this.closeForm.bind(this)} onSave={this.onSave.bind(this)} />
          </div>
  }
}
