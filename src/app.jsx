import React from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom';

import 'styles/index.scss';



import UserList from './userList';
import UserInfo from './userInfo';
import CreateUser from './createUser';

class App extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			users: [],
			loading: true,
			activeUser: '',
			editingUser: false
		};
		this.getUserList = this.getUserList.bind(this);
		this.changeActiveUser = this.changeActiveUser.bind(this);
		this.createEmptyUser = this.createEmptyUser.bind(this);
		this.saveUser = this.saveUser.bind(this);
		this.deleteUser = this.deleteUser.bind(this);
	}



	getUserList() {
		fetch('http://localhost:3000/users/')
			.then(response => response.json())
			.then(data => this.setState({
				users: data,
				loading: false
			}));
	}

	changeActiveUser(i) {
		this.setState({
			activeUser: i
		});
	}

	createEmptyUser() {
		if (this.state.editingUser) return;

		let id = null;
		if (this.state.users.length > 0) {
			id = this.state.users[this.state.users.length - 1].id + 1;
		} else id = 1;


		fetch('http://localhost:3000/users/', {
			method: 'POST',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				name: '',
				surname: '',
				gender: '',
				id: this.state.activeUser
			}),
		})
			.then(() => this.setState({
				editingUser: true,
				activeUser: id
			}));
	}

	saveUser(name, surname, gender) {


		let id = null;

		if (this.state.activeUser > this.state.users.length) {
			id = this.state.activeUser;

		} else id = this.state.users[this.state.activeUser].id;




		fetch('http://localhost:3000/users/' + id, {
			method: 'PUT',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				name: name,
				surname: surname,
				gender: gender
			}),
		})
			.then(response => response.json())
			.then(() => fetch('http://localhost:3000/users/'))
			.then(response => response.json())
			.then(data => this.setState({
				users: data,
				loading: false,
				activeUser: '',
				editingUser: false
			}));

	}

	deleteUser(i) {

		let id = null;

		if (i > this.state.users.length) {
			id = i;
			this.setState({editingUser: false});

		} else id = this.state.users[i].id;


		fetch('http://localhost:3000/users/' + id, {
			method: 'delete'
		})
			.then(response => response.json())
			.then(() => fetch('http://localhost:3000/users/'))
			.then(response => response.json())
			.then(data => this.setState({
				users: data,
				loading: false,
				activeUser: ''
			}));
	}





	componentDidMount() {
		this.getUserList();
	}






	render() {
		const activeUser = this.state.activeUser;


		return (
			<Router>
				<div>
					<div className="topElement">List</div>
					<div className="containerForUserListAndInfo">
						<UserList users={this.state.users} loading={this.state.loading}
											changeActiveUser={this.changeActiveUser} editingUser={this.state.editingUser}
											createEmptyUser={this.createEmptyUser}/>
						<Route path="/:userId" render={({match}) =>
							<UserInfo  match={match} user={this.state.users[activeUser]} activeUser={activeUser}
												 deleteUser={this.deleteUser}/>
						}/>
						<Route path="/new" render={() =>
							<CreateUser saveUser={this.saveUser} deleteUser={this.deleteUser}
													activeUser={activeUser}/>
						}/>
					</div>
				</div>
			</Router>
		);
	}
}




export default App;
