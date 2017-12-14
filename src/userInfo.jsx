import React from 'react';
import {Link} from 'react-router-dom';





class UserInfo extends React.Component {
	constructor(props) {
		super(props);
	}





	render() {

		const user = this.props.user;


		if (isNaN(this.props.match.params.userId)) {
			return (
				<div></div>
			);
		}



		return(
			<div>
				<div>
					<div>User info</div>
					<div>Name: {user.name}, surname: {user.surname}, id: {user.id}</div>
					<Link to={"/"}><div>Return</div></Link>
					<Link to={"/"}><div onClick={() => this.props.deleteUser(this.props.activeUser)}>!!Delete!!</div></Link>
				</div>
			</div>
		);
	}
}



UserInfo.defaultProps = {
	activeUser: '',
	user: {}
};

export default UserInfo;
