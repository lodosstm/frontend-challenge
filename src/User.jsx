import React from 'react';
import {NavLink} from 'react-router-dom';

import calculateUserFilled from './components/calulateUserFilled';





class User extends React.Component {
	constructor(props) {
		super(props);
		this.state = {};
	}




	render() {
		let skillList = false;
		if (this.props.user.id) {
			skillList = this.props.user.skills.length?true:false;
		}

		let userFilled = calculateUserFilled(this.props.user);

			return (
			<NavLink to={"/" + this.props.user.id} activeClassName="User_active">
				<div className="User">
					{this.props.user.photo&&<div><img className="User__photo" src={this.props.user.photo}/></div>}
					<div className="User__fullName">{this.props.user.name} {this.props.user.surname}</div>
					<div className="User__job">{this.props.user.job}</div>



					{skillList && <ul className="User__skills">{this.props.user.skills.map((skill, index)=>
						<li className="User__skill" key={index}>{skill}</li>)}
					</ul>}

					<div className={"User__userFilled User__userFilled_" + userFilled}/>
				</div>
			</NavLink>
		);
	}
}




export default User;
