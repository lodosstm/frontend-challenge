import React from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom';

import 'styles/index.scss';
import UserList from './userList';
import UserInfo from './userInfo';



class App extends React.Component {
	constructor(props) {
		super(props);
		this.getUserList = this.getUserList.bind(this);
		this.changeUser = this.changeUser.bind(this);
		this.deleteUser = this.deleteUser.bind(this);
		this.state = {
			loading: true,
			activeUser: '',
			users: []
		};
	}

	getUserList() {
		fetch('http://localhost:3000/users')
			.then(response => response.json())
			.then(data => this.setState({
					users: data,
					loading: false
				})
			);
	}

	changeUser(i) {
		this.setState({activeUser: i});
	}




	deleteUser(i) {
		const id = this.state.users[i].id;
		fetch('http://localhost:3000/users/' + id, {
			method: 'delete'
		})
			.then(response => response.json())
			.then(() => (fetch('http://localhost:3000/users')
					.then(response => response.json())
					.then(data => this.setState({users: data}))
			));


	}











	componentDidMount() {
		this.getUserList();
	}



	render() {
		const users = this.state.users;
		const activeUser = this.state.activeUser;


		return (
			<Router>
				<div>
					<div className="topElement">List</div>
					<div className="containerForUserListAndInfo">
						<UserList users={users} loading={this.state.loading} changeUser={this.changeUser}/>
						<Route path="/:userId" render={() => (
							<UserInfo  activeUser={activeUser} user={users[activeUser]} deleteUser={this.deleteUser}/>
							)}/>
					</div>
				</div>
			</Router>
		);
	}
}




export default App;
