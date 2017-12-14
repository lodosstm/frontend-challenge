import React from 'react';
import {Link} from 'react-router-dom';





class CreateUser extends React.Component {
	constructor(props) {
		super(props);
	}





	render() {

		return(
			<div>
				<div>
					<div>Create New User</div>
					<Link to={"/"}><button onClick={() => this.props.saveUser()}>Save</button></Link>
					<Link to={"/"}><button onClick={() => this.props.deleteUser(this.props.activeUser)}>return</button></Link>
				</div>
			</div>
		);
	}
}




export default CreateUser;
