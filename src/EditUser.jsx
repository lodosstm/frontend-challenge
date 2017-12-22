import React from 'react';
import {Link} from 'react-router-dom';
import userService from './servises/user.service';




import { Form, FormGroup, Input, FormFeedback, Button,
	Dropdown, DropdownToggle, DropdownMenu, DropdownItem, Container, Row, Col} from 'reactstrap';



import calculateUserFilled from "./components/calulateUserFilled";


import Chips, {Chip} from 'react-chips';
import theme, {chipTheme} from "./components/chip";



import validateDate from "./components/validateDate";
import convertDate from "./components/convertDate";

import FontAwesome from 'react-fontawesome';





class EditUser extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			user: {name:'',surname:'',gender:'', job:'', info: '', birthday: '', photo: '', skill: []},
			dropdownOpen: false,
			dropdownOpenDate: false
		};
		this.deleteUser = this.deleteUser.bind(this);
		this.editingUser = this.editingUser.bind(this);
		this.toggle = this.toggle.bind(this);
		this.saveChange = this.saveChange.bind(this);
		this.editPhoto = this.editPhoto.bind(this);
		this.editSkills = this.editSkills.bind(this);
		this.toggleDate = this.toggleDate.bind(this);
		this.confirmChangeDate = this.confirmChangeDate.bind(this);
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
					<div className="EditUser__photoContainer">
						<div onClick={this.editPhoto}>
							{this.state.user.photo&&<img src="http://dummyimage.com/130x130/00dd00/000000.png&text=Avatar!" />}
							{!this.state.user.photo&&<img src="http://dummyimage.com/130x130/c0c0c0/ffffff.png&text=add+photo!" />}
						</div>
						<div className="EditUser__filledInfo">Filled profile: {calculateUserFilled(this.state.user)}%</div>
					</div>
					<div className="EditUser__container">
						<Form>
							<Container>
								<Row>
									<Col>
										<FormGroup className="EditUser__nameContainer">
											<Input name="name" value={this.state.user.name} placeholder="First name" className="EditUser__name"
														 onChange={this.editingUser} valid={!!this.state.user.name.trim()}
											/>
											<FormFeedback className="EditUser__nameError">Name is required.</FormFeedback>
										</FormGroup>
									</Col>
									<Col>
										<FormGroup className="EditUser__surnameContainer">
											<Input name="surname" value={this.state.user.surname} placeholder="Last name" className="EditUser__surname"
														 onChange={this.editingUser} valid={!!this.state.user.surname.trim()}
											/>
											<FormFeedback className="EditUser__surnameError">Surname is required.</FormFeedback>
										</FormGroup>
									</Col>
								</Row>
								<Row className="EditUser__rowJob">
									<Col>
										<FormGroup>
											<Input name="job" value={this.state.user.job} placeholder="some text" className="EditUser__job"
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
								<Row className="EditUser__genderBirthdayContainer">
									<Dropdown isOpen={this.state.dropdownOpen} toggle={this.toggle} className="EditUser__dropdown">
										<DropdownToggle caret className="EditUser__dropdownToggle">
											{this.state.user.gender?this.state.user.gender:'Select gender'}
										</DropdownToggle>
										<DropdownMenu className={!this.state.user.gender?'form-control is-invalid EditUser__dropdownmenu':'EditUser__dropdownmenu'}>
											<DropdownItem name="gender" value="Male" onClick={this.editingUser} className="EditUser__dropdownitem">
												Male
											</DropdownItem>
											<DropdownItem name="gender" value="Female" onClick={this.editingUser} className="EditUser__dropdownitem">
												Female
											</DropdownItem>
										</DropdownMenu>
										<div className="invalid-feedback EditUser__dropdownError">Gender is required.</div>
									</Dropdown>
									<Dropdown isOpen={this.state.dropdownOpenDate} toggle={this.toggleDate} className="EditUser__dropdown EditUser__dropdown_birthday">
										<DropdownToggle caret caret className="EditUser__dropdownToggle">
											{this.state.user.birthday?convertDate(this.state.user.birthday):'Input birthday'}
										</DropdownToggle>
										<DropdownMenu className={!this.state.user.birthday?'form-control is-invalid EditUser__dropdownmenu':'EditUser__dropdownmenu'}>
											<DropdownItem className="EditUser__dropdownitem">
												<Input type="date" name="birthday"  placeholder={this.state.user.birthday?this.state.user.birthday:"Birthday"}
															 value={this.state.user.birthday} onChange={this.editingUser} valid={validateDate(this.state.user.birthday)}
												/>
											</DropdownItem>
											<DropdownItem onClick={this.confirmChangeDate} className="EditUser__dropdownitem">Confirm</DropdownItem>
										</DropdownMenu>
										<div className="invalid-feedback EditUser__dropdownError">Birthday is required.</div>
									</Dropdown>
								</Row>
								<Row className="EditUser__infoContainer">
									<Col>
										<FormGroup>
											<Input type="textarea" name="info" value={this.state.user.info} onChange={this.editingUser} className="EditUser__info"/>
										</FormGroup>
									</Col>
								</Row>

							</Container>

						</Form>



						<Link to={"/"}><Button className="EditUser__returnButton"><FontAwesome  name='times' size="lg" /></Button></Link>
						<div className="EditUser__buttonContainer">
							<Button onClick={this.saveChange} className="EditUser__saveButton">save</Button>
							<Link to={"/"}><Button onClick={this.deleteUser} className="EditUser__deleteButton">Delete</Button></Link>
						</div>

					</div>



			</div>
		);
	}
}





export default EditUser;
