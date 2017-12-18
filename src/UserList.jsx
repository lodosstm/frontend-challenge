import React from 'react';
import {NavLink} from 'react-router-dom';


import userService from './services/user.service';
import User from './User';
import {Button} from 'reactstrap';

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
		return(
			<div className="UserList" id="scroll">
				<div>
					<div className="UserList__addNewUserButtonContainer">
						<NavLink to="/new" ><Button className="UserList__addNewUserButton">new</Button></NavLink>
					</div>
					<ul className="UserList__items">
						{this.state.loading && <div>Loading</div>}
						{this.state.users.map((user)=> (
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
