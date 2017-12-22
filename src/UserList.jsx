import React from 'react';
import {NavLink} from 'react-router-dom';


import userService from './servises/user.service';
import User from './User';
import {Button} from 'reactstrap';
import FontAwesome from "react-fontawesome";



class UserList extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			users: [],
			loading: true
		};
	}


	componentDidMount() {
		userService.fetchUsersList()
			.then(data => this.setState({users: data, loading: false}));
	}

	componentWillReceiveProps(){
		userService.fetchUsersList()
			.then(data => this.setState({users: data, loading: false}));
	}




	render() {

		let users = false;
		if (this.state.users) users = true;




		return(
			<div className="UserList" id="scroll">
				<div>
					<div className="UserList__addNewUserButtonContainer">
						<NavLink to="/new" ><Button className="UserList__addNewUserButton"><FontAwesome  name='plus'  size="lg"/></Button></NavLink>
					</div>
					<ul className="UserList__items">
						{this.state.loading && <div>Loading</div>}
						{users&&this.state.users.map((user)=> (
							<li key={user.id}>
								<User user={user}/>
							</li>
						))}
					</ul>
				</div>
			</div>
		);
	}
}



export default UserList;
