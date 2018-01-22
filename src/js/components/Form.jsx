import React  from 'react';
import { Link } from 'react-router-dom'
import {deleteEmployee, getEmployeesList, createEmployee, addEmployee, updateEmployee, store } from '../redux/actionsCreators.js';
import Employee from '../class/Employee.js';
import {source} from '../sourse/source.js';
import AutoComplete from 'material-ui/AutoComplete';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import Chip from 'material-ui/Chip';
import RaisedButton from 'material-ui/RaisedButton';
import NewDatePicker from './NewDatePicker.jsx';
import TextField from 'material-ui/TextField';
import IconButton from 'material-ui/IconButton';
import '../../assets/styles/App.scss';
import {orangeA400, grey900, grey50, grey800} from 'material-ui/styles/colors';
import HighlightOff from 'material-ui/svg-icons/action/highlight-off';
import KeyboardArrowDown from 'material-ui/svg-icons/hardware/keyboard-arrow-down';
import KeyboardArrowUp from 'material-ui/svg-icons/hardware/keyboard-arrow-up';


export default class Form extends React.Component {

 constructor(props) {
  super(props)
  this.state = {
                id: this.props.id,
                  photo: this.props.photo,
                  firstName: this.props.firstName, 
                  lastName: this.props.lastName, 
                  status: this.props.position,
                  skills: this.props.skills,
                  gender: this.props.gender,
                  dateOfBirthday: this.props.dateOfBirthday,
                  qualification: this.props.qualification,
                  maxDate: new Date(2001, 11, 31),
                  searchText: '',
                  validate: true,
                     }

    }
                
	
changeFirstName(event) {
    const employee = new Employee(this.state.id, this.state.photo, this.state.firstName, this.state.lastName, this.state.position, this.state.skills, this.state.gender, this.state.dateOfBirthday, this.state.qualification);
    this.setState({firstName: event.target.value});
    employee.setFirstName(this.state.firstName)
    updateEmployee(employee);
  }
  changeLastName(event) {
    const employee = new Employee(this.state.id, this.state.photo, this.state.firstName, this.state.lastName, this.state.position, this.state.skills, this.state.gender, this.state.dateOfBirthday, this.state.qualification);
    this.setState({lastName: event.target.value});
    employee.setLastName(this.state.lastName)
    updateEmployee(employee);
  }
  changePosition(event) {
    const employee = new Employee(this.state.id, this.state.photo, this.state.firstName, this.state.lastName, this.state.position, this.state.skills, this.state.gender, this.state.dateOfBirthday, this.state.qualification);
    this.setState({position: event.target.value});
    employee.setPosition(this.state.position);
    updateEmployee(employee);
  }
  addSkill(searchText) {
    const employee = new Employee(this.state.id, this.state.photo, this.state.firstName, this.state.lastName, this.state.position, this.state.skills, this.state.gender, this.state.dateOfBirthday, this.state.qualification);
  		let skills = employee.getSkills();
  		if(skills.indexOf(searchText) == -1) {
  			console.log('searchText: ', searchText)
  		
    	if(skills.length < 5)
        employee.addSkill(searchText);
    	this.setState({skills: employee.getSkills()});
    	this.setState({searchText: ''});
    	updateEmployee(employee);
    	}
    }
  updateInput(searchText) {
    	this.setState({searchText: searchText});
    }
 
 handleRequestDelete(key) {
  const employee = new Employee(this.state.id, this.state.photo, this.state.firstName, this.state.lastName, this.state.position, this.state.skills, this.state.gender, this.state.dateOfBirthday, this.state.qualification);
  let skillsData = employee.getSkills();
    const chipData = skillsData.map((skill, index) => {
    		return {key: index, value: skill}
    });
    const chipToDelete = chipData.map((chip) => chip.key).indexOf(key);
    employee.deleteSkill(chipToDelete);
    this.setState({skills: skillsData});
  };
handleChangeDate = (event, date) => {
  const employee = new Employee(this.state.id, this.state.photo, this.state.firstName, this.state.lastName, this.state.position, this.state.skills, this.state.gender, this.state.dateOfBirthday, this.state.qualification);
  this.setState({dateOfBirthday: date.toLocaleDateString()});
  employee.setDateOfBirthday(this.state.dateOfBirthday);
  updateEmployee(employee);
  }
setGender = (event, index, value) => {
  const employee = new Employee(this.state.id, this.state.photo, this.state.firstName, this.state.lastName, this.state.position, this.state.skills, this.state.gender, this.state.dateOfBirthday, this.state.qualification);
  this.setState({gender: value});
  employee.setGender(this.state.gender);
  updateEmployee(employee);

}
changeQualification(event) {
    const employee = new Employee(this.state.id, this.state.photo, this.state.firstName, this.state.lastName, this.state.position, this.state.skills, this.state.gender, this.state.dateOfBirthday, this.state.qualification);
    this.setState({qualification: event.target.value});
    employee.setQualification(this.state.qualification)
    updateEmployee(employee);
  }
  formatDate = (date) => {
       return date.getDate()+ "." + (date.getMonth() + 1) + "." + date.getFullYear();
  }

