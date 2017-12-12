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
			.then(response => response.json())
				.then(data => self.setState({
						users: data,
						loading: false
					})
				);
	}



	componentDidMount () {
		this.getUser();
	}







	renderUser(i) {
		const user = this.state.users[i];
		const path =  "/" +  user.id;
		return (
			<div>
				<Link to={path}>
					<div className="userList__user">
						Name: {user.name}, id: {user.id}
					</div>
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
				<div onClick={()=>this.getUser()}>Test</div>
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
