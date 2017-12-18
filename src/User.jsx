import React from 'react';
import {NavLink} from 'react-router-dom';

import calculateUserFilled from './components/calulateUserFilled';





class User extends React.Component {
	constructor(props) {
		super(props);
		this.state = {};
	}




	render() {


		let userFilled = calculateUserFilled(this.props.user);

			return (
			<NavLink to={"/" + this.props.user.id} activeClassName="User_active">
				<div className="User">
					name: {this.props.user.name}, surname: {this.props.user.surname}, id: {this.props.user.id}
					<div className={"User__userFilled User__userFilled_" + userFilled}></div>
				</div>
			</NavLink>
		);
	}
}




export default User;
