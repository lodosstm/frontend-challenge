import React from 'react';
import {Link} from 'react-router-dom';
import FontAwesome from 'react-fontawesome';
import { Form, FormGroup, Input, FormFeedback, Button,	Dropdown, DropdownToggle,
	DropdownMenu, DropdownItem, Container, Row, Col} from 'reactstrap';
import Chips, {Chip} from 'react-chips';
import theme, {chipTheme} from "./components/chip";
import userService from './servises/user.service';
import calculateUserFilled from "./components/calulateUserFilled";
import validateDate from "./components/validateDate";
import convertDate from "./components/convertDate";



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
				user: Object.assign({}, this.state.user,{photo: "http://dummyimage.com/130x130/00dd00/000000.png&text=Avatar!"})
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
				<div className="CreateUser__photoContainer">
					<div onClick={this.editPhoto}>
						{this.state.user.photo&&<img src="http://dummyimage.com/130x130/00dd00/000000.png&text=Avatar!" />}
						{!this.state.user.photo&&<img src="http://dummyimage.com/130x130/c0c0c0/ffffff.png&text=add+photo!" />}
					</div>
					<div className="CreateUser__filledInfo">Filled profile: {calculateUserFilled(this.state.user)}%</div>
				</div>
				<div className="CreateUser__container">
					<Form onBlur={this.changeUserData}>
						<Container>
							<Row>
								<Col>
									<FormGroup className="CreateUser__nameContainer">
										<Input name="name" value={this.state.user.name} placeholder="First name" className="CreateUser__name"
													 onChange={this.editingUser} valid={!!this.state.user.name.trim()}
										/>
										<FormFeedback className="CreateUser__nameError">Name is required.</FormFeedback>
									</FormGroup>
								</Col>
								<Col>
									<FormGroup className="CreateUser__surnameContainer">
										<Input name="surname" value={this.state.user.surname} placeholder="Last name" className="CreateUser__surname"
													 onChange={this.editingUser} valid={!!this.state.user.surname.trim()}
										/>
										<FormFeedback className="CreateUser__surnameError">Surname is required.</FormFeedback>
									</FormGroup>
								</Col>
							</Row>
							<Row className="CreateUser__rowJob">
								<Col>
									<FormGroup>
										<Input name="job" value={this.state.user.job} placeholder="some text" className="CreateUser__job"
													 onChange={this.editingUser}
										/>
									</FormGroup>
								</Col>
							</Row>
							<Row>
								<Col>
									<Chips
										value={this.state.user.skills}
										onChange={this.editSkills}
										suggestions={["react", "angular.js", "node.js", "JQuery"]}
										theme={theme}
										renderChip={value => <Chip theme={chipTheme}>{value}</Chip>}
									/>
								</Col>
							</Row>
							<Row className="CreateUser__genderBirthdayContainer">
								<Dropdown isOpen={this.state.dropdownOpen} toggle={this.toggle} className="CreateUser__dropdown">
									<DropdownToggle caret className="CreateUser__dropdownToggle">
										{this.state.user.gender?this.state.user.gender:'Select gender'}
									</DropdownToggle>
									<DropdownMenu className={!this.state.user.gender?'form-control is-invalid CreateUser__dropdownmenu'
										:'CreateUser__dropdownmenu'}>
										<DropdownItem name="gender" value="Male" onClick={this.editingGender} className="CreateUser__dropdownitem">
											Male
										</DropdownItem>
										<DropdownItem name="gender" value="Female" onClick={this.editingGender} className="CreateUser__dropdownitem">
											Female
										</DropdownItem>
									</DropdownMenu>
									<div className="invalid-feedback CreateUser__dropdownError">Gender is required.</div>
								</Dropdown>



								<Dropdown isOpen={this.state.dropdownOpenDate} toggle={this.toggleDate}
													className="CreateUser__dropdown CreateUser__dropdown_birthday">
									<DropdownToggle caret caret className="CreateUser__dropdownToggle">
										{this.state.user.birthday?convertDate(this.state.user.birthday):'Input birthday'}
									</DropdownToggle>
									<DropdownMenu className={!this.state.user.birthday?'form-control is-invalid CreateUser__dropdownmenu'
										:'CreateUser__dropdownmenu'}>
										<DropdownItem className="CreateUser__dropdownitem">
											<Input type="date" name="birthday"  placeholder={this.state.user.birthday?this.state.user.birthday:"Birthday"}
														 value={this.state.user.birthday} onChange={this.editingUser} valid={validateDate(this.state.user.birthday)}
											/>
										</DropdownItem>
										<DropdownItem onClick={this.confirmChangeDate} className="CreateUser__dropdownitem">Confirm</DropdownItem>
									</DropdownMenu>
									<div className="invalid-feedback CreateUser__dropdownError">Birthday is required.</div>
								</Dropdown>
							</Row>
							<Row className="CreateUser__infoContainer">
								<Col>
									<FormGroup>
										<Input type="textarea" name="info" value={this.state.user.info} onChange={this.editingUser} className="CreateUser__info"/>
									</FormGroup>
								</Col>
							</Row>
						</Container>
					</Form>
					<Button onClick={this.saveNewUser} className="CreateUser__saveButton">save</Button>
					<Link to={"/"}><Button className="CreateUser__returnButton"><FontAwesome  name='times' size="lg" /></Button></Link>
				</div>
			</div>
		);
	}
}


export default CreateUser;
