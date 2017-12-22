import React from 'react';
import {Link} from 'react-router-dom';
import userService from './servises/user.service';
import calculateUserFilled from "./components/calulateUserFilled";

import {Button} from 'reactstrap';




import convertDate from "./components/convertDate";

import FontAwesome from 'react-fontawesome';




class UserInfo extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			user: {skills: []}
		};

		this.deleteUser = this.deleteUser.bind(this);
	}

	deleteUser(){
		userService.deleteUser(this.state.user.id).then(()=>{
			this.props.refreshList();
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

		let skillList = false;
		if (this.state.user.id) {
			skillList = this.state.user.skills.length?true:false;
		}




		return(
			<div className="UserInfo">
				<div className="UserInfo__photoContainer">
					<div className="UserInfo__photo">{this.state.user.photo&&<img src={this.state.user.photo}/>}</div>
					<div className="UserInfo__filledInfo">Filled profile: {calculateUserFilled(this.state.user)}%</div>
				</div>
				<div className="UserInfo__container">
					<div className="UserInfo__requiredInfoContainer">
						<div className="UserInfo__fullName">{this.state.user.name} {this.state.user.surname}</div>
						<div className="UserInfo__genderBirthday">
							({this.state.user.gender}, {convertDate(this.state.user.birthday)})
						</div>
					</div>
					{this.state.user.job&&<div className="UserInfo__job">{this.state.user.job}</div>}
					<div className="UserInfo__skillsContainer">
						{skillList && <ul className="UserInfo__skillsList">
							{this.state.user.skills.map((skill, index)=><li className="UserInfo__skill" key={index}>{skill} </li>)}
						</ul>}
					</div>
					{this.state.user.info&&<div className="UserInfo__info">{this.state.user.info}</div>}
					<div className="UserInfo__buttonContainer">
						<Link to={"/edit/" + this.state.user.id}><Button className="UserInfo__editButton">Edit user</Button></Link>
						<Link to="/"><Button className="UserInfo__deleteButton" onClick={this.deleteUser}>Delete user</Button></Link>
					</div>
					<Link to="/"><Button className="UserInfo__returnButton"><FontAwesome  name='times' size="lg" /></Button></Link>


				</div>
			</div>
		);
	}
}





export default UserInfo;
