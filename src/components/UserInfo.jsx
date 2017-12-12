import React from 'react';
import {Link} from 'react-router-dom';
import DeleteUser from './DeleteUser';


class UserInfo extends React.Component {
	constructor(props) {
		super(props);
		this.getUserById = this.getUserById.bind(this);
		this.state = {
			loading: true,
			user: {},
			newUser: false
		};
	}




	getUserById() {
		let id = this.props.match.params.userId;
		if (id === 'new') {
			this.setState({
					newUser: true,
					loading: false
				});
			return;
		}

		let url = 'http://localhost:3000/users/' + id;

		let self = this;

		fetch(url)
			.then(response => response.json())
				.then(function(data) {
					if (data.id === +id) {
						return self.setState({user: data, loading: false});
					}

				});

	}



	componentDidMount() {
		this.getUserById();
	}

	componentWillReceiveProps(nextProps) {
		if (this.props.match.params.userId  !== nextProps.match.params.userId) {
			this.props = nextProps;
			this.setState({newUser: false});
			this.getUserById();
		}
	}




	render() {

		if (this.state.newUser) {
			return (
				<div>
					<div>Create new user form</div>
					<Link to="/">return</Link>
				</div>
			)
		}

		if (this.state.loading) {
			return (
				<div>Loading user info</div>
			);
		}


		return (
			<div>
				<div>Current user info</div>
				<div>Name: {this.state.user.name}, Id: {this.state.user.id}</div>
				<Link to="/">return</Link>
				<Link to="/">
					<div onClick={()=> DeleteUser(this.state.user.id)}>
						!!delete!!
					</div>
				</Link>
			</div>
		);
	}
}




export default UserInfo;
