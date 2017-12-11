import React from 'react';
import {Route} from 'react-router-dom';
import NewUser from "./NewUser";
import CurrentUser from "./CurrentUser";



class RightElement extends React.Component {

	render() {


		return (
			<div className="rightElement">
				<Route path="/new" component={NewUser}/>
				<Route path="/:userId" component={CurrentUser}/>
			</div>
		);
	}
}



export default RightElement;
