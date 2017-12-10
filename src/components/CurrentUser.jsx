import React from 'react';
import {Link} from 'react-router-dom';



class CurrentUser extends React.Component {


	render() {
		const id = this.props.match.params.userId;

		if (isNaN(id) || id == 'new') {
			return (
				<div></div>
			);
		}

		return (
			<div>
				<div>Current user info</div>
				<div>user Id: {id}</div>
				<Link to="/">return</Link>
			</div>
		);
	}
}




export default CurrentUser;
