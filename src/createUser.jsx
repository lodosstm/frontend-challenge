import React from 'react';
import {Link} from 'react-router-dom';





class CreateUser extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			name: '',
			surname: '',
			gender: '',
			validated: false
		};
		this.changeName = this.changeName.bind(this);
		this.changeSurname = this.changeSurname.bind(this);
		this.changeGender = this.changeGender.bind(this);
		this.validateUserInfo = this.validateUserInfo.bind(this);
		this.saveUser = this.saveUser.bind(this);

	}

	changeName(e) {
		this.setState({name: e.target.value}, function test () {
			this.validateUserInfo();
		});
	}


	changeSurname(e) {
		this.setState({surname: e.target.value}, function test () {
			this.validateUserInfo();
		});
	}

	changeGender(e) {
		this.setState({gender: e.target.value}, function test () {
			this.validateUserInfo();
		});
	}


	validateUserInfo() {
		if (!this.state.name) {
			this.setState({validated: false});
			return;
		}
		if (!this.state.surname) {
			this.setState({validated: false});
			return;
		}

		if (!this.state.gender)  {
			this.setState({validated: false});
			return;
		}
		this.setState({validated: true});
	}





	saveUser(name, surname, gender) {
		if (!this.state.validated) {
			alert('validation need');
			return;
		}
		this.props.saveUser(name, surname, gender);

	}










	render() {
		const validated = this.state.validated;


		if (!String(this.props.activeUser)) {
			return (
				<div></div>
			);
		}

		return(
			<div>
				<div className="createUser">
					<form onChange={this.validateUserInfo}>
					<div>
						Name:<input value={this.state.name} onChange={this.changeName}/>
					</div>
					<div>
						Surname:<input value={this.state.surname} onChange={this.changeSurname}/>
					</div>
					<select value={this.state.gender} onChange={this.changeGender}>
						<option defaultValue></option>
						<option value="m">Male</option>
						<option value="f">Female</option>
					</select>
					</form>
					{validated && <Link to={"/"}>
						<button onClick={() => this.saveUser(this.state.name, this.state.surname, this.state.gender)}>
							Save
						</button>
					</Link>}
					{!validated && <button onClick={() => this.saveUser()}>Save</button>}
					<Link to={"/"}><button onClick={() => this.props.deleteUser(this.props.activeUser)}>return</button></Link>
				</div>
			</div>
		);
	}
}




export default CreateUser;
