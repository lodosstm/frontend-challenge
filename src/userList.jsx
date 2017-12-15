import React from 'react';
import {Link} from 'react-router-dom';

import AddUserButton from './components/addUserButton';



class UserList extends React.Component {
	constructor(props) {
		super(props);
		this.state = {};

	}





	renderUser(i) {
		const user = this.props.users[i];
		const editingUser = this.props.editingUser;

		if (editingUser) {
			return (
				<div className='userList__user'>
					Name: {user.name}, id: {user.id}
				</div>
			);
		}

		return (
			<Link to={'/' + user.id}>
				<div className='userList__user'>
					Name: {user.name}, id: {user.id}
				</div>
			</Link>
		);
	}




	render() {




		return(
			<div className="userList">
				<AddUserButton createEmptyUser={this.props.createEmptyUser}/>
				{this.props.loading && <div>Loading user list</div>}
				<ul className="userList__items">
					{this.props.users.map((user, index)=> (
						<li key={index} onClick={() => this.props.changeActiveUser(index)}>
							{this.renderUser(index)}
						</li>
					))}
				</ul>
			</div>
		);
	}
}


UserList.defaultProps = {
	loading: true,
	users: []
};


export default UserList;
