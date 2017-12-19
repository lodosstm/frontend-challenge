import React from 'react';
import {Link} from 'react-router-dom';
import userService from './services/user.service';


import { Form, FormGroup, Label, Input, FormFeedback, FormText,Button,
	Dropdown, DropdownToggle, DropdownMenu, DropdownItem} from 'reactstrap';

import Chips from 'react-chips';





class CreateUser extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			user: {name:'',surname:'',gender:'', job:'', info: '', birthday: '', photo: '', skill: []},
			dropdownOpen: false,
			dropdownOpenDate: false
		};
		this.deleteNewUser = this.deleteNewUser.bind(this);
		this.saveNewUser = this.saveNewUser.bind(this);
		this.editingUser = this.editingUser.bind(this);
		this.toggle = this.toggle.bind(this);
		this.toggleDate = this.toggleDate.bind(this);
		this.changeUserData = this.changeUserData.bind(this);
		this.editingGender = this.editingGender.bind(this);
		this.confirmChangeDate = this.confirmChangeDate.bind(this);
		this.editPhoto = this.editPhoto.bind(this);
		this.editSkills = this.editSkills.bind(this);
	}

	deleteNewUser() {
		userService.deleteUser(this.state.user.id);
	}

	editingUser(event) {
		this.setState({user: Object.assign({}, this.state.user, {[event.target.name] : event.target.value})});
	}

	editingGender(event){
		this.setState({user: Object.assign({}, this.state.user, {[event.target.name] : event.target.value})}, function() {
				userService.saveUser(this.state.user);
		});
	}



	changeUserData() {
		userService.saveUser(this.state.user);
	}


	saveNewUser() {
		if (!this.state.user.name) return;
		if (!this.state.user.surname) return;
		if (!this.state.user.gender) return;
		if (!this.state.user.birthday) return;

		this.isUserSaved = true;
		userService.saveUser(Object.assign({}, this.state.user, {completed: 1}));
		this.props.refreshList();
		this.props.history.push('/' + this.state.user.id);
	}

	toggle() {
		this.setState({
			dropdownOpen: !this.state.dropdownOpen
		});
	}

	toggleDate() {
		if (this.state.dropdownOpenDate === true) return;
		this.setState({
			dropdownOpenDate: !this.state.dropdownOpenDate
		});
	}



	confirmChangeDate() {
		this.setState({
			dropdownOpenDate: !this.state.dropdownOpenDate
		});
		userService.saveUser(this.state.user);
	}


	editPhoto() {
		if (!this.state.user.photo) {
			this.setState({
				user: Object.assign({}, this.state.user,{photo: "http://dummyimage.com/120x120/00dd00/000000.png&text=Avatar!"})
			}, function() {
				userService.saveUser(this.state.user);
			});
		} else this.setState({user: Object.assign({}, this.state.user, {photo: ""})}, function() {
			userService.saveUser(this.state.user);
		});
	}

	editSkills (skills) {
		this.setState({user: Object.assign({}, this.state.user, { skills })});
	}





	componentDidMount() {
		userService.createEmptyUser()
			.then(data => this.setState({user: data}));
	}

	componentWillUnmount() {
		if(!this.isUserSaved) this.deleteNewUser(this.state.user.id);
	}



	render() {

		return(
			<div className="CreateUser">
				<div>Create User</div>
				<Form onBlur={this.changeUserData}>
					<div>
						<div>Skills:</div>
						<Chips
							value={this.state.user.skills}
							onChange={this.editSkills}
							suggestions={["React", "Angular.js", "Node.js", "JQuery"]}
						/>
					</div>
					<div onClick={this.editPhoto}>
						{this.state.user.photo&&<img src="http://dummyimage.com/120x120/00dd00/000000.png&text=Avatar!" />}
						{!this.state.user.photo&&<img src="http://dummyimage.com/120x120/c0c0c0/ffffff.png&text=add+photo!" />}
					</div>
					<FormGroup>
						<Label for="name">Name</Label>
						<Input name="name" value={this.state.user.name}
									 onChange={this.editingUser} valid={!!this.state.user.name.trim()}
						/>
						<FormFeedback>Name is required.</FormFeedback>
					</FormGroup>
					<FormGroup>
						<Label for="surname">Surname</Label>
						<Input name="surname" value={this.state.user.surname}
									 onChange={this.editingUser} valid={!!this.state.user.surname.trim()}
						/>
						<FormFeedback>Surname is required.</FormFeedback>
					</FormGroup>
					<Dropdown isOpen={this.state.dropdownOpen} toggle={this.toggle}>
						<DropdownToggle caret>
							{this.state.user.gender?this.state.user.gender:'Select gender'}
						</DropdownToggle>
						<DropdownMenu className={!this.state.user.gender?'form-control is-invalid':''}>
							<DropdownItem header>Select gender</DropdownItem>
							<DropdownItem name="gender" value="Male" onClick={this.editingGender}>Male</DropdownItem>
							<DropdownItem name="gender" value="Female" onClick={this.editingGender}>Female</DropdownItem>
						</DropdownMenu>
						<div className="invalid-feedback">Gender is required.</div>
					</Dropdown>
					<FormGroup>
						<Label for="job">Job</Label>
						<Input name="job" value={this.state.user.job}
									 onChange={this.editingUser}
						/>
					</FormGroup>
					<FormGroup>
						<Label for="info">Info</Label>
						<Input type="textarea" name="info" value={this.state.user.info} onChange={this.editingUser}/>
					</FormGroup>
					<Dropdown isOpen={this.state.dropdownOpenDate} toggle={this.toggleDate}>
						<DropdownToggle caret>
							{this.state.user.birthday?this.state.user.birthday:'Input birthday'}
						</DropdownToggle>
						<DropdownMenu className={!this.state.user.birthday?'form-control is-invalid':''}>
							<DropdownItem>
								<Input type="date" name="birthday"  placeholder={this.state.user.birthday?this.state.user.birthday:"Birthday"}
											 value={this.state.user.birthday} onChange={this.editingUser} valid={!!this.state.user.birthday.trim()}
								/>
							</DropdownItem>
							<DropdownItem onClick={this.confirmChangeDate}>confirm</DropdownItem>
						</DropdownMenu>
						<div className="invalid-feedback">Birthday is required.</div>
					</Dropdown>
				</Form>
				<Button onClick={this.saveNewUser}>save</Button>
				<Link to={"/"}><Button>return</Button></Link>
			</div>
		);
	}
}




export default CreateUser;
