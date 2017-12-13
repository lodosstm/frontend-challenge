import React from 'react';
import {Link} from 'react-router-dom';





class UserList extends React.Component {
	constructor(props) {
		super(props);
		this.state = {};
	}


	renderUser(i) {
		const user = this.props.users[i];
		return (
			<Link to={"/" + user.id}>
				<div className='userList__user'>
					Name: {user.name}, id: {user.id}
				</div>
			</Link>

		);
	}




	render() {
		return(
			<div className="userList">
				<div>Add button</div>
				{this.props.loading && <div>Loading user list</div>}
				<ul>
					{this.props.users.map((user, index)=> (
						<li key={index} onClick={() => this.props.changeUser(index)}>
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