  render() {
    const styles = { width: 33, height: 33, color: '#90727c'};
    const styleChip = {backgroundColor: 'orange', padding: '5px', marginTop: '3px', marginLeft: '5px', borderRadius: '3px', fontSize: '23px'};

     (this.state.firstName !== null && this.state.firstName !== "" && this.state.lastName !== null && this.state.lastName !== "" && this.state.dateOfBirthday !== null && this.state.dateOfBirthday !== "" && this.state.gender !== null)?(this.state.validate = false):(this.state.validate = true);
    const employee = new Employee(this.state.id, this.state.photo, this.state.firstName, this.state.lastName, this.state.position, this.state.skills, this.state.gender, this.state.dateOfBirthday, this.state.qualification);
    const persents = employee.getFilledProfile();
    
  			let list = this.state.skills.map((skill, index) => {
  				return <Chip
                  className='input_chip'
                  style={styleChip}
        					key={index}
        					onRequestDelete={this.handleRequestDelete.bind(this, index)}
        					>
        					<div style={{color: 'white', fontWeight: '300'}}>{skill}</div>
        					</Chip>
  				
			});
    return  <form style={{width: '100%'}} onSubmit={this.props.onSave.bind(null, employee)}>
          <div className='close'><HighlightOff style={styles} onClick={this.props.closeForm.bind(null, this.state.id)}/></div>     
          
          <div className="block">
          <div className='profile'>
            <img src={this.state.photo} className='photo' />
            <div className='filled-info'>Filled profile: {persents}%</div>
          </div>
          <div className='block_input'>
          <div className="block_name">
     			<input className="input input_name" type="text" pattern="^[a-zA-Z][a-zA-Z0-9-_\.]{1,20}$" required oninvalid="this.setCustomValidity('Type correct data')" oninput="setCustomValidity('')" value={this.state.firstName} placeholder="First Name" onChange={this.changeFirstName.bind(this)} required/>
          <input className="input input_name" type="text" type="text" pattern="^[a-zA-Z][a-zA-Z0-9-_\.]{1,20}$" required oninvalid="this.setCustomValidity('Type correct data')" oninput="setCustomValidity('')" value={this.state.lastName} placeholder="Last Name" onChange={this.changeLastName.bind(this)} required/>
          </div>
          <input className="input input_position "type="text" value={this.state.position}  placeholder="some text" onChange={this.changePosition.bind(this)}/>	
          <div className="input input_skills">
          {list}
          <AutoComplete
              underlineStyle={{borderBottom: 'none'}}
              style={{width: '10px'}} 
              floatingLabelText="Type skills"
              filter={AutoComplete.fuzzyFilter}
              searchText={this.state.searchText}
              onNewRequest={this.addSkill.bind(this)}
              onUpdateInput={this.updateInput.bind(this)}
              dataSource={source}
              maxSearchResults={5}
          />
          </div>
          </div>	
          </div>
          <div className='data'>  
           <SelectField
          className='select select_gender'
          style={{ textOverflow: "ellipsis", overflow: "hidden", whiteSpace: "pre", width: '190px'}}
          labelStyle={{color: 'white'}}
          listStyle={{backgroundColor: grey900,
                            height: '50px',
                            borderRadius: '5px',
                            colorText: grey50,
                            fontSize: '18px',
                            iconButton: <KeyboardArrowDown />,
                            textDecoration: 'none',
                            overflow: 'hidden',
                            
                            }} 

          iconStyle={{
              fill: '#FFFFFF',
            }}
          dropDownMenuProps={{
                iconButton:<KeyboardArrowDown />,
                overflow: 'hidden',
            }}
          underlineStyle={{borderBottom: 'none'}}
          menuItemStyle={{color: 'white', alignText: 'center', fontWeight: 'bold'}}
          selectedMenuItemStyle={{backgroundColor: grey800, color: '#FFFFFF', fontWeight: 'bold'}}
          value={this.state.gender}
          onChange={this.setGender}
        >
          <MenuItem value={null} primaryText="Select Gender" rightIcon={<KeyboardArrowUp style={{fill: '#FFFFFF'}}/>} />
          <MenuItem value={"Male"} primaryText="Male" />
          <MenuItem value={"Female"} primaryText="Female" />
        </SelectField>
        <NewDatePicker 
        
        dateOfBirthday={this.state.dateOfBirthday} 
        maxDate={this.state.maxDate} 
        handleChangeDate={this.handleChangeDate} 
        formatDate={this.formatDate} 
        />
        </div>
        <div className="text-field">
        <TextField    
          fullWidth={true}    
          multiLine={true}
          underlineStyle={{borderBottom: 'none'}}
          rows={2}
          rowsMax={15}
          value={this.state.qualification}
          onChange={this.changeQualification.bind(this)}/>
          </div>

          <button dataTitle="If you want to save this user, you must type First Name, Last Name, gender and birthday" className='save' disabled={this.state.validate}>Save</button>
    			 
          </form>
          
      	
   
  }
}
