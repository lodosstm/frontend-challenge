import React from 'react';
import {Link} from 'react-router-dom';





class AddUserButton extends React.Component {


	render() {
		return (
			<div>
				<Link to="/new">
					<button onClick={()=>this.props.createEmptyUser()} className="addUserButton">
						create new user
					</button>
				</Link>
			</div>
		);
	}



}

export default AddUserButton;
