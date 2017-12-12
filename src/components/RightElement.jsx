import React from 'react';
import {Route} from 'react-router-dom';
import UserInfo from "./UserInfo";



class RightElement extends React.Component {

	render() {


		return (
			<div className="rightElement">
				<Route path="/:userId" component={UserInfo}/>
			</div>
		);
	}
}



export default RightElement;
