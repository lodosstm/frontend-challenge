import React from 'react';
import {Link} from 'react-router-dom';
import userService from './services/user.service';
import calculateUserFilled from "./components/calulateUserFilled";

import {Button} from 'reactstrap';



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

		let skillList = this.state.user.skills.length?true:false;




		return(
			<div className="User__info">
				<div>User info, %filled: {calculateUserFilled(this.state.user)}</div>
				<div>name: {this.state.user.name}, surname: {this.state.user.surname}</div>
				<div>gender: {this.state.user.gender}, birthday: {this.state.user.birthday}</div>
				{this.state.user.job&&<div>Job: {this.state.user.job}</div>}
				{skillList && <div>Skills: {this.state.user.skills.map((skill, index)=>
					<span key={index}>{skill} </span>)}
				</div>}

				<Link to="/"><Button>return</Button></Link>
				<Link to={"/edit/" + this.state.user.id}><Button>edit</Button></Link>
				<Link to="/"><Button onClick={this.deleteUser}>delete</Button></Link>
			</div>
		);
	}
}





export default UserInfo;
