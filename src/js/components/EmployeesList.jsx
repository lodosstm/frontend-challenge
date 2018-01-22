import React  from 'react'
import { Link } from 'react-router-dom'
import TextField from 'material-ui/TextField';
import Paper from 'material-ui/Paper';
import Drawer from 'material-ui/Drawer';
import {Element} from '../components/Element.jsx';
export default class EmployeesList extends React.Component {
     constructor(props) {
      super(props);

    this.state = {
      search: '',
      open: false
    };
  }
  
  filterList(event) {
    var searchEmployees = event.target.value.toLowerCase();
    this.setState({ search: searchEmployees});
  }
  
  render() {
        let allList = this.props.employees.map((item) => {
          return item;
        });
        
       let searchString = this.state.search;
       let displayedEmployees = allList.filter((el) => {
        console.log("el.skills: ", el.skills);
          var searchValue = el.firstName.toLowerCase() + el.lastName.toLowerCase() + el.gender.toLowerCase() + el.position  + el.skills + el.dateOfBirthday + el.qualification;
          return searchValue.indexOf(searchString) !== -1;
        })
       let list = displayedEmployees.map((item, index) => {
          return <div  key={index}>
          <Paper style={{backgroundColor:"#FAFAFA"}}>
          <Link to={'/employee/'+index}>
          <Element id={item.id} photo={item.photo} firstName={item.firstName} lastName={item.lastName} position={item.position} skills={item.skills} />
          </Link>
          </Paper>
          </div>
        });
          return <div>
                <TextField style={{margin: '12px'}} onChange={this.filterList.bind(this)} value={this.state.search} hintText="Search employee..." />
                <div>{list}</div>
                <Paper style={{height: '500px'}}></Paper>
              </div>
        }
    }