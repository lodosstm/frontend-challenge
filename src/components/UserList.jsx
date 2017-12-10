import React from 'react';
import {Link} from 'react-router-dom';

class UserList extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			users: [
				{id:0, name:'qwe'},
				{id:1, name:'asd'},
				{id:22, name:'zxc'},
				{id:3, name:'bgt'},
				{id:14, name:'zsd'},
				{id:5, name:'nij'}
			]
		};
	}

	renderUser(i) {
		const user = this.state.users[i];
		const path =  "/" +  user.id;
		return (
			<div>
				<Link to={path}>
					Name: {user.name}, id: {user.id}
				</Link>
			</div>
		);
	}

	render() {

		return (
			<div>
				<ul>
					{this.state.users.map((user, index)=>(
						<li key={this.state.users[index].id}>{this.renderUser(index)}</li>
					))}

				</ul>
			</div>
		);
	}
}



export default UserList;
