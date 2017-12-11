import React from 'react';
import {Link} from 'react-router-dom';




class UserList extends React.Component {
	constructor(props) {
		super(props);
		this.getUser = this.getUser.bind(this);
		this.state = {
			loading: true,
			users: []
		};

	}


	getUser() {
		let self = this;

		fetch('http://localhost:3000/users')
			.then(
				function(response) {
					if (response.status !== 200) {
						console.log('Looks like there was a problem. Status Code: ' +
							response.status);
						return;
					}
					response.json().then((data)=> (self.setState({
						users: data,
						loading: false
					})));
				}
			)
			.catch(function(err) {
				console.log('Fetch Error :-S', err);
			});
	}



	componentDidMount () {
		this.getUser();
	}





	renderUser(i) {
		const user = this.state.users[i];
		const path =  "/" +  user.id;
		return (
			<div className="userList__user">
				<Link to={path}>
					Name: {user.name}, id: {user.id}
				</Link>
			</div>
		);
	}




	render() {

		if (this.state.loading) {
			return (
				<div>!!Loading!!</div>
			);
		}



		return (
			<div className="userList">
				<ul className="userList__container">
					{this.state.users.map((user, index)=>(
						<li className="userList__item" key={this.state.users[index].id}>{this.renderUser(index)}</li>
					))}

				</ul>
			</div>
		);
	}
}



export default UserList;
