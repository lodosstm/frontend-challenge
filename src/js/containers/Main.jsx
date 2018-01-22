import React from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import {getEmployeesList} from '../redux/actionsCreators.js';
import { middleware } from '../redux/middleware.js';
import { reducer } from '../redux/reducer.js';
import { store } from '../redux/store.js';
import EmployeesList from '../components/EmployeesList.jsx';
import AddButton from '../components/AddButton.jsx';




const Main = connect(mapStateToProps, getEmployeesList())(
   class extends React.Component {
   constructor(props) {
    super(props);

    this.state = {
      employees: props.employees
    };
  }
    render() {

        console.log("It is props: ", this.props.employees);
        return <div class='list'>
                <EmployeesList employees={this.props.employees} />
              </div>
      }
   });

function mapStateToProps(state) {
  return {
    employees: state.list,
    id: state.id,
    
  }
}

export default Main;
