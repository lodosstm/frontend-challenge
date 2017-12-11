import React from 'react';
import {Link} from 'react-router-dom';

const AddUser = () => (
	<div className="addUserElement">
		<Link to="/new"><button className="addUserElement__button">+</button></Link>
	</div>
);

export default AddUser;
