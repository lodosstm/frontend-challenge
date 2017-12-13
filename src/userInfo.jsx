import React from 'react';
import {Link} from 'react-router-dom';





class UserInfo extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			user: {}
		};
	}





	render() {
		const active = this.props.activeUser;
		return(
			<div>
				{String(active) && <div>
					<div>User info</div>
					<div>Name: {this.props.user.name}, Surname: {this.props.user.surname}, id:{this.props.user.id}</div>
					<Link to={"/"}><div>Return</div></Link>
					<Link to={"/"}><div onClick={()=> this.props.deleteUser(active)}>!!Delete!!</div></Link>
				</div>}
			</div>
		);
	}
}



UserInfo.defaultProps = {
	activeUser: '',
	user: {}
};

export default UserInfo;
