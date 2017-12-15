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

		if (!String(this.props.activeUser)) {
			return (
				<div></div>
			);
		}



		return(
			<div>
				<div className="userInfo">
					<div>User info</div>
					<div>Name: {user.name}, surname: {user.surname}, gender: {user.gender}, id: {user.id}</div>
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
