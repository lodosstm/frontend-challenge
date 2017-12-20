import React from 'react';
import {Link} from 'react-router-dom';
import userService from './services/user.service';




import { Form, FormGroup, Label, Input, FormFeedback, FormText,Button,
	Dropdown, DropdownToggle, DropdownMenu, DropdownItem} from 'reactstrap';
import Chips from 'react-chips';




class EditUser extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			user: {name:'',surname:'',gender:'', job:'', info: '', birthday: '', photo: '', skill: []},
			dropdownOpen: false
		};
		this.deleteUser = this.deleteUser.bind(this);
		this.editingUser = this.editingUser.bind(this);
		this.toggle = this.toggle.bind(this);
		this.saveChange = this.saveChange.bind(this);
		this.editPhoto = this.editPhoto.bind(this);
		this.editSkills = this.editSkills.bind(this);
	}

	deleteUser(){
		userService.deleteUser(this.state.user.id).then(()=>{
			this.props.refreshList();
		});
	}


	editingUser(event) {
		this.setState({user: Object.assign({}, this.state.user, {[event.target.name] : event.target.value})});
	}

	toggle() {
		this.setState({
			dropdownOpen: !this.state.dropdownOpen
		});
	}

	saveChange() {
		if (!this.state.user.name) return;
		if (!this.state.user.surname) return;
		if (!this.state.user.gender) return;
		if (!this.state.user.birthday) return;
		userService.saveUser(this.state.user).then(()=>{
			this.props.refreshList();
		});
	}

	editPhoto() {
		if (!this.state.user.photo) {
			this.setState({
				user: Object.assign({}, this.state.user,{photo: "http://dummyimage.com/130x130/00dd00/000000.png&text=Avatar!"})
			});
		} else this.setState({user: Object.assign({}, this.state.user, {photo: ""})});
	}

	editSkills (skills) {
		this.setState({user: Object.assign({}, this.state.user, { skills })});
	}










	componentDidMount() {
		userService.fetchUserDetail(this.props.userId)
			.then(data => this.setState({user: data}));
	}

	componentWillReceiveProps(nextProps) {
		userService.fetchUserDetail(nextProps.userId)
			.then(data => this.setState({user: data}));
	}





	render() {


		return(
			<div className="EditUser">
				<div>Edit User</div>
				<div>
					<div>Skills:</div>
					<Chips
						value={this.state.user.skills}
						onChange={this.editSkills}
						suggestions={["React", "Angular.js", "Node.js", "JQuery"]}
					/>
				</div>
				<Form>
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
							{this.state.user.gender}
						</DropdownToggle>
						<DropdownMenu className={!this.state.user.gender?'form-control is-invalid':''}>
							<DropdownItem header>Select gender</DropdownItem>
							<DropdownItem name="gender" value="Male" onClick={this.editingUser}>Male</DropdownItem>
							<DropdownItem name="gender" value="Female" onClick={this.editingUser}>Female</DropdownItem>
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
					<FormGroup>
						<Label for="birthday">Birthday</Label>
						<Input type="date" name="birthday"  placeholder={this.state.user.birthday?this.state.user.birthday:"Birthday"}
									 value={this.state.user.birthday} onChange={this.editingUser} valid={!!this.state.user.birthday.trim()}
						/>
						<FormFeedback>Birthday is required.</FormFeedback>
					</FormGroup>
					<div onClick={this.editPhoto}>
						{this.state.user.photo&&<img src="http://dummyimage.com/130x130/00dd00/000000.png&text=Avatar!" />}
						{!this.state.user.photo&&<img src="http://dummyimage.com/130x130/c0c0c0/ffffff.png&text=add+photo!" />}
					</div>
				</Form>
				<Link to={"/"}><Button>return</Button></Link>
				<Button onClick={this.saveChange}>save</Button>
				<Link to={"/"}><Button onClick={this.deleteUser}>Delete</Button></Link>
			</div>
		);
	}
}





export default EditUser;
